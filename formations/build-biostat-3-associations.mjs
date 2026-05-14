#!/usr/bin/env node
/**
 * Formation HES — Tests statistiques en biomédical
 * Module 3 — Trouver les liens.
 * V3 — refonte visuelle (illustrations pédagogiques majoritaires).
 */
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  plotScatter, plotROC, plotForest, plotSigmoid, plotVenn, plotFlow,
} from './lib/plots.mjs';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(projectRoot, 'formations', 'output', 'biostat-module-3-associations.pptx');
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
pres.title = 'Trouver les liens — Module 3';
pres.subject = 'Formation HES — Biostatistique';

const TOTAL = 15;

function footer(s, n) {
  s.addText('Biostat · Module 3 · Heaven Elijah Service', {
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
  s.addText('— FORMATION HES · BIOSTAT · MODULE 3', {
    x: 0.7, y: 0.7, w: 9, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });
  s.addText('Trouver\nles liens.', {
    x: 0.7, y: 1.9, w: 12, h: 2.8,
    fontSize: 62, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -2, lineSpacingMultiple: 1.0,
  });
  s.addShape('rect', { x: 0.7, y: 5.05, w: 1.5, h: 0.06, fill: { color: C.ORANGE }, line: { type: 'none' } });
  s.addText('De la corrélation à la régression logistique ajustée.', {
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
// SLIDE 2 — Pourquoi + flow descriptif → explicatif
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 2);
  label(s, 'POURQUOI CE MODULE');
  title(s, 'Quand ton mémoire passe du descriptif à l\'explicatif.', 0.9, C.TEXT_DARK, 12, 26);
  prose(s,
    'Une fois ton échantillon décrit et tes groupes comparés, ton jury voudra savoir : qu\'est-ce qui explique quoi ? Quel facteur prédit la maladie une fois qu\'on contrôle les autres ? C\'est le passage du « combien » au « pourquoi ».',
    0.7, 2.0, 12, 1.6, 14,
  );
  plotFlow(s, {
    x: 0.7, y: 3.8, w: 12.13, h: 1.6,
    title: 'Trois temps en analyse',
    steps: [
      { label: 'Descriptif',  sub: 'Moyennes\nFréquences\nDistributions' },
      { label: 'Comparatif',  sub: 'Test selon\nle plan\n(Module 2)' },
      { label: 'Explicatif',  sub: 'Régressions\nOR ajustés\nIC95%' },
    ],
  });
  s.addShape('rect', { x: 0.7, y: 5.7, w: 0.06, h: 1.1, fill: { color: C.ORANGE }, line: { type: 'none' } });
  s.addText('Ce module couvre la régression — l\'outil qui te permet de modéliser un lien tout en contrôlant les facteurs de confusion. La régression logistique multivariée est sans doute LA méthode des thèses en santé publique.', {
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
  title(s, 'Choisir le modèle selon ta variable de sortie.');
  prose(s,
    'En régression, c\'est la NATURE de ta variable Y (à expliquer) qui détermine la famille de modèle. La nature et le nombre des variables X (explicatives) déterminent ensuite le détail.',
    0.7, 2.05, 12, 1.0, 13,
  );
  const branches = [
    {
      head: 'Y CONTINUE', sub: 'tension, HbA1c, score',
      r1: ['1 variable X', 'Corrélation (4)\nRég. linéaire simple (5)'],
      r2: ['Plusieurs X', 'Rég. linéaire multiple (6)'],
      r3: ['Multicollinéarité', 'VIF (slide 7)'],
    },
    {
      head: 'Y BINAIRE', sub: 'malade / sain, décès / vie',
      r1: ['1 variable X', 'Logistique univariée (9)'],
      r2: ['Plusieurs X (ajusté)', 'Logistique multivariée (10)\naOR + IC95% (11)'],
      r3: ['Évaluer le modèle', 'AUC, Hosmer-Lemeshow (12)'],
    },
    {
      head: 'Y CATÉGORIELLE OU ORDINALE', sub: 'stade I/II/III/IV',
      r1: ['Multinomial', 'multinom() · nnet'],
      r2: ['Ordinal proportionnel', 'polr() · MASS'],
      r3: ['Hors-scope module', 'Couvert en formation\nindividuelle HES'],
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
      fontSize: 10, fontFace: F.BODY, color: C.NAVY, italic: true, align: 'center',
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
        x: x + 0.15, y: yy + 0.25, w: cw - 0.3, h: 0.6,
        fontSize: 11, fontFace: F.MONO, color: C.TEXT_DARK, bold: true, lineSpacingMultiple: 1.25,
      });
      yy += 0.83;
    });
  });
}

// ============================================================
// SLIDE 4 — Corrélations + scatter
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 4);
  label(s, 'CORRÉLATIONS · PEARSON ET SPEARMAN');
  title(s, 'La force du lien, pas la causalité.');
  prose(s,
    'Pearson mesure une relation linéaire entre deux continues normales. Spearman mesure une relation monotone sur les rangs — robuste aux données non-normales et aux valeurs extrêmes. Aucun des deux ne dit que X cause Y.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Pearson (linéaire,\n# normales)\ncor.test(donnees$age,\n         donnees$hba1c,\n         method = "pearson")\n\n# Spearman (rangs)\ncor.test(donnees$age,\n         donnees$hba1c,\n         method = "spearman")',
    0.7, 3.2, 4.3, 3.2,
  );
  outputBlock(s,
    'Pearson\nr = 0.49\nIC95%\n[0.30, 0.65]\np = 8.7e-05\n\nSpearman\nrho = 0.46\np = 0.0002',
    5.15, 3.2, 2.8, 3.2,
  );
  plotScatter(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'HbA1c en fonction de l\'âge · r = 0.49',
    slope: 0.7, intercept: 0.12, scatter: 0.12,
  });
  s.addText('En soutenance, évite « X cause Y » — dis « X est associé à Y ». Une corrélation n\'est jamais une preuve de causalité, même r = 0.95.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 5 — Régression linéaire simple + scatter
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 5);
  label(s, 'RÉGRESSION LINÉAIRE SIMPLE');
  title(s, 'Y = β₀ + β₁X + ε. Une équation à défendre.');
  prose(s,
    'Modélise Y comme fonction linéaire de X. β₁ se lit : « pour 1 unité d\'augmentation de X, Y change de β₁ unités, en moyenne ». R² indique la part de variance de Y expliquée par X.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Régression simple\nmodele <- lm(\n  hba1c ~ age,\n  data = donnees)\n\nsummary(modele)\n\n# Diagnostics\npar(mfrow = c(2, 2))\nplot(modele)',
    0.7, 3.2, 4.3, 3.2,
  );
  outputBlock(s,
    'Coefficients\n(Intercept) 4.21\n  Pr <3e-08\nage         0.052\n  Pr <1e-05\n\nR² = 0.27\nF p < 1e-05',
    5.15, 3.2, 2.8, 3.2,
  );
  plotScatter(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'Y = 4.21 + 0.052·âge · R² = 0.27',
    slope: 0.55, intercept: 0.15, scatter: 0.10,
  });
  s.addText('plot(modele) affiche 4 graphes de diagnostic : linéarité, normalité des résidus, homoscédasticité, valeurs influentes. À vérifier avant de défendre les coefficients.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 6 — Régression multiple + forest de coefficients
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 6);
  label(s, 'RÉGRESSION LINÉAIRE MULTIPLE');
  title(s, 'Plusieurs X. Le coefficient devient « ajusté ».');
  prose(s,
    'Chaque coefficient β_i se lit maintenant : « effet de X_i sur Y, à toutes les autres variables fixées ». C\'est ce qu\'on appelle l\'ajustement — la base du contrôle des facteurs de confusion en épidémiologie.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Régression multiple\nmodele <- lm(\n  hba1c ~ age + sexe\n        + bmi + region,\n  data = donnees)\nsummary(modele)\n\n# Comparaison modèles\nanova(modele_simple,\n      modele)',
    0.7, 3.2, 4.3, 3.2,
  );
  // Forest de coefficients
  plotForest(s, {
    x: 5.15, y: 3.2, w: 7.68, h: 3.2,
    title: 'Coefficients ajustés · effet sur HbA1c',
    xLabel: 'Coefficient β (effet par unité)',
    refLine: 0,
    items: [
      { label: 'âge',    est: 0.038, low: 0.015, high: 0.061, accent: true  },
      { label: 'sexe F', est: -0.21, low: -0.52, high: 0.10,  accent: false },
      { label: 'BMI',    est: 0.045, low: 0.015, high: 0.075, accent: true  },
      { label: 'région B', est: 0.31, low: 0.01, high: 0.61,  accent: true  },
    ],
  });
  s.addText('Une variable explicative dont la p-value > 0.05 peut quand même rester dans le modèle si elle est un facteur de confusion connu. Justifie toujours.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 7 — Multicollinéarité + Venn
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 7);
  label(s, 'MULTICOLLINÉARITÉ · LE PIÈGE INVISIBLE');
  title(s, 'Deux variables X qui mesurent la même chose.');
  prose(s,
    'Quand deux variables explicatives se chevauchent fortement (BMI et tour de taille, taille et poids), le modèle ne sait plus laquelle est responsable. Coefficients instables, IC très larges, p-values trompeuses. Le VIF le détecte.',
    0.7, 2.0, 12, 1.4, 13,
  );
  codeBlock(s,
    '# Vérifier la multicollinéarité\nlibrary(car)\nvif(modele)\n\n# Si VIF > 5 → suspect\n# Si VIF > 10 → retirer\n# une des variables corrélées\n\n# Vérifier corrélations\ncor(donnees[, c("age",\n              "bmi","poids")])',
    0.7, 3.6, 5.5, 3.0,
  );
  // Venn diagram montrant le chevauchement BMI/poids
  plotVenn(s, {
    x: 6.4, y: 3.6, w: 6.43, h: 3.0,
    title: 'BMI et poids · forte multicollinéarité',
    leftLabel: 'BMI',
    rightLabel: 'Poids',
    overlap: 0.7,
  });
  s.addText('Question classique en soutenance : « Avez-vous vérifié la multicollinéarité dans votre modèle ? » Réponse blindée : « Oui, VIF tous < 5 sauf BMI/poids — j\'ai gardé le BMI. »', {
    x: 0.7, y: 6.7, w: 12, h: 0.35,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 8 — Variables qualitatives
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 8);
  label(s, 'VARIABLES QUALITATIVES · CODAGE DUMMY');
  title(s, 'Toujours déclarer la catégorie de référence.');
  prose(s,
    'Quand X est qualitative (région, profession), R crée automatiquement des variables binaires (« dummy »). Une modalité sert de référence — les autres sont comparées à elle. Ce choix de référence change la lecture des coefficients.',
    0.7, 2.0, 12, 1.4, 13,
  );
  codeBlock(s,
    '# Déclarer en facteur\ndonnees$region <- factor(donnees$region)\n\n# Voir la référence par défaut\nlevels(donnees$region)\n# [1] "A" "B" "C"  → A = référence\n\n# Changer la référence\ndonnees$region <- relevel(\n  donnees$region, ref = "B")\n\n# Le modèle compare maintenant\n# A vs B et C vs B',
    0.7, 3.55, 6.0, 3.0,
  );
  outputBlock(s,
    'Coefficients (ref = B):\n             Estimate  Pr(>|t|)\n(Intercept)   7.45      <2e-16\nregionA      -0.42       0.03 *\nregionC       0.18       0.31\n\n→ Région A a 0,42 d\'HbA1c\n  EN MOINS que B (p = 0,03).\n→ Région C ne diffère pas\n  significativement de B.',
    7.0, 3.55, 5.83, 3.0,
  );
  s.addText('Dans ton tableau de résultats, mentionne explicitement « catégorie de référence : B ». Sinon, le lecteur ne sait pas ce qu\'il compare.', {
    x: 0.7, y: 6.7, w: 12, h: 0.35,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 9 — Logistique simple + sigmoid
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 9);
  label(s, 'RÉGRESSION LOGISTIQUE UNIVARIÉE');
  title(s, 'Y est binaire. Logit, OR, et la sortie qui piège.');
  prose(s,
    'Quand Y est binaire, tu utilises la régression logistique. Elle modélise la probabilité de Y = 1 via une fonction sigmoïde. Subtilité : R sort les coefficients en log-odds. Pour obtenir l\'OR, il faut exponentier.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Régression logistique\nmodele <- glm(\n  maladie ~ age,\n  data = donnees,\n  family = binomial)\n\nsummary(modele)\n\n# Conversion en OR + IC95%\nexp(coef(modele))\nexp(confint(modele))',
    0.7, 3.2, 4.3, 3.2,
  );
  outputBlock(s,
    'Coefficients\nage 0.062\n  Pr 0.0003\n\nExponentiation:\nOR age = 1.064\nIC95%\n[1.029, 1.101]\n\n→ +1 an = +6.4 %\n  d\'odds.',
    5.15, 3.2, 2.8, 3.2,
  );
  plotSigmoid(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'P(maladie) selon X · courbe sigmoïde',
  });
  s.addText('Sans `exp()`, tes coefficients sont en échelle log et ininterprétables cliniquement. Beaucoup d\'étudiants rapportent les log-odds par erreur — c\'est l\'erreur classique.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 10 — Logistique multivariée + forest aOR
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 10);
  label(s, 'RÉGRESSION LOGISTIQUE MULTIVARIÉE');
  title(s, 'L\'OR ajusté : LE modèle des thèses santé publique.');
  prose(s,
    'En épidémiologie, on cherche presque toujours à mesurer l\'effet d\'une exposition AJUSTÉ pour des facteurs de confusion (âge, sexe, comorbidités). Le résultat = aOR (adjusted Odds Ratio).',
    0.7, 2.0, 12, 1.2, 13,
  );
  codeBlock(s,
    '# Modèle ajusté\nmodele <- glm(\n  maladie ~ exposition +\n            age + sexe + tabac,\n  data = donnees,\n  family = binomial)\n\nlibrary(broom)\ntidy(modele, exponentiate = TRUE,\n     conf.int = TRUE)',
    0.7, 3.4, 5.5, 3.2,
  );
  plotForest(s, {
    x: 6.4, y: 3.4, w: 6.43, h: 3.2,
    title: 'aOR ajustés · IC95%',
    xLabel: 'Odds Ratio ajusté',
    refLine: 1,
    items: [
      { label: 'exposition', est: 2.45, low: 1.51, high: 3.97, accent: true  },
      { label: 'âge',        est: 1.04, low: 1.02, high: 1.06, accent: false },
      { label: 'sexe F',     est: 0.78, low: 0.51, high: 1.18, accent: false },
      { label: 'tabac',      est: 3.12, low: 1.95, high: 5.02, accent: true  },
    ],
  });
  s.addText('Règle de 10 : pour une logistique stable, il faut au moins 10 « événements » par variable explicative. Sinon, surajustement (overfitting).', {
    x: 0.7, y: 6.7, w: 12, h: 0.35,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 11 — Lire un OR
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 11);
  label(s, 'LIRE UN TABLEAU D\'OR · LE TEST DE LA SOUTENANCE');
  title(s, 'Trois lectures à maîtriser parfaitement.');
  prose(s,
    'Un président de jury va te demander d\'interpréter UNE LIGNE de ton tableau de résultats. Voici les trois cas types — et la phrase exacte à dire.',
    0.7, 2.05, 12, 0.9, 13,
  );
  const cy = 3.15, cw = 3.95, ch = 3.4;
  function card(idx, lbl, lblColor, mainTxt, sentence, interp) {
    const x = 0.7 + idx * (cw + 0.1);
    s.addShape('roundRect', {
      x, y: cy, w: cw, h: ch,
      fill: { color: C.WHITE }, line: { color: lblColor, width: 1.5 }, rectRadius: 0.1,
    });
    s.addText(lbl, {
      x: x + 0.2, y: cy + 0.15, w: cw - 0.4, h: 0.35,
      fontSize: 11, fontFace: F.HEAD, color: lblColor, bold: true, charSpacing: 3,
    });
    s.addText(mainTxt, {
      x: x + 0.2, y: cy + 0.55, w: cw - 0.4, h: 0.55,
      fontSize: 16, fontFace: F.MONO, color: C.TEXT_DARK, bold: true,
    });
    s.addText(sentence, {
      x: x + 0.2, y: cy + 1.2, w: cw - 0.4, h: 1.0,
      fontSize: 12, fontFace: F.HEAD, color: C.TEXT_DARK, italic: true, lineSpacingMultiple: 1.3,
    });
    s.addText(interp, {
      x: x + 0.2, y: cy + 2.3, w: cw - 0.4, h: 1.0,
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, lineSpacingMultiple: 1.3,
    });
  }
  card(0, 'AUGMENTE LE RISQUE', C.RED,
    'aOR = 2,45\nIC95% [1,51 ; 3,97]',
    '« Les exposés ont 2,45 fois plus de chances de développer la maladie que les non-exposés, à âge, sexe et tabac fixés. »',
    'IC ne croise pas 1 → association statistiquement significative.',
  );
  card(1, 'PROTÈGE', C.GREEN,
    'aOR = 0,42\nIC95% [0,28 ; 0,65]',
    '« Les exposés ont 58 % de chances en moins de développer la maladie, à covariables fixées. »',
    'aOR < 1 = effet protecteur. (1 − 0,42) × 100 = 58 % de réduction.',
  );
  card(2, 'PAS DE CONCLUSION', C.TEXT_MUTED,
    'aOR = 1,30\nIC95% [0,85 ; 1,98]',
    '« Pas d\'association statistiquement significative entre l\'exposition et la maladie dans notre étude. »',
    'IC croise 1. On ne dit JAMAIS « pas d\'effet » — on dit « pas mis en évidence ».',
  );
}

// ============================================================
// SLIDE 12 — Évaluer modèle logistique + ROC
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 12);
  label(s, 'ÉVALUER UN MODÈLE LOGISTIQUE');
  title(s, 'AUC, calibration, R² : trois angles à connaître.');
  prose(s,
    'Une fois ton modèle posé, le jury va demander : est-il bon ? Trois indicateurs — discrimination (AUC), calibration (Hosmer-Lemeshow), explication (R² de McFadden ou Nagelkerke).',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Discrimination\nlibrary(pROC)\nproba <- predict(modele,\n                  type = "response")\nauc(donnees$maladie, proba)\nroc_obj <- roc(donnees$maladie,\n               proba)\nplot(roc_obj)\n\n# Calibration\nlibrary(ResourceSelection)\nhoslem.test(donnees$maladie,\n            proba, g = 10)',
    0.7, 3.2, 4.3, 3.2,
  );
  outputBlock(s,
    'AUC = 0.782\nIC95%\n[0.71, 0.85]\n→ discrimination\n  correcte.\n\nHL X² = 8.4\np = 0.39\n→ calibration OK\n  (p > 0.05 = bon).',
    5.15, 3.2, 2.8, 3.2,
  );
  plotROC(s, {
    x: 8.1, y: 3.2, w: 4.73, h: 3.2,
    title: 'Courbe ROC · modèle logistique',
    auc: '0.78',
  });
  s.addText('Le piège Hosmer-Lemeshow : un p > 0.05 est BON (le modèle calibre bien). Inverse de la lecture habituelle. Beaucoup d\'étudiants se plantent là-dessus.', {
    x: 0.7, y: 6.55, w: 12, h: 0.4,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 13 — Cas d'école + forest final aOR
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 13);
  label(s, 'CAS D\'ÉCOLE · ÉTUDE CAS-TÉMOIN');
  title(s, 'Cancer du col, exposition HPV, ajustement complet.');
  prose(s,
    '200 cas, 400 témoins. Exposition principale = HPV. Facteurs de confusion : âge, parité, tabac, statut socioéconomique. Voici le tableau final aOR — exactement ce qu\'on attend dans une thèse.',
    0.7, 2.0, 12, 1.0, 13,
  );
  codeBlock(s,
    '# Modèle ajusté\nmod_aj <- glm(\n  cas ~ hpv + age + parite\n        + tabac + ses,\n  data = donnees,\n  family = binomial)\n\nlibrary(broom)\ntidy(mod_aj,\n     exponentiate = TRUE,\n     conf.int = TRUE)',
    0.7, 3.2, 5.3, 3.4,
  );
  plotForest(s, {
    x: 6.2, y: 3.2, w: 6.63, h: 3.4,
    title: 'aOR · facteurs de risque cancer du col',
    xLabel: 'Odds Ratio ajusté',
    refLine: 1,
    items: [
      { label: 'HPV',     est: 6.4,  low: 3.9,  high: 10.5, accent: true  },
      { label: 'âge',     est: 1.03, low: 1.01, high: 1.05, accent: false },
      { label: 'parité',  est: 1.85, low: 1.20, high: 2.85, accent: false },
      { label: 'tabac',   est: 1.42, low: 0.95, high: 2.13, accent: false },
      { label: 'SES bas', est: 1.65, low: 1.05, high: 2.59, accent: false },
    ],
  });
  s.addText('Conclusion : HPV reste le facteur de risque dominant, même après ajustement. aOR = 6,4 (IC95% [3,9 ; 10,5]).', {
    x: 0.7, y: 6.65, w: 12, h: 0.35,
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
  label(s, 'CINQ PIÈGES SPÉCIFIQUES AUX RÉGRESSIONS');
  title(s, 'Cinq erreurs qui font perdre des points.');
  const items = [
    ['Confondre association et causalité',           'Une corrélation forte ou un aOR significatif ne PROUVE pas que X cause Y. Toujours dire « associé à », pas « cause de ».'],
    ['Trop de variables dans un modèle logistique',  'La règle des 10 événements par variable. 50 cas / 5 variables = limite. 30 cas / 7 variables = surajustement assuré.'],
    ['Ignorer la multicollinéarité',                 'Deux X corrélées entre elles. Coefficients instables, IC énormes. VIF > 5 = à retirer.'],
    ['Mauvaise catégorie de référence',              'R prend la première par ordre alphabétique. Si ce n\'est pas celle qui te sert, déclare-le explicitement avec relevel().'],
    ['Rapporter des log-odds au lieu d\'OR',         'Sortie brute de glm = log-odds. Sans exp(), tes nombres ne veulent rien dire cliniquement. Erreur classique.'],
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
  s.addText('Tu sais ajuster.\nPasse aux outils biomédicaux.', {
    x: 0.7, y: 1.5, w: 12, h: 2.6,
    fontSize: 38, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -1, lineSpacingMultiple: 1.05,
  });
  s.addText('Le Module 4 entre dans le détail des outils spécifiques au biomédical : courbes ROC, sensibilité et spécificité, Kappa de Cohen pour la concordance, Kaplan-Meier et Cox pour la survie.', {
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
