# Personal Profile Website - Waldemar Artes

A professional portfolio website showcasing the skills, experience, and projects of Waldemar Artes, a senior freelance Java backend developer and software architect based in Germany.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) - Modern static site builder
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Content**: [MDX](https://mdxjs.com/) - JSX in Markdown files
- **Deployment**: Static site generator (can be deployed anywhere)

## ✨ Features

- Responsive design optimized for all devices
- Modern, clean interface with dark mode aesthetic
- Detailed skills section with proficiency ratings
- Project timeline and employer references
- Professional background and certifications
- SEO-friendly with proper meta tags
- Fast loading times thanks to Astro's architecture

## 📁 Project Structure

```
myProfile/
├── astro.config.mjs         # Astro configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
├── public/                 # Static assets
│   └── profile.jpg         # Profile image
├── src/
│   ├── layouts/            # Layout components
│   │   └── BaseLayout.astro # Main layout
│   ├── pages/              # Page routes
│   │   ├── index.astro     # Home page
│   │   ├── about.mdx       # About page with skills
│   │   ├── timeline.mdx    # Project timeline
│   │   ├── employers.mdx   # Employer references
│   │   ├── cv.astro        # CV page
│   │   └── ...
│   └── styles/
│       └── global.css      # Global styles
└── styles/                 # Additional styles
```

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18 or later)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd myProfile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to [http://localhost:4321](http://localhost:4321)

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production site
- `npm run preview` - Preview the built site locally
- `npm run check` - Type check the project
- `npm run lint` - Lint the code (placeholder)

## 🎯 Pages

- **Home** (`/`) - Introduction and overview
- **About** (`/about`) - Detailed background, skills, certifications
- **Timeline** (`/timeline`) - Project history and experience
- **Employers** (`/employers`) - References and testimonials
- **CV** (`/cv`) - Curriculum Vitae
- **Legal** - Impressum and Datenschutz

## 🎨 Styling

The site uses Tailwind CSS for styling with a consistent dark theme. The color palette includes amber accents on a dark background for a professional look.

## 🔧 Customization

To customize this portfolio for your own use:

1. Update the content in the `src/pages` directory
2. Replace `public/profile.jpg` with your own profile image
3. Modify the `BaseLayout.astro` to update navigation and footer
4. Adjust colors in the Tailwind configuration if desired

## 📊 Skills Overview

Based on the current content, the site showcases expertise in:

- **Languages**: Java, TypeScript, JavaScript, XML/XSLT, JSON
- **Frameworks**: Spring Boot, Spring Framework, Quarkus, EJB, JPA
- **Tools**: Docker, Kubernetes, Git, Maven, Jenkins, Kafka
- **Methodologies**: DDD, Microservices, Agile, CI/CD

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for improvements. For major changes, please open an issue first to discuss what you would like to change.

---

Built with ❤️ using Astro, TypeScript, and Tailwind CSS.