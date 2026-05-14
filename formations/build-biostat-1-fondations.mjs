#!/usr/bin/env node
/**
 * Génère la formation HES — Tests statistiques en biomédical
 * Module 1 — Fondations.
 *
 * Lancement : `node formations/build-biostat-1-fondations.mjs`
 * Sortie    : `formations/output/biostat-module-1-fondations.pptx`
 *
 * Public cible : étudiants M2 + doctorants (sciences santé / biomédical).
 * Style        : workshop applicatif — théorie + code R + interprétation.
 * Format       : 15 slides 16:9 LAYOUT_WIDE (13.33" × 7.5").
 */
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(projectRoot, 'formations', 'output', 'biostat-module-1-fondations.pptx');
const logoPath = path.join(projectRoot, 'public', 'logo-picto.png');

// Palette HES
const C = {
  NAVY:        '0E1729',
  NAVY_LIGHT:  '1A2541',
  ORANGE:      'F09042',
  ORANGE_DEEP: 'D9772B',
  CREAM:       'F5EFE0',
  WHITE:       'FFFFFF',
  TEXT_DARK:   '15233F',
  TEXT_MUTED:  '6B7280',
  TEXT_LIGHT:  'C9CFDC',
  BORDER:      'D6CFB8',
  CODE_BG:     '1A2541',
  CODE_TEXT:   'E8EAED',
  CODE_KEYWORD:'F09042',
  CODE_COMMENT:'8AA1B6',
  GREEN:       '4CAF50',
  RED:         'E74C3C',
};

const F = {
  HEAD: 'Calibri',
  BODY: 'Calibri',
  MONO: 'Consolas',
};

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Heaven Elijah Service';
pres.company = 'Heaven Elijah Service';
pres.title = 'Tests statistiques en biomédical — Module 1 · Fondations';
pres.subject = 'Formation HES — Biostatistique';

const TOTAL = 15;

function footer(slide, n) {
  slide.addText('Biostat · Module 1 — Fondations · Heaven Elijah Service', {
    x: 0.5, y: 7.05, w: 8, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true,
  });
  slide.addText(`${n} / ${TOTAL}`, {
    x: 11.83, y: 7.05, w: 1, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, align: 'right',
  });
}

function label(slide, text, x, y, color = C.ORANGE) {
  slide.addText(`— ${text}`, {
    x, y, w: 8, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color, bold: true, charSpacing: 4,
  });
}

function title(slide, text, y = 0.9, color = C.TEXT_DARK) {
  slide.addText(text, {
    x: 0.7, y, w: 12, h: 0.9,
    fontSize: 32, fontFace: F.HEAD, color, bold: true, charSpacing: -1,
  });
}

/** Bloc de code R stylé (fond navy, mono). */
function codeBlock(slide, code, x, y, w, h) {
  slide.addShape('roundRect', {
    x, y, w, h,
    fill: { color: C.CODE_BG }, line: { color: C.ORANGE, width: 0.5 },
    rectRadius: 0.05,
  });
  // Mini label "R" dans le coin haut-gauche
  slide.addShape('roundRect', {
    x: x + 0.15, y: y + 0.12, w: 0.4, h: 0.28,
    fill: { color: C.ORANGE }, line: { type: 'none' },
    rectRadius: 0.04,
  });
  slide.addText('R', {
    x: x + 0.15, y: y + 0.12, w: 0.4, h: 0.28,
    fontSize: 11, fontFace: F.MONO, color: C.NAVY, bold: true,
    align: 'center', valign: 'middle',
  });
  slide.addText(code, {
    x: x + 0.2, y: y + 0.5, w: w - 0.3, h: h - 0.6,
    fontSize: 11, fontFace: F.MONO, color: C.CODE_TEXT,
    valign: 'top', lineSpacingMultiple: 1.4,
  });
}

/** Bloc "Sortie logiciel" stylé. */
function outputBlock(slide, output, x, y, w, h) {
  slide.addShape('roundRect', {
    x, y, w, h,
    fill: { color: C.NAVY_LIGHT }, line: { color: C.TEXT_MUTED, width: 0.5, dashType: 'dash' },
    rectRadius: 0.05,
  });
  slide.addText('SORTIE', {
    x: x + 0.15, y: y + 0.1, w: 1, h: 0.25,
    fontSize: 9, fontFace: F.HEAD, color: C.TEXT_LIGHT, bold: true, charSpacing: 3,
  });
  slide.addText(output, {
    x: x + 0.2, y: y + 0.4, w: w - 0.3, h: h - 0.5,
    fontSize: 11, fontFace: F.MONO, color: C.WHITE,
    valign: 'top', lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// SLIDE 1 — Titre
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };

  s.addShape('ellipse', {
    x: 9, y: -2, w: 6, h: 6,
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 },
    line: { type: 'none' },
  });

  s.addImage({ path: logoPath, x: 11.5, y: 5.8, w: 1.3, h: 1.3, transparency: 30 });

  s.addText('— FORMATION HES · MODULE 1', {
    x: 0.7, y: 0.7, w: 9, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE,
    bold: true, charSpacing: 5,
  });

  s.addText('Tests statistiques\nen biomédical', {
    x: 0.7, y: 1.9, w: 12, h: 2.6,
    fontSize: 54, fontFace: F.HEAD, color: C.WHITE,
    bold: true, charSpacing: -1, lineSpacingMultiple: 1.0,
  });

  s.addShape('rect', {
    x: 0.7, y: 4.75, w: 1.5, h: 0.06,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });

  s.addText('Module 1 — Fondations', {
    x: 0.7, y: 4.95, w: 11, h: 0.6,
    fontSize: 24, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
  });

  s.addText('Workshop applicatif · théorie + code R + interprétation · ~45 min', {
    x: 0.7, y: 5.6, w: 12, h: 0.4,
    fontSize: 14, fontFace: F.BODY, color: C.TEXT_LIGHT,
  });

  s.addText('M2 · Doctorants · Chercheurs', {
    x: 0.7, y: 6.5, w: 7, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });
  s.addText('heavenelijahservice.org', {
    x: 6, y: 6.5, w: 6.83, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.TEXT_LIGHT, align: 'right',
  });
}

// ============================================================
// SLIDE 2 — Pourquoi tester ? H0/H1
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 2);

  label(s, 'CHAPITRE 1.1 · LOGIQUE DU TEST', 0.7, 0.5);
  title(s, 'Le test stat répond à une seule question.');

  // Phrase principale
  s.addShape('rect', {
    x: 0.7, y: 2.1, w: 0.06, h: 0.9,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('« Le hasard, à lui seul, peut-il expliquer ce que j\'observe dans mes données ? »', {
    x: 0.95, y: 2.05, w: 12, h: 1.0,
    fontSize: 22, fontFace: F.HEAD, color: C.TEXT_DARK, italic: true, valign: 'middle',
  });

  // 2 cartes H0/H1
  s.addShape('roundRect', {
    x: 0.7, y: 3.5, w: 5.95, h: 3.0,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('H₀  —  HYPOTHÈSE NULLE', {
    x: 0.9, y: 3.65, w: 5.6, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('« Il n\'y a pas de différence. »\n« Il n\'y a pas d\'effet. »\n« Il n\'y a pas d\'association. »', {
    x: 0.9, y: 4.1, w: 5.6, h: 1.5,
    fontSize: 16, fontFace: F.HEAD, color: C.WHITE, bold: true,
    lineSpacingMultiple: 1.4,
  });
  s.addText('C\'est l\'hypothèse qu\'on cherche à\nréfuter — par défaut elle est vraie.', {
    x: 0.9, y: 5.65, w: 5.6, h: 0.8,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
    lineSpacingMultiple: 1.3,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 3.5, w: 5.95, h: 3.0,
    fill: { color: C.ORANGE }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('H₁  —  HYPOTHÈSE ALTERNATIVE', {
    x: 7.08, y: 3.65, w: 5.6, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.NAVY, bold: true, charSpacing: 3,
  });
  s.addText('« Il y a une différence. »\n« Il y a un effet. »\n« Il y a une association. »', {
    x: 7.08, y: 4.1, w: 5.6, h: 1.5,
    fontSize: 16, fontFace: F.HEAD, color: C.NAVY, bold: true,
    lineSpacingMultiple: 1.4,
  });
  s.addText('C\'est ce que tu défends. Si la p-value\nest assez faible, tu rejettes H₀ → H₁ retenue.', {
    x: 7.08, y: 5.65, w: 5.6, h: 0.8,
    fontSize: 12, fontFace: F.BODY, color: C.NAVY, italic: true,
    lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// SLIDE 3 — Risques α et β
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 3);

  label(s, 'CHAPITRE 1.2 · RISQUES D\'ERREUR', 0.7, 0.5);
  title(s, 'Quatre scénarios. Deux erreurs.');

  // Matrice 2×2 — entêtes
  const mx = 2.5, my = 2.2, cw = 5.0, ch = 1.8;

  // En-tête haut (Réalité)
  s.addText('LA RÉALITÉ', {
    x: mx + cw, y: my - 0.5, w: 2 * cw, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, align: 'center', charSpacing: 3,
  });
  s.addText('H₀ vraie', {
    x: mx + cw, y: my - 0.2, w: cw, h: 0.3,
    fontSize: 12, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'center',
  });
  s.addText('H₁ vraie', {
    x: mx + 2 * cw, y: my - 0.2, w: cw, h: 0.3,
    fontSize: 12, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'center',
  });

  // En-tête gauche (Décision)
  s.addText('TA DÉCISION', {
    x: mx - 1.6, y: my + 0.6, w: 1.5, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, charSpacing: 3,
  });
  s.addText('Ne pas\nrejeter H₀', {
    x: mx - 1.6, y: my + 0.3, w: 1.5, h: ch,
    fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, valign: 'middle',
    lineSpacingMultiple: 1.2,
  });
  s.addText('Rejeter H₀', {
    x: mx - 1.6, y: my + ch + 0.3, w: 1.5, h: ch,
    fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, valign: 'middle',
  });

  function cell(col, row, bg, mainTxt, subTxt, mainColor) {
    const x = mx + cw + col * cw;
    const y = my + 0.3 + row * ch;
    s.addShape('rect', {
      x, y, w: cw, h: ch,
      fill: { color: bg }, line: { color: C.BORDER, width: 1 },
    });
    s.addText(mainTxt, {
      x: x + 0.1, y: y + 0.2, w: cw - 0.2, h: 0.7,
      fontSize: 22, fontFace: F.HEAD, color: mainColor, bold: true, align: 'center',
    });
    s.addText(subTxt, {
      x: x + 0.1, y: y + 1.0, w: cw - 0.2, h: 0.7,
      fontSize: 11, fontFace: F.BODY, color: mainColor, italic: true, align: 'center',
      lineSpacingMultiple: 1.2,
    });
  }
  cell(0, 0, C.WHITE, '✓ Bonne décision', 'Niveau de confiance\n(1 − α)', C.TEXT_DARK);
  cell(1, 0, C.WHITE, '✗ Erreur β', 'Faux négatif\nOn rate un vrai effet', C.RED);
  cell(0, 1, C.WHITE, '✗ Erreur α', 'Faux positif\nOn « trouve » un effet inexistant', C.RED);
  cell(1, 1, C.ORANGE, '★ Puissance', '(1 − β)\nC\'est ce qu\'on veut maximiser', C.NAVY);

  // Légende en bas
  s.addText('Conventionnel : α ≤ 5 %  ·  puissance (1 − β) ≥ 80 %  ·  les deux sont fixés AVANT le recueil des données', {
    x: 0.7, y: 6.45, w: 12, h: 0.4,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK,
    align: 'center', italic: true,
  });
}

// ============================================================
// SLIDE 4 — Bilatéral vs unilatéral
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 4);

  label(s, 'CHAPITRE 1.3 · DIRECTION DU TEST', 0.7, 0.5);
  title(s, 'Bilatéral ou unilatéral ?');

  // 2 cartes verticales
  s.addShape('roundRect', {
    x: 0.7, y: 2.1, w: 5.95, h: 4.5,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('BILATÉRAL', {
    x: 0.9, y: 2.3, w: 5.5, h: 0.4,
    fontSize: 14, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 4,
  });
  s.addText('H₁ : « Il y a une différence. »', {
    x: 0.9, y: 2.8, w: 5.5, h: 0.5,
    fontSize: 16, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Tu ne préjuges pas du sens. La différence peut aller dans les deux sens : groupe A > B OU groupe A < B.', {
    x: 0.9, y: 3.4, w: 5.5, h: 1.2,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });
  s.addShape('rect', {
    x: 0.9, y: 4.7, w: 5.5, h: 0.02,
    fill: { color: C.BORDER }, line: { type: 'none' },
  });
  s.addText('À UTILISER PAR DÉFAUT', {
    x: 0.9, y: 4.85, w: 5.5, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.GREEN, bold: true, charSpacing: 3,
  });
  s.addText('99 % des publications biomédicales utilisent un test bilatéral. Plus prudent, plus robuste.', {
    x: 0.9, y: 5.2, w: 5.5, h: 1.2,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 2.1, w: 5.95, h: 4.5,
    fill: { color: C.WHITE }, line: { color: C.BORDER, width: 1 }, rectRadius: 0.1,
  });
  s.addText('UNILATÉRAL', {
    x: 7.08, y: 2.3, w: 5.5, h: 0.4,
    fontSize: 14, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, charSpacing: 4,
  });
  s.addText('H₁ : « A > B » ou « A < B »', {
    x: 7.08, y: 2.8, w: 5.5, h: 0.5,
    fontSize: 16, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Tu déclares à l\'avance le sens attendu. Plus puissant si la direction est correcte, mais risqué.', {
    x: 7.08, y: 3.4, w: 5.5, h: 1.2,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });
  s.addShape('rect', {
    x: 7.08, y: 4.7, w: 5.5, h: 0.02,
    fill: { color: C.BORDER }, line: { type: 'none' },
  });
  s.addText('À JUSTIFIER ABSOLUMENT', {
    x: 7.08, y: 4.85, w: 5.5, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.RED, bold: true, charSpacing: 3,
  });
  s.addText('Doit être déclaré dans le protocole AVANT le recueil. Ne jamais choisir unilatéral juste pour obtenir une p-value plus petite.', {
    x: 7.08, y: 5.2, w: 5.5, h: 1.2,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// SLIDE 5 — p-value
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 5);

  label(s, 'CHAPITRE 1.4 · LA p-VALUE', 0.7, 0.5);
  title(s, 'Ce que la p-value dit. Ce qu\'elle ne dit PAS.');

  // Card "Dit"
  s.addShape('roundRect', {
    x: 0.7, y: 2.1, w: 5.95, h: 4.5,
    fill: { color: C.WHITE }, line: { color: C.GREEN, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('✓ CE QU\'ELLE DIT', {
    x: 0.9, y: 2.3, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.GREEN, bold: true, charSpacing: 3,
  });
  s.addText('Probabilité d\'observer ces données — ou des données encore plus extrêmes — SI H₀ est vraie.', {
    x: 0.9, y: 2.85, w: 5.5, h: 1.4,
    fontSize: 14, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, lineSpacingMultiple: 1.3,
  });
  s.addText('p = 0,04 signifie : « si le hasard seul était à l\'œuvre, j\'aurais 4 % de chances de voir ce résultat. »', {
    x: 0.9, y: 4.3, w: 5.5, h: 1.0,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, italic: true, lineSpacingMultiple: 1.3,
  });
  s.addText('→ Si p < α (souvent 5 %), on REJETTE H₀.', {
    x: 0.9, y: 5.6, w: 5.5, h: 0.8,
    fontSize: 13, fontFace: F.HEAD, color: C.GREEN, bold: true, lineSpacingMultiple: 1.2,
  });

  // Card "Ne dit pas"
  s.addShape('roundRect', {
    x: 6.88, y: 2.1, w: 5.95, h: 4.5,
    fill: { color: C.WHITE }, line: { color: C.RED, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('✗ CE QU\'ELLE NE DIT PAS', {
    x: 7.08, y: 2.3, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.RED, bold: true, charSpacing: 3,
  });
  s.addText('La probabilité que H₀ soit vraie.', {
    x: 7.08, y: 2.85, w: 5.5, h: 0.5,
    fontSize: 14, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Que le résultat soit important.', {
    x: 7.08, y: 3.4, w: 5.5, h: 0.5,
    fontSize: 14, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Que l\'effet soit cliniquement pertinent.', {
    x: 7.08, y: 3.95, w: 5.5, h: 0.5,
    fontSize: 14, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
  });
  s.addText('p = 0,06 n\'est pas « presque » significatif. p = 0,04 n\'est pas « plus fort » que p = 0,049. Le seuil 5 % est arbitraire.', {
    x: 7.08, y: 4.6, w: 5.5, h: 1.3,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// SLIDE 6 — Taille d'effet vs significativité
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 6);

  label(s, 'CHAPITRE 1.5 · TAILLE D\'EFFET', 0.7, 0.5);
  title(s, 'Significatif ≠ Important.');

  // 2 scénarios comparés
  s.addShape('roundRect', {
    x: 0.7, y: 2.1, w: 5.95, h: 2.5,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('GRANDE ÉTUDE · PETIT EFFET', {
    x: 0.9, y: 2.25, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('N = 10 000', {
    x: 0.9, y: 2.65, w: 5.5, h: 0.4,
    fontSize: 14, fontFace: F.MONO, color: C.WHITE, bold: true,
  });
  s.addText('Réduction de tension : 0,5 mmHg', {
    x: 0.9, y: 3.05, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.WHITE,
  });
  s.addText('p < 0,001  ★ statistiquement significatif', {
    x: 0.9, y: 3.5, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.MONO, color: C.GREEN, bold: true,
  });
  s.addText('→ cliniquement INSIGNIFIANT.', {
    x: 0.9, y: 4.05, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.RED, italic: true, bold: true,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 2.1, w: 5.95, h: 2.5,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('PETITE ÉTUDE · GROS EFFET', {
    x: 7.08, y: 2.25, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('N = 20', {
    x: 7.08, y: 2.65, w: 5.5, h: 0.4,
    fontSize: 14, fontFace: F.MONO, color: C.WHITE, bold: true,
  });
  s.addText('Réduction de tension : 12 mmHg', {
    x: 7.08, y: 3.05, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.WHITE,
  });
  s.addText('p = 0,08  ✗ non significatif', {
    x: 7.08, y: 3.5, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.MONO, color: C.RED, bold: true,
  });
  s.addText('→ pourtant cliniquement TRÈS pertinent.', {
    x: 7.08, y: 4.05, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.GREEN, italic: true, bold: true,
  });

  // Bas : indices de taille d'effet
  s.addShape('roundRect', {
    x: 0.7, y: 4.9, w: 12.13, h: 1.7,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1 }, rectRadius: 0.1,
  });
  s.addText('LES INDICES DE TAILLE D\'EFFET À TOUJOURS RAPPORTER', {
    x: 0.9, y: 5.05, w: 11.5, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  const fx = 0.9, fy = 5.5, fw = 5.8;
  s.addText('• Cohen\'s d  — différence standardisée pour moyennes', {
    x: fx, y: fy, w: fw, h: 0.35,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK,
  });
  s.addText('• r ou r²  — force d\'association', {
    x: fx, y: fy + 0.35, w: fw, h: 0.35,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK,
  });
  s.addText('• OR · RR · HR  — ratios pour variables qualitatives', {
    x: fx + fw + 0.3, y: fy, w: fw, h: 0.35,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK,
  });
  s.addText('• Différence absolue brute  — ne jamais l\'oublier', {
    x: fx + fw + 0.3, y: fy + 0.35, w: fw, h: 0.35,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK,
  });
}

// ============================================================
// SLIDE 7 — IC95%
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 7);

  label(s, 'CHAPITRE 1.6 · INTERVALLE DE CONFIANCE', 0.7, 0.5);
  title(s, 'L\'IC95 % : plus informatif que la p-value.');

  // Définition
  s.addText('Si l\'étude était répétée 100 fois, 95 intervalles sur 100 contiendraient la « vraie » valeur dans la population.', {
    x: 0.7, y: 2.2, w: 12, h: 0.8,
    fontSize: 16, fontFace: F.BODY, color: C.TEXT_DARK, italic: true, lineSpacingMultiple: 1.3,
  });

  // 3 cartes avec exemples
  const cy = 3.4, cw = 3.95, ch = 3.0;
  function ic(idx, title2, value, ic_str, interp, color) {
    const x = 0.7 + idx * (cw + 0.1);
    s.addShape('roundRect', {
      x, y: cy, w: cw, h: ch,
      fill: { color: C.WHITE }, line: { color, width: 1.5 }, rectRadius: 0.1,
    });
    s.addText(title2, {
      x: x + 0.2, y: cy + 0.15, w: cw - 0.4, h: 0.4,
      fontSize: 11, fontFace: F.HEAD, color, bold: true, charSpacing: 3,
    });
    s.addText(value, {
      x: x + 0.2, y: cy + 0.55, w: cw - 0.4, h: 0.6,
      fontSize: 22, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
    });
    s.addText(ic_str, {
      x: x + 0.2, y: cy + 1.2, w: cw - 0.4, h: 0.5,
      fontSize: 15, fontFace: F.MONO, color: C.TEXT_DARK,
    });
    s.addText(interp, {
      x: x + 0.2, y: cy + 1.85, w: cw - 0.4, h: 1.1,
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
    });
  }
  ic(0, 'IC ÉTROIT', 'OR = 2,4', 'IC95% [1,9 ; 3,0]', 'Estimation précise. Effet clairement supérieur à 1 → association robuste.', C.GREEN);
  ic(1, 'IC LARGE', 'OR = 2,4', 'IC95% [0,7 ; 8,2]', 'Estimation imprécise. L\'IC croise 1 → on ne peut pas conclure à une association.', C.RED);
  ic(2, 'IC ASYMÉTRIQUE', 'OR = 5,1', 'IC95% [3,2 ; 8,1]', 'Effet fort et précis. Largement supérieur à 1 → association très forte.', C.GREEN);

  // Tip
  s.addText('Règle simple : un IC95 % qui ne croise pas 0 (pour une différence) ou 1 (pour un ratio) équivaut à p < 0,05 — mais en plus tu vois la précision.', {
    x: 0.7, y: 6.55, w: 12, h: 0.5,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 8 — Préalables
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 8);

  label(s, 'CHAPITRE 2.1 · PRÉALABLES AUX TESTS', 0.7, 0.5);
  title(s, 'Chaque test a ses conditions d\'application.');

  s.addText('Violer les hypothèses sous-jacentes d\'un test = résultats invalides, même si le logiciel produit un nombre.', {
    x: 0.7, y: 2.1, w: 12, h: 0.7,
    fontSize: 15, fontFace: F.BODY, color: C.TEXT_DARK, italic: true, lineSpacingMultiple: 1.3,
  });

  // Liste structurée
  const items = [
    ['NORMALITÉ', 'Les données suivent-elles une distribution gaussienne ?', 't-test · ANOVA · régression linéaire'],
    ['HOMOGÉNÉITÉ DES VARIANCES', 'Les variances des groupes comparés sont-elles égales ?', 't-test de Student · ANOVA'],
    ['INDÉPENDANCE DES OBSERVATIONS', 'Chaque sujet est-il indépendant des autres ?', 'Presque tous les tests classiques'],
    ['LINÉARITÉ', 'La relation entre variables est-elle linéaire ?', 'Régression linéaire · corrélation Pearson'],
    ['EFFECTIFS MINIMAUX', 'Chaque cellule a-t-elle ≥ 5 sujets attendus ?', 'Chi² (sinon Fisher exact)'],
  ];
  const startY = 3.0, rowH = 0.7;
  items.forEach((it, i) => {
    const y = startY + i * (rowH + 0.05);
    s.addShape('rect', {
      x: 0.7, y, w: 0.06, h: rowH,
      fill: { color: C.ORANGE }, line: { type: 'none' },
    });
    s.addText(it[0], {
      x: 0.95, y, w: 3.2, h: rowH,
      fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true,
      valign: 'middle', charSpacing: 2,
    });
    s.addText(it[1], {
      x: 4.2, y, w: 4.7, h: rowH,
      fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK,
      valign: 'middle',
    });
    s.addText(it[2], {
      x: 8.95, y, w: 3.9, h: rowH,
      fontSize: 11, fontFace: F.MONO, color: C.TEXT_MUTED, italic: true,
      valign: 'middle',
    });
  });
}

// ============================================================
// SLIDE 9 — Shapiro-Wilk + QQ-plot
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 9);

  label(s, 'CHAPITRE 2.2 · TEST DE NORMALITÉ', 0.7, 0.5);
  title(s, 'Shapiro-Wilk + QQ-plot');

  // Mini théorie
  s.addText('H₀ : les données suivent une loi normale.    H₁ : elles ne la suivent pas.', {
    x: 0.7, y: 2.1, w: 12, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK, italic: true,
  });
  s.addText('Règle : si p < 0,05 → on rejette la normalité → utiliser un test non paramétrique.', {
    x: 0.7, y: 2.5, w: 12, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK,
  });

  // Code R à gauche
  codeBlock(s,
    '# Test de Shapiro-Wilk\nshapiro.test(donnees$tension)\n\n# Visualisation QQ-plot\nqqnorm(donnees$tension,\n       main = "QQ-plot tension")\nqqline(donnees$tension,\n       col = "red", lwd = 2)',
    0.7, 3.1, 6.0, 3.0,
  );

  // Sortie à droite
  outputBlock(s,
    'Shapiro-Wilk normality test\n\ndata:  donnees$tension\nW = 0.987, p-value = 0.234\n\n→ p > 0,05 : on ne rejette pas\n   la normalité.\n→ t-test acceptable.',
    7.0, 3.1, 5.83, 3.0,
  );

  // Warning
  s.addShape('roundRect', {
    x: 0.7, y: 6.3, w: 12.13, h: 0.55,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.08,
  });
  s.addText('⚠️ ATTENTION', {
    x: 0.9, y: 6.35, w: 1.6, h: 0.45,
    fontSize: 10, fontFace: F.HEAD, color: C.ORANGE, bold: true, valign: 'middle', charSpacing: 3,
  });
  s.addText('Avec un grand échantillon (N > 300), Shapiro-Wilk rejette presque tout. Compléter SYSTÉMATIQUEMENT par un QQ-plot visuel.', {
    x: 2.5, y: 6.3, w: 10.3, h: 0.55,
    fontSize: 11, fontFace: F.BODY, color: C.WHITE, italic: true, valign: 'middle',
  });
}

// ============================================================
// SLIDE 10 — Levene
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 10);

  label(s, 'CHAPITRE 2.3 · HOMOGÉNÉITÉ DES VARIANCES', 0.7, 0.5);
  title(s, 'Test de Levene');

  s.addText('H₀ : les variances des groupes comparés sont égales.    H₁ : au moins une variance diffère.', {
    x: 0.7, y: 2.1, w: 12, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK, italic: true,
  });
  s.addText('Règle : si p < 0,05 → variances inégales → utiliser t-test de Welch au lieu de Student.', {
    x: 0.7, y: 2.5, w: 12, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK,
  });

  codeBlock(s,
    '# Levene Test\n# (Plus robuste que Bartlett\n#  car ne dépend pas de la\n#  normalité.)\n\nlibrary(car)\nleveneTest(tension ~ groupe,\n           data = donnees)',
    0.7, 3.1, 6.0, 3.0,
  );

  outputBlock(s,
    'Levene\'s Test for Homogeneity\nof Variance (center = median)\n\n       Df  F value  Pr(>F)\ngroup   1  4.521    0.038 *\n        58\n\n→ p < 0,05 : variances inégales.\n→ Utiliser t.test(..., var.equal = F)',
    7.0, 3.1, 5.83, 3.0,
  );

  s.addShape('roundRect', {
    x: 0.7, y: 6.3, w: 12.13, h: 0.55,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.08,
  });
  s.addText('💡 HES TIP', {
    x: 0.9, y: 6.35, w: 1.6, h: 0.45,
    fontSize: 10, fontFace: F.HEAD, color: C.ORANGE, bold: true, valign: 'middle', charSpacing: 3,
  });
  s.addText('En pratique, lancer directement Welch (var.equal = FALSE) — robuste aux variances inégales sans test préalable nécessaire.', {
    x: 2.5, y: 6.3, w: 10.3, h: 0.55,
    fontSize: 11, fontFace: F.BODY, color: C.WHITE, italic: true, valign: 'middle',
  });
}

// ============================================================
// SLIDE 11 — Corrections multiples
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 11);

  label(s, 'CHAPITRE 2.4 · COMPARAISONS MULTIPLES', 0.7, 0.5);
  title(s, 'Tu fais 20 tests ? Tu auras 1 faux positif.');

  s.addText('Avec α = 5 % et k tests indépendants, la probabilité d\'au moins un faux positif = 1 − (1 − 0,05)^k. Pour 20 tests : 64 %.', {
    x: 0.7, y: 2.1, w: 12, h: 0.7,
    fontSize: 14, fontFace: F.BODY, color: C.TEXT_DARK, italic: true, lineSpacingMultiple: 1.3,
  });

  // 2 méthodes
  s.addShape('roundRect', {
    x: 0.7, y: 3.05, w: 5.95, h: 2.6,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('BONFERRONI', {
    x: 0.9, y: 3.2, w: 5.5, h: 0.35,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 4,
  });
  s.addText('α corrigé = α / k', {
    x: 0.9, y: 3.6, w: 5.5, h: 0.5,
    fontSize: 18, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Très simple. Très conservateur. À privilégier quand peu de tests et confirmatoires.', {
    x: 0.9, y: 4.2, w: 5.5, h: 1.0,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });
  s.addText('p.adjust(pvals, method = "bonferroni")', {
    x: 0.9, y: 5.2, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 3.05, w: 5.95, h: 2.6,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('BENJAMINI-HOCHBERG  (FDR)', {
    x: 7.08, y: 3.2, w: 5.5, h: 0.35,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 4,
  });
  s.addText('Contrôle le taux de fausses\ndécouvertes — pas l\'erreur globale.', {
    x: 7.08, y: 3.6, w: 5.5, h: 0.7,
    fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, lineSpacingMultiple: 1.2,
  });
  s.addText('Moins strict. À privilégier en exploratoire ou avec beaucoup de tests (génomique, métabolomique).', {
    x: 7.08, y: 4.4, w: 5.5, h: 0.8,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });
  s.addText('p.adjust(pvals, method = "BH")', {
    x: 7.08, y: 5.2, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });

  // Note du bas
  s.addText('Toujours documenter dans la méthode : « k = 12 tests, correction de Bonferroni appliquée (α corrigé = 0,0042). »', {
    x: 0.7, y: 5.95, w: 12, h: 0.5,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 12 — Arbre de décision
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 12);

  label(s, 'CHAPITRE 3 · QUEL TEST POUR QUELLE QUESTION ?', 0.7, 0.5);
  title(s, 'L\'arbre de décision (vue d\'ensemble).');

  // Arbre simplifié — 4 colonnes
  const branches = [
    {
      title: '2 GROUPES INDÉP.',
      cont: 't-test Student',
      contAlt: '(Welch si var ≠)',
      nonParam: 'Mann-Whitney',
      qual: 'Chi² · Fisher exact',
    },
    {
      title: '2 GROUPES APPARIÉS',
      cont: 't-test apparié',
      contAlt: '',
      nonParam: 'Wilcoxon signed-rank',
      qual: 'McNemar',
    },
    {
      title: '≥ 3 GROUPES INDÉP.',
      cont: 'ANOVA + post-hoc',
      contAlt: '(Tukey HSD)',
      nonParam: 'Kruskal-Wallis',
      qual: 'Chi² · Fisher',
    },
    {
      title: 'ASSOCIATION',
      cont: 'Pearson · rég. lin.',
      contAlt: '',
      nonParam: 'Spearman',
      qual: 'Rég. logistique',
    },
  ];

  const cw = 2.95, cx0 = 0.7, cy = 2.2, ch = 4.5;
  branches.forEach((b, i) => {
    const x = cx0 + i * (cw + 0.1);
    // En-tête orange
    s.addShape('rect', {
      x, y: cy, w: cw, h: 0.55,
      fill: { color: C.ORANGE }, line: { type: 'none' },
    });
    s.addText(b.title, {
      x: x + 0.1, y: cy, w: cw - 0.2, h: 0.55,
      fontSize: 12, fontFace: F.HEAD, color: C.NAVY, bold: true,
      align: 'center', valign: 'middle', charSpacing: 2,
    });
    // Corps
    s.addShape('rect', {
      x, y: cy + 0.55, w: cw, h: ch - 0.55,
      fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 },
    });
    let yy = cy + 0.7;
    function row(lbl, val, alt = '') {
      s.addText(lbl, {
        x: x + 0.15, y: yy, w: cw - 0.3, h: 0.25,
        fontSize: 9, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, charSpacing: 2,
      });
      s.addText(val, {
        x: x + 0.15, y: yy + 0.25, w: cw - 0.3, h: 0.4,
        fontSize: 11, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
      });
      if (alt) {
        s.addText(alt, {
          x: x + 0.15, y: yy + 0.6, w: cw - 0.3, h: 0.3,
          fontSize: 9, fontFace: F.MONO, color: C.TEXT_MUTED, italic: true,
        });
        yy += 1.1;
      } else {
        yy += 0.85;
      }
    }
    row('QUANT. NORMALE', b.cont, b.contAlt);
    row('QUANT. NON-NORMALE', b.nonParam);
    row('QUALITATIVE', b.qual);
  });

  s.addText('Tous ces tests sont couverts en détail dans les Modules 2 (Comparaisons) et 3 (Associations).', {
    x: 0.7, y: 6.85, w: 12, h: 0.3,
    fontSize: 10, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 13 — Code R minimal
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 13);

  label(s, 'CHAPITRE 4 · DÉMARRAGE PRATIQUE', 0.7, 0.5);
  title(s, '10 lignes de R pour démarrer toute analyse.');

  codeBlock(s,
    '# 1. Charger les données\ndonnees <- read.csv("data.csv")\n\n# 2. Inspecter rapidement\nhead(donnees)\nsummary(donnees)\nstr(donnees)\n\n# 3. Vérifier la normalité\nshapiro.test(donnees$tension)\n\n# 4. Vérifier les variances\nlibrary(car)\nleveneTest(tension ~ groupe, data = donnees)\n\n# 5. Lancer le test approprié\nt.test(tension ~ groupe, data = donnees,\n       var.equal = FALSE)\n\n# 6. Calculer la taille d\'effet\nlibrary(effsize)\ncohen.d(tension ~ groupe, data = donnees)',
    0.7, 2.2, 7.5, 4.65,
  );

  // Côté droit : commentaire pédago
  s.addShape('roundRect', {
    x: 8.4, y: 2.2, w: 4.43, h: 4.65,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('CE QUE FAIT CE CODE', {
    x: 8.6, y: 2.35, w: 4.1, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });

  const flow = [
    ['1', 'Importe les données depuis un CSV.'],
    ['2', 'Visualise structure, types, statistiques de base.'],
    ['3', 'Évalue la normalité (Shapiro-Wilk).'],
    ['4', 'Évalue l\'homogénéité des variances (Levene).'],
    ['5', 'Lance un t-test de Welch (robuste).'],
    ['6', 'Quantifie l\'effet (Cohen\'s d).'],
  ];
  let fy = 2.85;
  flow.forEach(f => {
    s.addText(f[0], {
      x: 8.6, y: fy, w: 0.4, h: 0.5,
      fontSize: 15, fontFace: F.MONO, color: C.ORANGE, bold: true,
    });
    s.addText(f[1], {
      x: 9.05, y: fy, w: 3.7, h: 0.6,
      fontSize: 11, fontFace: F.BODY, color: C.WHITE, lineSpacingMultiple: 1.3,
    });
    fy += 0.6;
  });

  s.addShape('rect', {
    x: 8.6, y: fy + 0.05, w: 4.1, h: 0.02,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('Garde ce squelette en favori — tu le réutiliseras sur 90 % de tes analyses.', {
    x: 8.6, y: fy + 0.15, w: 4.1, h: 0.5,
    fontSize: 10, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true, lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// SLIDE 14 — Erreurs fréquentes
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 14);

  label(s, 'CHAPITRE 5 · RÉCAPITULATIF', 0.7, 0.5);
  title(s, 'Les 6 réflexes à intégrer.');

  const items = [
    ['01', 'Formuler H₀ et H₁ AVANT le recueil', 'Sinon tu pêches dans les données (p-hacking).'],
    ['02', 'Bilatéral par défaut', 'Unilatéral seulement si justifié théoriquement et déclaré ex ante.'],
    ['03', 'Vérifier les hypothèses du test', 'Normalité + variances + effectifs minimaux avant tout test paramétrique.'],
    ['04', 'Rapporter taille d\'effet + IC95 % + p-value', 'Jamais une p-value seule. Toujours les trois.'],
    ['05', 'Corriger si comparaisons multiples', 'Bonferroni (strict, confirmatoire) ou BH (exploratoire).'],
    ['06', 'Documenter ses choix dans la méthode', '« Comparaison par Mann-Whitney en raison de la non-normalité (Shapiro p < 0,05). »'],
  ];

  const sy = 2.1, rowH = 0.75;
  items.forEach((it, i) => {
    const y = sy + i * (rowH + 0.05);
    s.addShape('roundRect', {
      x: 0.7, y, w: 12.13, h: rowH,
      fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 }, rectRadius: 0.06,
    });
    s.addText(it[0], {
      x: 0.85, y, w: 1, h: rowH,
      fontSize: 22, fontFace: F.MONO, color: C.ORANGE, bold: true,
      valign: 'middle', align: 'center',
    });
    s.addText(it[1], {
      x: 1.95, y: y + 0.08, w: 6.5, h: 0.35,
      fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
    });
    s.addText(it[2], {
      x: 1.95, y: y + 0.4, w: 10.7, h: 0.35,
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true,
    });
  });
}

// ============================================================
// SLIDE 15 — CTA
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  footer(s, 15);

  s.addShape('ellipse', {
    x: 8, y: 3, w: 8, h: 8,
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 },
    line: { type: 'none' },
  });

  s.addImage({ path: logoPath, x: 11.4, y: 0.3, w: 1.5, h: 1.5, transparency: 25 });

  s.addText('— PROCHAINE ÉTAPE', {
    x: 0.7, y: 0.7, w: 6, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });

  s.addText('Tu as posé les fondations.\nPasse aux comparaisons.', {
    x: 0.7, y: 1.4, w: 12, h: 2.4,
    fontSize: 44, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -1, lineSpacingMultiple: 1.0,
  });

  s.addText('Module 2 — Comparaisons (t-test, ANOVA, Chi², McNemar, Mann-Whitney…) à venir.\nEn attendant, un diagnostic gratuit de 15 minutes pour valider ta méthodo sur ton projet réel.', {
    x: 0.7, y: 3.7, w: 12, h: 1.4,
    fontSize: 16, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
    lineSpacingMultiple: 1.3,
  });

  s.addShape('roundRect', {
    x: 0.7, y: 5.3, w: 5.8, h: 1.2,
    fill: { color: '25D366' }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('💬 WhatsApp direct', {
    x: 0.9, y: 5.4, w: 5.4, h: 0.45,
    fontSize: 13, fontFace: F.HEAD, color: C.WHITE, bold: true, charSpacing: 2,
  });
  s.addText('+221 76 387 34 28', {
    x: 0.9, y: 5.8, w: 5.4, h: 0.6,
    fontSize: 22, fontFace: F.MONO, color: C.WHITE, bold: true,
  });

  s.addShape('roundRect', {
    x: 6.9, y: 5.3, w: 5.93, h: 1.2,
    fill: { color: C.ORANGE }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('🌐 Site web officiel', {
    x: 7.1, y: 5.4, w: 5.5, h: 0.45,
    fontSize: 13, fontFace: F.HEAD, color: C.NAVY, bold: true, charSpacing: 2,
  });
  s.addText('heavenelijahservice.org', {
    x: 7.1, y: 5.8, w: 5.5, h: 0.6,
    fontSize: 18, fontFace: F.MONO, color: C.NAVY, bold: true,
  });
}

// ============================================================
// SAVE
// ============================================================
pres.writeFile({ fileName: outPath })
  .then(name => {
    console.log(`✓ ${path.relative(projectRoot, name)} — 15 slides`);
  })
  .catch(err => {
    console.error('Échec génération:', err);
    process.exit(1);
  });
