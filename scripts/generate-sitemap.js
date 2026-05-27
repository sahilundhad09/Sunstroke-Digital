import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Load env variables manually from .env
let supabaseUrl = '';
let supabaseAnonKey = '';

try {
  if (fs.existsSync('.env')) {
    const envFile = fs.readFileSync('.env', 'utf8');
    supabaseUrl = envFile.match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim()?.replace(/["']/g, '') || '';
    supabaseAnonKey = envFile.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim()?.replace(/["']/g, '') || '';
  }
} catch (e) {
  console.warn('Could not read .env file for sitemap generator, falling back to static urls:', e.message);
}

const siteUrl = 'https://sunstrokedigital.com';

async function generate() {
  console.log('Generating sitemap.xml...');
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/products</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${siteUrl}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Fetch products
      const { data: products } = await supabase
        .from('products')
        .select('slug, updated_at')
        .eq('is_published', true);

      if (products) {
        products.forEach(p => {
          xml += `  <url>
    <loc>${siteUrl}/products/${p.slug}</loc>
    <lastmod>${(p.updated_at || new Date().toISOString()).split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
        });
      }

      // Fetch blog posts
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, created_at')
        .eq('is_published', true);

      if (posts) {
        posts.forEach(p => {
          xml += `  <url>
    <loc>${siteUrl}/blog/${p.slug}</loc>
    <lastmod>${(p.created_at || new Date().toISOString()).split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
        });
      }
    } catch (err) {
      console.warn('Failed to query database for sitemap URLs:', err.message);
    }
  } else {
    console.log('No Supabase credentials found in environment; generated static URLs only.');
  }

  xml += `</urlset>`;
  
  // Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  
  fs.writeFileSync('public/sitemap.xml', xml);
  console.log('Sitemap generated successfully in public/sitemap.xml!');
}

generate();
