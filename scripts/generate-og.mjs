#!/usr/bin/env node
/**
 * Convertit public/og-image.svg en public/og-image.png (1200×630).
 *
 * Lancement : `node scripts/generate-og.mjs` ou `npm run og`.
 *
 * Pourquoi un fichier statique : Next.js en mode `output: 'export'` ne
 * peut pas générer d'OG image dynamiquement. On garde donc l'image
 * brandée en source (SVG, modifiable) + sa version PNG (consommée par
 * Facebook / LinkedIn / WhatsApp / X qui n'acceptent pas le SVG en OG).
 *
 * Inlining du logo PNG : le SVG référence /logo-picto.png en relatif —
 * ça marche dans un navigateur, mais sharp/librsvg ne résout pas les
 * références externes pour des raisons de sécurité. On lit donc le PNG,
 * on l'encode en base64, et on substitue avant rendu.
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = path.join(projectRoot, 'public', 'og-image.svg');
const pngPath = path.join(projectRoot, 'public', 'og-image.png');
const logoPath = path.join(projectRoot, 'public', 'logo-picto.png');

async function main() {
  const [svgRaw, logoBuffer] = await Promise.all([
    readFile(svgPath, 'utf8'),
    readFile(logoPath),
  ]);

  const logoDataUrl = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  const svgInlined = svgRaw.replace(
    /href="logo-picto\.png"/g,
    `href="${logoDataUrl}"`,
  );

  const png = await sharp(Buffer.from(svgInlined), { density: 192 })
    .resize(1200, 630, { fit: 'cover' })
    .png({ quality: 92, compressionLevel: 9 })
    .toBuffer();

  await writeFile(pngPath, png);
  const kb = (png.length / 1024).toFixed(1);
  console.log(`✓ ${path.relative(projectRoot, pngPath)} — ${kb} KB (logo inlined from logo-picto.png)`);
}

main().catch(err => {
  console.error('OG generation failed:', err);
  process.exit(1);
});
