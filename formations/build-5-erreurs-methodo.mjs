#!/usr/bin/env node
/**
 * Génère la formation HES "Les 5 erreurs méthodologiques qui font échouer un mémoire".
 *
 * Lancement : `node formations/build-5-erreurs-methodo.mjs`
 * Sortie    : `formations/output/5-erreurs-methodologiques-memoire.pptx`
 *
 * Public cible : étudiants M2 + doctorants (sciences santé / sciences sociales).
 * Format       : 15 slides 16:9 LAYOUT_WIDE (13.33" × 7.5").
 * Identité     : palette HES (navy / orange / cream), motif "numéro géant"
 *                pour les erreurs, footer discret sur chaque slide.
 */
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(projectRoot, 'formations', 'output', '5-erreurs-methodologiques-memoire.pptx');
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
};

// Police de marque (cohérente avec le site qui utilise Geist)
const F = {
  HEAD: 'Calibri',
  BODY: 'Calibri',
  MONO: 'Consolas',
};

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.33" × 7.5"
pres.author = 'Heaven Elijah Service';
pres.company = 'Heaven Elijah Service';
pres.title = 'Les 5 erreurs méthodologiques qui font échouer un mémoire';
pres.subject = 'Formation HES — Méthodologie de recherche';

const TOTAL_SLIDES = 15;

/** Footer discret : nom HES à gauche, n° de slide à droite. */
function footer(slide, n) {
  slide.addText('Heaven Elijah Service · Formation méthodo', {
    x: 0.5, y: 7.05, w: 7, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true,
  });
  slide.addText(`${n} / ${TOTAL_SLIDES}`, {
    x: 11.83, y: 7.05, w: 1, h: 0.3,
    fontSize: 9, fontFace: F.BODY, color: C.TEXT_MUTED, align: 'right',
  });
}

/** Petit label orange en majuscules, style "— LABEL". */
function label(slide, text, x, y) {
  slide.addText(`— ${text}`, {
    x, y, w: 6, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE,
    bold: true, charSpacing: 4,
  });
}

// ============================================================
// SLIDE 1 — Titre
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };

  // Halo orange top-right
  s.addShape('ellipse', {
    x: 9, y: -2, w: 6, h: 6,
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 },
    line: { type: 'none' },
  });

  // Logo discret bottom-right
  s.addImage({ path: logoPath, x: 11.5, y: 5.8, w: 1.3, h: 1.3, transparency: 30 });

  // Brand label
  s.addText('— FORMATION HES', {
    x: 0.7, y: 0.7, w: 6, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE,
    bold: true, charSpacing: 5,
  });

  // Titre principal
  s.addText('Les 5 erreurs méthodologiques\nqui font échouer un mémoire', {
    x: 0.7, y: 2.0, w: 12, h: 2.6,
    fontSize: 48, fontFace: F.HEAD, color: C.WHITE,
    bold: true, charSpacing: -1, lineSpacingMultiple: 1.0,
  });

  // Trait orange
  s.addShape('rect', {
    x: 0.7, y: 4.85, w: 1.5, h: 0.06,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });

  // Sous-titre
  s.addText('— et comment les éviter avant ta soutenance.', {
    x: 0.7, y: 5.05, w: 11, h: 0.6,
    fontSize: 22, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
  });

  // Bas : meta
  s.addText('Mini-formation · 15 slides · ~30 min de lecture', {
    x: 0.7, y: 6.5, w: 7, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.ORANGE,
  });

  s.addText('heavenelijahservice.org', {
    x: 6, y: 6.5, w: 6.83, h: 0.3,
    fontSize: 11, fontFace: F.MONO, color: C.TEXT_LIGHT, align: 'right',
  });
}

// ============================================================
// SLIDE 2 — Contexte
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 2);

  label(s, 'CONTEXTE', 0.7, 0.5);
  s.addText('Pourquoi cette formation ?', {
    x: 0.7, y: 0.9, w: 12, h: 0.9,
    fontSize: 36, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, charSpacing: -1,
  });

  // Paragraphe gauche
  s.addText(
    [
      { text: 'Depuis 2021, Heaven Elijah Service accompagne des étudiants en master, des doctorants et des chercheurs sur leur mémoire, thèse ou article.', options: { breakLine: true, paraSpaceAfter: 12 } },
      { text: 'Au fil de 300+ projets, ', options: {} },
      { text: 'les mêmes 5 erreurs méthodologiques reviennent — encore et encore.', options: { bold: true } },
      { text: ' Elles sont identifiables, évitables, et pourtant elles plombent les mémoires les mieux travaillés.', options: {} },
    ],
    {
      x: 0.7, y: 2.2, w: 7.5, h: 3.5,
      fontSize: 16, fontFace: F.BODY, color: C.TEXT_DARK, valign: 'top',
      lineSpacingMultiple: 1.3,
    },
  );

  // Stats column (right)
  const statY = 2.2;
  const statW = 4.0;
  const statX = 8.6;

  function statCard(idx, big, small) {
    const y = statY + idx * 1.25;
    s.addShape('roundRect', {
      x: statX, y, w: statW, h: 1.05,
      fill: { color: C.NAVY }, line: { type: 'none' },
      rectRadius: 0.08,
    });
    s.addText(big, {
      x: statX + 0.2, y: y + 0.08, w: 2, h: 0.7,
      fontSize: 32, fontFace: F.MONO, color: C.ORANGE, bold: true,
    });
    s.addText(small, {
      x: statX + 2, y: y + 0.15, w: statW - 2.2, h: 0.85,
      fontSize: 11, fontFace: F.BODY, color: C.TEXT_LIGHT, valign: 'middle',
    });
  }
  statCard(0, '300+', 'mémoires, thèses et\nanalyses accompagnés');
  statCard(1, '98 %', 'taux de mention\nobtenu par les clients');
  statCard(2, '6', 'pays couverts dans\nla sous-région');

  // Promesse en bas
  s.addShape('rect', {
    x: 0.7, y: 6.0, w: 0.06, h: 0.7,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('À la fin de cette mini-formation, tu reconnaîtras les 5 erreurs dans ton propre mémoire et tu sauras quoi corriger.', {
    x: 0.95, y: 5.95, w: 11, h: 0.8,
    fontSize: 14, fontFace: F.BODY, color: C.TEXT_DARK, italic: true, valign: 'middle',
  });
}

// ============================================================
// SLIDE 3 — Roadmap
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 3);

  label(s, 'AU PROGRAMME', 0.7, 0.5);
  s.addText('Les 5 erreurs, dans l\'ordre.', {
    x: 0.7, y: 0.9, w: 12, h: 0.9,
    fontSize: 36, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, charSpacing: -1,
  });

  const errors = [
    ['01', 'Problématique mal formulée', 'Question de recherche floue ou non testable'],
    ['02', 'Taille d\'échantillon arbitraire', 'Pas de calcul a priori, puissance inconnue'],
    ['03', 'Mauvais choix de test statistique', 'Hypothèses des tests non vérifiées'],
    ['04', '« p < 0,05 » comme preuve d\'importance', 'Confusion entre significativité statistique et pertinence clinique'],
    ['05', 'Données manquantes ignorées', 'Suppression silencieuse, sans analyse de sensibilité'],
  ];

  const rowH = 0.95;
  const startY = 2.1;
  errors.forEach((e, i) => {
    const y = startY + i * (rowH + 0.05);

    s.addShape('roundRect', {
      x: 0.7, y, w: 12.13, h: rowH,
      fill: { color: C.WHITE }, line: { color: C.BORDER, width: 0.75 },
      rectRadius: 0.08,
    });

    s.addText(e[0], {
      x: 0.95, y: y + 0.1, w: 1.2, h: rowH - 0.2,
      fontSize: 40, fontFace: F.MONO, color: C.ORANGE, bold: true,
      valign: 'middle',
    });

    s.addText(e[1], {
      x: 2.3, y: y + 0.12, w: 7, h: 0.45,
      fontSize: 16, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
    });
    s.addText(e[2], {
      x: 2.3, y: y + 0.5, w: 10, h: 0.4,
      fontSize: 12, fontFace: F.BODY, color: C.TEXT_MUTED, italic: true,
    });
  });
}

// ============================================================
// HELPER : Slide ERREUR (slides 4, 6, 8, 10, 12)
// ============================================================
function buildErrorSlide(num, slideNum, title, symptomTitle, symptomText, killTitle, killText) {
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  footer(s, slideNum);

  // Halo orange top-right
  s.addShape('ellipse', {
    x: 10, y: -2, w: 5, h: 5,
    fill: { type: 'solid', color: C.ORANGE, transparency: 90 },
    line: { type: 'none' },
  });

  // Numéro géant à gauche
  s.addText(num, {
    x: 0.3, y: 1.5, w: 5, h: 5,
    fontSize: 280, fontFace: F.MONO, color: C.ORANGE, bold: true,
    valign: 'middle', align: 'center',
  });

  // Label en haut
  s.addText(`— ERREUR N°${num}`, {
    x: 5.5, y: 0.7, w: 7, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });

  // Titre
  s.addText(title, {
    x: 5.5, y: 1.2, w: 7.3, h: 1.6,
    fontSize: 34, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -1, valign: 'top',
  });

  // Carte SYMPTÔME
  s.addShape('roundRect', {
    x: 5.5, y: 3.2, w: 7.3, h: 1.6,
    fill: { color: C.NAVY_LIGHT }, line: { color: C.ORANGE, width: 0.75 },
    rectRadius: 0.08,
  });
  s.addText(symptomTitle, {
    x: 5.7, y: 3.3, w: 7, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText(symptomText, {
    x: 5.7, y: 3.7, w: 6.9, h: 1.0,
    fontSize: 13, fontFace: F.BODY, color: C.WHITE, valign: 'top',
    lineSpacingMultiple: 1.25,
  });

  // Carte POURQUOI ÇA TUE
  s.addShape('roundRect', {
    x: 5.5, y: 5.0, w: 7.3, h: 1.6,
    fill: { color: C.NAVY_LIGHT }, line: { color: C.ORANGE, width: 0.75 },
    rectRadius: 0.08,
  });
  s.addText(killTitle, {
    x: 5.7, y: 5.1, w: 7, h: 0.35,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 3,
  });
  s.addText(killText, {
    x: 5.7, y: 5.5, w: 6.9, h: 1.0,
    fontSize: 13, fontFace: F.BODY, color: C.WHITE, valign: 'top',
    lineSpacingMultiple: 1.25,
  });
}

// ============================================================
// HELPER : Slide SOLUTION (slides 5, 7, 9, 11, 13)
// ============================================================
function buildSolutionSlide(num, slideNum, title, steps, tipText) {
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, slideNum);

  // Label
  s.addText(`— SOLUTION ${num}`, {
    x: 0.7, y: 0.5, w: 6, h: 0.4,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });

  // Titre
  s.addText(title, {
    x: 0.7, y: 0.9, w: 12, h: 1.0,
    fontSize: 32, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, charSpacing: -1,
  });

  // Étapes (3-4 items dans une grille verticale)
  const stepY = 2.4;
  const stepH = 0.95;
  steps.forEach((step, i) => {
    const y = stepY + i * (stepH + 0.1);

    // Cercle numéroté
    s.addShape('ellipse', {
      x: 0.7, y: y + 0.1, w: 0.7, h: 0.7,
      fill: { color: C.ORANGE }, line: { type: 'none' },
    });
    s.addText(`${i + 1}`, {
      x: 0.7, y: y + 0.1, w: 0.7, h: 0.7,
      fontSize: 22, fontFace: F.MONO, color: C.WHITE, bold: true,
      align: 'center', valign: 'middle',
    });

    // Titre étape
    s.addText(step[0], {
      x: 1.6, y: y + 0.05, w: 11, h: 0.4,
      fontSize: 15, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
    });

    // Détail
    s.addText(step[1], {
      x: 1.6, y: y + 0.42, w: 11, h: 0.55,
      fontSize: 12, fontFace: F.BODY, color: C.TEXT_MUTED,
      lineSpacingMultiple: 1.25,
    });
  });

  // HES tip en bas
  s.addShape('roundRect', {
    x: 0.7, y: 6.15, w: 12.13, h: 0.7,
    fill: { color: C.NAVY }, line: { type: 'none' },
    rectRadius: 0.08,
  });
  s.addText('💬 HES TIP', {
    x: 0.95, y: 6.25, w: 1.5, h: 0.5,
    fontSize: 11, fontFace: F.HEAD, color: C.ORANGE, bold: true,
    valign: 'middle', charSpacing: 3,
  });
  s.addText(tipText, {
    x: 2.45, y: 6.2, w: 10.3, h: 0.6,
    fontSize: 12, fontFace: F.BODY, color: C.WHITE,
    valign: 'middle', italic: true,
  });
}

// ============================================================
// SLIDES 4-5 — Erreur 1 : Problématique mal formulée
// ============================================================
buildErrorSlide('01', 4,
  'Problématique mal formulée',
  'SYMPTÔME',
  'La question de recherche tient en une phrase floue : « Étudier le diabète à Dakar ». Pas de population claire, pas de variable mesurable, pas de comparaison.',
  'POURQUOI ÇA TUE TON MÉMOIRE',
  'Le jury ne sait pas ce que tu cherches à démontrer. Tes analyses paraissent décousues, ta conclusion forcément approximative.',
);
buildSolutionSlide('01', 5, 'Formuler avec PICO / PEO', [
  ['Pose une question testable', 'Verbe d\'action + variable mesurable + relation hypothétique entre deux concepts.'],
  ['Décompose en PICO ou PEO', 'P = Population · I/E = Intervention ou Exposition · C = Comparateur · O = Outcome mesurable.'],
  ['Vérifie : ta question rentre-t-elle en une phrase de 25 mots maximum ?', 'Si oui, tu peux la défendre devant le jury. Sinon, elle est trop large.'],
  ['Exemple validé', '« Chez les femmes diabétiques type 2 de 40-65 ans à Dakar (P), l\'adhérence au traitement (E) est-elle associée à un meilleur contrôle de l\'HbA1c (O) ? »'],
], 'Le diagnostic gratuit de 15 minutes inclut une validation rapide de ta problématique.');

// ============================================================
// SLIDES 6-7 — Erreur 2 : Taille d'échantillon arbitraire
// ============================================================
buildErrorSlide('02', 6,
  'Taille d\'échantillon arbitraire',
  'SYMPTÔME',
  '« J\'ai pris 50 patients parce que c\'est ce que j\'ai pu recruter » ou « Mon directeur a dit 100 ». Aucune justification statistique a priori.',
  'POURQUOI ÇA TUE TON MÉMOIRE',
  'Le jury demandera : « Avez-vous la puissance statistique pour détecter une différence cliniquement pertinente ? » Si tu n\'as pas de réponse rédigée, c\'est mauvais signe.',
);
buildSolutionSlide('02', 7, 'Calculer la taille a priori', [
  ['Définis l\'effet cliniquement pertinent', 'Quelle différence minimale veux-tu pouvoir détecter ? (ex : 10% de différence de prévalence, OR ≥ 2, etc.)'],
  ['Fixe alpha et puissance', 'Conventionnellement alpha = 5%, puissance (1−β) = 80% — ou 90% si tu vises une publication.'],
  ['Utilise un outil dédié', 'G*Power (gratuit), R package `pwr` ou OpenEpi en ligne. Documente la formule utilisée dans la méthode.'],
  ['Rédige la justification', 'Une ligne dans la méthodologie : « Pour détecter une différence de X avec α=5% et β=20%, n = Y sujets nécessaires (G*Power v3.1). »'],
], 'On rédige le calcul + sa justification ensemble en une séance de 1 h.');

// ============================================================
// SLIDES 8-9 — Erreur 3 : Mauvais choix de test statistique
// ============================================================
buildErrorSlide('03', 8,
  'Mauvais choix de test statistique',
  'SYMPTÔME',
  't-test de Student sur des données ordinales (échelles Likert), Chi² avec moins de 5 sujets par cellule, ANOVA quand les variances sont inégales.',
  'POURQUOI ÇA TUE TON MÉMOIRE',
  'Tests inappropriés = p-values invalides = conclusions fausses. Un jury de biostat repère ces erreurs en 2 minutes.',
);
buildSolutionSlide('03', 9, 'Arbre de décision méthodologique', [
  ['Identifie le type de tes variables', 'Quantitatives (continue / discrète) ou qualitatives (nominale / ordinale) — c\'est le point de départ.'],
  ['Compte les groupes à comparer', '2 groupes vs ≥ 3 groupes, indépendants ou appariés (même sujet mesuré 2 fois).'],
  ['Vérifie les hypothèses du test', 'Normalité (Shapiro-Wilk), homogénéité des variances (Levene). Si violées → version non paramétrique.'],
  ['Documente ton choix dans la méthode', '« Comparaison par test de Mann-Whitney en raison de la distribution non normale (Shapiro p < 0.05). »'],
], 'On revoit ton plan d\'analyse statistique avant que tu lances quoi que ce soit.');

// ============================================================
// SLIDES 10-11 — Erreur 4 : p < 0.05 fétichisme
// ============================================================
buildErrorSlide('04', 10,
  '« p < 0,05 » comme preuve d\'importance',
  'SYMPTÔME',
  'Tableau de résultats qui n\'affiche que des p-values. Pas d\'intervalle de confiance. Pas de taille d\'effet. Conclusion : « différence significative ».',
  'POURQUOI ÇA TUE TON MÉMOIRE',
  'Une p-value n\'indique pas l\'importance clinique. Sur N = 10 000, une différence de 0,5 mmHg est « significative » sans être pertinente.',
);
buildSolutionSlide('04', 11, 'Rapporter taille d\'effet + IC95%', [
  ['Calcule la taille d\'effet', 'Cohen\'s d (continues), OR ou RR avec IC95% (qualitatives), différence absolue brute pour le concret.'],
  ['Affiche systématiquement l\'IC95%', 'Plus informatif que la p-value seule. Un IC large = peu de précision, même si p < 0.05.'],
  ['Distingue dans la discussion', '« Association statistiquement significative (p = 0,02) ET cliniquement pertinente (OR = 2,4 ; IC95% [1,3 ; 4,5]). »'],
  ['Évite les formulations dichotomiques', 'Plutôt que « significatif vs non significatif », parle de « niveau de preuve » et de « pertinence clinique ».'],
], 'Tous les tableaux d\'analyse HES intègrent OR / IC95% / p, prêts à coller dans ton mémoire.');

// ============================================================
// SLIDES 12-13 — Erreur 5 : Données manquantes ignorées
// ============================================================
buildErrorSlide('05', 12,
  'Données manquantes ignorées',
  'SYMPTÔME',
  'Sur 100 répondants, 30 ont laissé certaines questions vides. Tu les supprimes silencieusement (listwise) et tu présentes N = 70 comme si de rien n\'était.',
  'POURQUOI ÇA TUE TON MÉMOIRE',
  'Les manquants ne sont presque jamais aléatoires. Les plus malades ne répondent pas. Tu introduis un biais de sélection — souvent grave.',
);
buildSolutionSlide('05', 13, 'Décrire, traiter, et documenter', [
  ['Quantifie d\'abord', 'Combien de manquants par variable ? Présente un tableau avant traitement. Le jury le demande presque toujours.'],
  ['Diagnostique le mécanisme', 'MCAR (Missing Completely At Random) · MAR (Missing At Random) · MNAR (Not At Random). Justifie ta lecture.'],
  ['Choisis une stratégie justifiée', 'Listwise si < 5% manquants et MCAR · Imputation simple ou multiple sinon (R package `mice`).'],
  ['Mène une analyse de sensibilité', 'Refais l\'analyse avec une autre stratégie. Si la conclusion change, tes résultats sont fragiles — il faut le dire.'],
], 'On gère les données manquantes méthodiquement en une séance — avant que ton jury en fasse un problème.');

// ============================================================
// SLIDE 14 — Synthèse
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.CREAM };
  footer(s, 14);

  label(s, 'SYNTHÈSE', 0.7, 0.5);
  s.addText('Un seul fil rouge.', {
    x: 0.7, y: 0.9, w: 12, h: 0.9,
    fontSize: 36, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true, charSpacing: -1,
  });

  // Bloc citation orange à gauche
  s.addShape('roundRect', {
    x: 0.7, y: 2.1, w: 6.2, h: 4.5,
    fill: { color: C.NAVY }, line: { type: 'none' },
    rectRadius: 0.12,
  });
  s.addShape('rect', {
    x: 0.95, y: 2.4, w: 0.08, h: 3.9,
    fill: { color: C.ORANGE }, line: { type: 'none' },
  });
  s.addText('"', {
    x: 1.2, y: 2.3, w: 1, h: 1,
    fontSize: 72, fontFace: F.HEAD, color: C.ORANGE, bold: true,
  });
  s.addText(
    'Les 5 erreurs ont une cause commune :\n\nécrire son plan d\'analyse APRÈS avoir collecté les données.',
    {
      x: 1.4, y: 3.0, w: 5.3, h: 2.5,
      fontSize: 20, fontFace: F.HEAD, color: C.WHITE, bold: true,
      lineSpacingMultiple: 1.3,
    },
  );
  s.addText('— Méthodo HES', {
    x: 1.4, y: 6.0, w: 5, h: 0.4,
    fontSize: 12, fontFace: F.BODY, color: C.ORANGE, italic: true,
  });

  // Liste récap à droite
  const items = [
    ['01', 'Problématique', 'Reformulée en PICO / PEO'],
    ['02', 'Échantillon', 'Calcul a priori (G*Power)'],
    ['03', 'Test statistique', 'Arbre de décision documenté'],
    ['04', 'p-value', 'Toujours avec taille d\'effet + IC95%'],
    ['05', 'Données manquantes', 'Décrites, traitées, analyse de sensibilité'],
  ];
  const startY = 2.1;
  const rowH = 0.85;
  items.forEach((it, i) => {
    const y = startY + i * (rowH + 0.05);
    s.addText(it[0], {
      x: 7.3, y: y + 0.1, w: 0.7, h: 0.5,
      fontSize: 18, fontFace: F.MONO, color: C.ORANGE, bold: true,
    });
    s.addText(it[1], {
      x: 8.0, y: y + 0.05, w: 4.9, h: 0.4,
      fontSize: 14, fontFace: F.HEAD, color: C.TEXT_DARK, bold: true,
    });
    s.addText(it[2], {
      x: 8.0, y: y + 0.42, w: 4.9, h: 0.4,
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

  // Halo orange bottom-right
  s.addShape('ellipse', {
    x: 8, y: 3, w: 8, h: 8,
    fill: { type: 'solid', color: C.ORANGE, transparency: 88 },
    line: { type: 'none' },
  });

  // Logo discret
  s.addImage({ path: logoPath, x: 11.4, y: 0.3, w: 1.5, h: 1.5, transparency: 25 });

  s.addText('— DERNIÈRE ÉTAPE', {
    x: 0.7, y: 0.7, w: 6, h: 0.4,
    fontSize: 13, fontFace: F.HEAD, color: C.ORANGE, bold: true, charSpacing: 5,
  });

  s.addText('Tu veux qu\'on regarde\nta méthodo ensemble ?', {
    x: 0.7, y: 1.4, w: 12, h: 2.4,
    fontSize: 50, fontFace: F.HEAD, color: C.WHITE, bold: true,
    charSpacing: -1, lineSpacingMultiple: 1.0,
  });

  s.addText('Diagnostic gratuit de 15 minutes, sans engagement.\nNous identifions les corrections prioritaires sur ton projet.', {
    x: 0.7, y: 3.8, w: 12, h: 1.0,
    fontSize: 18, fontFace: F.BODY, color: C.TEXT_LIGHT, italic: true,
    lineSpacingMultiple: 1.3,
  });

  // 2 CTAs
  // CTA 1 — WhatsApp (vert)
  s.addShape('roundRect', {
    x: 0.7, y: 5.3, w: 5.8, h: 1.2,
    fill: { color: '25D366' }, line: { type: 'none' },
    rectRadius: 0.1,
  });
  s.addText('💬 WhatsApp direct', {
    x: 0.9, y: 5.4, w: 5.4, h: 0.45,
    fontSize: 13, fontFace: F.HEAD, color: C.WHITE, bold: true, charSpacing: 2,
  });
  s.addText('+221 76 387 34 28', {
    x: 0.9, y: 5.8, w: 5.4, h: 0.6,
    fontSize: 22, fontFace: F.MONO, color: C.WHITE, bold: true,
  });

  // CTA 2 — Site web (orange)
  s.addShape('roundRect', {
    x: 6.9, y: 5.3, w: 5.93, h: 1.2,
    fill: { color: C.ORANGE }, line: { type: 'none' },
    rectRadius: 0.1,
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
