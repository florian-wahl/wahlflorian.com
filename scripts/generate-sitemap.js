const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const baseUrl = 'https://wahlflorian.com';
const pagesDir = path.join(process.cwd(), 'pages');
const postsDir = path.join(process.cwd(), 'posts');
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
      // Skip dynamic route placeholders — their real URLs come from posts
      if (route.includes('[') || route.includes(']')) continue;
      routes.push(route);
    }
  }

  return routes;
}

// Static page routes
const staticRoutes = Array.from(new Set(getRoutes(pagesDir))).sort();

// Dynamic blog post routes from /posts/*.md
const postRoutes = [];
if (fs.existsSync(postsDir)) {
  const postFiles = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  for (const file of postFiles) {
    const slug = file.replace(/\.md$/, '');
    const { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'));
    postRoutes.push({ route: `/articles/${slug}`, lastmod: data.date || null });
  }
}

const staticEntries = staticRoutes.map((route) => ({ route, lastmod: null }));
const allEntries = [...staticEntries, ...postRoutes];
const urls = allEntries
  .map(({ route, lastmod }) => {
    const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${baseUrl}${route}</loc>${lastmodTag}\n  </url>`;
  })
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
