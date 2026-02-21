# wahlflorian.com

Personal website of Florian Wahl — Product Leader, Engineer, and Fintech Expert. A pixel-art inspired portfolio showcasing work experience, thought leadership, and professional capabilities.

🌐 **Live Site:** [wahlflorian.com](https://wahlflorian.com)

## About

This website serves as a digital portfolio and professional presence, featuring a pixel-art aesthetic inspired by retro culture. The design emphasizes clarity, readability, and a unique visual identity that stands out from traditional portfolio sites.

## Features

### Core Sections

- **Hero Section** — Animated typing effect, professional taglines, "Expert Mode" badge, and short bio
- **Upcoming Engagements** — Conference talks, panels, and speaking engagements
- **Thought Leadership** — Curated articles, hosted blog posts, and conference talks with chronological organization
- **Experience Timeline** — Chronological work history grouped by company, with clear start/end dates
- **Contact** — Contact information and social media links
- **404 Page** — Custom "Game Over" error page matching the retro gaming aesthetic

### Design & UX

- **Pixel Art Aesthetic** — Custom pixel-style design with 8-bit inspired elements
- **Dark Mode** — Optimized dark theme with pixel-perfect styling
- **Responsive Design** — Fully mobile-friendly with touch gestures and optimized layouts
- **Smooth Animations** — Subtle typing effects, fade-ins, and interactive hover states
- **Icon Library** — [HackerNoon Pixel Icon Library](https://github.com/hackernoon/pixel-icon-library) for consistent pixel-style icons

### Technical Features

- **SEO Optimized** — Comprehensive metadata, schema markup, and sitemap generation
- **Image Optimization** — Custom lazy loading with skeleton placeholders
- **Analytics Integration** — Google Analytics event tracking
- **Performance** — Optimized builds with Next.js static generation

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** — React framework with Pages Router (static export)
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[next-themes](https://github.com/pacocoursey/next-themes)** — Theme management
- **[HackerNoon Pixel Icon Library](https://github.com/hackernoon/pixel-icon-library)** — Pixel art icons

## Development

### Prerequisites

- Node.js 18+ and npm

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Production Build

Create an optimized production build:

```bash
npm run build
npm start
```

The build process automatically generates a sitemap via the `postbuild` script.

## Configuration

### Environment Variables

Set the following environment variable to enable Google Analytics:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=<your-google-analytics-id>
```

### Data Management

All personal data (experience, articles, talks, social links) is centralized in `constants/data.ts` for easy maintenance and updates.

### Blogging

Hosted blog posts are written as markdown files in `posts/` and served at `/articles/[slug]`. Add a new `.md` file with `title`, `date`, `description`, and `coverImage` frontmatter — it's automatically included in the feed and sitemap on the next build.

## Project Structure

```
wahlflorian-v3/
├── components/          # React components
│   ├── Hero.tsx        # Hero section with typing animation
│   ├── Experience.tsx  # Work experience timeline
│   ├── ThoughtLeadership.tsx  # Articles and talks
│   ├── SocialLinks.tsx # Reusable social media links
│   ├── PixelIcons.tsx  # Custom pixel art icons
│   └── ...
├── constants/
│   └── data.ts         # Centralized data store
├── pages/              # Next.js pages
├── styles/             # Global CSS and fonts
├── utils/              # Utilities (analytics, image optimization)
└── public/             # Static assets
```

## Design Philosophy

The website embraces a pixel-art aesthetic that pays homage to retro computing while maintaining modern web standards. Key design principles:

- **Clarity over complexity** — Information is presented clearly and accessibly
- **Consistent pixel styling** — All UI elements follow the pixel-art theme
- **Performance first** — Fast loading times and smooth interactions
- **Mobile-first** — Responsive design that works beautifully on all devices

## License

This project is private and proprietary.

---

Built with ❤️ and pixels by Florian Wahl
