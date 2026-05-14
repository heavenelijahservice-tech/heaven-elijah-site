#!/usr/bin/env node
/**
 * Formation HES — Tests statistiques en biomédical
 * Module 3 — Trouver les liens.
 *
 * Lancement : `node formations/build-biostat-3-associations.mjs`
 * Sortie    : `formations/output/biostat-module-3-associations.pptx`
 *
 * Public cible : M2 + doctorants.
 * Format       : 15 slides 16:9 LAYOUT_WIDE (13.33" × 7.5").
 * Voix         : méthodologue qui a vu des centaines de soutenances.
 */
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(projectRoot, 'formations', 'output', 'biostat-module-3-associations.pptx');
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
pres.title = 'Trouver les liens — Module 3';
pres.subject = 'Formation HES — Biostatistique';

const TOTAL = 15;

function footer(slide, n) {
  slide.addText('Biostat · Module 3 · Heaven Elijah Service', {
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
    fill: { color: C.CODE_BG }, line: { color: C.ORANGE, width: 0.5 }, rectRadius: 0.05,
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

  s.addShape('rect', {
    x: 0.7, y: 5.05, w: 1.5, h: 0.06,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });

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
// SLIDE 2 — Pourquoi ce module
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 2);

  label(s, 'POURQUOI CE MODULE');
  title(s, 'Quand ton mémoire passe du descriptif à l\'explicatif.', 0.9, C.TEXT_DARK, 12, 26);

  prose(s,
    'Une fois que tu as décrit ton échantillon et comparé tes groupes, ton jury voudra savoir : qu\'est-ce qui explique quoi ? Quelles variables sont liées entre elles ? Quel facteur prédit la maladie une fois qu\'on contrôle les autres ?',
    0.7, 2.1, 7.7, 1.9, 14,
  );

  prose(s,
    'C\'est le passage du « combien » au « pourquoi ». Et c\'est là que les outils deviennent plus puissants — la régression logistique multivariée est sans doute LA méthode des thèses en santé publique. C\'est aussi là que les pièges deviennent plus subtils.',
    0.7, 4.1, 7.7, 2.2, 14,
  );

  s.addShape('roundRect', {
    x: 8.7, y: 2.1, w: 4.15, h: 4.4,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('CE MODULE COUVRE', {
    x: 8.9, y: 2.3, w: 3.8, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('5', {
    x: 8.9, y: 2.75, w: 3.8, h: 1.1,
    fontSize: 90, fontFace: F.MONO, color: C.ORANGE, bold: true,
  });
  s.addText('familles d\'outils :\ncorrélation, régression\nlinéaire, logistique,\najustement, diagnostic.', {
    x: 8.9, y: 3.9, w: 3.8, h: 1.4,
    fontSize: 13, fontFace: F.BODY, color: C.WHITE, lineSpacingMultiple: 1.35,
  });
  s.addShape('rect', {
    x: 8.9, y: 5.5, w: 3.7, h: 0.02,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('Pour chaque : théorie courte, code R, sortie commentée, ce que le jury va creuser.', {
    x: 8.9, y: 5.65, w: 3.8, h: 0.85,
    fontSize: 11, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true, lineSpacingMultiple: 1.3,
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
  title(s, 'Choisir le modèle selon ta variable de sortie.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'En régression, c\'est la NATURE de ta variable Y (à expliquer) qui détermine la famille de modèle. La nature et le nombre des variables X (explicatives) déterminent ensuite le détail.',
    0.7, 2.05, 12, 1.0, 13,
  );

  const branches = [
    {
      head: 'Y CONTINUE',
      sub: 'tension, HbA1c, score',
      paramTitle: '1 variable X',
      param: 'Corrélation (4)\nRég. linéaire simple (5)',
      nonParamTitle: 'Plusieurs X',
      nonParam: 'Rég. linéaire multiple (6)',
      qualTitle: 'X qualitatives',
      qual: 'Codage dummy (8)\nVIF si plusieurs (7)',
    },
    {
      head: 'Y BINAIRE',
      sub: 'malade / sain, décès / vie',
      paramTitle: '1 variable X',
      param: 'Régression logistique\nunivariée (9)',
      nonParamTitle: 'Plusieurs X (ajusté)',
      nonParam: 'Logistique multivariée (10)\naOR + IC95%',
      qualTitle: 'Évaluer le modèle',
      qual: 'AUC, Hosmer-Lemeshow (12)',
    },
    {
      head: 'Y CATÉGORIELLE OU ORDINALE',
      sub: 'stade I/II/III/IV',
      paramTitle: 'Multinomial',
      param: 'multinom() · nnet',
      nonParamTitle: 'Ordinal proportionnel',
      nonParam: 'polr() · MASS',
      qualTitle: 'Hors-scope module',
      qual: 'Couvert en formation\nindividuelle HES',
    },
  ];

  const cw = 3.96, cx0 = 0.7, cy = 3.2, ch = 3.6;
  branches.forEach((b, i) => {
    const x = cx0 + i * (cw + 0.1);
    s.addShape('rect', {
      x, y: cy, w: cw, h: 0.7, fill: { color: C.ORANGE }, line: { type: 'none' },
    });
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
        x: x + 0.15, y: yy + 0.25, w: cw - 0.3, h: 0.6,
        fontSize: 11, fontFace: F.MONO, color: C.TEXT_DARK, bold: true, lineSpacingMultiple: 1.25,
      });
      yy += 0.83;
    }
    row(b.paramTitle, b.param);
    row(b.nonParamTitle, b.nonParam);
    row(b.qualTitle, b.qual);
  });

  s.addText('Les numéros entre parenthèses pointent vers les slides où chaque méthode est détaillée.', {
    x: 0.7, y: 6.95, w: 12, h: 0.3,
    fontSize: 10, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true, align: 'center',
  });
}

// ============================================================
// SLIDE 4 — Corrélations (Pearson + Spearman)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 4);

  testSlide(s, {
    labelTxt: 'CORRÉLATIONS · PEARSON ET SPEARMAN',
    titleTxt: 'La force du lien, pas la causalité.',
    leadTxt: 'Pearson mesure une relation linéaire entre deux variables continues normales. Spearman mesure une relation monotone, sur les rangs — robuste aux données non-normales et aux valeurs extrêmes. Aucun des deux ne dit que X cause Y.',
    code:
      '# Pearson (linéaire, normales)\ncor.test(donnees$age,\n         donnees$hba1c,\n         method = "pearson")\n\n# Spearman (rangs, non-normales\n# ou relation monotone)\ncor.test(donnees$age,\n         donnees$hba1c,\n         method = "spearman")',
    output:
      'Pearson\'s product-moment\n   correlation\nt = 4.21, df = 58\np-value = 8.7e-05\nIC95% [0.30, 0.65]\nr = 0.49\n\nSpearman\'s rank correlation\nrho = 0.46, p = 0.0002\n\n→ Lien modéré et significatif.',
    aside: 'En soutenance, évite « X cause Y » — dis « X est associé à Y ». Une corrélation n\'est jamais une preuve de causalité, même r = 0.95.',
  });
}

// ============================================================
// SLIDE 5 — Régression linéaire simple
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 5);

  testSlide(s, {
    labelTxt: 'RÉGRESSION LINÉAIRE SIMPLE',
    titleTxt: 'Y = β₀ + β₁X + ε. Une équation à défendre.',
    leadTxt: 'Modélise Y comme fonction linéaire de X. Le coefficient β₁ se lit : « pour 1 unité d\'augmentation de X, Y change de β₁ unités, en moyenne ». Le R² indique la part de variance de Y expliquée par X.',
    code:
      '# Régression linéaire simple\nmodele <- lm(hba1c ~ age,\n             data = donnees)\nsummary(modele)\n\n# Vérifs visuelles\npar(mfrow = c(2, 2))\nplot(modele)',
    output:
      'Coefficients:\n            Estimate  Std.Err  t   Pr(>|t|)\n(Intercept)  4.21     0.65    6.5  3e-08\nage          0.052    0.011   4.7  1e-05\n\nMultiple R² = 0.27\nF-statistic = 22.1, p = 1e-05\n\n→ Chaque année d\'âge ajoute en\n  moyenne 0,052 % d\'HbA1c.',
    aside: 'plot(modele) affiche 4 graphes de diagnostic : linéarité, normalité des résidus, homoscédasticité, valeurs influentes. À vérifier avant de défendre les coefficients.',
  });
}

// ============================================================
// SLIDE 6 — Régression linéaire multiple
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 6);

  testSlide(s, {
    labelTxt: 'RÉGRESSION LINÉAIRE MULTIPLE',
    titleTxt: 'Plusieurs X. Le coefficient devient « ajusté ».',
    leadTxt: 'Chaque coefficient β_i se lit maintenant : « effet de X_i sur Y, à toutes les autres variables fixées ». C\'est ce qu\'on appelle l\'ajustement — la base du contrôle des facteurs de confusion en épidémiologie.',
    code:
      '# Régression multiple\nmodele <- lm(\n  hba1c ~ age + sexe + bmi + region,\n  data = donnees\n)\nsummary(modele)\n\n# Comparaison avec et sans\nanova(modele_simple, modele)',
    output:
      'Coefficients:\n          Estimate  Pr(>|t|)\nage        0.038      0.001 **\nsexeF     -0.21       0.18\nbmi        0.045      0.003 **\nregionB    0.31       0.04 *\n\nR² = 0.42, F = 18.3, p < 0.001\n\n→ Effet de l\'âge persiste après\n  ajustement.',
    aside: 'Une variable explicative dont la p-value > 0.05 peut quand même rester dans le modèle si elle est un facteur de confusion connu. Justifier toujours.',
  });
}

// ============================================================
// SLIDE 7 — Multicollinéarité (VIF)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 7);

  testSlide(s, {
    labelTxt: 'MULTICOLLINÉARITÉ · LE PIÈGE INVISIBLE',
    titleTxt: 'Deux variables X qui mesurent la même chose.',
    leadTxt: 'Quand deux variables explicatives sont fortement corrélées (BMI et tour de taille, taille et poids), le modèle ne sait plus laquelle est responsable. Coefficients instables, IC très larges, p-values trompeuses. Le VIF (Variance Inflation Factor) le détecte.',
    code:
      '# Vérifier la multicollinéarité\nlibrary(car)\nvif(modele)\n\n# Si VIF > 5 → suspect\n# Si VIF > 10 → retirer\n# une des variables corrélées\n\n# Vérifier les corrélations\ncor(donnees[, c("age","bmi","poids")])',
    output:
      'GVIF Df GVIF^(1/(2*Df))\nage    1.12  1   1.06\nsexe   1.05  1   1.02\nbmi    8.74  1   2.96  ← suspect\npoids  9.21  1   3.03  ← suspect\nregion 1.31  2   1.07\n\n→ bmi et poids redondants.\n→ Garder un seul.',
    aside: 'Question classique en soutenance : « Avez-vous vérifié la multicollinéarité dans votre modèle ? » Réponse blindée : « Oui, VIF tous < 5 sauf BMI/poids — j\'ai gardé le BMI. »',
  });
}

// ============================================================
// SLIDE 8 — Variables qualitatives en régression
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 8);

  testSlide(s, {
    labelTxt: 'VARIABLES QUALITATIVES · CODAGE DUMMY',
    titleTxt: 'Toujours déclarer la catégorie de référence.',
    leadTxt: 'Quand X est qualitative (région, profession), R crée automatiquement des variables binaires (« dummy »). Une modalité sert de référence — les autres sont comparées à elle. Ce choix de référence n\'est PAS anodin : il change la lecture des coefficients.',
    code:
      '# Déclarer en facteur\ndonnees$region <- factor(donnees$region)\n\n# Voir la référence par défaut\nlevels(donnees$region)\n# [1] "A" "B" "C"  → A = référence\n\n# Changer la référence\ndonnees$region <- relevel(\n  donnees$region, ref = "B")\n\n# Le modèle compare maintenant\n# A vs B et C vs B',
    output:
      'Coefficients:\n              Estimate  Pr(>|t|)\n(Intercept)    7.45      <2e-16\nregionA       -0.42       0.03 *\nregionC        0.18       0.31\n\n→ B est la référence ici.\n→ Région A a 0,42 d\'HbA1c\n  EN MOINS que B (p = 0,03).\n→ Région C ne diffère pas\n  significativement de B.',
    aside: 'Dans ton tableau de résultats, mentionne explicitement « catégorie de référence : B ». Sinon, le lecteur ne sait pas ce qu\'il compare.',
  });
}

// ============================================================
// SLIDE 9 — Régression logistique simple
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 9);

  testSlide(s, {
    labelTxt: 'RÉGRESSION LOGISTIQUE UNIVARIÉE',
    titleTxt: 'Y est binaire. Logit, OR, et la sortie qui piège.',
    leadTxt: 'Quand Y est binaire (malade/sain, décès/vie), tu utilises la régression logistique. Subtilité : R sort les coefficients en log-odds. Pour obtenir l\'OR, il faut exponentier. Toujours.',
    code:
      '# Régression logistique\nmodele <- glm(\n  maladie ~ age,\n  data = donnees,\n  family = binomial\n)\nsummary(modele)\n\n# Conversion en OR + IC95%\nexp(coef(modele))\nexp(confint(modele))',
    output:
      'Coefficients:\n            Estimate Pr(>|z|)\n(Intercept) -4.21    1e-08\nage          0.062    0.0003 ***\n\n# Exponentiation:\n            OR\n(Intercept) 0.015\nage         1.064\n\nIC95% age: [1.029, 1.101]\n\n→ +1 an d\'âge = OR 1,064\n  (6,4 % d\'odds supplémentaires).',
    aside: 'Sans `exp()`, tes coefficients sont en échelle log et ininterprétables cliniquement. Beaucoup d\'étudiants rapportent les log-odds par erreur — c\'est l\'erreur classique.',
  });
}

// ============================================================
// SLIDE 10 — Régression logistique multivariée
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 10);

  testSlide(s, {
    labelTxt: 'RÉGRESSION LOGISTIQUE MULTIVARIÉE',
    titleTxt: 'L\'OR ajusté : LE modèle des thèses santé publique.',
    leadTxt: 'En épidémiologie, on cherche presque toujours à mesurer l\'effet d\'une exposition AJUSTÉ pour des facteurs de confusion (âge, sexe, comorbidités). C\'est exactement ce que fait la logistique multivariée. Le résultat = aOR (adjusted Odds Ratio).',
    code:
      '# Modèle ajusté\nmodele <- glm(\n  maladie ~ exposition + age + sexe + tabac,\n  data = donnees,\n  family = binomial\n)\n\n# Tableau d\'OR ajustés\nlibrary(broom)\ntidy(modele, exponentiate = TRUE,\n     conf.int = TRUE)',
    output:
      'term       estimate  conf.low conf.high  p.value\nexposition  2.45      1.51     3.97       0.0003\nage         1.04      1.02     1.06       0.001\nsexeF       0.78      0.51     1.18       0.24\ntabac       3.12      1.95     5.02       <0.001\n\n→ aOR exposition = 2.45\n  (1.51 — 3.97), p = 0.0003.\n→ Tabac est aussi un facteur\n  fort, indépendamment.',
    aside: 'Règle de 10 (rule of ten events per variable) : pour une régression logistique stable, il faut au moins 10 « événements » par variable explicative. Sinon, surajustement (overfitting).',
  });
}

// ============================================================
// SLIDE 11 — Interpréter OR + IC95%
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 11);

  label(s, 'LIRE UN TABLEAU D\'OR · LE TEST DE LA SOUTENANCE');
  title(s, 'Trois lectures à maîtriser parfaitement.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'Un président de jury va te demander d\'interpréter UNE LIGNE de ton tableau de résultats. Voici les trois cas types — et la phrase exacte à dire.',
    0.7, 2.05, 12, 0.9, 13,
  );

  // 3 cartes avec exemples
  const cy = 3.15, cw = 3.95, ch = 3.4;
  function card(idx, lbl, lblColor, mainTxt, sentence, interp) {
    const x = 0.7 + idx * (cw + 0.1);
    s.addShape('roundRect', {
      x, y: cy, w: cw, h: ch, fill: { color: C.WHITE }, line: { color: lblColor, width: 1.5 }, rectRadius: 0.1,
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
// SLIDE 12 — Évaluer le modèle logistique
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 12);

  testSlide(s, {
    labelTxt: 'ÉVALUER UN MODÈLE LOGISTIQUE',
    titleTxt: 'AUC, calibration, R² : trois angles à connaître.',
    leadTxt: 'Une fois ton modèle posé, le jury va te demander : est-il bon ? Trois indicateurs à rapporter — discrimination (AUC), calibration (Hosmer-Lemeshow), explication (R² de McFadden ou Nagelkerke).',
    code:
      '# Discrimination : aire sous ROC\nlibrary(pROC)\nproba <- predict(modele, type = "response")\nauc(donnees$maladie, proba)\n\n# Calibration : Hosmer-Lemeshow\nlibrary(ResourceSelection)\nhoslem.test(donnees$maladie, proba, g = 10)\n\n# Pseudo-R²\nlibrary(DescTools)\nPseudoR2(modele, which = "Nagelkerke")',
    auc: 'AUC = 0.78',
    output:
      'AUC: 0.782\n(95% CI: 0.71 — 0.85)\n→ Discrimination correcte\n  (> 0.7 acceptable, > 0.8 bon)\n\nHosmer-Lemeshow X² = 8.4\ndf = 8, p = 0.39\n→ p > 0.05 = calibration OK\n  (paradoxalement, p élevé = bon)\n\nNagelkerke R² = 0.31',
    aside: 'Le piège Hosmer-Lemeshow : un p > 0.05 est BON (le modèle calibre bien). Inverse de la lecture habituelle. Beaucoup d\'étudiants se plantent là-dessus.',
  });
}

// ============================================================
// SLIDE 13 — Cas d'école
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 13);

  label(s, 'CAS D\'ÉCOLE · ÉTUDE CAS-TÉMOIN');
  title(s, 'Cancer du col, exposition HPV, ajustement.', 0.9, C.TEXT_DARK, 12, 28);

  prose(s,
    'Étude cas-témoin : 200 cas (cancer du col), 400 témoins. Exposition principale = HPV. Facteurs de confusion à contrôler : âge, parité, tabac, statut socioéconomique. Voilà le workflow complet attendu.',
    0.7, 2.0, 12, 1.0, 13,
  );

  codeBlock(s,
    '# 1. Modèle univarié (HPV seul)\nmod_univ <- glm(\n  cas ~ hpv,\n  data = donnees,\n  family = binomial\n)\n\n# 2. Modèle ajusté\nmod_aj <- glm(\n  cas ~ hpv + age + parite + tabac + ses,\n  data = donnees,\n  family = binomial\n)\n\n# 3. Tableau final aOR\nlibrary(broom)\ntidy(mod_aj, exponentiate = TRUE,\n     conf.int = TRUE)\n\n# 4. Vérifs : VIF + AUC + HL\nlibrary(car); vif(mod_aj)\nlibrary(pROC); auc(donnees$cas,\n  predict(mod_aj, type = "response"))',
    0.7, 3.1, 7.5, 3.75,
  );

  s.addShape('roundRect', {
    x: 8.4, y: 3.1, w: 4.43, h: 3.75,
    fill: { color: C.NAVY }, line: { type: 'none' }, rectRadius: 0.1,
  });
  s.addText('TABLEAU FINAL', {
    x: 8.6, y: 3.25, w: 4.1, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText('OR univarié HPV = 8,3\nIC95% [5,2 ; 13,2]\n\naOR ajusté HPV = 6,4\nIC95% [3,9 ; 10,5]\np < 0,001', {
    x: 8.6, y: 3.65, w: 4.1, h: 1.7,
    fontSize: 11, fontFace: F.BODY, color: C.WHITE, lineSpacingMultiple: 1.4,
  });
  s.addShape('rect', { x: 8.6, y: 5.4, w: 4.1, h: 0.02, fill: { color: C.ORANGE }, line: { type: 'none' } });
  s.addText('VIF max : 2,1 (OK)\nAUC : 0,84 (bon)\nHosmer-Lemeshow : p = 0,42 (OK)', {
    x: 8.6, y: 5.5, w: 4.1, h: 0.9,
    fontSize: 11, fontFace: F.BODY, color: C.WHITE, lineSpacingMultiple: 1.4,
  });
  s.addText('Conclusion : HPV reste un facteur de risque fort après ajustement.', {
    x: 8.6, y: 6.45, w: 4.1, h: 0.4,
    fontSize: 10, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
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
  title(s, 'Cinq erreurs qui font perdre des points.', 0.9, C.TEXT_DARK, 12, 28);

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

  s.addText('Le Module 4 entre dans le détail des outils spécifiques au biomédical : courbes ROC, sensibilité et spécificité, Kappa de Cohen pour la concordance, Kaplan-Meier et Cox pour la survie. C\'est là que tu deviens autonome sur les méthodes d\'évaluation diagnostique et de pronostic.', {
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
