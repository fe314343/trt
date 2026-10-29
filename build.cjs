const fs = require('fs');
const babel = require('@babel/core');
const { code } = babel.transformSync(fs.readFileSync('src/app.jsx', 'utf8'), {
  presets: ['@babel/preset-react'], comments: false, compact: true
});
fs.writeFileSync('assets/app.js', code);
// Change the script URL whenever the compiled application changes.
const crypto = require('crypto');
const version = crypto.createHash('sha256').update(code).digest('hex').slice(0, 12);
const html = fs.readFileSync('index.html', 'utf8');
const scriptPattern = /src="\.\/assets\/app\.js(?:\?v=[a-f0-9]+)?"/;
if (!scriptPattern.test(html)) throw new Error('Application script reference missing');
fs.writeFileSync('index.html', html.replace(scriptPattern, `src="./assets/app.js?v=${version}"`));
