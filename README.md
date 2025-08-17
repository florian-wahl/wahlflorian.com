# wahlflorian.com

This repository contains the source code for [wahlflorian.com](https://wahlflorian.com), the personal website of product leader Florian Wahl.

Built with [Next.js](https://nextjs.org/) and TypeScript, styled with [Tailwind CSS](https://tailwindcss.com/), it showcases Florian's experience, writing, and contact information.

## Features

- Portfolio pages for About, Experience, Articles, and Contact
- Custom image optimization with lazy loading and skeleton placeholders
- SEO-friendly metadata and schema markup
- Responsive design with dark mode support
- Google Analytics integration

## Development

Install dependencies and start a local development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to view the site.

## Production build

Create an optimized production build and start the server:

```bash
npm run build
npm start
```

## Environment variables

Set the following variable to enable analytics:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=<your-google-analytics-id>
```

