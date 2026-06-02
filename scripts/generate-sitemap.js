import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITEMAP_PATH = path.join(rootDir, 'public', 'sitemap.xml');
const SHOWS_DIR = path.join(rootDir, 'public', 'shows');

// Ensure shows directory exists
if (!fs.existsSync(SHOWS_DIR)) {
  fs.mkdirSync(SHOWS_DIR, { recursive: true });
}

// Read shows files
const files = fs.readdirSync(SHOWS_DIR);
const showPaths = files
  .filter(file => file !== '.gitkeep' && !file.startsWith('.'))
  .map(file => `/shows/${file}`);

const urls = [
  { loc: 'https://newwaysmedia.dk/', priority: '1.0', changefreq: 'weekly' },
  { loc: 'https://newwaysmedia.dk/podcasts', priority: '0.8', changefreq: 'weekly' },
  { loc: 'https://newwaysmedia.dk/kontakt', priority: '0.5', changefreq: 'monthly' }
];

// Add show paths
showPaths.forEach(showPath => {
  urls.push({ loc: `https://newwaysmedia.dk${showPath}`, priority: '0.5', changefreq: 'monthly' });
});

const today = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf-8');
console.log('Sitemap genereret: ' + showPaths.length + ' shows fundet.');
