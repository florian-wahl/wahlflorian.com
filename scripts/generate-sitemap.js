const fs = require('fs');
const path = require('path');

const baseUrl = 'https://wahlflorian.com';
const pagesDir = path.join(process.cwd(), 'pages');
const publicDir = path.join(process.cwd(), 'public');
const outDir = path.join(process.cwd(), 'out');

function getRoutes(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...getRoutes(fullPath));
    } else {
      if (entry.name.startsWith('_')) continue;
      const ext = path.extname(entry.name);
      if (!['.js', '.jsx', '.ts', '.tsx', '.mdx'].includes(ext)) continue;
      const relative = path.relative(pagesDir, fullPath);
      let route = '/' + relative.replace(ext, '');
      route = route.replace(/index$/, '');
      route = route.replace(/\\/g, '/');
      routes.push(route);
    }
  }

  return routes;
}

const routes = Array.from(new Set(getRoutes(pagesDir))).sort();
const urls = routes
  .map((route) => `  <url>\n    <loc>${baseUrl}${route}</loc>\n  </url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
if (fs.existsSync(outDir)) {
  fs.copyFileSync(
    path.join(publicDir, 'sitemap.xml'),
    path.join(outDir, 'sitemap.xml')
  );
}
console.log('sitemap.xml generated');
