import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import puppeteer from 'puppeteer';

const root = process.cwd();
const dataPath = path.join(root, 'src', 'data', 'personalData.json');
const templatePath = path.join(root, 'src', 'templates', 'cv-template.html');
const publicProfile = path.join(root, 'public', 'profile.jpg');
const outDir = path.join(root, 'dist');
const outFile = path.join(outDir, 'cv.pdf');

function simpleRender(template, data) {
  let out = template;

  // First render array blocks: {{#array}}...{{/array}}
  out = out.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (m, key, block) => {
    const arr = data[key] ?? [];
    if (!Array.isArray(arr)) return '';
    return arr.map(entry => {
      if (typeof entry !== 'object' || entry === null) {
        return block.replace(/{{\.}}/g, String(entry));
      }
      return block.replace(/{{\s*(\w+)\s*}}/g, (m2, k2) => {
        const val = entry[k2];
        if (Array.isArray(val)) return val.join(', ');
        return val ?? '';
      }).replace(/{{\.}}/g, '');
    }).join('\n');
  });

  // Then perform simple variable replacements (top-level / personal fields)
  out = out.replace(/{{\s*(\w+)\s*}}/g, (m, key) => {
    return data[key] ?? '';
  });

  return out;
}

(async () => {
  try {
    const [dataRaw, templateRaw] = await Promise.all([
      fs.readFile(dataPath, 'utf8'),
      fs.readFile(templatePath, 'utf8')
    ]);

    const data = JSON.parse(dataRaw);

    // Add convenience top-level keys for simple replacements
    const renderData = Object.assign({}, data, data.personalInfo);
    // Accent color: can be provided in data.accentColor or data.personalInfo.accentColor
    renderData.accentColor = data.accentColor || (data.personalInfo && data.personalInfo.accentColor) || '#0f766e';

    // Embed profile image as base64 data URI (fallback to file:// if not found)
    try {
      const imgBuf = await fs.readFile(publicProfile);
      const ext = path.extname(publicProfile).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
      renderData.profileImage = `data:${mime};base64,${imgBuf.toString('base64')}`;
    } catch (err) {
      renderData.profileImage = pathToFileURL(publicProfile).href;
    }

    // Prepare skill groups and percent widths for progress bars
    const mkPercent = lvl => (typeof lvl === 'number') ? `${Math.round((lvl / 5) * 100)}%` : '0%';
    renderData.languages = (data.skills && data.skills.languages || []).map(s => ({ ...s, levelPercent: mkPercent(s.level) }));
    renderData.frameworks = (data.skills && data.skills.frameworks || []).map(s => ({ ...s, levelPercent: mkPercent(s.level) }));
    renderData.tools = (data.skills && data.skills.tools || []).map(s => ({ ...s, levelPercent: mkPercent(s.level) }));
    renderData.methods = (data.skills && data.skills.methods) || [];

    // Render HTML
    const html = simpleRender(templateRaw, renderData);

    // Ensure output directory exists
    await fs.mkdir(outDir, { recursive: true });

    // Launch Puppeteer and render PDF
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF as buffer and write to both build output and public folder so it's accessible at /cv.pdf
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' } });
    await fs.writeFile(outFile, pdfBuffer);

    const publicOut = path.join(root, 'public', 'cv.pdf');
    try {
      await fs.writeFile(publicOut, pdfBuffer);
      console.log('✅ CV written to public:', publicOut);
    } catch (err) {
      console.warn('⚠️ Could not write CV to public folder:', err.message);
    }

    await browser.close();

    console.log('✅ CV generated:', outFile);
  } catch (err) {
    console.error('❌ Error generating CV PDF:', err);
    process.exit(1);
  }
})();