const fs = require('fs');
const babel = require('@babel/core');
const { code } = babel.transformSync(fs.readFileSync('src/app.jsx', 'utf8'), {
  presets: ['@babel/preset-react'], comments: false, compact: true
});
fs.writeFileSync('assets/app.js', code);
