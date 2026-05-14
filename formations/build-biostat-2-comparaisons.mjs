#!/usr/bin/env node
/**
 * Formation HES — Tests statistiques en biomédical
 * Module 2 — Comparer des groupes.
 *
 * Lancement : `node formations/build-biostat-2-comparaisons.mjs`
 * Sortie    : `formations/output/biostat-module-2-comparaisons.pptx`
 *
 * Public cible : M2 + doctorants (sciences santé / biomédical).
 * Style        : workshop applicatif — théorie + code R + sortie + interprétation.
 * Voix         : méthodologue qui a vu des centaines de soutenances.
 * Format       : 15 slides 16:9 LAYOUT_WIDE (13.33" × 7.5").
 */
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { plotBox } from './lib/plots.mjs';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(projectRoot, 'formations', 'output', 'biostat-module-2-comparaisons.pptx');
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
pres.title = 'Comparer des groupes — Module 2';
pres.subject = 'Formation HES — Biostatistique';

const TOTAL = 15;

function footer(slide, n) {
  slide.addText('Biostat · Module 2 · Heaven Elijah Service', {
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
    x, y, w, h,
    fontSize, fontFace: F.BODY, color: C.TEXT_DARK,
    valign: 'top', lineSpacingMultiple: 1.4,
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
    fontSize: 10.5, fontFace: F.MONO, color: C.CODE_TEXT,
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
    fontSize: 10.5, fontFace: F.MONO, color: C.WHITE,
    valign: 'top', lineSpacingMultiple: 1.3,
  });
}

/** Slide test : titre + lead + code R + sortie + aside du bas. */
function testSlide(slide, opts) {
  const { labelTxt, titleTxt, leadTxt, code, output, aside } = opts;
  label(slide, labelTxt);
  title(slide, titleTxt, 0.9, C.TEXT_DARK, 12, 28);
  prose(slide, leadTxt, 0.7, 2.0, 12, 1.4, 13);
  codeBlock(slide, code, 0.7, 3.55, 6.0, 2.85);
  outputBlock(slide, output, 7.0, 3.55, 5.83, 2.85);
  if (aside) {
    slide.addText(aside, {
      x: 0.7, y: 6.55, w: 12, h: 0.4,
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
    });
  }
}

// ============================================================
// SLIDE 1 — Titre
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };

  s.addShape('ellipse', {
    x: 9, y: -2, w: 5, h: 5,
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 },
    line: { type: 'none' },
  });

  s.addImage({ path: logoPath, x: 11.5, y: 5.8, w: 1.3, h: 1.3, transparency: 30 });

  s.addText('— FORMATION HES · BIOSTAT · MODULE 2', {
    x: 0.7, y: 0.7, w: 9, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE,
    bold: true, charSpacing: 5,
  });

  s.addText('Comparer\ndes groupes.', {
    x: 0.7, y: 1.9, w: 12, h: 2.8,
    fontSize: 62, fontFace: F.HEAD, color: C.WHITE,
    bold: true, charSpacing: -2, lineSpacingMultiple: 1.0,
  });

  s.addShape('rect', {
    x: 0.7, y: 5.05, w: 1.5, h: 0.06,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });

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
// SLIDE 2 — Pourquoi ce module
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 2);

  label(s, 'POURQUOI CE MODULE');
  title(s, 'Ton mémoire compare. Voilà ce qui se joue.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'La majorité des mémoires en santé publique et en médecine sont des études comparatives — deux traitements, deux populations, un avant/après, plusieurs centres. C\'est mathématiquement la situation où on te demandera le plus de comptes en soutenance.',
    0.7, 2.1, 7.7, 1.8, 14,
  );

  prose(s,
    'Et c\'est aussi là que les erreurs coûtent le plus cher : un mauvais choix de test invalide une conclusion principale. Pas un détail méthodologique annexe — la conclusion. Le jury le sait. Il sait aussi quels pièges chercher.',
    0.7, 4.0, 7.7, 2.2, 14,
  );

  s.addShape('roundRect', {
    x: 8.7, y: 2.1, w: 4.15, h: 4.4,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('CE MODULE COUVRE', {
    x: 8.9, y: 2.3, w: 3.8, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('9', {
    x: 8.9, y: 2.75, w: 3.8, h: 1.1,
    fontSize: 90, fontFace: F.MONO, color: C.ORANGE, bold: true,
  });
  s.addText('tests qui couvrent\n90 % des comparaisons\nrencontrées en mémoire.', {
    x: 8.9, y: 3.9, w: 3.8, h: 1.4,
    fontSize: 14, fontFace: F.BODY, color: C.WHITE, lineSpacingMultiple: 1.35,
  });
  s.addShape('rect', {
    x: 8.9, y: 5.5, w: 3.7, h: 0.02,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('Pour chacun : quand l\'utiliser, comment le coder, comment lire la sortie, ce que le jury va demander.', {
    x: 8.9, y: 5.65, w: 3.8, h: 0.85,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
    lineSpacingMultiple: 1.3,
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
  title(s, 'Choisir en trois questions.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'Avant de coder, ouvre-toi mentalement cet arbre. Trois questions à se poser dans l\'ordre — la quatrième dépend du verdict de Shapiro.',
    0.7, 2.05, 12, 0.9, 13,
  );

  // Arbre — 3 niveaux de cards
  // Q1 — Combien de groupes / variable
  const branches = [
    {
      head: '2 GROUPES INDÉPENDANTS',
      sub: 'A vs B, traitement vs contrôle',
      paramTitle: 'Quantitatif normal',
      param: 'Welch (slide 4)',
      nonParamTitle: 'Quantitatif non normal',
      nonParam: 'Mann-Whitney (slide 5)',
      qualTitle: 'Qualitatif',
      qual: 'Chi² · Fisher (8, 9)',
    },
    {
      head: '2 GROUPES APPARIÉS',
      sub: 'Avant / après, droite / gauche',
      paramTitle: 'Quantitatif normal',
      param: 't-test apparié (6)',
      nonParamTitle: 'Quantitatif non normal',
      nonParam: 'Wilcoxon signed-rank (6)',
      qualTitle: 'Qualitatif',
      qual: 'McNemar (slide 10)',
    },
    {
      head: '≥ 3 GROUPES',
      sub: 'Plusieurs traitements, centres, régions',
      paramTitle: 'Quantitatif normal',
      param: 'ANOVA + Tukey (7)',
      nonParamTitle: 'Quantitatif non normal',
      nonParam: 'Kruskal-Wallis + Dunn (8)',
      qualTitle: 'Qualitatif',
      qual: 'Chi² d\'homogénéité',
    },
  ];

  const cw = 3.96, cx0 = 0.7, cy = 3.2, ch = 3.7;
  branches.forEach((b, i) => {
    const x = cx0 + i * (cw + 0.1);
    // Bandeau orange
    s.addShape('rect', {
      x, y: cy, w: cw, h: 0.7,
      fill: { color: C.ORANGE }, line: { type: 'none' },
    });
    s.addText(b.head, {
      x: x + 0.15, y: cy + 0.08, w: cw - 0.3, h: 0.3,
      fontSize: 11, fontFace: F.HEAD, color: C.NAVY, bold: true, align: 'center', charSpacing: 2,
    });
    s.addText(b.sub, {
      x: x + 0.15, y: cy + 0.38, w: cw - 0.3, h: 0.3,
      fontSize: 10, fontFace: F.BODY, color: C.NAVY, italic: true, align: 'center',
    });

    // Corps blanc
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

  s.addText('Les numéros entre parenthèses pointent vers les slides où chaque test est détaillé.', {
    x: 0.7, y: 7.0, w: 12, h: 0.3,
    fontSize: 10, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 4 — Welch + box plot illustré
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 4);

  label(s, '2 GROUPES INDÉPENDANTS · QUANTITATIF NORMAL');
  title(s, 'Welch par défaut. Student en exception.', 0.9, C.TEXT_DARK, 12, 28);
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
// SLIDE 5 — Mann-Whitney
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 5);

  testSlide(s, {
    labelTxt: '2 GROUPES INDÉPENDANTS · QUANTITATIF NON-NORMAL',
    titleTxt: 'Mann-Whitney quand la normalité décroche.',
    leadTxt: 'Si Shapiro rejette et que le QQ-plot le confirme, Mann-Whitney prend le relais. Pas d\'hypothèse de normalité, compare les rangs au lieu des moyennes. Aussi appelé Wilcoxon rank-sum — c\'est le même test.',
    code:
      '# Mann-Whitney / Wilcoxon rank-sum\nwilcox.test(score ~ groupe,\n            data = donnees,\n            conf.int = TRUE)\n\n# Taille d\'effet r = Z / sqrt(N)\nlibrary(rstatix)\nwilcox_effsize(donnees, score ~ groupe)',
    output:
      'Wilcoxon rank sum test with\ncontinuity correction\n\nW = 312, p-value = 0.018\n95% CI [-2.5, -0.3]\n(différence des médianes)\n\nEffect size r = 0.31 (medium)',
    aside: 'En soutenance : « Vous avez utilisé Mann-Whitney parce que… ? » Réponse : « Shapiro p = 0.003, QQ-plot écart aux extrêmes — donc test non paramétrique. »',
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
  title(s, 'Avant / après, droite / gauche, deux observateurs.', 0.9, C.TEXT_DARK, 12, 26);

  prose(s,
    'L\'erreur N°1 sur les données appariées : appliquer un t-test indépendant. Tu détruis l\'information de pairage et tu perds en puissance. Le jury va te le rappeler. Le bon test dépend de la normalité — des DIFFÉRENCES, pas des valeurs brutes.',
    0.7, 2.05, 12, 1.5, 13,
  );

  // 2 codes côte à côte
  codeBlock(s,
    '# Si différences normales\nt.test(donnees$apres,\n       donnees$avant,\n       paired = TRUE)\n\n# Vérif normalité des diff.\ndiff <- donnees$apres -\n        donnees$avant\nshapiro.test(diff)',
    0.7, 3.7, 6.0, 2.7,
  );
  codeBlock(s,
    '# Si différences non-normales\nwilcox.test(donnees$apres,\n            donnees$avant,\n            paired = TRUE,\n            conf.int = TRUE)\n\n# Wilcoxon signed-rank\n# (à ne pas confondre avec\n#  Wilcoxon rank-sum)',
    7.0, 3.7, 5.83, 2.7,
  );

  s.addText('Vérifie Shapiro sur la SÉRIE DES DIFFÉRENCES (apres − avant), pas sur chaque mesure séparément. C\'est cette série qui doit être normale pour le t-test apparié.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 7 — ANOVA + Tukey, illustrée par box plot 3 groupes
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 7);

  label(s, '≥ 3 GROUPES · QUANTITATIF NORMAL');
  title(s, 'ANOVA dit « ça bouge ». Tukey dit « où ».', 0.9, C.TEXT_DARK, 12, 28);
  prose(s,
    'ANOVA répond à « y a-t-il une différence quelque part ? ». Si oui, elle ne te dit pas entre quels groupes — c\'est Tukey HSD (post-hoc) qui le précise. Sans Tukey, ton ANOVA significative n\'est pas utilisable pour conclure.',
    0.7, 2.0, 12, 1.0, 13,
  );

  codeBlock(s,
    '# Vérif préalables\nlibrary(car)\nleveneTest(score ~ region,\n           data = donnees)\n\n# ANOVA\nmodele <- aov(score ~ region,\n              data = donnees)\nsummary(modele)\n\n# Post-hoc Tukey\nTukeyHSD(modele)',
    0.7, 3.2, 4.3, 3.2,
  );

  outputBlock(s,
    'ANOVA\nF = 8.31\np = 0.0006\n\nTukey HSD\nB-A  diff +1.2\n     p = 0.012\nC-A  diff +2.4\n     p < 0.001\nC-B  diff +1.2\n     p = 0.014',
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
// SLIDE 8 — Kruskal-Wallis + Dunn
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 8);

  testSlide(s, {
    labelTxt: '≥ 3 GROUPES · QUANTITATIF NON-NORMAL',
    titleTxt: 'L\'alternative non-paramétrique de l\'ANOVA.',
    leadTxt: 'Même logique que ANOVA, sans hypothèse de normalité. Si Kruskal-Wallis rejette H₀, le post-hoc Dunn dit entre quels groupes la différence se trouve, avec ajustement pour les comparaisons multiples.',
    code:
      '# Kruskal-Wallis\nkruskal.test(score ~ region,\n             data = donnees)\n\n# Post-hoc Dunn (avec ajust.)\nlibrary(dunn.test)\ndunn.test(donnees$score,\n          donnees$region,\n          method = "bh")',
    output:
      'Kruskal-Wallis rank sum test\n\nKruskal-Wallis chi² = 14.2\ndf = 2, p-value = 0.0008\n\nDunn (Benjamini-Hochberg)\nA-B : Z = 2.1, p_adj = 0.034\nA-C : Z = 3.6, p_adj = 0.0009\nB-C : Z = 1.8, p_adj = 0.052',
    aside: 'Dunn est l\'équivalent de Tukey pour la version non-paramétrique. Le `method = "bh"` applique BH pour les comparaisons multiples.',
  });
}

// ============================================================
// SLIDE 9 — Chi² d'indépendance
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 9);

  testSlide(s, {
    labelTxt: '2 PROPORTIONS · GRANDS EFFECTIFS',
    titleTxt: 'Le Chi² d\'indépendance.',
    leadTxt: 'Compare deux proportions (succès vs échec, exposés vs non-exposés). Hypothèse à vérifier : effectifs attendus ≥ 5 dans chaque cellule. Sinon, Fisher exact (slide suivante).',
    code:
      '# Tableau de contingence\ntab <- table(donnees$exposition,\n             donnees$maladie)\n\n# Chi² + OR\nchisq.test(tab)\nlibrary(epitools)\noddsratio(tab)',
    output:
      'Pearson\'s Chi-squared test\nwith Yates\' continuity correction\n\nX² = 12.3, df = 1, p = 0.0005\n\n        Odds Ratio   IC95%\nMaladie    2.45   [1.51, 3.97]\n\n→ Exposition associée\n  à la maladie.',
    aside: 'En soutenance : rapporte OR avec IC95%, pas la p-value seule. C\'est la mesure d\'effet attendue en épidémiologie.',
  });
}

// ============================================================
// SLIDE 10 — Fisher exact
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 10);

  testSlide(s, {
    labelTxt: '2 PROPORTIONS · PETITS EFFECTIFS',
    titleTxt: 'Fisher exact : à utiliser large.',
    leadTxt: 'Quand une cellule attendue est < 5, Chi² devient instable. Fisher exact reste valide quelle que soit la taille — c\'est même légitime de l\'utiliser par défaut sur du 2×2. Il y a peu de raisons de s\'en priver.',
    code:
      '# Tableau 2×2 avec\n# effectifs réduits\ntab <- matrix(c(3, 2,\n                8, 27), nrow = 2)\n\nfisher.test(tab)\n\n# Pour des tableaux plus\n# grands, simulate.p.value\nfisher.test(tab,\n            simulate.p.value = TRUE)',
    output:
      'Fisher\'s Exact Test for\nCount Data\n\np-value = 0.027\nalternative hypothesis:\n  true odds ratio is not\n  equal to 1\n\n95% CI: [1.02, 47.5]\nsample OR estimate: 4.86',
    aside: 'L\'IC95% large signale ici un petit échantillon. Conclusion à nuancer — l\'effet existe peut-être, mais sa magnitude est imprécise.',
  });
}

// ============================================================
// SLIDE 11 — McNemar
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 11);

  testSlide(s, {
    labelTxt: 'PROPORTIONS APPARIÉES',
    titleTxt: 'McNemar : le test des discordances.',
    leadTxt: 'Quand chaque sujet est mesuré à deux moments (test A vs test B sur les mêmes patients, dépistage avant vs après formation), McNemar compare uniquement les discordances. C\'est l\'équivalent du t-test apparié, mais pour les proportions.',
    code:
      '# Tableau 2×2 apparié\n# Lignes = avant, Colonnes = après\n# (++) (+-)\n# (-+) (--)\ntab <- matrix(c(45, 12,\n                28, 15), nrow = 2)\n\nmcnemar.test(tab,\n             correct = TRUE)',
    output:
      'McNemar\'s Chi-squared test\nwith continuity correction\n\ndata:  tab\nMcNemar\'s chi² = 5.625\ndf = 1, p-value = 0.0177\n\n→ Différence significative\n  entre les deux moments.',
    aside: 'McNemar ignore les concordances (cellules ++ et --) — seules les bascules (+− et −+) portent l\'information. C\'est subtil et il faut le savoir.',
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
  title(s, 'Pour chaque test, sa mesure d\'effet.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'Le rappel le plus martelé du Module 1 : ne jamais rapporter une p-value seule. Pour chaque test ci-dessous, l\'indice de taille d\'effet correspondant — c\'est ce que tu colles dans ton tableau de résultats à côté de p.',
    0.7, 2.05, 12, 1.5, 13,
  );

  // Tableau des correspondances
  const rows = [
    ['t-test (Welch, Student, apparié)', 'Cohen\'s d',           'library(effsize); cohen.d(...)'],
    ['Mann-Whitney, Wilcoxon',           'r = Z / √N',           'library(rstatix); wilcox_effsize(...)'],
    ['ANOVA',                             'η² (eta carré) ou ω²',  'library(effectsize); eta_squared(modele)'],
    ['Kruskal-Wallis',                   'ε² (epsilon carré)',    'library(rstatix); kruskal_effsize(...)'],
    ['Chi², Fisher',                     'OR avec IC95%',         'library(epitools); oddsratio(tab)'],
    ['McNemar',                          'OR de discordances',     'library(epitools); oddsratio(...)'],
  ];

  const sy = 3.7, rowH = 0.46;
  // En-tête
  s.addShape('rect', {
    x: 0.7, y: sy - 0.05, w: 12.13, h: 0.4,
    fill: { color: C.NAVY }, line: { type: 'none' },
  });
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
    s.addShape('rect', {
      x: 0.7, y, w: 12.13, h: rowH,
      fill: { color: bg }, line: { color: C.BORDER, width: 0.5 },
    });
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

  s.addText('Tous ces packages s\'installent une fois pour toutes : install.packages(c("effsize", "rstatix", "effectsize", "epitools"))', {
    x: 0.7, y: 6.5, w: 12, h: 0.45,
    fontSize: 11, fontFace: F.MONO, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 13 — Cas d'école
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 13);

  label(s, 'CAS D\'ÉCOLE · WORKFLOW COMPLET');
  title(s, 'Un essai randomisé de A à Z.', 0.9, C.TEXT_DARK, 12, 30);

  prose(s,
    'Scénario : essai bras A (nouveau) vs bras B (standard) chez 60 patients diabétiques. Variable principale = HbA1c à 12 semaines. Voici exactement ce que tu présentes au jury — workflow et résultat.',
    0.7, 2.0, 12, 1.0, 13,
  );

  codeBlock(s,
    '# 1. Exploration\ntable(donnees$bras)\nby(donnees$hba1c, donnees$bras, summary)\n\n# 2. Vérifs préalables\nshapiro.test(donnees$hba1c[donnees$bras == "A"])\nshapiro.test(donnees$hba1c[donnees$bras == "B"])\nlibrary(car)\nleveneTest(hba1c ~ bras, data = donnees)\n\n# 3. Test principal (Welch direct)\nt.test(hba1c ~ bras, data = donnees,\n       var.equal = FALSE)\n\n# 4. Taille d\'effet\nlibrary(effsize)\ncohen.d(hba1c ~ bras, data = donnees)',
    0.7, 3.1, 7.5, 3.75,
  );

  s.addShape('roundRect', {
    x: 8.4, y: 3.1, w: 4.43, h: 3.75,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('CE QUI VA EN TABLEAU', {
    x: 8.6, y: 3.25, w: 4.1, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('Bras A · n = 30 · HbA1c moy. 7,1 (ET 0,8)\nBras B · n = 30 · HbA1c moy. 8,0 (ET 0,9)', {
    x: 8.6, y: 3.7, w: 4.1, h: 1.0,
    fontSize: 11, fontFace: F.BODY, color: C.WHITE, lineSpacingMultiple: 1.4,
  });
  s.addShape('rect', {
    x: 8.6, y: 4.85, w: 4.1, h: 0.02,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('Différence moyenne −0,9\nIC95% [−1,42 ; −0,36]\np = 0,0013 (Welch)\nCohen\'s d = −0,78 (effet moyen-fort)', {
    x: 8.6, y: 5.0, w: 4.1, h: 1.6,
    fontSize: 11, fontFace: F.BODY, color: C.WHITE, lineSpacingMultiple: 1.4,
  });
  s.addShape('rect', {
    x: 8.6, y: 6.5, w: 4.1, h: 0.02,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('Conclusion : effet cliniquement\npertinent (HbA1c −0,9 %).', {
    x: 8.6, y: 6.55, w: 4.1, h: 0.5,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true, lineSpacingMultiple: 1.3,
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
  title(s, 'Cinq erreurs qui font mal en soutenance.', 0.9, C.TEXT_DARK, 12, 28);

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
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 },
    line: { type: 'none' },
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
    console.log(`✓ ${path.relative(projectRoot, name)} — 15 slides`);
  })
  .catch(err => {
    console.error('Échec génération:', err);
    process.exit(1);
  });
