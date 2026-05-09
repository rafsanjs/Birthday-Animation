const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcImg = path.join(root, 'src', 'resources', 'img', 'cake.svg');
const outDir = path.join(root, 'src', 'resources', 'favicon');

if (!fs.existsSync(srcImg)) {
  console.error('Source image not found:', srcImg);
  process.exit(2);
}

fs.mkdirSync(outDir, { recursive: true });

const outputs = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 }
];

Promise.all(
  outputs.map(o => {
    const outPath = path.join(outDir, o.name);
    return sharp(srcImg)
      .resize(o.size, o.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outPath)
      .then(() => console.log('Written', outPath));
  })
)
  .then(() => {
    console.log('All favicons generated.');
  })
  .catch(err => {
    console.error('Error generating favicons:', err);
    process.exit(1);
  });
