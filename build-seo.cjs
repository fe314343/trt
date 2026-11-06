const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const config = require('./seo.config.cjs');
const base = config.siteUrl.replace(/\/?$/, '/');
const image = base + 'assets/image-af4dd8c8635d.webp';
const organization = {
  '@type': 'Organization', '@id': base + '#organization', name: config.company,
  alternateName: ['雷德斯 TRT', 'Taiwan Reduce-pollutant Technology Co. Ltd'],
  url: base, logo: image, telephone: '+886-2-2286-6693', email: 'trt9002@yahoo.com.tw',
  address: { '@type': 'PostalAddress', streetAddress: '溪尾街126巷15號', addressLocality: '三重區', addressRegion: '新北市', addressCountry: 'TW' }
};
const pages = Object.fromEntries(Object.entries(config.pages).map(([key, page]) => {
  const url = key === 'home' ? base : base + page.file;
  const graph = [organization, { '@type': 'WebSite', '@id': base + '#website', url: base, name: config.company, inLanguage: 'zh-TW', publisher: { '@id': organization['@id'] } }, { '@type': 'WebPage', '@id': url + '#webpage', url, name: page.title, description: page.description, inLanguage: 'zh-TW', isPartOf: { '@id': base + '#website' }, about: { '@id': organization['@id'] } }];
  if (page.service) graph.push({ '@type': 'Service', '@id': url + '#service', name: page.service, description: page.description, url, provider: { '@id': organization['@id'] } });
  return [key, { ...page, url, schema: { '@context': 'https://schema.org', '@graph': graph } }];
}));
const esc = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
let template = fs.readFileSync('src/page-template.html', 'utf8');
template = template.replace(/\s*<title>[\s\S]*?<\/title>/, '').replace(/\s*<meta (?:name="description"|property="og:[^"]+")[^>]*>/g, '');
const code = fs.readFileSync('assets/app.js', 'utf8');
const jsHash = crypto.createHash('sha256').update(code).digest('hex').slice(0, 12);
const cssHash = crypto.createHash('sha256').update(fs.readFileSync('assets/styles.css')).digest('hex').slice(0, 12);
template = template.replace(/app\.js\?v=[a-f0-9]+/, 'app.js?v=' + jsHash).replace(/styles\.css\?v=[a-f0-9]+/, 'styles.css?v=' + cssHash);
for (const [key, page] of Object.entries(pages)) {
  let element;
  const context = { React, ReactDOM: { createRoot: () => ({ render: tree => { element = tree; } }) }, window: { lucide: null }, document: { getElementById: () => ({}) }, location: { pathname: new URL(page.url).pathname, hash: '' } };
  vm.runInNewContext(code, context);
  const markup = ReactDOMServer.renderToString(element);
  const head = `\n    <title>${esc(page.title)}</title>\n    <meta name="description" content="${esc(page.description)}">\n    <meta name="robots" content="index, follow, max-image-preview:large">\n    <link rel="canonical" href="${page.url}">\n    <link rel="sitemap" type="application/xml" href="${base}sitemap.xml">\n    <meta property="og:locale" content="zh_TW">\n    <meta property="og:type" content="website">\n    <meta property="og:site_name" content="${config.company}">\n    <meta property="og:title" content="${esc(page.title)}">\n    <meta property="og:description" content="${esc(page.description)}">\n    <meta property="og:url" content="${page.url}">\n    <meta property="og:image" content="${image}">\n    <meta property="og:image:alt" content="台灣雷德斯 TRT 公司標誌">\n    <meta name="twitter:card" content="summary">\n    <meta name="twitter:title" content="${esc(page.title)}">\n    <meta name="twitter:description" content="${esc(page.description)}">\n    <meta name="twitter:image" content="${image}">\n    <script type="application/ld+json" id="page-schema">${json(page.schema)}</script>\n    <script>window.TRT_SEO=${json({ pages })};</script>\n`;
  fs.writeFileSync(page.file, template.replace('</head>', head + '</head>').replace('<div id="root"></div>', '<div id="root">' + markup + '</div>'));
}
fs.writeFileSync('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + Object.values(pages).map(p => `  <url><loc>${p.url}</loc></url>`).join('\n') + '\n</urlset>\n');
console.log('Pre-rendered 4 public pages and sitemap for ' + base);
