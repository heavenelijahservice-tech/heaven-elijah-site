#!/usr/bin/env node
/**
 * Convertit les SVG sources en PNG haute qualité :
 * - public/og-image.svg → public/og-image.png (1200×630)
 *   Pour le partage social (Facebook, LinkedIn, WhatsApp, X).
 *   Référencé par layout.tsx → openGraph.images.
 *
 * - public/cover-facebook.svg → public/cover-facebook.png (820×360)
 *   Pour la photo de couverture de la page Facebook officielle HES.
 *   À uploader manuellement sur la page FB.
 *
 * Lancement : `node scripts/generate-og.mjs` ou `npm run og`.
 *
 * Inlining du logo PNG : les SVG référencent /logo-picto.png en relatif —
 * ça marche dans un navigateur, mais sharp/librsvg ne résout pas les
 * références externes pour des raisons de sécurité. On lit donc le PNG,
 * on l'encode en base64, et on substitue avant rendu.
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const logoPath = path.join(projectRoot, 'public', 'logo-picto.png');

const TARGETS = [
  {
    name: 'OG image',
    svg: 'public/og-image.svg',
    png: 'public/og-image.png',
    width: 1200,
    height: 630,
    density: 192,
  },
  {
    name: 'Facebook cover',
    svg: 'public/cover-facebook.svg',
    png: 'public/cover-facebook.png',
    width: 820,
    height: 360,
    density: 240,
  },
];

async function generate(target, logoDataUrl) {
  const svgPath = path.join(projectRoot, target.svg);
  const pngPath = path.join(projectRoot, target.png);

  const svgRaw = await readFile(svgPath, 'utf8');
  const svgInlined = svgRaw.replace(/href="logo-picto\.png"/g, `href="${logoDataUrl}"`);

  const png = await sharp(Buffer.from(svgInlined), { density: target.density })
    .resize(target.width, target.height, { fit: 'cover' })
    .png({ quality: 92, compressionLevel: 9 })
    .toBuffer();

  await writeFile(pngPath, png);
  const kb = (png.length / 1024).toFixed(1);
  console.log(`✓ ${target.name.padEnd(16)} ${target.png} — ${kb} KB (${target.width}×${target.height})`);
}

async function main() {
  const logoBuffer = await readFile(logoPath);
  const logoDataUrl = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  for (const target of TARGETS) {
    await generate(target, logoDataUrl);
  }
}

main().catch(err => {
  console.error('Image generation failed:', err);
  process.exit(1);
});
