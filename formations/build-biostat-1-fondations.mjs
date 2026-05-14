#!/usr/bin/env node
/**
 * Formation HES — Tests statistiques en biomédical
 * Module 1 — Avant le test, la méthode.
 *
 * V3 — refonte visuelle. Inspiré du style Pr. Dramé : illustration sur
 * la majorité des slides pour rendre les concepts immédiatement
 * mémorables. Garde la voix de praticien et les recommandations
 * opinionées de la V2.
 */
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  plotQQ, plotPopulation, plotDistributions, plotFlow, plotForest,
} from './lib/plots.mjs';

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

const F = { HEAD: 'Calibri', BODY: 'Calibri', MONO: 'Consolas' };

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

function label(slide, text, x = 0.7, y = 0.5) {
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

function prose(slide, text, x, y, w, h, fontSize = 14) {
  slide.addText(text, {
    x, y, w, h, fontSize, fontFace: F.BODY, color: C.TEXT_DARK,
    valign: 'top', lineSpacingMultiple: 1.4,
  });
}

function codeBlock(slide, code, x, y, w, h) {
  slide.addShape('roundRect', {
    x, y, w, h, fill: { color: C.CODE_BG }, line: { color: C.ORANGE, width: 0.5 }, rectRadius: 0.05,
  });
  slide.addShape('roundRect', {
    x: x + 0.15, y: y + 0.12, w: 0.4, h: 0.28,
    fill: { color: C.ORANGE }, line: { type: 'none' }, rectRadius: 0.04,
  });
  slide.addText('R', {
    x: x + 0.15, y: y + 0.12, w: 0.4, h: 0.28,
    fontSize: 11, fontFace: F.MONO, color: C.NAVY, bold: true, align: 'center', valign: 'middle',
  });
  slide.addText(code, {
    x: x + 0.2, y: y + 0.5, w: w - 0.3, h: h - 0.6,
    fontSize: 10.5, fontFace: F.MONO, color: C.CODE_TEXT, valign: 'top', lineSpacingMultiple: 1.4,
  });
}

function outputBlock(slide, output, x, y, w, h) {
  slide.addShape('roundRect', {
    x, y, w, h,
    fill: { color: C.NAVY_LIGHT }, line: { color: C.TEXT_MUTED, width: 0.5, dashType: 'dash' }, rectRadius: 0.05,
  });
  slide.addText('SORTIE', {
    x: x + 0.15, y: y + 0.1, w: 1, h: 0.25,
    fontSize: 9, fontFace: F.HEAD, color: C.TEXT_LIGHT, bold: true, charSpacing: 3,
  });
  slide.addText(output, {
    x: x + 0.2, y: y + 0.4, w: w - 0.3, h: h - 0.5,
    fontSize: 10.5, fontFace: F.MONO, color: C.WHITE, valign: 'top', lineSpacingMultiple: 1.3,
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
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 }, line: { type: 'none' },
  });
  s.addImage({ path: logoPath, x: 11.5, y: 5.8, w: 1.3, h: 1.3, transparency: 30 });

  s.addText('— FORMATION HES · BIOSTAT · MODULE 1', {
    x: 0.7, y: 0.7, w: 9, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });
  s.addText('Avant le test,\nla méthode.', {
    x: 0.7, y: 1.9, w: 12, h: 2.8,
    fontSize: 62, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -2, lineSpacingMultiple: 1.0,
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
// SLIDE 2 — Pourquoi (avec workflow flow chart)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 2);

  label(s, 'POURQUOI CE MODULE EXISTE');
  title(s, 'Ta méthode pèse plus lourd que tu ne penses.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'Quand un président de jury ouvre ton mémoire, il passe en général plus de temps sur tes pages méthodologie que sur tes résultats. C\'est dans la méthode qu\'il décide s\'il peut faire confiance à tes chiffres.',
    0.7, 2.0, 12, 1.4, 14,
  );

  // Workflow visuel : protocole → recueil → analyse → soutenance
  plotFlow(s, {
    x: 0.7, y: 3.7, w: 12.13, h: 1.6,
    title: 'Ton parcours · où la méthode joue son rôle',
    steps: [
      { label: 'Protocole', sub: 'PICO/PEO\nMéthode\nÉchantillon' },
      { label: 'Recueil',   sub: 'Collecte\nVérifs qualité\nCensures' },
      { label: 'Analyse',   sub: 'Préalables\nTests\nTailles d\'effet' },
      { label: 'Rédaction', sub: 'Tableaux\nIC95%\nVancouver' },
      { label: 'Soutenance', sub: 'Réponse aux\nquestions\nméthodo' },
    ],
  });

  // Petit aside
  s.addShape('rect', {
    x: 0.7, y: 5.6, w: 0.06, h: 1.1, fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('La méthode irrigue les cinq étapes. Maîtrise les concepts du Module 1, et chaque étape devient plus solide. C\'est l\'objet de ces 15 slides.', {
    x: 0.95, y: 5.65, w: 12, h: 1.1,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK, italic: true,
    lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// SLIDE 3 — H₀ / H₁
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 3);

  label(s, 'POINT N°1 · LE DÉPART');
  title(s, 'Avant « quel test ? », il y a « qu\'est-ce que je teste ? »', 0.9, C.TEXT_DARK, 12, 24);

  prose(s,
    'Le premier piège : démarrer une analyse en se demandant « quel test je dois lancer ? ». La bonne première question, c\'est « qu\'est-ce que je cherche à montrer ? ». Tu formules H₀ et H₁ — avec des mots — avant d\'ouvrir le logiciel.',
    0.7, 2.05, 12, 1.4, 14,
  );

  s.addShape('roundRect', {
    x: 0.7, y: 3.75, w: 5.95, h: 2.5,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('H₀  —  L\'HYPOTHÈSE PAR DÉFAUT', {
    x: 0.9, y: 3.9, w: 5.6, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('« Il n\'y a pas de différence, pas d\'effet, pas de lien. »', {
    x: 0.9, y: 4.35, w: 5.6, h: 0.7,
    fontSize: 14, fontFace: F.HEAD, color: C.WHITE, bold: true, lineSpacingMultiple: 1.25,
  });
  s.addText('C\'est l\'hypothèse que tu cherches à rejeter avec tes données. Pas celle que tu cherches à « prouver ».', {
    x: 0.9, y: 5.25, w: 5.6, h: 0.9,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true, lineSpacingMultiple: 1.3,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 3.75, w: 5.95, h: 2.5,
    fill: { color: C.ORANGE }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('H₁  —  CE QUE TU DÉFENDS', {
    x: 7.08, y: 3.9, w: 5.6, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.NAVY, bold: true, charSpacing: 3,
  });
  s.addText('« Il y a une différence, un effet, un lien. »', {
    x: 7.08, y: 4.35, w: 5.6, h: 0.7,
    fontSize: 14, fontFace: F.HEAD, color: C.NAVY, bold: true, lineSpacingMultiple: 1.25,
  });
  s.addText('Tu ne la « prouves » jamais directement. Tu la fais admettre lorsque H₀ devient trop improbable au vu de tes données.', {
    x: 7.08, y: 5.25, w: 5.6, h: 0.9,
    fontSize: 11, fontFace: F.BODY, color: C.NAVY, italic: true, lineSpacingMultiple: 1.3,
  });

  s.addText('Subtilité que les jurys aiment tester : un test ne « confirme » jamais H₁. Il rejette ou ne rejette pas H₀. Si tu maîtrises cette distinction, ta soutenance commence avec 2 points d\'avance.', {
    x: 0.7, y: 6.4, w: 12, h: 0.45,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 4 — α / β + visualisation population
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 4);

  label(s, 'POINT N°2 · LES DEUX ERREURS');
  title(s, 'α, β, et l\'erreur qu\'on ne voit jamais venir.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'Un test ne te dit jamais la vérité. Il te donne une décision sous incertitude. Et l\'incertitude se décline en deux types d\'erreurs, qu\'il faut accepter avant de commencer.',
    0.7, 2.0, 12, 1.0, 13,
  );

  // Matrice 2×2 à gauche
  const cellX = 0.7, cellY = 3.4, cw = 3.0, ch = 1.2;
  s.addText('RÉALITÉ', {
    x: cellX, y: cellY - 0.55, w: 2 * cw, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, align: 'center', charSpacing: 3,
  });
  s.addText('H₀ vraie', {
    x: cellX, y: cellY - 0.25, w: cw, h: 0.25,
    fontSize: 11, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'center',
  });
  s.addText('H₁ vraie', {
    x: cellX + cw, y: cellY - 0.25, w: cw, h: 0.25,
    fontSize: 11, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'center',
  });

  function cell(col, row, bg, mainTxt, subTxt, mainColor) {
    const cx = cellX + col * cw;
    const cy = cellY + row * ch;
    s.addShape('rect', { x: cx, y: cy, w: cw, h: ch, fill: { color: bg }, line: { color: C.BORDER, width: 1 } });
    s.addText(mainTxt, {
      x: cx + 0.1, y: cy + 0.1, w: cw - 0.2, h: 0.4,
      fontSize: 14, fontFace: F.HEAD, color: mainColor, bold: true, align: 'center',
    });
    s.addText(subTxt, {
      x: cx + 0.1, y: cy + 0.55, w: cw - 0.2, h: 0.55,
      fontSize: 9, fontFace: F.BODY, color: mainColor, italic: true, align: 'center', lineSpacingMultiple: 1.2,
    });
  }
  cell(0, 0, C.WHITE,  'Bonne décision', '(1 − α)',                     C.TEXT_DARK);
  cell(1, 0, C.WHITE,  'Erreur β',       'Faux négatif',                 C.RED);
  cell(0, 1, C.WHITE,  'Erreur α',       'Faux positif',                 C.RED);
  cell(1, 1, C.ORANGE, 'Puissance',      '(1 − β)',                      C.NAVY);

  // Visualisation population — sur 100 décisions, voici la répartition
  plotPopulation(s, {
    x: 6.95, y: 3.0, w: 5.88, h: 3.5,
    title: 'Sur 100 décisions répétées · scénario typique',
    cols: 10, rows: 10,
    categories: [
      { n: 71, color: C.TEXT_LIGHT, label: 'Bonne (1−α)' },
      { n: 4,  color: C.RED,        label: 'Erreur α' },
      { n: 5,  color: C.RED,        label: 'Erreur β' },
      { n: 20, color: C.ORANGE,     label: 'Puissance' },
    ],
  });

  s.addText('Entre nous : 80 % de puissance veut dire que 1 fois sur 5 tu rates un vrai effet. La norme n\'est pas magique — c\'est un compromis.', {
    x: 0.7, y: 6.45, w: 12, h: 0.45,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 5 — Bilatéral vs unilatéral + distributions
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 5);

  label(s, 'POINT N°3 · DIRECTION DU TEST');
  title(s, 'Bilatéral par défaut. Toujours.', 0.9, C.TEXT_DARK, 12, 32);

  prose(s,
    'On te demandera presque jamais « pourquoi bilatéral ? ». Mais on peut te demander « pourquoi unilatéral ? » — il faut alors une réponse blindée. Quand tu hésites, choisis bilatéral.',
    0.7, 2.05, 12, 1.0, 13,
  );

  // Distributions avec zones de rejet bilatérales à gauche
  plotDistributions(s, {
    x: 0.7, y: 3.2, w: 6.0, h: 3.4,
    title: 'Bilatéral · zones de rejet aux deux extrêmes',
    xLabel: 'Statistique du test',
    curves: [{ mean: 0, sd: 1, color: C.NAVY }],
    rejectRegion: [
      { from: -4, to: -1.96 },
      { from: 1.96, to: 4 },
    ],
  });

  // Distributions avec zone de rejet unilatérale à droite
  plotDistributions(s, {
    x: 6.85, y: 3.2, w: 6.0, h: 3.4,
    title: 'Unilatéral · zone de rejet d\'un seul côté',
    xLabel: 'Statistique du test',
    curves: [{ mean: 0, sd: 1, color: C.NAVY }],
    rejectRegion: { from: 1.645, to: 4 },
  });

  s.addText('Avec le même α = 5 %, le test unilatéral concentre toute la zone de rejet d\'un côté. Plus puissant SI tu as raison sur la direction — invalide si l\'effet va dans l\'autre sens.', {
    x: 0.7, y: 6.6, w: 12, h: 0.45,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 6 — p-value + distribution avec aire
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 6);

  label(s, 'POINT N°4 · LA p-VALUE');
  title(s, 'La question piège du jury.', 0.9, C.TEXT_DARK, 12, 32);

  prose(s,
    'Le scénario classique : ton président de jury te demande, l\'air innocent, « concrètement, qu\'est-ce que ça signifie p = 0,03 ? ». Un étudiant sur deux répond « ça veut dire que H₀ a 3 % de chances d\'être vraie ». C\'est faux.',
    0.7, 2.05, 12, 1.4, 14,
  );

  // Distribution avec aire grisée = p-value
  plotDistributions(s, {
    x: 0.7, y: 3.65, w: 5.95, h: 3.0,
    title: 'p-value = aire à droite de la statistique observée',
    xLabel: 'Statistique du test',
    curves: [{ mean: 0, sd: 1, color: C.NAVY }],
    shadeFromRight: 1.88,
  });

  // Cards à droite : ce qu'elle est / n'est pas
  s.addShape('roundRect', {
    x: 6.88, y: 3.65, w: 5.95, h: 1.35,
    fill: { color: C.WHITE }, line: { color: C.GREEN, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('CE QU\'ELLE EST', {
    x: 7.08, y: 3.78, w: 5.5, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.GREEN, bold: true, charSpacing: 3,
  });
  s.addText('Probabilité d\'observer ces données — ou plus extrêmes — SI H₀ était vraie.', {
    x: 7.08, y: 4.1, w: 5.55, h: 0.9,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 5.1, w: 5.95, h: 1.55,
    fill: { color: C.WHITE }, line: { color: C.RED, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('CE QU\'ELLE N\'EST PAS', {
    x: 7.08, y: 5.23, w: 5.5, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.RED, bold: true, charSpacing: 3,
  });
  s.addText('Que H₀ est vraie ou fausse. Que ton résultat est important. Que l\'effet est cliniquement pertinent.', {
    x: 7.08, y: 5.55, w: 5.55, h: 1.0,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });

  s.addText('p = 0,049 n\'est pas « plus fort » que p = 0,051. Le seuil de 5 % est une convention.', {
    x: 0.7, y: 6.75, w: 12, h: 0.3,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 7 — Taille d'effet + 2 distributions comparées
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 7);

  label(s, 'POINT N°5 · TAILLE D\'EFFET');
  title(s, '« Statistiquement significatif » ne signifie pas « important ».', 0.9, C.TEXT_DARK, 12, 23);

  prose(s,
    'Tu présentes un résultat « significatif » à p < 0,001. Quel est l\'effet, exactement ? Si tu réponds « p < 0,001 », tu n\'as pas répondu. Voici ce que ça donne visuellement.',
    0.7, 2.0, 12, 0.9, 13,
  );

  // Petit effet : 2 distributions très chevauchantes
  plotDistributions(s, {
    x: 0.7, y: 3.0, w: 6.0, h: 2.8,
    title: 'Petit effet · les distributions se chevauchent',
    xLabel: 'Mesure',
    curves: [
      { mean: 0,    sd: 1, color: C.NAVY,   label: 'Groupe A' },
      { mean: 0.25, sd: 1, color: C.ORANGE, label: 'Groupe B' },
    ],
  });

  // Gros effet : 2 distributions plus séparées
  plotDistributions(s, {
    x: 6.85, y: 3.0, w: 6.0, h: 2.8,
    title: 'Gros effet · les distributions se séparent',
    xLabel: 'Mesure',
    curves: [
      { mean: -0.6, sd: 1, color: C.NAVY,   label: 'Groupe A' },
      { mean:  1.4, sd: 1, color: C.ORANGE, label: 'Groupe B' },
    ],
  });

  // Bloc indices à rapporter
  s.addShape('roundRect', {
    x: 0.7, y: 5.95, w: 12.13, h: 0.95,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1 }, rectRadius: 0.08,
  });
  s.addText('À RAPPORTER SYSTÉMATIQUEMENT', {
    x: 0.9, y: 6.05, w: 11.5, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('Cohen\'s d pour les moyennes  ·  OR / RR / HR pour les ratios  ·  r ou r² pour les corrélations  ·  différence absolue brute toujours, sans exception.', {
    x: 0.9, y: 6.35, w: 11.5, h: 0.55,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// SLIDE 8 — IC95% + forest plot
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 8);

  label(s, 'POINT N°6 · INTERVALLE DE CONFIANCE');
  title(s, 'L\'IC95 % te dit ce que la p-value cache.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'L\'IC95 % mesure ta précision d\'estimation. Un IC large : « j\'ai un effet mais je ne sais pas combien ». Un IC étroit : « j\'ai l\'effet ET je le mesure bien ». La différence pèse lourd quand un jury creuse.',
    0.7, 2.0, 12, 1.3, 14,
  );

  // Forest plot avec 3 études fictives
  plotForest(s, {
    x: 0.7, y: 3.45, w: 7.5, h: 3.2,
    title: 'Trois études · même OR ponctuel, IC très différents',
    xLabel: 'Odds Ratio (échelle linéaire)',
    refLine: 1,
    items: [
      { label: 'Étude 1',  est: 2.4, low: 1.9, high: 3.0,  accent: false },
      { label: 'Étude 2',  est: 2.4, low: 0.7, high: 8.2,  accent: false },
      { label: 'Étude 3',  est: 5.1, low: 3.2, high: 8.1,  accent: true },
    ],
  });

  // Interprétation à droite
  s.addShape('roundRect', {
    x: 8.4, y: 3.45, w: 4.43, h: 3.2,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1 }, rectRadius: 0.1,
  });
  s.addText('LECTURE', {
    x: 8.6, y: 3.58, w: 4.1, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('Étude 1 — IC étroit, OR clairement > 1. Association robuste.', {
    x: 8.6, y: 3.92, w: 4.1, h: 0.7,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });
  s.addText('Étude 2 — même OR central, IC large qui croise 1. On ne peut pas conclure.', {
    x: 8.6, y: 4.65, w: 4.1, h: 0.95,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });
  s.addText('Étude 3 — effet fort et précis. Association très solide.', {
    x: 8.6, y: 5.65, w: 4.1, h: 0.9,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });

  s.addText('Règle pratique : un IC95 % qui ne croise pas 1 (pour un ratio) équivaut à p < 0,05 — mais l\'IC te dit aussi la précision.', {
    x: 0.7, y: 6.75, w: 12, h: 0.3,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 9 — Shapiro-Wilk + QQ-plot
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 9);

  label(s, 'PRÉALABLE · NORMALITÉ');
  title(s, 'Shapiro-Wilk + QQ-plot. Toujours les deux.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'Quand tu testes la normalité, ne te fie pas qu\'à Shapiro. Sur N = 30, il rate des écarts visibles à l\'œil. Sur N = 1 000, il rejette pour des écarts microscopiques sans conséquence pratique. Le QQ-plot est ton garde-fou visuel.',
    0.7, 2.05, 12, 1.0, 13,
  );

  codeBlock(s,
    '# Test\nshapiro.test(\n  donnees$tension)\n\n# Doubler par\n# le QQ-plot\nqqnorm(donnees$tension)\nqqline(donnees$tension,\n       col = "red")',
    0.7, 3.2, 4.3, 3.2,
  );

  outputBlock(s,
    'Shapiro-Wilk\n\nW = 0.987\np = 0.234\n\n→ p > 0,05,\n  on ne rejette\n  pas la\n  normalité.',
    5.15, 3.2, 2.8, 3.2,
  );

  plotQQ(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'QQ-plot · ici linéaire = normal',
  });

  s.addText('Si les points du QQ-plot suivent globalement la ligne orange pointillée, ta distribution est cohérente avec la normalité — quelle que soit la p-value de Shapiro.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
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

  label(s, 'PRÉALABLE · VARIANCES');
  title(s, 'Variances inégales : Welch, pas Student.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'Le t-test de Student suppose des variances comparables entre groupes. Si elles diffèrent, tes résultats sont biaisés. Levene vérifie. Mais en routine, je saute souvent Levene et lance directement Welch : il est robuste aux variances inégales, sans préalable nécessaire.',
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
// SLIDE 11 — Corrections multiples + visualisation des 20 tests
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 11);

  label(s, 'COMPARAISONS MULTIPLES');
  title(s, 'Tu fais 20 tests ? Tu as 64 % de chances de trouver un faux positif.', 0.9, C.TEXT_DARK, 12, 22);

  prose(s,
    'Le calcul exact : 1 − (1 − 0,05)²⁰ = 0,64. Plus tu multiplies les tests, plus tu pêches dans tes données. Visuellement : voici 20 tests d\'une étude où H₀ est vraie partout.',
    0.7, 2.05, 12, 1.0, 13,
  );

  // 20 tests visualisés sur 100 cases
  plotPopulation(s, {
    x: 0.7, y: 3.2, w: 5.95, h: 3.4,
    title: '20 tests indépendants · α = 5 % chacun',
    cols: 5, rows: 4,
    categories: [
      { n: 19, color: C.TEXT_LIGHT, label: 'Test non signif.' },
      { n: 1,  color: C.RED,        label: 'Faux positif' },
    ],
  });

  // Cards à droite
  s.addShape('roundRect', {
    x: 6.88, y: 3.2, w: 5.95, h: 1.65,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('BONFERRONI', {
    x: 7.08, y: 3.32, w: 5.5, h: 0.3,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('α corrigé = α / k', {
    x: 7.08, y: 3.62, w: 5.5, h: 0.45,
    fontSize: 16, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Simple, conservateur. À privilégier en confirmatoire.', {
    x: 7.08, y: 4.1, w: 5.5, h: 0.7,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });

  s.addShape('roundRect', {
    x: 6.88, y: 4.95, w: 5.95, h: 1.65,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('BENJAMINI-HOCHBERG (FDR)', {
    x: 7.08, y: 5.07, w: 5.5, h: 0.3,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('p.adjust(pvals, "BH")', {
    x: 7.08, y: 5.37, w: 5.5, h: 0.45,
    fontSize: 14, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Moins strict. À privilégier en exploratoire ou beaucoup de tests.', {
    x: 7.08, y: 5.83, w: 5.5, h: 0.7,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.3,
  });

  s.addText('Documenter dans la méthode : « k = 12 tests, correction de Bonferroni appliquée (α corrigé = 0,0042). »', {
    x: 0.7, y: 6.7, w: 12, h: 0.3,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 12 — Arbre de décision (visuel flow)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 12);

  label(s, 'LA CARTE D\'ENSEMBLE');
  title(s, 'Quatre situations, quatre familles de tests.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'Avant le détail (modules 2 à 4), voici la vue d\'ensemble. À chaque situation correspond une famille de tests, selon la nature des variables et leur distribution.',
    0.7, 2.05, 12, 0.9, 13,
  );

  const branches = [
    { title: '2 GROUPES INDÉPENDANTS', cont: 'Welch (Student si var. égales)', nonParam: 'Mann-Whitney', qual: 'Chi² ou Fisher exact' },
    { title: '2 GROUPES APPARIÉS',     cont: 't-test apparié',                 nonParam: 'Wilcoxon signed-rank', qual: 'McNemar' },
    { title: '≥ 3 GROUPES INDÉPENDANTS', cont: 'ANOVA + Tukey HSD',            nonParam: 'Kruskal-Wallis',       qual: 'Chi² ou Fisher' },
    { title: 'ASSOCIATION ENTRE VARIABLES', cont: 'Pearson · régression lin.',  nonParam: 'Spearman',             qual: 'Régression logistique' },
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

  s.addText('Le détail dans les modules suivants. Module 2 — comparaisons. Module 3 — associations. Module 4 — outils biomédicaux (ROC, Kaplan-Meier, Kappa).', {
    x: 0.7, y: 6.95, w: 12, h: 0.35,
    fontSize: 10, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 13 — Code R minimal + visualisation 7 étapes
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 13);

  label(s, 'LA RECETTE QUE J\'UTILISE AU QUOTIDIEN');
  title(s, 'Sept étapes pour démarrer toute analyse.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'Ce squelette, je le réutilise sur la majorité de mes analyses HES. Il couvre l\'import, l\'inspection, les vérifications préalables, le test, et la taille d\'effet — l\'ordre exact dans lequel on doit travailler.',
    0.7, 2.0, 12, 0.95, 13,
  );

  codeBlock(s,
    '# 1. Importer\ndonnees <- read.csv("data.csv")\n\n# 2. Inspecter\nhead(donnees); summary(donnees); str(donnees)\n\n# 3. Normalité\nshapiro.test(donnees$tension)\nqqnorm(donnees$tension); qqline(donnees$tension)\n\n# 4. Variances\nlibrary(car)\nleveneTest(tension ~ groupe, data = donnees)\n\n# 5. Test (Welch direct, robuste)\nt.test(tension ~ groupe, data = donnees,\n       var.equal = FALSE)\n\n# 6. Taille d\'effet\nlibrary(effsize)\ncohen.d(tension ~ groupe, data = donnees)',
    0.7, 3.05, 7.4, 3.7,
  );

  // Mini flow vertical des 7 étapes à droite
  plotFlow(s, {
    x: 8.3, y: 3.05, w: 4.53, h: 3.7,
    title: 'L\'ordre que je suis',
    vertical: true,
    steps: [
      { label: '1. Importer' },
      { label: '2. Inspecter' },
      { label: '3. Normalité' },
      { label: '4. Variances' },
      { label: '5. Test', sub: '(Welch direct)' },
      { label: '6. Effet', sub: '(cohen.d)' },
    ],
  });
}

// ============================================================
// SLIDE 14 — Synthèse
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 14);

  label(s, 'CE QUI RESTE QUAND ON A TOUT OUBLIÉ');
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
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 }, line: { type: 'none' },
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
    fontSize: 14, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true, lineSpacingMultiple: 1.4,
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

pres.writeFile({ fileName: outPath })
  .then(name => {
    console.log(`✓ ${path.relative(projectRoot, name)} — 15 slides (V3 visuelle)`);
  })
  .catch(err => {
    console.error('Échec génération:', err);
    process.exit(1);
  });
