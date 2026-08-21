import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="50%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.35"/>
    </filter>
  </defs>
  <!-- Background Squircle -->
  <rect x="0" y="0" width="512" height="512" rx="120" fill="url(#bgGrad)" />
  <!-- Inner Rim Highlight -->
  <rect x="12" y="12" width="488" height="488" rx="108" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="8" />
  <!-- Main GC Typography -->
  <text x="256" y="328" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-weight="900" 
        font-size="240" 
        letter-spacing="-6"
        text-anchor="middle" 
        fill="url(#textGrad)" 
        filter="url(#shadow)">GC</text>
  <!-- Sparkle Accent -->
  <path d="M 385 105 Q 385 130 410 130 Q 385 130 385 155 Q 385 130 360 130 Q 385 130 385 105 Z" fill="#ffffff" opacity="0.95" />
</svg>
`;

function createIcoFromPng(pngBuffer, width = 32, height = 32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Image type 1 = ICO
  header.writeUInt16LE(1, 4); // Number of images

  const entry = Buffer.alloc(16);
  entry.writeUInt8(width >= 256 ? 0 : width, 0);
  entry.writeUInt8(height >= 256 ? 0 : height, 1);
  entry.writeUInt8(0, 2); // Colors
  entry.writeUInt8(0, 3); // Reserved
  entry.writeUInt16LE(1, 4); // Color planes
  entry.writeUInt16LE(32, 6); // Bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // Image size
  entry.writeUInt32LE(22, 12); // Offset

  return Buffer.concat([header, entry, pngBuffer]);
}

async function generate() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Save SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent.trim());

  const svgBuffer = Buffer.from(svgContent);

  // Generate PNGs
  const p16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), p16);

  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), p32);

  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), p180);

  const p192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), p192);

  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), p512);

  // Generate ICO (containing 32x32 PNG)
  const icoBuffer = createIcoFromPng(p32, 32, 32);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  console.log('Successfully generated all favicons and icons in /public!');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
