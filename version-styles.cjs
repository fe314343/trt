const fs = require('fs');
const crypto = require('crypto');
const version = crypto.createHash('sha256').update(fs.readFileSync('assets/styles.css')).digest('hex').slice(0, 12);
const html = fs.readFileSync('index.html', 'utf8');
fs.writeFileSync('index.html', html.replace(/href="\.\/assets\/styles\.css(?:\?v=[a-f0-9]+)?"/, `href="./assets/styles.css?v=${version}"`));
