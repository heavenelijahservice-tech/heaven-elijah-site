#!/usr/bin/env node
/**
 * Formation HES — Tests statistiques en biomédical
 * Module 2 — Comparer des groupes.
 * V3 — refonte visuelle (illustrations pédagogiques sur majorité des slides).
 */
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  plotBox, plotPopulation, plotDistributions, plotFlow,
} from './lib/plots.mjs';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(projectRoot, 'formations', 'output', 'biostat-module-2-comparaisons.pptx');
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
pres.title = 'Comparer des groupes — Module 2';
pres.subject = 'Formation HES — Biostatistique';

const TOTAL = 15;

function footer(s, n) {
  s.addText('Biostat · Module 2 · Heaven Elijah Service', {
    x: 0.5, y: 7.05, w: 8, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true,
  });
  s.addText(`${n} / ${TOTAL}`, {
    x: 11.83, y: 7.05, w: 1, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, align: 'right',
  });
}

function label(s, text, x = 0.7, y = 0.5) {
  s.addText(`— ${text}`, {
    x, y, w: 9, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 4,
  });
}

function title(s, text, y = 0.9, color = C.TEXT_DARK, w = 12, fontSize = 28) {
  s.addText(text, {
    x: 0.7, y, w, h: 1.0,
    fontSize, fontFace: F.HEAD, color, bold: true, charSpacing: -1, lineSpacingMultiple: 1.1,
  });
}

function prose(s, text, x, y, w, h, fontSize = 13) {
  s.addText(text, {
    x, y, w, h, fontSize, fontFace: F.BODY, color: C.TEXT_DARK,
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
// SLIDE 1 — Titre
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  s.addShape('ellipse', {
    x: 9, y: -2, w: 5, h: 5,
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 }, line: { type: 'none' },
  });
  s.addImage({ path: logoPath, x: 11.5, y: 5.8, w: 1.3, h: 1.3, transparency: 30 });
  s.addText('— FORMATION HES · BIOSTAT · MODULE 2', {
    x: 0.7, y: 0.7, w: 9, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });
  s.addText('Comparer\ndes groupes.', {
    x: 0.7, y: 1.9, w: 12, h: 2.8,
    fontSize: 62, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -2, lineSpacingMultiple: 1.0,
  });
  s.addShape('rect', { x: 0.7, y: 5.05, w: 1.5, h: 0.06, fill: { color: C.ORANGE }, line: { type: 'none' } });
  s.addText('Choisir le test, lancer la commande R, défendre la sortie.', {
    x: 0.7, y: 5.25, w: 12, h: 0.6,
    fontSize: 22, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
  });
  s.addText('15 slides · ~50 min · M2 et doctorants', {
    x: 0.7, y: 6.5, w: 7, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });
  s.addText('heavenelijahservice.org', {
    x: 6, y: 6.5, w: 6.83, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.TEXT_LIGHT, align: 'right',
  });
}

// ============================================================
// SLIDE 2 — Pourquoi + flow descriptif → comparatif
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 2);
  label(s, 'POURQUOI CE MODULE');
  title(s, 'Du descriptif au comparatif. C\'est là que ton mémoire bascule.');

  prose(s,
    'Comparer deux traitements, deux régions, un avant/après — c\'est mathématiquement la situation où on te demandera le plus de comptes en soutenance. Un mauvais choix de test invalide une conclusion principale. Pas un détail méthodo — la conclusion.',
    0.7, 2.0, 12, 1.5, 14,
  );

  plotFlow(s, {
    x: 0.7, y: 3.8, w: 12.13, h: 1.6,
    title: 'Ce module entre dans la phase « comparer »',
    steps: [
      { label: 'Décrire',  sub: 'Médianes\nProportions\nDistributions' },
      { label: 'Comparer', sub: 't-test · ANOVA\nχ² · Mann-Whitney\nMcNemar · Fisher' },
      { label: 'Conclure', sub: 'Taille d\'effet\nIC95%\nPertinence' },
    ],
  });

  s.addShape('rect', { x: 0.7, y: 5.7, w: 0.06, h: 1.1, fill: { color: C.ORANGE }, line: { type: 'none' } });
  s.addText('Le module couvre 9 tests qui couvrent 90 % des comparaisons en mémoire/thèse. Pour chacun : quand l\'utiliser, comment le coder, comment lire la sortie, ce que le jury va creuser.', {
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
  title(s, 'Choisir en trois questions.');

  prose(s,
    'Avant de coder, ouvre-toi mentalement cet arbre. Trois questions à se poser dans l\'ordre — la quatrième dépend du verdict de Shapiro.',
    0.7, 2.05, 12, 0.9, 13,
  );

  const branches = [
    {
      head: '2 GROUPES INDÉPENDANTS', sub: 'A vs B, traitement vs contrôle',
      paramTitle: 'Quantitatif normal', param: 'Welch (slide 4)',
      nonParamTitle: 'Quantitatif non normal', nonParam: 'Mann-Whitney (5)',
      qualTitle: 'Qualitatif', qual: 'Chi² · Fisher (9, 10)',
    },
    {
      head: '2 GROUPES APPARIÉS', sub: 'Avant / après, droite / gauche',
      paramTitle: 'Quantitatif normal', param: 't-test apparié (6)',
      nonParamTitle: 'Quantitatif non normal', nonParam: 'Wilcoxon signed-rank (6)',
      qualTitle: 'Qualitatif', qual: 'McNemar (11)',
    },
    {
      head: '≥ 3 GROUPES', sub: 'Plusieurs traitements, centres, régions',
      paramTitle: 'Quantitatif normal', param: 'ANOVA + Tukey (7)',
      nonParamTitle: 'Quantitatif non normal', nonParam: 'Kruskal-Wallis + Dunn (8)',
      qualTitle: 'Qualitatif', qual: 'Chi² d\'homogénéité',
    },
  ];

  const cw = 3.96, cx0 = 0.7, cy = 3.2, ch = 3.7;
  branches.forEach((b, i) => {
    const x = cx0 + i * (cw + 0.1);
    s.addShape('rect', { x, y: cy, w: cw, h: 0.7, fill: { color: C.ORANGE }, line: { type: 'none' } });
    s.addText(b.head, {
      x: x + 0.15, y: cy + 0.08, w: cw - 0.3, h: 0.3,
      fontSize: 11, fontFace: F.HEAD, color: C.NAVY, bold: true, align: 'center', charSpacing: 2,
    });
    s.addText(b.sub, {
      x: x + 0.15, y: cy + 0.38, w: cw - 0.3, h: 0.3,
      fontSize: 10, fontFace: F.BODY, color: C.NAVY, italic: true, align: 'center',
    });
    s.addShape('rect', {
      x, y: cy + 0.7, w: cw, h: ch - 0.7,
      fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 },
    });
    let yy = cy + 0.85;
    function row(lbl, val) {
      s.addText(lbl, {
        x: x + 0.15, y: yy, w: cw - 0.3, h: 0.25,
        fontSize: 9, fontFace: F.HEAD, color: C.TEXT_MUTED, bold: true, charSpacing: 2,
      });
      s.addText(val, {
        x: x + 0.15, y: yy + 0.25, w: cw - 0.3, h: 0.5,
        fontSize: 12, fontFace: F.MONO, color: C.TEXT_DARK, bold: true, lineSpacingMultiple: 1.2,
      });
      yy += 0.85;
    }
    row(b.paramTitle, b.param);
    row(b.nonParamTitle, b.nonParam);
    row(b.qualTitle, b.qual);
  });
}

// ============================================================
// SLIDE 4 — Welch + box plot
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 4);
  label(s, '2 GROUPES INDÉPENDANTS · QUANTITATIF NORMAL');
  title(s, 'Welch par défaut. Student en exception.');
  prose(s,
    'Welch est robuste aux variances inégales ET aussi puissant que Student quand elles sont égales. En routine, je le lance directement. Si ton encadreur insiste pour Student, vérifie d\'abord Levene.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Welch sans hypothèse\n# sur les variances\nt.test(hba1c ~ groupe,\n       data = donnees,\n       var.equal = FALSE)\n\n# Taille d\'effet\nlibrary(effsize)\ncohen.d(hba1c ~ groupe,\n        data = donnees)',
    0.7, 3.2, 4.3, 3.2,
  );
  outputBlock(s,
    'Welch t-test\n\nt = -3.42\np = 0.0013\nIC95%\n[-1.42, -0.36]\n\nCohen\'s d = -0.78\n(moyen-fort)',
    5.15, 3.2, 2.8, 3.2,
  );
  plotBox(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'HbA1c · bras A vs bras B',
    groups: [
      { label: 'A',  min: 6.0, q1: 6.7, median: 7.1, q3: 7.6, max: 8.4, accent: false },
      { label: 'B',  min: 6.9, q1: 7.5, median: 8.0, q3: 8.5, max: 9.4, accent: true  },
    ],
  });
  s.addText('Ce que le jury va demander : « Pourquoi Welch et pas Student ? » Réponse blindée : Welch est valide sans condition, Student exige l\'égalité des variances.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 5 — Mann-Whitney + box plot données asymétriques
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 5);
  label(s, '2 GROUPES INDÉPENDANTS · QUANTITATIF NON-NORMAL');
  title(s, 'Mann-Whitney quand la normalité décroche.');
  prose(s,
    'Si Shapiro rejette et que le QQ-plot le confirme, Mann-Whitney prend le relais. Pas d\'hypothèse de normalité — compare les rangs au lieu des moyennes. Aussi appelé Wilcoxon rank-sum.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Mann-Whitney /\n# Wilcoxon rank-sum\nwilcox.test(score ~ groupe,\n            data = donnees,\n            conf.int = TRUE)\n\nlibrary(rstatix)\nwilcox_effsize(donnees,\n               score ~ groupe)',
    0.7, 3.2, 4.3, 3.2,
  );
  outputBlock(s,
    'Wilcoxon rank-sum\n\nW = 312\np = 0.018\n95% CI\n[-2.5, -0.3]\n\nEffect r = 0.31\n(medium)',
    5.15, 3.2, 2.8, 3.2,
  );
  plotBox(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'Score · médianes comparées (données asymétriques)',
    groups: [
      { label: 'A', min: 1.0, q1: 1.8, median: 2.5, q3: 4.5, max: 9.0, accent: false },
      { label: 'B', min: 1.5, q1: 2.8, median: 4.0, q3: 6.5, max: 11.0, accent: true },
    ],
  });
  s.addText('« Vous avez utilisé Mann-Whitney parce que… ? » Réponse : « Shapiro p = 0.003, QQ-plot écart aux extrêmes — donc test non paramétrique. »', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 6 — Tests appariés (t + Wilcoxon)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 6);
  label(s, 'DONNÉES APPARIÉES · LE MÊME SUJET MESURÉ DEUX FOIS');
  title(s, 'Avant / après, droite / gauche, deux observateurs.');
  prose(s,
    'L\'erreur N°1 sur les données appariées : appliquer un t-test indépendant. Tu détruis l\'information de pairage et tu perds en puissance. Le bon test dépend de la normalité — des DIFFÉRENCES, pas des valeurs brutes.',
    0.7, 2.0, 12, 1.4, 13,
  );
  codeBlock(s,
    '# Si différences normales\nt.test(donnees$apres,\n       donnees$avant,\n       paired = TRUE)\n\n# Vérif normalité des diff.\ndiff <- donnees$apres -\n        donnees$avant\nshapiro.test(diff)',
    0.7, 3.6, 6.0, 2.8,
  );
  codeBlock(s,
    '# Si différences non-normales\nwilcox.test(donnees$apres,\n            donnees$avant,\n            paired = TRUE,\n            conf.int = TRUE)\n\n# Wilcoxon signed-rank\n# (à ne pas confondre avec\n#  Wilcoxon rank-sum)',
    7.0, 3.6, 5.83, 2.8,
  );
  s.addText('Vérifie Shapiro sur la SÉRIE DES DIFFÉRENCES (apres − avant), pas sur chaque mesure séparément. C\'est cette série qui doit être normale pour le t-test apparié.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 7 — ANOVA + Tukey + box plot 3 groupes
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 7);
  label(s, '≥ 3 GROUPES · QUANTITATIF NORMAL');
  title(s, 'ANOVA dit « ça bouge ». Tukey dit « où ».');
  prose(s,
    'ANOVA répond à « y a-t-il une différence quelque part ? ». Si oui, elle ne te dit pas entre quels groupes — c\'est Tukey HSD (post-hoc) qui le précise. Sans Tukey, ton ANOVA significative n\'est pas utilisable pour conclure.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Vérif préalables\nlibrary(car)\nleveneTest(score ~ region,\n           data = donnees)\n\n# ANOVA\nmodele <- aov(score ~ region,\n              data = donnees)\nsummary(modele)\n\n# Post-hoc Tukey\nTukeyHSD(modele)',
    0.7, 3.2, 4.3, 3.2,
  );
  outputBlock(s,
    'ANOVA\nF = 8.31\np = 0.0006\n\nTukey HSD\nB-A  +1.2\n  p = 0.012\nC-A  +2.4\n  p < 0.001\nC-B  +1.2\n  p = 0.014',
    5.15, 3.2, 2.8, 3.2,
  );
  plotBox(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'Score par région · A < B < C',
    groups: [
      { label: 'A', min: 4.5, q1: 5.4, median: 6.0, q3: 6.7, max: 7.5, accent: false },
      { label: 'B', min: 5.5, q1: 6.5, median: 7.2, q3: 8.0, max: 8.8, accent: false },
      { label: 'C', min: 6.5, q1: 7.7, median: 8.4, q3: 9.1, max: 9.9, accent: true  },
    ],
  });
  s.addText('Si Levene rejette : ANOVA de Welch (oneway.test) puis Games-Howell en post-hoc. Plus robuste sur variances inégales.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 8 — Kruskal-Wallis + box plot
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 8);
  label(s, '≥ 3 GROUPES · QUANTITATIF NON-NORMAL');
  title(s, 'L\'alternative non-paramétrique de l\'ANOVA.');
  prose(s,
    'Même logique que ANOVA, sans hypothèse de normalité. Si Kruskal-Wallis rejette H₀, le post-hoc Dunn dit entre quels groupes, avec ajustement pour les comparaisons multiples.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Kruskal-Wallis\nkruskal.test(score ~ region,\n             data = donnees)\n\n# Post-hoc Dunn\nlibrary(dunn.test)\ndunn.test(donnees$score,\n          donnees$region,\n          method = "bh")',
    0.7, 3.2, 4.3, 3.2,
  );
  outputBlock(s,
    'Kruskal-Wallis\n\nchi² = 14.2\ndf = 2\np = 0.0008\n\nDunn (BH adjusted)\nA-B  p = 0.034\nA-C  p = 0.0009\nB-C  p = 0.052',
    5.15, 3.2, 2.8, 3.2,
  );
  plotBox(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'Score · 3 régions, distributions asymétriques',
    groups: [
      { label: 'A', min: 1.0, q1: 2.5, median: 3.5, q3: 5.0, max: 8.5, accent: false },
      { label: 'B', min: 2.0, q1: 4.0, median: 5.5, q3: 7.0, max: 9.0, accent: false },
      { label: 'C', min: 3.0, q1: 5.5, median: 7.5, q3: 9.0, max: 11.5, accent: true },
    ],
  });
  s.addText('Dunn est l\'équivalent de Tukey pour la version non-paramétrique. `method = "bh"` applique BH pour les comparaisons multiples.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 9 — Chi² + population visualisée
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 9);
  label(s, '2 PROPORTIONS · GRANDS EFFECTIFS');
  title(s, 'Le Chi² d\'indépendance.');
  prose(s,
    'Compare deux proportions (succès vs échec, exposés vs non-exposés). Hypothèse à vérifier : effectifs attendus ≥ 5 dans chaque cellule. Sinon, Fisher exact (slide suivante).',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Tableau de contingence\ntab <- table(\n  donnees$exposition,\n  donnees$maladie)\n\n# Chi² + OR\nchisq.test(tab)\nlibrary(epitools)\noddsratio(tab)',
    0.7, 3.2, 4.3, 3.2,
  );
  outputBlock(s,
    'Pearson Chi² test\n\nX² = 12.3\ndf = 1\np = 0.0005\n\nOdds Ratio\n2.45\nIC95%\n[1.51, 3.97]',
    5.15, 3.2, 2.8, 3.2,
  );
  plotPopulation(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'Exposés vs non-exposés (n = 100 chacun)',
    cols: 10, rows: 10,
    categories: [
      { n: 65, color: C.TEXT_LIGHT, label: 'Non-exposés sains' },
      { n: 25, color: C.NAVY,       label: 'Non-exposés malades' },
      { n: 25, color: C.ORANGE,     label: 'Exposés malades' },
      { n: 0,  color: C.WHITE,      label: '' },
    ],
  });
  s.addText('Rapporte OR avec IC95%, pas la p-value seule. C\'est la mesure d\'effet attendue en épidémiologie.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 10 — Fisher exact
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 10);
  label(s, '2 PROPORTIONS · PETITS EFFECTIFS');
  title(s, 'Fisher exact : à utiliser large.');
  prose(s,
    'Quand une cellule attendue est < 5, Chi² devient instable. Fisher exact reste valide quelle que soit la taille — c\'est même légitime de l\'utiliser par défaut sur du 2×2. Il y a peu de raisons de s\'en priver.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Tableau 2×2 avec\n# effectifs réduits\ntab <- matrix(c(3, 2,\n                8, 27), nrow = 2)\n\nfisher.test(tab)\n\n# Pour des tableaux plus grands\nfisher.test(tab,\n  simulate.p.value = TRUE)',
    0.7, 3.2, 6.0, 3.2,
  );
  outputBlock(s,
    'Fisher\'s Exact Test\n\np-value = 0.027\nalternative hypothesis:\n  true odds ratio is not\n  equal to 1\n\n95% CI: [1.02, 47.5]\nsample OR estimate: 4.86\n\n→ IC95% large → petit\n  échantillon. Effet probable\n  mais magnitude imprécise.',
    7.0, 3.2, 5.83, 3.2,
  );
  s.addText('Fisher est valide quelle que soit la taille de l\'échantillon. Tu peux l\'utiliser par défaut sur du 2×2.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 11 — McNemar + tableau de discordance visuel
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 11);
  label(s, 'PROPORTIONS APPARIÉES');
  title(s, 'McNemar : le test des discordances.');
  prose(s,
    'Quand chaque sujet est mesuré à deux moments, McNemar compare uniquement les discordances. C\'est l\'équivalent du t-test apparié pour les proportions — il ignore les sujets qui n\'ont pas changé.',
    0.7, 2.0, 12, 1.2, 13,
  );

  codeBlock(s,
    '# Tableau 2×2 apparié\n# Lignes = avant\n# Colonnes = après\ntab <- matrix(\n  c(45, 12,\n    28, 15),\n  nrow = 2)\n\nmcnemar.test(tab,\n             correct = TRUE)',
    0.7, 3.4, 4.3, 3.0,
  );

  // Tableau visuel de discordance à droite
  s.addText('Tableau apparié visualisé', {
    x: 5.15, y: 3.4, w: 7.68, h: 0.3,
    fontSize: 11, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'center',
  });
  // Mini matrice 2×2 colorée
  const mx = 5.5, my = 3.85, mcw = 1.7, mch = 1.0;
  // Headers
  s.addText('Après +', {
    x: mx + mcw, y: my - 0.3, w: mcw, h: 0.25,
    fontSize: 10, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'center',
  });
  s.addText('Après −', {
    x: mx + 2 * mcw, y: my - 0.3, w: mcw, h: 0.25,
    fontSize: 10, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'center',
  });
  s.addText('Avant +', {
    x: mx - 1.0, y: my + mch / 2 - 0.1, w: 1.0, h: 0.25,
    fontSize: 10, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'right',
  });
  s.addText('Avant −', {
    x: mx - 1.0, y: my + mch + mch / 2 - 0.1, w: 1.0, h: 0.25,
    fontSize: 10, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, align: 'right',
  });
  // Cells
  function mcell(col, row, value, bg, fg, lbl) {
    const cx = mx + (col + 1) * mcw;
    const cy = my + row * mch;
    s.addShape('rect', { x: cx, y: cy, w: mcw, h: mch, fill: { color: bg }, line: { color: C.BORDER, width: 1 } });
    s.addText(value, {
      x: cx, y: cy + 0.05, w: mcw, h: 0.5,
      fontSize: 22, fontFace: F.MONO, color: fg, bold: true, align: 'center',
    });
    s.addText(lbl, {
      x: cx, y: cy + 0.55, w: mcw, h: 0.4,
      fontSize: 9, fontFace: F.BODY, color: fg, italic: true, align: 'center',
    });
  }
  mcell(0, 0, '45', C.TEXT_LIGHT, C.TEXT_DARK, 'concordant');
  mcell(1, 0, '12', C.ORANGE, C.NAVY, 'discordant');
  mcell(0, 1, '28', C.ORANGE, C.NAVY, 'discordant');
  mcell(1, 1, '15', C.TEXT_LIGHT, C.TEXT_DARK, 'concordant');

  s.addText('McNemar utilise UNIQUEMENT les cases orange (discordances). Les concordances (gris) sont ignorées.', {
    x: 5.15, y: 6.0, w: 7.68, h: 0.45,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });

  s.addText('McNemar : χ² = 5.625, df = 1, p = 0.0177  →  différence significative entre les deux moments.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE, bold: true, align: 'center',
  });
}

// ============================================================
// SLIDE 12 — Taille d'effet
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 12);
  label(s, 'AU-DELÀ DE LA p-VALUE');
  title(s, 'Pour chaque test, sa mesure d\'effet.');
  prose(s,
    'Le rappel le plus martelé du Module 1 : ne jamais rapporter une p-value seule. Pour chaque test ci-dessous, l\'indice de taille d\'effet correspondant — c\'est ce que tu colles dans ton tableau de résultats à côté de p.',
    0.7, 2.0, 12, 1.5, 13,
  );

  const rows = [
    ['t-test (Welch, Student, apparié)', 'Cohen\'s d',          'library(effsize); cohen.d(...)'],
    ['Mann-Whitney, Wilcoxon',           'r = Z / √N',          'library(rstatix); wilcox_effsize(...)'],
    ['ANOVA',                             'η² (eta carré) ou ω²', 'library(effectsize); eta_squared(modele)'],
    ['Kruskal-Wallis',                   'ε² (epsilon carré)',   'library(rstatix); kruskal_effsize(...)'],
    ['Chi², Fisher',                     'OR avec IC95%',        'library(epitools); oddsratio(tab)'],
    ['McNemar',                          'OR de discordances',    'library(epitools); oddsratio(...)'],
  ];

  const sy = 3.7, rowH = 0.46;
  s.addShape('rect', { x: 0.7, y: sy - 0.05, w: 12.13, h: 0.4, fill: { color: C.NAVY }, line: { type: 'none' } });
  s.addText('TEST', {
    x: 0.85, y: sy - 0.02, w: 3.8, h: 0.35,
    fontSize: 10, fontFace: F.HEAD, color: C.ORANGE, bold: true, valign: 'middle', charSpacing: 3,
  });
  s.addText('TAILLE D\'EFFET', {
    x: 4.7, y: sy - 0.02, w: 3.0, h: 0.35,
    fontSize: 10, fontFace: F.HEAD, color: C.ORANGE, bold: true, valign: 'middle', charSpacing: 3,
  });
  s.addText('FONCTION R', {
    x: 7.8, y: sy - 0.02, w: 5.0, h: 0.35,
    fontSize: 10, fontFace: F.HEAD, color: C.ORANGE, bold: true, valign: 'middle', charSpacing: 3,
  });
  rows.forEach((r, i) => {
    const y = sy + 0.4 + i * rowH;
    const bg = (i % 2 === 0) ? C.WHITE : C.CREAM;
    s.addShape('rect', { x: 0.7, y, w: 12.13, h: rowH, fill: { color: bg }, line: { color: C.BORDER, width: 0.5 } });
    s.addText(r[0], {
      x: 0.85, y, w: 3.8, h: rowH, valign: 'middle',
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_DARK,
    });
    s.addText(r[1], {
      x: 4.7, y, w: 3.0, h: rowH, valign: 'middle',
      fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true,
    });
    s.addText(r[2], {
      x: 7.8, y, w: 5.0, h: rowH, valign: 'middle',
      fontSize: 10, fontFace: F.MONO, color: C.TEXT_DARK,
    });
  });
  s.addText('install.packages(c("effsize", "rstatix", "effectsize", "epitools"))', {
    x: 0.7, y: 6.5, w: 12, h: 0.45,
    fontSize: 11, fontFace: F.MONO, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 13 — Cas d'école + box plot final
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 13);
  label(s, 'CAS D\'ÉCOLE · WORKFLOW COMPLET');
  title(s, 'Un essai randomisé de A à Z.');
  prose(s,
    'Scénario : essai bras A (nouveau) vs bras B (standard) chez 60 patients diabétiques. Variable principale = HbA1c à 12 semaines. Voici le workflow et le visuel final attendu.',
    0.7, 2.0, 12, 0.9, 13,
  );

  codeBlock(s,
    '# 1. Exploration\ntable(donnees$bras)\nby(donnees$hba1c, donnees$bras, summary)\n\n# 2. Vérifs préalables\nshapiro.test(donnees$hba1c[donnees$bras == "A"])\nshapiro.test(donnees$hba1c[donnees$bras == "B"])\n\n# 3. Test principal\nt.test(hba1c ~ bras, data = donnees,\n       var.equal = FALSE)\n\n# 4. Taille d\'effet\nlibrary(effsize)\ncohen.d(hba1c ~ bras, data = donnees)',
    0.7, 3.05, 7.4, 3.75,
  );

  plotBox(s, {
    x: 8.3, y: 3.05, w: 4.53, h: 3.75,
    title: 'Résultat : HbA1c bras A vs bras B',
    groups: [
      { label: 'A nouveau', min: 5.8, q1: 6.5, median: 7.1, q3: 7.6, max: 8.6, accent: true },
      { label: 'B standard', min: 6.8, q1: 7.5, median: 8.0, q3: 8.6, max: 9.4, accent: false },
    ],
  });
}

// ============================================================
// SLIDE 14 — Erreurs fréquentes
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 14);
  label(s, 'CINQ PIÈGES OBSERVÉS EN PRE-SOUTENANCE');
  title(s, 'Cinq erreurs qui font mal en soutenance.');
  const items = [
    ['t-test indépendant sur données appariées',     'Tu détruis l\'information de pairage et tu perds en puissance. Le jury repère ça en 30 secondes.'],
    ['ANOVA significative sans Tukey',                'ANOVA dit « il y a une différence » sans dire où. Sans post-hoc, ta conclusion sur quel groupe est inutilisable.'],
    ['Chi² avec effectifs attendus < 5',              'Le test est invalide. Utilise Fisher exact à la place — il marche dans tous les cas.'],
    ['Multiplication des tests sans correction',     'Tu fais 15 comparaisons sur le même jeu de données, tu trouves 3 « significatifs ». Bonferroni ou BH, sinon c\'est du hasard.'],
    ['Rapporter p sans taille d\'effet ni IC95%',   'La triade test + IC95% + taille d\'effet. Une p-value seule, c\'est un mémoire fragile.'],
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
// SLIDE 15 — CTA
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
  s.addText('— LA SUITE', {
    x: 0.7, y: 0.7, w: 6, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });
  s.addText('Tu sais comparer.\nPasse aux associations.', {
    x: 0.7, y: 1.5, w: 12, h: 2.4,
    fontSize: 40, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -1, lineSpacingMultiple: 1.05,
  });
  s.addText('Le Module 3 entre dans le détail des associations : corrélation, régression linéaire, régression logistique, OR ajustés. Là où ton mémoire devient explicatif, pas seulement descriptif.\n\nSi tu veux qu\'on regarde ta méthodo sur un cas concret en attendant : 15 minutes de diagnostic, sans engagement.', {
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
  .then(name => console.log(`✓ ${path.relative(projectRoot, name)} — 15 slides (V3 visuelle)`))
  .catch(err => { console.error('Échec génération:', err); process.exit(1); });
