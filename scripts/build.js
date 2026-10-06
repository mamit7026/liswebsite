const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const Terser = require('terser');

async function build() {
  const root = path.join(__dirname, '..');

  // 1. Minify CSS
  const cssPath = path.join(root, 'public', 'css', 'main.src.css');
  const cssOut = path.join(root, 'public', 'css', 'main.css');
  if (fs.existsSync(cssPath)) {
    const css = fs.readFileSync(cssPath, 'utf8');
    const minifiedCss = new CleanCSS({ level: 2 }).minify(css).styles;
    fs.writeFileSync(cssOut, minifiedCss, 'utf8');
    console.log(`CSS: ${css.length} -> ${minifiedCss.length} bytes`);
  }

  // 2. Minify main.js
  const jsMainPath = path.join(root, 'public', 'js', 'main.src.js');
  const jsMainOut = path.join(root, 'public', 'js', 'main.js');
  if (fs.existsSync(jsMainPath)) {
    const js = fs.readFileSync(jsMainPath, 'utf8');
    const min = (await Terser.minify(js)).code;
    fs.writeFileSync(jsMainOut, min, 'utf8');
    console.log(`main.js: ${js.length} -> ${min.length} bytes`);
  }

  // 3. Minify inquiry.js
  const jsInqPath = path.join(root, 'public', 'js', 'inquiry.src.js');
  const jsInqOut = path.join(root, 'public', 'js', 'inquiry.js');
  if (fs.existsSync(jsInqPath)) {
    const js = fs.readFileSync(jsInqPath, 'utf8');
    const min = (await Terser.minify(js)).code;
    fs.writeFileSync(jsInqOut, min, 'utf8');
    console.log(`inquiry.js: ${js.length} -> ${min.length} bytes`);
  }
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
