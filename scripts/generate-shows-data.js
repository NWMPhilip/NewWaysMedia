import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SHOWS_DIR = path.join(rootDir, 'public', 'shows');
const OUTPUT_FILE = path.join(rootDir, 'public', 'shows-data.json');

const parser = new Parser();

async function generateShowsData() {
  if (!fs.existsSync(SHOWS_DIR)) {
    console.log('No shows directory found.');
    return;
  }

  const files = fs.readdirSync(SHOWS_DIR).filter(file => file.endsWith('.xml'));
  const allShows = [];

  for (const file of files) {
    const filePath = path.join(SHOWS_DIR, file);
    const xmlContent = fs.readFileSync(filePath, 'utf-8');
    try {
      const feed = await parser.parseString(xmlContent);
      
      const id = file.replace('.xml', '');
      
      allShows.push({
        id,
        url: `/shows/${file}`,
        title: feed.title || id,
        description: feed.description || '',
        image: feed.image?.url || feed.itunes?.image || '',
        latestUpdate: feed.items.length > 0 ? new Date(feed.items[0].pubDate).getTime() : 0,
        items: feed.items.map(item => ({
          title: item.title || 'Untitled',
          pubDate: item.pubDate || new Date().toISOString(),
          link: item.link || '',
          description: item.contentSnippet || item.content || item.description || '',
          thumbnail: item.itunes?.image || feed.image?.url || feed.itunes?.image || '',
          enclosure: item.enclosure || null,
          guid: item.guid || item.id || ''
        }))
      });
    } catch (e) {
      console.error(`Failed to parse ${file}:`, e);
    }
  }

  // Sort shows by latest update
  allShows.sort((a, b) => b.latestUpdate - a.latestUpdate);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allShows, null, 2), 'utf-8');
  console.log(`Successfully generated shows-data.json with ${allShows.length} shows.`);
}

generateShowsData();
