#!/usr/bin/env node
/**
 * Formation HES — Tests statistiques en biomédical
 * Module 4 — Outils biomédicaux.
 * V3 — refonte visuelle (illustrations pédagogiques majoritaires).
 */
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  plotROC, plotKM, plot2x2, plotPopulation, plotForest, plotFlow,
} from './lib/plots.mjs';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(projectRoot, 'formations', 'output', 'biostat-module-4-biomedical.pptx');
const logoPath = path.join(projectRoot, 'public', 'logo-picto.png');

const C = {
  NAVY: '0E1729', NAVY_LIGHT: '1A2541', ORANGE: 'F09042', ORANGE_DEEP: 'D9772B',
  CREAM: 'F5EFE0', WHITE: 'FFFFFF', TEXT_DARK: '15233F', TEXT_MUTED: '6B7280',
  TEXT_LIGHT: 'C9CFDC', BORDER: 'D6CFB8', CODE_BG: '1A2541', CODE_TEXT: 'E8EAED',
  GREEN: '4CAF50', RED: 'E74C3C',
};
const F = { HEAD: 'Calibri', BODY: 'Calibri', MONO: 'Consolas' };

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Heaven Elijah Service';
pres.company = 'Heaven Elijah Service';
pres.title = 'Outils biomédicaux — Module 4';
pres.subject = 'Formation HES — Biostatistique';

const TOTAL = 15;

function footer(s, n) {
  s.addText('Biostat · Module 4 · Heaven Elijah Service', {
    x: 0.5, y: 7.05, w: 8, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true,
  });
  s.addText(`${n} / ${TOTAL}`, {
    x: 11.83, y: 7.05, w: 1, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, align: 'right',
  });
}
function label(s, t, x = 0.7, y = 0.5) {
  s.addText(`— ${t}`, {
    x, y, w: 9, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 4,
  });
}
function title(s, t, y = 0.9, c = C.TEXT_DARK, w = 12, fs = 28) {
  s.addText(t, {
    x: 0.7, y, w, h: 1.0,
    fontSize: fs, fontFace: F.HEAD, color: c, bold: true, charSpacing: -1, lineSpacingMultiple: 1.1,
  });
}
function prose(s, t, x, y, w, h, fs = 13) {
  s.addText(t, {
    x, y, w, h, fontSize: fs, fontFace: F.BODY, color: C.TEXT_DARK,
    valign: 'top', lineSpacingMultiple: 1.4,
  });
}
function codeBlock(s, code, x, y, w, h) {
  s.addShape('roundRect', {
    x, y, w, h, fill: { color: C.CODE_BG }, line: { color: C.ORANGE, width: 0.5 }, rectRadius: 0.05,
  });
  s.addShape('roundRect', {
    x: x + 0.15, y: y + 0.12, w: 0.4, h: 0.28,
    fill: { color: C.ORANGE }, line: { type: 'none' }, rectRadius: 0.04,
  });
  s.addText('R', {
    x: x + 0.15, y: y + 0.12, w: 0.4, h: 0.28,
    fontSize: 11, fontFace: F.MONO, color: C.NAVY, bold: true, align: 'center', valign: 'middle',
  });
  s.addText(code, {
    x: x + 0.2, y: y + 0.5, w: w - 0.3, h: h - 0.6,
    fontSize: 10.5, fontFace: F.MONO, color: C.CODE_TEXT, valign: 'top', lineSpacingMultiple: 1.4,
  });
}
function outputBlock(s, output, x, y, w, h) {
  s.addShape('roundRect', {
    x, y, w, h,
    fill: { color: C.NAVY_LIGHT }, line: { color: C.TEXT_MUTED, width: 0.5, dashType: 'dash' }, rectRadius: 0.05,
  });
  s.addText('SORTIE', {
    x: x + 0.15, y: y + 0.1, w: 1, h: 0.25,
    fontSize: 9, fontFace: F.HEAD, color: C.TEXT_LIGHT, bold: true, charSpacing: 3,
  });
  s.addText(output, {
    x: x + 0.2, y: y + 0.4, w: w - 0.3, h: h - 0.5,
    fontSize: 10.5, fontFace: F.MONO, color: C.WHITE, valign: 'top', lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// SLIDE 1
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  s.addShape('ellipse', {
    x: 9, y: -2, w: 5, h: 5,
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 }, line: { type: 'none' },
  });
  s.addImage({ path: logoPath, x: 11.5, y: 5.8, w: 1.3, h: 1.3, transparency: 30 });
  s.addText('— FORMATION HES · BIOSTAT · MODULE 4', {
    x: 0.7, y: 0.7, w: 9, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });
  s.addText('Outils\nbiomédicaux.', {
    x: 0.7, y: 1.9, w: 12, h: 2.8,
    fontSize: 62, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -2, lineSpacingMultiple: 1.0,
  });
  s.addShape('rect', { x: 0.7, y: 5.05, w: 1.5, h: 0.06, fill: { color: C.ORANGE }, line: { type: 'none' } });
  s.addText('Diagnostic, ROC, survie : les méthodes qui font la médecine.', {
    x: 0.7, y: 5.25, w: 12, h: 0.6,
    fontSize: 22, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
  });
  s.addText('15 slides · ~50 min · Doctorants et chercheurs', {
    x: 0.7, y: 6.5, w: 7, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });
  s.addText('heavenelijahservice.org', {
    x: 6, y: 6.5, w: 6.83, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.TEXT_LIGHT, align: 'right',
  });
}

// ============================================================
// SLIDE 2 — Pourquoi + flow 3 questions cliniques
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 2);
  label(s, 'POURQUOI CE MODULE');
  title(s, 'Les outils des publications médicales.', 0.9, C.TEXT_DARK, 12, 28);
  prose(s,
    'Sensibilité, spécificité, ROC, Kaplan-Meier, Cox — ces termes apparaissent dans presque toutes les thèses en médecine et en santé publique. Ce sont les outils adaptés aux questions cliniques typiques.',
    0.7, 2.0, 12, 1.6, 14,
  );
  plotFlow(s, {
    x: 0.7, y: 3.8, w: 12.13, h: 1.6,
    title: 'Trois familles, trois questions cliniques',
    steps: [
      { label: 'DIAGNOSTIC',  sub: 'Ce test détecte-t-il\nbien la maladie ?' },
      { label: 'ACCORD',      sub: 'Deux observateurs\nvoient-ils pareil ?' },
      { label: 'SURVIE',      sub: 'Combien de temps\navant l\'événement ?' },
    ],
  });
  s.addShape('rect', { x: 0.7, y: 5.7, w: 0.06, h: 1.1, fill: { color: C.ORANGE }, line: { type: 'none' } });
  s.addText('Si tu maîtrises ces outils, tu lis sans peine une publication clinique. Si tu sais aussi les défendre, tu soutiens une thèse de doctorat en médecine.', {
    x: 0.95, y: 5.75, w: 12, h: 1.1,
    fontSize: 13, fontFace: F.BODY, color: C.TEXT_DARK, italic: true, lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// SLIDE 3 — La carte
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 3);
  label(s, 'LA CARTE');
  title(s, 'Trois familles, trois jeux d\'outils.');
  prose(s,
    'À chaque grande question clinique correspond une famille d\'outils. Voici la cartographie qui te permet de choisir avant d\'ouvrir R.',
    0.7, 2.05, 12, 0.9, 13,
  );
  const branches = [
    {
      head: 'DIAGNOSTIC', sub: '« Ce test détecte-t-il bien ? »',
      r1: ['Indicateurs', 'Se, Sp, VPP, VPN (4-5)'],
      r2: ['Ratio de vraisemblance', 'LR+ / LR− (6)'],
      r3: ['Évaluation globale', 'Courbe ROC + AUC (7-8)'],
    },
    {
      head: 'ACCORD', sub: '« Deux observateurs concordent ? »',
      r1: ['Qualitatif', 'Kappa de Cohen (9)'],
      r2: ['Quantitatif', 'Bland-Altman (10)'],
      r3: ['Choix', 'Selon nature de\nla variable.'],
    },
    {
      head: 'SURVIE', sub: '« Combien de temps avant l\'événement ? »',
      r1: ['Description', 'Kaplan-Meier (11)'],
      r2: ['Comparaison 2 groupes', 'Log-rank test (12)'],
      r3: ['Ajustement', 'Régression Cox (13)'],
    },
  ];
  const cw = 3.96, cx0 = 0.7, cy = 3.2, ch = 3.6;
  branches.forEach((b, i) => {
    const x = cx0 + i * (cw + 0.1);
    s.addShape('rect', { x, y: cy, w: cw, h: 0.7, fill: { color: C.ORANGE }, line: { type: 'none' } });
    s.addText(b.head, {
      x: x + 0.15, y: cy + 0.08, w: cw - 0.3, h: 0.3,
      fontSize: 11, fontFace: F.HEAD, color: C.NAVY, bold: true, align: 'center', charSpacing: 2,
    });
    s.addText(b.sub, {
      x: x + 0.15, y: cy + 0.38, w: cw - 0.3, h: 0.3,
      fontSize: 9, fontFace: F.BODY, color: C.NAVY, italic: true, align: 'center',
    });
    s.addShape('rect', {
      x, y: cy + 0.7, w: cw, h: ch - 0.7,
      fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 },
    });
    let yy = cy + 0.85;
    [b.r1, b.r2, b.r3].forEach(row => {
      s.addText(row[0], {
        x: x + 0.15, y: yy, w: cw - 0.3, h: 0.25,
        fontSize: 9, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, charSpacing: 2,
      });
      s.addText(row[1], {
        x: x + 0.15, y: yy + 0.25, w: cw - 0.3, h: 0.55,
        fontSize: 11, fontFace: F.MONO, color: C.TEXT_DARK, bold: true, lineSpacingMultiple: 1.25,
      });
      yy += 0.83;
    });
  });
}

// ============================================================
// SLIDE 4 — 2x2 + Se/Sp + plotPopulation
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 4);
  label(s, 'DIAGNOSTIC · INDICATEURS DE BASE');
  title(s, 'Tableau 2×2 : Se, Sp, VPP, VPN.');
  prose(s,
    'Le tableau 2×2 est le point de départ de toute évaluation diagnostique. Sensibilité = VP/(VP+FN). Spécificité = VN/(VN+FP). VPP et VPN dépendent en plus de la prévalence.',
    0.7, 2.0, 12, 1.2, 13,
  );
  plot2x2(s, {
    x: 0.7, y: 3.4, w: 5.0, h: 3.2,
    title: 'Tableau 2×2 · résultats du test',
    tp: 85, fp: 15, fn: 12, tn: 188,
  });
  plotPopulation(s, {
    x: 5.85, y: 3.4, w: 3.45, h: 3.2,
    title: 'Population de 300 patients',
    cols: 15, rows: 20,
    categories: [
      { n: 85,  color: C.GREEN,      label: 'VP' },
      { n: 12,  color: C.RED,        label: 'FN' },
      { n: 15,  color: C.ORANGE,     label: 'FP' },
      { n: 188, color: C.TEXT_LIGHT, label: 'VN' },
    ],
  });
  s.addShape('roundRect', {
    x: 9.45, y: 3.4, w: 3.38, h: 3.2,
    fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 }, rectRadius: 0.08,
  });
  s.addText('INDICATEURS', {
    x: 9.6, y: 3.55, w: 3.1, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  const ind = [
    ['Se', '85/97', '87.6 %'],
    ['Sp', '188/203', '92.6 %'],
    ['VPP', '85/100', '85.0 %'],
    ['VPN', '188/200', '94.0 %'],
  ];
  ind.forEach((r, i) => {
    const y = 3.9 + i * 0.65;
    s.addText(r[0], {
      x: 9.6, y, w: 0.7, h: 0.5, valign: 'middle',
      fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
    });
    s.addText(r[1], {
      x: 10.35, y, w: 1.2, h: 0.5, valign: 'middle',
      fontSize: 10, fontFace: F.MONO, color: C.TEXT_MUTED,
    });
    s.addText(r[2], {
      x: 11.55, y, w: 1.2, h: 0.5, valign: 'middle',
      fontSize: 13, fontFace: F.MONO, color: C.ORANGE, bold: true, align: 'right',
    });
  });
}

// ============================================================
// SLIDE 5 — Prévalence + 3 populations
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 5);
  label(s, 'DIAGNOSTIC · LE PIÈGE DE LA PRÉVALENCE');
  title(s, 'VPP varie avec la prévalence. Sensibilité, non.', 0.9, C.TEXT_DARK, 12, 26);
  prose(s,
    'Sensibilité et spécificité sont intrinsèques au test. VPP et VPN dépendent de la prévalence. Un test « excellent » devient médiocre quand la maladie est rare. Voici le même test (Se 88 %, Sp 93 %) dans trois contextes.',
    0.7, 2.0, 12, 1.6, 13,
  );
  // 3 plotPopulations
  const scenarios = [
    { prev: '1 %',  ctx: 'POPULATION GÉNÉRALE', tp: 1,  fp: 7,  fn: 0, tn: 92, vpp: '8 %' },
    { prev: '10 %', ctx: 'CONSULTATION', tp: 9,  fp: 6,  fn: 1, tn: 84, vpp: '49 %' },
    { prev: '50 %', ctx: 'COHORTE À RISQUE', tp: 44, fp: 4,  fn: 6, tn: 46, vpp: '92 %' },
  ];
  const cw = 3.95, cy = 3.85;
  scenarios.forEach((sc, i) => {
    const x = 0.7 + i * (cw + 0.1);
    plotPopulation(s, {
      x, y: cy, w: cw, h: 2.4,
      title: `${sc.ctx} · prév ${sc.prev}`,
      cols: 10, rows: 10,
      categories: [
        { n: sc.tp, color: C.GREEN,      label: 'VP' },
        { n: sc.fp, color: C.ORANGE,     label: 'FP' },
        { n: sc.fn, color: C.RED,        label: 'FN' },
        { n: sc.tn, color: C.TEXT_LIGHT, label: 'VN' },
      ],
    });
    s.addShape('rect', {
      x, y: cy + 2.5, w: cw, h: 0.4,
      fill: { color: C.NAVY }, line: { type: 'none' },
    });
    s.addText(`VPP = ${sc.vpp}`, {
      x, y: cy + 2.5, w: cw, h: 0.4,
      fontSize: 14, fontFace: F.MONO, color: C.ORANGE, bold: true, align: 'center', valign: 'middle',
    });
  });
  s.addText('Même test, 3 contextes : la VPP varie de 8 % à 92 %. Toujours préciser la prévalence du contexte d\'étude dans la discussion.', {
    x: 0.7, y: 6.5, w: 12, h: 0.45,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 6 — LR+ / LR-
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 6);
  label(s, 'DIAGNOSTIC · LR+ ET LR−');
  title(s, 'Rapports de vraisemblance : indépendants de la prévalence.', 0.9, C.TEXT_DARK, 12, 22);
  prose(s,
    'LR+ et LR− mesurent de combien un résultat de test modifie la probabilité d\'avoir la maladie. Contrairement à VPP/VPN, ils ne dépendent pas de la prévalence — c\'est pour ça que les cliniciens les préfèrent.',
    0.7, 2.0, 12, 1.4, 14,
  );
  s.addShape('roundRect', {
    x: 0.7, y: 3.55, w: 5.95, h: 3.0,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('LR+ · TEST POSITIF', {
    x: 0.9, y: 3.7, w: 5.5, h: 0.35,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('LR+ = Se / (1 − Sp)', {
    x: 0.9, y: 4.1, w: 5.5, h: 0.5,
    fontSize: 16, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
  });
  s.addText('LR+ > 10 : preuve forte\nLR+ 5 — 10 : preuve modérée\nLR+ 2 — 5 : preuve faible\nLR+ < 2 : peu utile', {
    x: 0.9, y: 4.7, w: 5.5, h: 1.3,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.4,
  });
  s.addText('Ex : LR+ = 12 → test positif rend la maladie 12 fois plus probable.', {
    x: 0.9, y: 6.05, w: 5.5, h: 0.5,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
  });
  s.addShape('roundRect', {
    x: 6.88, y: 3.55, w: 5.95, h: 3.0,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('LR− · TEST NÉGATIF', {
    x: 7.08, y: 3.7, w: 5.5, h: 0.35,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('LR− = (1 − Se) / Sp', {
    x: 7.08, y: 4.1, w: 5.5, h: 0.5,
    fontSize: 16, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
  });
  s.addText('LR− < 0,1 : preuve forte\nLR− 0,1 — 0,2 : preuve modérée\nLR− 0,2 — 0,5 : preuve faible\nLR− > 0,5 : peu utile', {
    x: 7.08, y: 4.7, w: 5.5, h: 1.3,
    fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.4,
  });
  s.addText('Ex : LR− = 0,1 → test négatif rend la maladie 10 fois moins probable.', {
    x: 7.08, y: 6.05, w: 5.5, h: 0.5,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// SLIDE 7 — ROC + AUC
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 7);
  label(s, 'DIAGNOSTIC · ÉVALUATION GLOBALE');
  title(s, 'Courbe ROC : Se et Sp à tous les seuils.');
  prose(s,
    'Un test continu peut être dichotomisé à différents seuils. À chaque seuil correspond une Se et une Sp. La courbe ROC trace tous les couples (1−Sp, Se) — plus la courbe se rapproche du coin haut-gauche, meilleur est le test.',
    0.7, 2.0, 12, 1.6, 14,
  );
  codeBlock(s,
    '# Calculer la courbe ROC\nlibrary(pROC)\n\nroc_obj <- roc(\n  donnees$maladie,\n  donnees$score)\n\nplot(roc_obj,\n     col = "darkorange",\n     lwd = 2)\n\nauc(roc_obj)\nci.auc(roc_obj)',
    0.7, 3.7, 4.3, 3.0,
  );
  outputBlock(s,
    'AUC = 0.782\nIC95%\n[0.71, 0.85]\n\n→ Discrimination\n  acceptable.\n→ Test utilisable\n  en pratique.',
    5.15, 3.7, 2.8, 3.0,
  );
  plotROC(s, {
    x: 8.1, y: 3.7, w: 4.73, h: 3.0,
    title: 'ROC · score vs maladie',
    auc: '0.78',
  });
}

// ============================================================
// SLIDE 8 — Choisir un seuil
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 8);
  label(s, 'DIAGNOSTIC · CHOISIR LE SEUIL');
  title(s, 'Où placer la barre ? Cela dépend du contexte clinique.', 0.9, C.TEXT_DARK, 12, 24);
  prose(s,
    'Plus le seuil est bas, plus Se monte (on ne rate pas) mais plus Sp chute (on alerte trop). À l\'inverse, un seuil élevé maximise Sp au prix de faux négatifs. Le bon seuil dépend de la gravité de rater la maladie vs alerter pour rien.',
    0.7, 2.0, 12, 1.8, 14,
  );
  const strats = [
    { lbl: 'SEUIL BAS · DÉPISTAGE', accent: C.GREEN,
      title: 'Maximiser Se', desc: 'Maladie grave, traitable. On ne veut pas la rater.',
      ex: 'Dépistage cancer\nVIH chez nourrissons' },
    { lbl: 'INDEX DE YOUDEN', accent: C.ORANGE,
      title: 'Équilibre Se + Sp', desc: 'Maximiser Se + Sp − 1. Compromis sans préférence clinique.',
      ex: 'Étude académique\nÉvaluation initiale' },
    { lbl: 'SEUIL ÉLEVÉ · DIAGNOSTIC', accent: C.NAVY,
      title: 'Maximiser Sp', desc: 'Confirmer une maladie. On veut peu de faux positifs.',
      ex: 'Confirmation après\ndépistage positif' },
  ];
  const cy = 3.95, cw = 3.95;
  strats.forEach((sc, i) => {
    const x = 0.7 + i * (cw + 0.1);
    s.addShape('roundRect', {
      x, y: cy, w: cw, h: 2.8,
      fill: { color: C.WHITE }, line: { color: sc.accent, width: 1.5 }, rectRadius: 0.1,
    });
    s.addText(sc.lbl, {
      x: x + 0.2, y: cy + 0.15, w: cw - 0.4, h: 0.35,
      fontSize: 10, fontFace: F.HEAD, color: sc.accent, bold: true, charSpacing: 2,
    });
    s.addText(sc.title, {
      x: x + 0.2, y: cy + 0.55, w: cw - 0.4, h: 0.45,
      fontSize: 16, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
    });
    s.addText(sc.desc, {
      x: x + 0.2, y: cy + 1.1, w: cw - 0.4, h: 0.95,
      fontSize: 12, fontFace: F.BODY, color: C.TEXT_DARK, lineSpacingMultiple: 1.4,
    });
    s.addShape('rect', {
      x: x + 0.2, y: cy + 2.1, w: cw - 0.4, h: 0.02,
      fill: { color: C.BORDER }, line: { type: 'none' },
    });
    s.addText(sc.ex, {
      x: x + 0.2, y: cy + 2.2, w: cw - 0.4, h: 0.55,
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
    });
  });
}

// ============================================================
// SLIDE 9 — Kappa de Cohen
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 9);
  label(s, 'ACCORD · CONCORDANCE QUALITATIVE');
  title(s, 'Kappa de Cohen : l\'accord au-delà du hasard.');
  prose(s,
    'Deux observateurs notent indépendamment 100 radios « anormal / normal ». Combien d\'accord ? Une partie est due au hasard. Kappa corrige pour ce hasard et donne la concordance réelle.',
    0.7, 2.0, 12, 1.5, 14,
  );
  codeBlock(s,
    '# Tableau croisé 2 observateurs\ntab <- table(\n  donnees$obs1,\n  donnees$obs2)\n\n# Kappa de Cohen\nlibrary(irr)\nkappa2(donnees[, c("obs1",\n                    "obs2")])\n\n# Kappa pondéré (ordinal)\nkappa2(..., weight = "squared")',
    0.7, 3.6, 5.8, 3.1,
  );
  s.addShape('roundRect', {
    x: 6.65, y: 3.6, w: 6.18, h: 3.1,
    fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 }, rectRadius: 0.1,
  });
  s.addText('ÉCHELLE LANDIS & KOCH (1977)', {
    x: 6.85, y: 3.75, w: 5.8, h: 0.3,
    fontSize: 10, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  const ks = [
    ['< 0,00', 'Accord pire que hasard', C.RED],
    ['0,01 — 0,20', 'Accord léger', C.RED],
    ['0,21 — 0,40', 'Accord passable', C.ORANGE],
    ['0,41 — 0,60', 'Accord modéré', C.ORANGE],
    ['0,61 — 0,80', 'Accord substantiel', C.GREEN],
    ['0,81 — 1,00', 'Accord quasi-parfait', C.GREEN],
  ];
  ks.forEach((row, i) => {
    const y = 4.15 + i * 0.4;
    s.addText(row[0], {
      x: 6.85, y, w: 1.7, h: 0.35, valign: 'middle',
      fontSize: 12, fontFace: F.MONO, color: row[2], bold: true,
    });
    s.addText(row[1], {
      x: 8.6, y, w: 4.1, h: 0.35, valign: 'middle',
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK,
    });
  });
}

// ============================================================
// SLIDE 10 — Bland-Altman
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 10);
  label(s, 'ACCORD · CONCORDANCE QUANTITATIVE');
  title(s, 'Bland-Altman : comparer deux méthodes de mesure.', 0.9, C.TEXT_DARK, 12, 26);
  prose(s,
    'Pour deux méthodes mesurant la même grandeur, la corrélation n\'est PAS suffisante. Deux méthodes peuvent être très corrélées tout en donnant des valeurs systématiquement différentes. Bland-Altman regarde la moyenne et la différence des paires.',
    0.7, 2.0, 12, 1.6, 14,
  );
  s.addShape('roundRect', {
    x: 0.7, y: 3.8, w: 5.95, h: 2.8,
    fill: { color: C.WHITE }, line: { color: C.ORANGE, width: 1.5 }, rectRadius: 0.1,
  });
  s.addText('CE QUE ÇA MESURE', {
    x: 0.9, y: 3.95, w: 5.5, h: 0.35,
    fontSize: 12, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('Biais moyen', {
    x: 0.9, y: 4.35, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Moyenne des différences entre méthodes. Mesure le décalage systématique.', {
    x: 0.9, y: 4.8, w: 5.5, h: 0.7,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
  });
  s.addText('Limites d\'accord à 95 %', {
    x: 0.9, y: 5.55, w: 5.5, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
  });
  s.addText('Biais ± 1,96 × écart-type. Intervalle où 95 % des différences se trouvent.', {
    x: 0.9, y: 6.0, w: 5.5, h: 0.6,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
  });
  codeBlock(s,
    '# Bland-Altman plot\nlibrary(BlandAltmanLeh)\nbland.altman.plot(\n  donnees$methode1,\n  donnees$methode2,\n  main = "Accord m1 vs m2",\n  conf.int = 0.95)\n\n# Statistiques\nlibrary(blandr)\nblandr.statistics(\n  donnees$methode1,\n  donnees$methode2)',
    6.88, 3.8, 5.95, 2.8,
  );
}

// ============================================================
// SLIDE 11 — KM 1 courbe
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 11);
  label(s, 'SURVIE · DÉCRIRE');
  title(s, 'Kaplan-Meier : la courbe qui descend.');
  prose(s,
    'En survie, le « temps jusqu\'à l\'événement » est l\'information centrale. Kaplan-Meier produit une courbe en escalier : chaque marche descend à chaque événement, en tenant compte des sujets censurés.',
    0.7, 2.0, 12, 1.5, 14,
  );
  codeBlock(s,
    '# Estimation Kaplan-Meier\nlibrary(survival)\n\nfit <- survfit(\n  Surv(temps, evenement) ~ 1,\n  data = donnees)\n\nsummary(fit)\n\n# Tracer la courbe\nlibrary(survminer)\nggsurvplot(fit,\n           data = donnees,\n           conf.int = TRUE)',
    0.7, 3.55, 6.0, 3.15,
  );
  plotKM(s, {
    x: 7.0, y: 3.55, w: 5.83, h: 3.15,
    title: 'Survie globale · cohorte unique',
    curves: [
      {
        label: 'Cohorte (n = 120)',
        color: C.ORANGE,
        points: [
          [0.00, 1.00], [0.05, 1.00], [0.05, 0.97],
          [0.13, 0.97], [0.13, 0.93], [0.22, 0.93], [0.22, 0.88],
          [0.32, 0.88], [0.32, 0.82], [0.42, 0.82], [0.42, 0.76],
          [0.55, 0.76], [0.55, 0.69], [0.68, 0.69], [0.68, 0.62],
          [0.82, 0.62], [0.82, 0.55], [0.95, 0.55],
        ],
      },
    ],
  });
}

// ============================================================
// SLIDE 12 — KM 2 courbes + log-rank
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 12);
  label(s, 'SURVIE · COMPARER DEUX GROUPES');
  title(s, 'Log-rank : « ces deux courbes diffèrent-elles ? »', 0.9, C.TEXT_DARK, 12, 26);
  prose(s,
    'Quand tu compares la survie de deux groupes (traitement vs contrôle, stade I vs III), le log-rank teste l\'hypothèse nulle « pas de différence à aucun temps ». Souvent visualisé avec deux courbes Kaplan-Meier superposées.',
    0.7, 2.0, 12, 1.4, 14,
  );
  codeBlock(s,
    '# Comparaison 2 groupes\nlibrary(survival)\n\nfit <- survfit(\n  Surv(temps, evt) ~ bras,\n  data = donnees)\n\n# Test log-rank\nsurvdiff(\n  Surv(temps, evt) ~ bras,\n  data = donnees)\n\n# Visualisation\nlibrary(survminer)\nggsurvplot(fit, pval = TRUE)',
    0.7, 3.45, 6.0, 3.2,
  );
  plotKM(s, {
    x: 7.0, y: 3.45, w: 5.83, h: 3.2,
    title: 'Bras A vs bras B · log-rank p = 0.012',
    curves: [
      {
        label: 'Bras A (n = 60)',
        color: C.ORANGE,
        points: [
          [0.00, 1.00], [0.05, 1.00], [0.05, 0.98],
          [0.18, 0.98], [0.18, 0.93], [0.32, 0.93], [0.32, 0.88],
          [0.45, 0.88], [0.45, 0.85], [0.62, 0.85], [0.62, 0.80],
          [0.78, 0.80], [0.78, 0.76], [0.95, 0.76],
        ],
      },
      {
        label: 'Bras B (n = 60)',
        color: C.NAVY,
        points: [
          [0.00, 1.00], [0.04, 1.00], [0.04, 0.96],
          [0.12, 0.96], [0.12, 0.89], [0.22, 0.89], [0.22, 0.80],
          [0.35, 0.80], [0.35, 0.70], [0.50, 0.70], [0.50, 0.60],
          [0.68, 0.60], [0.68, 0.52], [0.85, 0.52], [0.85, 0.45],
        ],
      },
    ],
  });
}

// ============================================================
// SLIDE 13 — Cox + forest HR
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 13);
  label(s, 'SURVIE · AJUSTEMENT MULTIVARIÉ');
  title(s, 'Régression de Cox : le HR ajusté.');
  prose(s,
    'Cox est à la survie ce que la logistique est aux issues binaires : un modèle multivarié qui contrôle les facteurs de confusion. Le résultat est le Hazard Ratio — interprétable comme un OR ajusté, mais sur le risque d\'événement par unité de temps.',
    0.7, 2.0, 12, 1.4, 13,
  );
  codeBlock(s,
    '# Modèle de Cox\nlibrary(survival)\n\nfit <- coxph(\n  Surv(temps, evt) ~\n    bras + age + sexe + stade,\n  data = donnees)\n\nsummary(fit)\n\n# Vérif proportionnalité\ncox.zph(fit)',
    0.7, 3.45, 5.3, 3.2,
  );
  plotForest(s, {
    x: 6.2, y: 3.45, w: 6.63, h: 3.2,
    title: 'HR ajustés · IC95%',
    xLabel: 'Hazard Ratio ajusté',
    refLine: 1,
    items: [
      { label: 'bras B',    est: 0.61, low: 0.42, high: 0.89, accent: true  },
      { label: 'âge',       est: 1.04, low: 1.02, high: 1.06, accent: false },
      { label: 'sexe F',    est: 0.81, low: 0.55, high: 1.20, accent: false },
      { label: 'stade III', est: 2.85, low: 1.86, high: 4.37, accent: true  },
    ],
  });
  s.addText('Bras B réduit le risque d\'événement de 39 % vs bras A, ajusté sur âge / sexe / stade. cox.zph() doit montrer p > 0.05 (hypothèse de proportionnalité respectée).', {
    x: 0.7, y: 6.7, w: 12, h: 0.35,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 14 — Erreurs fréquentes
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 14);
  label(s, 'CINQ PIÈGES SPÉCIFIQUES AU BIOMÉDICAL');
  title(s, 'Ce qui fait perdre des points en thèse de médecine.', 0.9, C.TEXT_DARK, 12, 26);
  const items = [
    ['Confondre VPP avec sensibilité',                'La sensibilité est intrinsèque au test, la VPP dépend de la prévalence. À spécifier dans la discussion.'],
    ['Comparer deux méthodes par corrélation seule', 'Deux méthodes peuvent corréler à r = 0,98 sans être interchangeables. Toujours Bland-Altman en plus.'],
    ['Oublier les censurés en analyse de survie',     'Suppression des perdus de vue = biais majeur. Kaplan-Meier les gère, Cox aussi. À utiliser tels quels.'],
    ['Cox sans vérifier la proportionnalité',         'L\'hypothèse fondamentale de Cox : le HR est constant dans le temps. cox.zph() la teste. Sans ça, modèle invalide.'],
    ['Rapporter AUC sans IC95% ni contexte',         'AUC = 0,72 dans une étude pilote ≠ AUC = 0,72 sur une cohorte de validation. L\'IC95% et le design comptent.'],
  ];
  const sy = 2.1, rowH = 0.9;
  items.forEach((it, i) => {
    const y = sy + i * (rowH + 0.05);
    s.addShape('roundRect', {
      x: 0.7, y, w: 12.13, h: rowH,
      fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 }, rectRadius: 0.06,
    });
    s.addShape('rect', { x: 0.7, y, w: 0.08, h: rowH, fill: { color: C.RED }, line: { type: 'none' } });
    s.addText(`0${i + 1}`, {
      x: 0.9, y: y + 0.15, w: 0.7, h: rowH - 0.3,
      fontSize: 22, fontFace: F.MONO, color: C.RED, bold: true, valign: 'middle',
    });
    s.addText(it[0], {
      x: 1.75, y: y + 0.12, w: 10.9, h: 0.36,
      fontSize: 14, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
    });
    s.addText(it[1], {
      x: 1.75, y: y + 0.48, w: 10.9, h: 0.4,
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, lineSpacingMultiple: 1.3,
    });
  });
}

// ============================================================
// SLIDE 15 — CTA fin de série
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  footer(s, 15);
  s.addShape('ellipse', {
    x: 8, y: 3, w: 7, h: 7,
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 }, line: { type: 'none' },
  });
  s.addImage({ path: logoPath, x: 11.4, y: 0.3, w: 1.5, h: 1.5, transparency: 25 });
  s.addText('— FIN DE LA SÉRIE', {
    x: 0.7, y: 0.7, w: 6, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });
  s.addText('Tu maîtrises les quatre\nmodules. Place à ta thèse.', {
    x: 0.7, y: 1.4, w: 12, h: 2.7,
    fontSize: 38, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -1, lineSpacingMultiple: 1.05,
  });
  s.addText('M1 fondations · M2 comparaisons · M3 associations · M4 outils biomédicaux. Avec ce curriculum, tu défends ta méthodologie sans trembler. Si tu veux qu\'on regarde ton projet réel avant la soutenance — un diagnostic gratuit de 15 minutes, sans engagement.', {
    x: 0.7, y: 4.0, w: 12, h: 1.6,
    fontSize: 14, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true, lineSpacingMultiple: 1.4,
  });
  s.addShape('roundRect', {
    x: 0.7, y: 5.75, w: 5.8, h: 1.0,
    fill: { color: '25D366' }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('WhatsApp direct', {
    x: 0.9, y: 5.8, w: 5.4, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.WHITE, bold: true, charSpacing: 2,
  });
  s.addText('+221 76 387 34 28', {
    x: 0.9, y: 6.18, w: 5.4, h: 0.55,
    fontSize: 20, fontFace: F.MONO, color: C.WHITE, bold: true,
  });
  s.addShape('roundRect', {
    x: 6.9, y: 5.75, w: 5.93, h: 1.0,
    fill: { color: C.ORANGE }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('Site web HES', {
    x: 7.1, y: 5.8, w: 5.5, h: 0.4,
    fontSize: 12, fontFace: F.HEAD, color: C.NAVY, bold: true, charSpacing: 2,
  });
  s.addText('heavenelijahservice.org', {
    x: 7.1, y: 6.18, w: 5.5, h: 0.55,
    fontSize: 18, fontFace: F.MONO, color: C.NAVY, bold: true,
  });
}

pres.writeFile({ fileName: outPath })
  .then(name => console.log(`✓ ${path.relative(projectRoot, name)} — 15 slides (V3 visuelle)`))
  .catch(err => { console.error('Échec génération:', err); process.exit(1); });
