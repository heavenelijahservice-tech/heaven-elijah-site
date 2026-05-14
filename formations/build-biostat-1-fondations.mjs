#!/usr/bin/env node
/**
 * Formation HES — Tests statistiques en biomédical
 * Module 1 — Avant le test, la méthode.
 *
 * Lancement : `node formations/build-biostat-1-fondations.mjs`
 * Sortie    : `formations/output/biostat-module-1-fondations.pptx`
 *
 * V2 — voix de praticien (post-feedback "trop AI").
 *   - Chaque slide se positionne par rapport à la soutenance
 *   - Titres longs et opinionnés
 *   - Asides du type "voici ce que je fais en routine"
 *   - Pas de "HES TIP" décoratif
 *
 * Public cible : étudiants M2 + doctorants (sciences santé / biomédical).
 * Format       : 15 slides 16:9 LAYOUT_WIDE (13.33" × 7.5").
 */
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(projectRoot, 'formations', 'output', 'biostat-module-1-fondations.pptx');
const logoPath = path.join(projectRoot, 'public', 'logo-picto.png');

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
pres.title = 'Avant le test, la méthode — Module 1';
pres.subject = 'Formation HES — Biostatistique';

const TOTAL = 15;

function footer(slide, n) {
  slide.addText('Biostat · Module 1 · Heaven Elijah Service', {
    x: 0.5, y: 7.05, w: 8, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true,
  });
  slide.addText(`${n} / ${TOTAL}`, {
    x: 11.83, y: 7.05, w: 1, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, align: 'right',
  });
}

function label(slide, text, x, y) {
  slide.addText(`— ${text}`, {
    x, y, w: 9, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 4,
  });
}

function title(slide, text, y = 0.9, color = C.TEXT_DARK, w = 12, fontSize = 30) {
  slide.addText(text, {
    x: 0.7, y, w, h: 1.0,
    fontSize, fontFace: F.HEAD, color, bold: true, charSpacing: -1, lineSpacingMultiple: 1.1,
  });
}

function codeBlock(slide, code, x, y, w, h) {
  slide.addShape('roundRect', {
    x, y, w, h,
    fill: { color: C.CODE_BG }, line: { color: C.ORANGE, width: 0.5 },
    rectRadius: 0.05,
  });
  slide.addShape('roundRect', {
    x: x + 0.15, y: y + 0.12, w: 0.4, h: 0.28,
    fill: { color: C.ORANGE }, line: { type: 'none' }, rectRadius: 0.04,
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

/** Bloc de prose long, fond cream, paragraphe lisible. */
function prose(slide, text, x, y, w, h, fontSize = 14) {
  slide.addText(text, {
    x, y, w, h,
    fontSize, fontFace: F.BODY, color: C.TEXT_DARK,
    valign: 'top', lineSpacingMultiple: 1.4,
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

  s.addText('— FORMATION HES · BIOSTAT · MODULE 1', {
    x: 0.7, y: 0.7, w: 9, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE,
    bold: true, charSpacing: 5,
  });

  s.addText('Avant le test,\nla méthode.', {
    x: 0.7, y: 1.9, w: 12, h: 2.8,
    fontSize: 62, fontFace: F.HEAD, color: C.WHITE,
    bold: true, charSpacing: -2, lineSpacingMultiple: 1.0,
  });

  s.addShape('rect', {
    x: 0.7, y: 5.05, w: 1.5, h: 0.06,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });

  s.addText('Six concepts que ton jury va sonder en soutenance.', {
    x: 0.7, y: 5.25, w: 11, h: 0.6,
    fontSize: 22, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
  });

  s.addText('15 slides · ~45 min · M2 et doctorants', {
    x: 0.7, y: 6.5, w: 7, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });
  s.addText('heavenelijahservice.org', {
    x: 6, y: 6.5, w: 6.83, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.TEXT_LIGHT, align: 'right',
  });
}

// ============================================================
// SLIDE 2 — Pourquoi ce module
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 2);

  label(s, 'POURQUOI CE MODULE EXISTE', 0.7, 0.5);
  title(s, 'Ta méthode pèse plus lourd que tu ne penses.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'Quand un président de jury ouvre ton mémoire, il passe en général plus de temps sur tes pages méthodologie que sur tes résultats. C\'est dans la méthode qu\'il décide s\'il peut faire confiance à tes chiffres.',
    0.7, 2.2, 7.7, 1.7, 15,
  );

  prose(s,
    'C\'est aussi dans la méthode que la plupart des étudiants se mettent en difficulté — pas par manque de travail, mais parce qu\'on leur a appris la statistique comme une boîte à outils ("Student dans ce cas, Mann-Whitney dans cet autre") sans leur expliquer ce qui se joue derrière.',
    0.7, 4.05, 7.7, 2.0, 14,
  );

  // Carte chiffrée à droite
  s.addShape('roundRect', {
    x: 8.7, y: 2.2, w: 4.15, h: 4.4,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('CE MODULE COUVRE', {
    x: 8.9, y: 2.4, w: 3.8, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('6', {
    x: 8.9, y: 2.85, w: 3.8, h: 1.1,
    fontSize: 90, fontFace: F.MONO, color: C.ORANGE, bold: true,
  });
  s.addText('points\nque neuf jurys sur dix\nvont chercher à creuser.', {
    x: 8.9, y: 4.0, w: 3.8, h: 1.4,
    fontSize: 14, fontFace: F.BODY, color: C.WHITE,
    lineSpacingMultiple: 1.35,
  });
  s.addShape('rect', {
    x: 8.9, y: 5.55, w: 3.7, h: 0.02,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('Maîtrise-les et tu transformes les questions méthodo en arguments à ton avantage.', {
    x: 8.9, y: 5.7, w: 3.8, h: 0.8,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
    lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// SLIDE 3 — H₀ / H₁
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 3);

  label(s, 'POINT N°1 · LE DÉPART', 0.7, 0.5);
  title(s, 'Avant « quel test ? », il y a « qu\'est-ce que je teste ? »', 0.9, C.TEXT_DARK, 12, 26);

  prose(s,
    'Le premier piège classique : démarrer une analyse en se demandant « quel test je dois lancer ? ». La bonne première question, c\'est « qu\'est-ce que je cherche à montrer ? ». Tu formules H₀ et H₁ — avec des mots — avant d\'ouvrir le logiciel.',
    0.7, 2.2, 12, 1.5, 14,
  );

  // 2 boîtes
  s.addShape('roundRect', {
    x: 0.7, y: 3.9, w: 5.95, h: 2.4,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('H₀  —  L\'HYPOTHÈSE PAR DÉFAUT', {
    x: 0.9, y: 4.05, w: 5.6, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('« Il n\'y a pas de différence, pas d\'effet, pas de lien. »', {
    x: 0.9, y: 4.5, w: 5.6, h: 0.7,
    fontSize: 15, fontFace: F.HEAD, color: C.WHITE, bold: true,
    lineSpacingMultiple: 1.25,
  });
  s.addText('C\'est l\'hypothèse que tu cherches à rejeter avec tes données. Pas celle que tu cherches à « prouver ».', {
    x: 0.9, y: 5.4, w: 5.6, h: 0.9,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_LIGHT,
    lineSpacingMultiple: 1.3, italic: true,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 3.9, w: 5.95, h: 2.4,
    fill: { color: C.ORANGE }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('H₁  —  CE QUE TU DÉFENDS', {
    x: 7.08, y: 4.05, w: 5.6, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.NAVY, bold: true, charSpacing: 3,
  });
  s.addText('« Il y a une différence, un effet, un lien. »', {
    x: 7.08, y: 4.5, w: 5.6, h: 0.7,
    fontSize: 15, fontFace: F.HEAD, color: C.NAVY, bold: true,
    lineSpacingMultiple: 1.25,
  });
  s.addText('Tu ne la « prouves » jamais directement. Tu la fais admettre lorsque H₀ devient trop improbable au vu de tes données.', {
    x: 7.08, y: 5.4, w: 5.6, h: 0.9,
    fontSize: 12, fontFace: F.BODY, color: C.NAVY,
    lineSpacingMultiple: 1.3, italic: true,
  });

  // Aside
  s.addText('Subtilité que les jurys aiment tester : un test ne « confirme » jamais H₁. Il rejette ou ne rejette pas H₀. Si tu maîtrises cette distinction, ta soutenance commence avec 2 points d\'avance.', {
    x: 0.7, y: 6.45, w: 12, h: 0.45,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 4 — α / β
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 4);

  label(s, 'POINT N°2 · LES DEUX ERREURS', 0.7, 0.5);
  title(s, 'α, β, et l\'erreur qu\'on ne voit jamais venir.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'Un test ne te dit jamais la vérité. Il te donne une décision sous incertitude. Et l\'incertitude se décline en deux types d\'erreurs, qu\'il faut accepter avant de commencer.',
    0.7, 2.05, 12, 1.0, 14,
  );

  // Matrice 2×2 — cellX = colonne de gauche des cellules, cellY = première rangée.
  // Slide fait 13.33" de large : cellX + 2*cw = 12.5 (sous le bord droit à 13.33). ✓
  const cellX = 2.6, cellY = 3.7, cw = 4.95, ch = 1.25;

  // En-tête maître "RÉALITÉ" couvrant les 2 colonnes
  s.addText('RÉALITÉ', {
    x: cellX, y: cellY - 0.6, w: 2 * cw, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, align: 'center', charSpacing: 3,
  });
  // Sous-en-têtes de colonnes
  s.addText('H₀ vraie', {
    x: cellX, y: cellY - 0.3, w: cw, h: 0.25,
    fontSize: 12, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'center',
  });
  s.addText('H₁ vraie', {
    x: cellX + cw, y: cellY - 0.3, w: cw, h: 0.25,
    fontSize: 12, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'center',
  });
  // Étiquettes de rangées (à gauche des cellules)
  s.addText('TA\nDÉCISION', {
    x: 0.5, y: cellY - 0.6, w: 1.9, h: 0.6,
    fontSize: 10, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, charSpacing: 3,
    align: 'right', lineSpacingMultiple: 1.2,
  });
  s.addText('Ne pas\nrejeter H₀', {
    x: 0.5, y: cellY, w: 1.95, h: ch, valign: 'middle',
    fontSize: 12, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'right',
    lineSpacingMultiple: 1.2,
  });
  s.addText('Rejeter H₀', {
    x: 0.5, y: cellY + ch, w: 1.95, h: ch, valign: 'middle',
    fontSize: 12, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'right',
  });

  function cell(col, row, bg, mainTxt, subTxt, mainColor) {
    const x = cellX + col * cw;
    const y = cellY + row * ch;
    s.addShape('rect', { x, y, w: cw, h: ch, fill: { color: bg }, line: { color: C.BORDER, width: 1 } });
    s.addText(mainTxt, {
      x: x + 0.1, y: y + 0.1, w: cw - 0.2, h: 0.45,
      fontSize: 17, fontFace: F.HEAD, color: mainColor, bold: true, align: 'center',
    });
    s.addText(subTxt, {
      x: x + 0.1, y: y + 0.6, w: cw - 0.2, h: 0.6,
      fontSize: 10, fontFace: F.BODY, color: mainColor, italic: true, align: 'center', lineSpacingMultiple: 1.2,
    });
  }
  cell(0, 0, C.WHITE,  'Bonne décision', 'Niveau de confiance (1 − α)',                C.TEXT_DARK);
  cell(1, 0, C.WHITE,  'Erreur β',       'Faux négatif — tu rates un vrai effet',      C.RED);
  cell(0, 1, C.WHITE,  'Erreur α',       'Faux positif — tu « trouves » un effet inexistant', C.RED);
  cell(1, 1, C.ORANGE, 'Puissance',      '(1 − β) — c\'est ce que tu cherches',        C.NAVY);

  // Aside ouvert
  s.addText('Entre nous : 80 % de puissance, ça veut dire que 1 fois sur 5 tu rates un vrai effet. La norme "α = 5 %, puissance = 80 %" n\'est pas magique — c\'est un compromis. Quand tu vises une publication, monte à 90 %.', {
    x: 0.7, y: 6.45, w: 12, h: 0.45,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 5 — Bilatéral vs unilatéral
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 5);

  label(s, 'POINT N°3 · DIRECTION DU TEST', 0.7, 0.5);
  title(s, 'Bilatéral par défaut. Toujours.', 0.9, C.TEXT_DARK, 12, 32);

  prose(s,
    'On te demandera presque jamais « pourquoi bilatéral ? ». Mais on peut te demander « pourquoi unilatéral ? » — et là, il faut une réponse blindée. Quand tu hésites, choisis bilatéral.',
    0.7, 2.1, 12, 1.0, 14,
  );

  // Deux cartes asymétriques (la bilatérale est mise en valeur)
  s.addShape('roundRect', {
    x: 0.7, y: 3.4, w: 7.3, h: 3.2,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 2 }, rectRadius: 0.1,
  });
  s.addText('BILATÉRAL  ·  À UTILISER PAR DÉFAUT', {
    x: 0.9, y: 3.55, w: 6.9, h: 0.35,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('H₁ : « il y a une différence — peu importe le sens »', {
    x: 0.9, y: 3.95, w: 6.9, h: 0.5,
    fontSize: 15, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Tu ne préjuges pas du sens. La différence peut aller dans les deux directions. Standard absolu en biomédical — 99 % des publications sérieuses l\'utilisent.', {
    x: 0.9, y: 4.55, w: 6.9, h: 1.0,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.4,
  });
  s.addText('En R : c\'est le défaut. Pas besoin de spécifier.', {
    x: 0.9, y: 5.75, w: 6.9, h: 0.4,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });
  s.addText('t.test(x, y)', {
    x: 0.9, y: 6.1, w: 6.9, h: 0.4,
    fontSize: 13, fontFace: F.MONO, color: C.TEXT_DARK,
  });

  s.addShape('roundRect', {
    x: 8.2, y: 3.4, w: 4.63, h: 3.2,
    fill: { color: C.WHITE }, line: { color: C.BORDER, width: 1 }, rectRadius: 0.1,
  });
  s.addText('UNILATÉRAL  ·  À JUSTIFIER', {
    x: 8.4, y: 3.55, w: 4.3, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.RED, bold: true, charSpacing: 3,
  });
  s.addText('H₁ : « A > B » ou « A < B »', {
    x: 8.4, y: 3.95, w: 4.3, h: 0.5,
    fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Plus puissant si la direction est correcte. Doit être déclaré dans le protocole AVANT recueil. Jamais choisir unilatéral pour franchir 0,05 — c\'est la chose la plus repérable du monde.', {
    x: 8.4, y: 4.55, w: 4.3, h: 2.0,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// SLIDE 6 — p-value
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 6);

  label(s, 'POINT N°4 · LA p-VALUE', 0.7, 0.5);
  title(s, 'La question piège du jury.', 0.9, C.TEXT_DARK, 12, 32);

  prose(s,
    'Le scénario classique : ton président de jury te demande, l\'air innocent, « concrètement, qu\'est-ce que ça signifie p = 0,03 dans votre étude ? ». Un étudiant sur deux répond « ça veut dire que H₀ a 3 % de chances d\'être vraie ». C\'est faux. La vraie réponse est plus subtile.',
    0.7, 2.05, 12, 1.4, 14,
  );

  // 2 cartes
  s.addShape('roundRect', {
    x: 0.7, y: 3.6, w: 5.95, h: 3.0,
    fill: { color: C.WHITE }, line: { color: C.GREEN, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('CE QU\'ELLE DIT', {
    x: 0.9, y: 3.75, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.GREEN, bold: true, charSpacing: 3,
  });
  s.addText('Probabilité d\'observer ces données — ou plus extrêmes — SI H₀ était vraie.', {
    x: 0.9, y: 4.15, w: 5.55, h: 1.1,
    fontSize: 14, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, lineSpacingMultiple: 1.3,
  });
  s.addText('C\'est une probabilité conditionnée par H₀. Pas une probabilité de H₀ elle-même. La distinction est subtile mais elle pèse lourd en soutenance.', {
    x: 0.9, y: 5.3, w: 5.55, h: 1.2,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.4,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 3.6, w: 5.95, h: 3.0,
    fill: { color: C.WHITE }, line: { color: C.RED, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('CE QU\'ELLE NE DIT PAS', {
    x: 7.08, y: 3.75, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.RED, bold: true, charSpacing: 3,
  });
  s.addText('Que H₀ est vraie ou fausse.', {
    x: 7.08, y: 4.15, w: 5.55, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK,
  });
  s.addText('Que ton résultat est important.', {
    x: 7.08, y: 4.55, w: 5.55, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK,
  });
  s.addText('Que l\'effet est cliniquement pertinent.', {
    x: 7.08, y: 4.95, w: 5.55, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK,
  });
  s.addText('p = 0,049 n\'est pas « plus fort » que p = 0,051. Le seuil de 5 % est arbitraire — c\'est une convention, pas une vérité.', {
    x: 7.08, y: 5.45, w: 5.55, h: 1.1,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// SLIDE 7 — Taille d'effet
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 7);

  label(s, 'POINT N°5 · TAILLE D\'EFFET', 0.7, 0.5);
  title(s, '« Statistiquement significatif » ne signifie pas « important ».', 0.9, C.TEXT_DARK, 12, 25);

  prose(s,
    'Tu présentes un résultat « significatif » à p < 0,001. Très bien. Quel est l\'effet, exactement ? Si tu réponds « p < 0,001 », tu n\'as pas répondu à la question. Le jury va creuser.',
    0.7, 2.05, 12, 1.0, 14,
  );

  // 2 scénarios
  s.addShape('roundRect', {
    x: 0.7, y: 3.15, w: 5.95, h: 2.2,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('GRANDE ÉTUDE, PETIT EFFET', {
    x: 0.9, y: 3.3, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('N = 10 000  ·  réduction de 0,5 mmHg', {
    x: 0.9, y: 3.7, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.WHITE,
  });
  s.addText('p < 0,001  → statistiquement significatif', {
    x: 0.9, y: 4.15, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.MONO, color: C.GREEN,
  });
  s.addText('Cliniquement, 0,5 mmHg n\'a aucun impact. Le grand N a juste rendu détectable une variation négligeable.', {
    x: 0.9, y: 4.6, w: 5.55, h: 0.7,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true, lineSpacingMultiple: 1.3,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 3.15, w: 5.95, h: 2.2,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('PETITE ÉTUDE, GROS EFFET', {
    x: 7.08, y: 3.3, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('N = 20  ·  réduction de 12 mmHg', {
    x: 7.08, y: 3.7, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.BODY, color: C.WHITE,
  });
  s.addText('p = 0,08  → « non significatif »', {
    x: 7.08, y: 4.15, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.MONO, color: C.RED,
  });
  s.addText('Pourtant 12 mmHg, c\'est énorme cliniquement. L\'étude manque juste de puissance pour le confirmer statistiquement.', {
    x: 7.08, y: 4.6, w: 5.55, h: 0.7,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true, lineSpacingMultiple: 1.3,
  });
}

// Indices à rapporter (au bas de la slide 7)
{
  const slides = pres.slides ? pres.slides : null;
  // On ajoute juste un encadré supplémentaire sur la même slide.
}
// Reprendre la slide 7 pour ajouter le bloc bas (workaround : pptxgenjs ne permet pas de
// reprendre une slide, donc on a déjà tout placé ci-dessus). On ajoute alors le bloc
// "indices à rapporter" directement dans le bloc précédent.

// Petit hack : on récupère la dernière slide pour y ajouter un bloc bas.
// (Cette structure est gardée pour clarté du flux narratif.)
{
  const allSlides = pres._slides; // accès interne
  const s7 = allSlides[allSlides.length - 1];
  s7.addShape('roundRect', {
    x: 0.7, y: 5.55, w: 12.13, h: 1.3,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1 }, rectRadius: 0.1,
  });
  s7.addText('CE QUE TU DOIS TOUJOURS RAPPORTER', {
    x: 0.9, y: 5.65, w: 11.5, h: 0.3,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s7.addText('Cohen\'s d pour les moyennes  ·  OR / RR / HR pour les ratios  ·  r ou r² pour les corrélations  ·  différence absolue brute toujours, sans exception.', {
    x: 0.9, y: 5.95, w: 11.5, h: 0.85,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// SLIDE 8 — IC95%
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 8);

  label(s, 'POINT N°6 · INTERVALLE DE CONFIANCE', 0.7, 0.5);
  title(s, 'L\'IC95% te dit ce que la p-value cache.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'L\'IC95% mesure ta précision d\'estimation, pas seulement l\'existence d\'un effet. Un IC large : « j\'ai un effet mais je ne sais pas combien ». Un IC étroit : « j\'ai l\'effet ET je le mesure bien ». La différence pèse lourd quand un jury creuse.',
    0.7, 2.05, 12, 1.4, 14,
  );

  // 3 cartes exemples
  const cy = 3.5, cw = 3.95, ch = 2.8;
  function ic(idx, title2, value, ic_str, interp, color) {
    const x = 0.7 + idx * (cw + 0.1);
    s.addShape('roundRect', { x, y: cy, w: cw, h: ch, fill: { color: C.WHITE }, line: { color, width: 1.5 }, rectRadius: 0.1 });
    s.addText(title2, {
      x: x + 0.2, y: cy + 0.15, w: cw - 0.4, h: 0.35,
      fontSize: 11, fontFace: F.HEAD, color, bold: true, charSpacing: 3,
    });
    s.addText(value, {
      x: x + 0.2, y: cy + 0.5, w: cw - 0.4, h: 0.55,
      fontSize: 22, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
    });
    s.addText(ic_str, {
      x: x + 0.2, y: cy + 1.1, w: cw - 0.4, h: 0.45,
      fontSize: 14, fontFace: F.MONO, color: C.TEXT_DARK,
    });
    s.addText(interp, {
      x: x + 0.2, y: cy + 1.65, w: cw - 0.4, h: 1.1,
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
    });
  }
  ic(0, 'IC ÉTROIT', 'OR = 2,4', 'IC95% [1,9 ; 3,0]', 'Estimation précise. Effet clairement supérieur à 1. Conclusion robuste.', C.GREEN);
  ic(1, 'IC LARGE', 'OR = 2,4', 'IC95% [0,7 ; 8,2]', 'Estimation imprécise. L\'IC croise 1 — tu ne peux pas conclure à une association.', C.RED);
  ic(2, 'IC ASYMÉTRIQUE', 'OR = 5,1', 'IC95% [3,2 ; 8,1]', 'Effet fort et précis. Largement supérieur à 1. Tu défends ça sans broncher.', C.GREEN);

  s.addText('Règle pratique : un IC95% qui ne croise pas zéro (différence) ou un (ratio) équivaut à p < 0,05. Mais l\'IC te dit aussi si tu es à un poil de la non-significativité ou très loin de H₀.', {
    x: 0.7, y: 6.45, w: 12, h: 0.45,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 9 — Shapiro-Wilk
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 9);

  label(s, 'PRÉALABLE · NORMALITÉ', 0.7, 0.5);
  title(s, 'Shapiro-Wilk + QQ-plot. Toujours les deux.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'Quand tu testes la normalité, ne te fie pas qu\'à Shapiro. Sur N = 30, il rate des écarts visibles à l\'œil. Sur N = 1 000, il rejette pour des écarts microscopiques sans conséquence pratique. Le QQ-plot est ton garde-fou visuel.',
    0.7, 2.05, 12, 1.4, 14,
  );

  codeBlock(s,
    '# Test\nshapiro.test(donnees$tension)\n\n# Toujours doublé par le QQ-plot\nqqnorm(donnees$tension,\n       main = "QQ-plot tension")\nqqline(donnees$tension,\n       col = "red", lwd = 2)',
    0.7, 3.55, 6.0, 2.7,
  );

  outputBlock(s,
    'Shapiro-Wilk normality test\n\ndata:  donnees$tension\nW = 0.987, p-value = 0.234\n\n→ p > 0,05, on ne rejette pas\n  la normalité.\n→ Si les points du QQ-plot\n  suivent la ligne : test\n  paramétrique acceptable.',
    7.0, 3.55, 5.83, 2.7,
  );

  s.addText('Sur les gros échantillons, Shapiro rejette presque toujours — fais confiance au QQ-plot avant tout.', {
    x: 0.7, y: 6.45, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 10 — Levene
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 10);

  label(s, 'PRÉALABLE · VARIANCES', 0.7, 0.5);
  title(s, 'Variances inégales : Welch, pas Student.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'Le t-test de Student suppose des variances comparables entre groupes. Si elles diffèrent, tes résultats sont biaisés. Levene vérifie. Mais en routine, je saute souvent Levene et je lance directement Welch : il est robuste aux variances inégales, sans préalable nécessaire.',
    0.7, 2.05, 12, 1.5, 14,
  );

  codeBlock(s,
    '# Vérification (optionnelle)\nlibrary(car)\nleveneTest(tension ~ groupe,\n           data = donnees)\n\n# En routine : Welch direct\nt.test(tension ~ groupe,\n       data = donnees,\n       var.equal = FALSE)',
    0.7, 3.65, 6.0, 2.8,
  );

  outputBlock(s,
    'Levene\'s Test for Homogeneity\nof Variance (center = median)\n\n       Df  F value  Pr(>F)\ngroup   1  4.521    0.038 *\n        58\n\n→ Variances inégales.\n→ Utiliser Welch dans tous\n  les cas, par sécurité.',
    7.0, 3.65, 5.83, 2.8,
  );

  s.addText('Welch est aussi puissant que Student quand les variances sont égales, et nettement plus juste quand elles diffèrent. Aucune raison de s\'en priver.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 11 — Corrections multiples
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 11);

  label(s, 'COMPARAISONS MULTIPLES', 0.7, 0.5);
  title(s, 'Tu fais 20 tests ? Tu as 64 % de chances d\'un faux positif.', 0.9, C.TEXT_DARK, 12, 24);

  prose(s,
    'Le calcul exact : 1 − (1 − 0,05)²⁰ = 0,64. Plus tu multiplies les tests, plus tu pêches dans tes données. Le jury le sait. Si tu présentes une étude où tu as fait 15 comparaisons et trouvé 3 « significatives », il te demandera comment tu as géré le risque global.',
    0.7, 2.1, 12, 1.6, 14,
  );

  s.addShape('roundRect', {
    x: 0.7, y: 3.85, w: 5.95, h: 2.7,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('BONFERRONI', {
    x: 0.9, y: 4.0, w: 5.5, h: 0.35,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 4,
  });
  s.addText('α corrigé = α / k', {
    x: 0.9, y: 4.4, w: 5.5, h: 0.5,
    fontSize: 18, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Simple et très conservateur. À privilégier en confirmatoire, quand peu de tests et hypothèses fixées à l\'avance.', {
    x: 0.9, y: 5.0, w: 5.5, h: 1.1,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.4,
  });
  s.addText('p.adjust(pvals, "bonferroni")', {
    x: 0.9, y: 6.15, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 3.85, w: 5.95, h: 2.7,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('BENJAMINI-HOCHBERG  (FDR)', {
    x: 7.08, y: 4.0, w: 5.5, h: 0.35,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 4,
  });
  s.addText('Contrôle le taux de fausses\ndécouvertes, pas l\'erreur globale.', {
    x: 7.08, y: 4.4, w: 5.5, h: 0.7,
    fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, lineSpacingMultiple: 1.2,
  });
  s.addText('Moins strict. À privilégier en exploratoire ou avec beaucoup de tests (génomique, métabolomique).', {
    x: 7.08, y: 5.15, w: 5.5, h: 0.9,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.4,
  });
  s.addText('p.adjust(pvals, "BH")', {
    x: 7.08, y: 6.15, w: 5.5, h: 0.35,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });
}

// ============================================================
// SLIDE 12 — Arbre de décision
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 12);

  label(s, 'LA CARTE D\'ENSEMBLE', 0.7, 0.5);
  title(s, 'Quatre situations, quatre familles de tests.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'Avant le détail (modules 2 à 4), voici la vue d\'ensemble. À chaque situation correspond une famille de tests, selon la nature des variables et leur distribution.',
    0.7, 2.05, 12, 0.9, 13,
  );

  const branches = [
    { title: '2 GROUPES INDÉPENDANTS', cont: 'Welch (Student si variances égales)', nonParam: 'Mann-Whitney', qual: 'Chi² ou Fisher exact' },
    { title: '2 GROUPES APPARIÉS',     cont: 't-test apparié',                       nonParam: 'Wilcoxon signed-rank', qual: 'McNemar' },
    { title: '≥ 3 GROUPES INDÉPENDANTS', cont: 'ANOVA + Tukey HSD',                  nonParam: 'Kruskal-Wallis',       qual: 'Chi² ou Fisher' },
    { title: 'ASSOCIATION ENTRE VARIABLES', cont: 'Pearson · régression linéaire',  nonParam: 'Spearman',             qual: 'Régression logistique' },
  ];

  const cw = 2.95, cx0 = 0.7, cy = 3.1, ch = 3.7;
  branches.forEach((b, i) => {
    const x = cx0 + i * (cw + 0.1);
    s.addShape('rect', { x, y: cy, w: cw, h: 0.55, fill: { color: C.ORANGE }, line: { type: 'none' } });
    s.addText(b.title, {
      x: x + 0.1, y: cy, w: cw - 0.2, h: 0.55,
      fontSize: 10, fontFace: F.HEAD, color: C.NAVY, bold: true, align: 'center', valign: 'middle', charSpacing: 2,
    });
    s.addShape('rect', { x, y: cy + 0.55, w: cw, h: ch - 0.55, fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 } });
    let yy = cy + 0.7;
    function row(lbl, val) {
      s.addText(lbl, {
        x: x + 0.15, y: yy, w: cw - 0.3, h: 0.25,
        fontSize: 9, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, charSpacing: 2,
      });
      s.addText(val, {
        x: x + 0.15, y: yy + 0.25, w: cw - 0.3, h: 0.7,
        fontSize: 11, fontFace: F.MONO, color: C.TEXT_DARK, bold: true, lineSpacingMultiple: 1.2,
      });
      yy += 1.05;
    }
    row('NORMAL', b.cont);
    row('NON-NORMAL', b.nonParam);
    row('QUALITATIF', b.qual);
  });

  s.addText('Le détail de chaque test arrive dans les modules suivants. Module 2 — comparaisons. Module 3 — associations. Module 4 — outils spécifiquement biomédicaux (ROC, Kaplan-Meier, Kappa).', {
    x: 0.7, y: 6.95, w: 12, h: 0.35,
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

  label(s, 'LA RECETTE QUE J\'UTILISE AU QUOTIDIEN', 0.7, 0.5);
  title(s, 'Sept étapes pour démarrer toute analyse.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'Ce squelette, je le réutilise sur la majorité de mes analyses HES. Il couvre l\'import, l\'inspection, les vérifications préalables, le test, et la taille d\'effet — l\'ordre exact dans lequel on doit travailler.',
    0.7, 2.05, 12, 1.0, 13,
  );

  codeBlock(s,
    '# 1. Importer\ndonnees <- read.csv("data.csv")\n\n# 2. Inspecter\nhead(donnees); summary(donnees); str(donnees)\n\n# 3. Normalité\nshapiro.test(donnees$tension)\nqqnorm(donnees$tension); qqline(donnees$tension)\n\n# 4. Variances\nlibrary(car)\nleveneTest(tension ~ groupe, data = donnees)\n\n# 5. Test (Welch direct, robuste)\nt.test(tension ~ groupe, data = donnees,\n       var.equal = FALSE)\n\n# 6. Taille d\'effet\nlibrary(effsize)\ncohen.d(tension ~ groupe, data = donnees)',
    0.7, 3.2, 7.5, 3.65,
  );

  s.addShape('roundRect', {
    x: 8.4, y: 3.2, w: 4.43, h: 3.65,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('CE QUI COMPTE ICI', {
    x: 8.6, y: 3.35, w: 4.1, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('L\'ordre. On ne lance pas le test avant les vérifications. On ne tire pas de conclusion sans la taille d\'effet.', {
    x: 8.6, y: 3.75, w: 4.1, h: 1.3,
    fontSize: 12, fontFace: F.BODY, color: C.WHITE, lineSpacingMultiple: 1.4,
  });
  s.addShape('rect', { x: 8.6, y: 5.15, w: 4.1, h: 0.02, fill: { color: C.ORANGE }, line: { type: 'none' } });
  s.addText('Garde ce squelette quelque part. Tu le réutiliseras tel quel sur 90 % de tes analyses — il suffit de remplacer les noms de variables.', {
    x: 8.6, y: 5.3, w: 4.1, h: 1.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true, lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// SLIDE 14 — Synthèse
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 14);

  label(s, 'CE QUI RESTE QUAND ON A TOUT OUBLIÉ', 0.7, 0.5);
  title(s, 'Six réflexes qui font la différence en soutenance.', 0.9, C.TEXT_DARK, 12, 28);

  const items = [
    ['Formuler H₀ et H₁ avant tout — par écrit, pas dans ta tête.', 'C\'est l\'étape que les jurys aiment vérifier en premier.'],
    ['Bilatéral par défaut. Unilatéral seulement si justifié, déclaré ex ante.', 'Un changement de direction en cours de route, ça se voit immédiatement.'],
    ['Vérifier les hypothèses du test avant de l\'appliquer.', 'Normalité + variances. C\'est la base. C\'est aussi ce qu\'un jury sonde.'],
    ['Rapporter taille d\'effet + IC95% + p-value. Toujours les trois.', 'Une p-value seule te fragilise. Les trois ensemble te blindent.'],
    ['Corriger pour les comparaisons multiples au-delà de 3-4 tests.', 'Sinon tu pêches dans tes données. Le jury va te le rappeler.'],
    ['Documenter chaque choix méthodologique dans la rédaction.', 'Une méthode lisible = un jury rassuré = des questions plus faciles.'],
  ];

  const sy = 2.1, rowH = 0.75;
  items.forEach((it, i) => {
    const y = sy + i * (rowH + 0.05);
    s.addShape('roundRect', {
      x: 0.7, y, w: 12.13, h: rowH,
      fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 }, rectRadius: 0.06,
    });
    s.addShape('rect', { x: 0.7, y, w: 0.08, h: rowH, fill: { color: C.ORANGE }, line: { type: 'none' } });
    s.addText(it[0], {
      x: 1.0, y: y + 0.1, w: 11.7, h: 0.32,
      fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
    });
    s.addText(it[1], {
      x: 1.0, y: y + 0.42, w: 11.7, h: 0.3,
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

  s.addText('— LA SUITE', {
    x: 0.7, y: 0.7, w: 6, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });

  s.addText('Tu as les fondations.\nMaintenant, place aux tests.', {
    x: 0.7, y: 1.5, w: 12, h: 2.4,
    fontSize: 40, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -1, lineSpacingMultiple: 1.05,
  });

  s.addText('Le Module 2 entre dans le détail des comparaisons : t-test, ANOVA, Mann-Whitney, Chi², McNemar, Fisher — quand, comment, comment lire la sortie, et ce que le jury va creuser.\n\nEn attendant, si tu veux qu\'on regarde ta méthodo sur ton projet réel : 15 minutes de diagnostic, sans engagement.', {
    x: 0.7, y: 3.8, w: 12, h: 1.7,
    fontSize: 14, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
    lineSpacingMultiple: 1.4,
  });

  s.addShape('roundRect', {
    x: 0.7, y: 5.65, w: 5.8, h: 1.1,
    fill: { color: '25D366' }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('WhatsApp direct', {
    x: 0.9, y: 5.72, w: 5.4, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.WHITE, bold: true, charSpacing: 2,
  });
  s.addText('+221 76 387 34 28', {
    x: 0.9, y: 6.1, w: 5.4, h: 0.55,
    fontSize: 20, fontFace: F.MONO, color: C.WHITE, bold: true,
  });

  s.addShape('roundRect', {
    x: 6.9, y: 5.65, w: 5.93, h: 1.1,
    fill: { color: C.ORANGE }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('Site web HES', {
    x: 7.1, y: 5.72, w: 5.5, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.NAVY, bold: true, charSpacing: 2,
  });
  s.addText('heavenelijahservice.org', {
    x: 7.1, y: 6.1, w: 5.5, h: 0.55,
    fontSize: 18, fontFace: F.MONO, color: C.NAVY, bold: true,
  });
}

// ============================================================
// SAVE
// ============================================================
pres.writeFile({ fileName: outPath })
  .then(name => {
    console.log(`✓ ${path.relative(projectRoot, name)} — 15 slides (V2)`);
  })
  .catch(err => {
    console.error('Échec génération:', err);
    process.exit(1);
  });
