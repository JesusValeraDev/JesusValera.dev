const fs = require('fs');
const path = require('path');

const projectRoot = __dirname + '/..';
const outFile = path.join(projectRoot, 'sass', 'tailwind.entry.css');

// Define concatenation order (top → bottom)
const parts = [
  'sass/tw-head.css',
  'sass/tw-base.css',
  'sass/tw-components-base.css',
  'sass/tw-components-catalogue.css',
  'sass/tw-components-books.css',
  'sass/tw-components-cv.css',
  'sass/tw-components-post.css',
];

let output = '';
for (const rel of parts) {
  const abs = path.join(projectRoot, rel);
  if (!fs.existsSync(abs)) {
    console.error(`[concat-tailwind] Missing file: ${rel}`);
    process.exit(1);
  }
  output += `/* === ${rel} === */\n` + fs.readFileSync(abs, 'utf8') + '\n\n';
}

fs.writeFileSync(outFile, output, 'utf8');
console.log(`[concat-tailwind] Wrote ${outFile}`);
