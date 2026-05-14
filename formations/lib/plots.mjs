/**
 * Bibliothèque de plots programmatiques pour les formations HES.
 *
 * Chaque fonction prend un objet `slide` (instance pptxgenjs) et des
 * options de position + dimensions. Elle dessine le plot via les
 * shapes natives pptxgenjs (rect, line, ellipse) — pas d'image externe.
 *
 * Palette HES : navy #0E1729 · orange #F09042 · cream #F5EFE0.
 */

const COL = {
  NAVY:        '0E1729',
  NAVY_LIGHT:  '1A2541',
  ORANGE:      'F09042',
  ORANGE_DEEP: 'D9772B',
  CREAM:       'F5EFE0',
  WHITE:       'FFFFFF',
  TEXT_DARK:   '15233F',
  TEXT_MUTED:  '6B7280',
  BORDER:      'D6CFB8',
  RED:         'E74C3C',
  GREEN:       '4CAF50',
};

const FONT = 'Calibri';

/** Cadre commun + titre + zone de tracé. Retourne les coords de la zone utile. */
function frameAndArea(slide, opts) {
  const { x, y, w, h, title, xLabel, yLabel, bg = COL.WHITE } = opts;

  slide.addShape('rect', {
    x, y, w, h,
    fill: { color: bg }, line: { color: COL.BORDER, width: 0.5 },
  });

  if (title) {
    slide.addText(title, {
      x: x + 0.1, y: y + 0.04, w: w - 0.2, h: 0.25,
      fontSize: 9, fontFace: FONT, color: COL.TEXT_DARK, bold: true, align: 'center',
    });
  }

  // Zone de tracé (laisse de la place pour titre + axes + labels)
  const padTop = title ? 0.35 : 0.15;
  const padLeft = yLabel ? 0.45 : 0.25;
  const padBottom = xLabel ? 0.4 : 0.2;
  const padRight = 0.15;

  const px = x + padLeft;
  const py = y + padTop;
  const pw = w - padLeft - padRight;
  const ph = h - padTop - padBottom;

  // Axes en L (gauche + bas) — via segment() pour éviter dimensions 0
  segment(slide, px, py + ph, px + pw, py + ph, COL.NAVY, 0.75);
  segment(slide, px, py, px, py + ph, COL.NAVY, 0.75);

  // Labels
  if (xLabel) {
    slide.addText(xLabel, {
      x: px, y: py + ph + 0.1, w: pw, h: 0.22,
      fontSize: 8, fontFace: FONT, color: COL.TEXT_MUTED, italic: true, align: 'center',
    });
  }
  if (yLabel) {
    slide.addText(yLabel, {
      x: x + 0.02, y: py, w: 0.4, h: ph,
      fontSize: 8, fontFace: FONT, color: COL.TEXT_MUTED, italic: true,
      align: 'left', valign: 'middle', rotate: -90,
    });
  }

  return { px, py, pw, ph };
}

/** Petit point (ellipse) centré en (cx, cy). */
function dot(slide, cx, cy, color = COL.NAVY, size = 0.07) {
  slide.addShape('ellipse', {
    x: cx - size / 2, y: cy - size / 2, w: size, h: size,
    fill: { color }, line: { type: 'none' },
  });
}

/**
 * Segment de droite de (x1,y1) à (x2,y2).
 * Utilise flipH/flipV pour les directions inverses, dimensions toujours
 * positives (PowerPoint refuse cx=0 ou cy=0 dans le XML).
 */
function segment(slide, x1, y1, x2, y2, color = COL.NAVY, width = 1, dash = null) {
  const lineOpts = { color, width };
  if (dash) lineOpts.dashType = dash;
  const minX = Math.min(x1, x2);
  const minY = Math.min(y1, y2);
  const w = Math.max(Math.abs(x2 - x1), 0.01);
  const h = Math.max(Math.abs(y2 - y1), 0.01);
  const shapeOpts = { x: minX, y: minY, w, h, line: lineOpts };
  if (x2 < x1) shapeOpts.flipH = true;
  if (y2 < y1) shapeOpts.flipV = true;
  slide.addShape('line', shapeOpts);
}

// ============================================================
// QQ-PLOT
// ============================================================
export function plotQQ(slide, { x, y, w, h, title = 'QQ-plot · normalité' }) {
  const { px, py, pw, ph } = frameAndArea(slide, {
    x, y, w, h, title,
    xLabel: 'Quantiles théoriques',
    yLabel: 'Quantiles observés',
  });

  // Diagonale de référence (orange pointillé)
  segment(slide, px, py + ph, px + pw, py, COL.ORANGE, 1.25, 'dash');

  // Points : pattern QQ-plot de données ~normales
  const pts = [
    [0.04, 0.06], [0.11, 0.09], [0.18, 0.17], [0.24, 0.21],
    [0.30, 0.32], [0.36, 0.30], [0.42, 0.43], [0.48, 0.46],
    [0.54, 0.51], [0.60, 0.58], [0.66, 0.65], [0.72, 0.69],
    [0.78, 0.75], [0.84, 0.83], [0.90, 0.88], [0.95, 0.94],
  ];
  pts.forEach(([rx, ry]) => {
    dot(slide, px + rx * pw, py + (1 - ry) * ph, COL.NAVY, 0.085);
  });
}

// ============================================================
// BOX-PLOT (n groupes)
// ============================================================
export function plotBox(slide, { x, y, w, h, title, groups }) {
  const { px, py, pw, ph } = frameAndArea(slide, {
    x, y, w, h, title,
    xLabel: 'Groupes',
    yLabel: 'Valeur',
  });

  const n = groups.length;
  const colW = pw / n;
  const boxW = colW * 0.5;

  // Trouver les bornes globales pour normaliser
  const allVals = groups.flatMap(g => [g.min, g.q1, g.median, g.q3, g.max]);
  const yMin = Math.min(...allVals);
  const yMax = Math.max(...allVals);
  const range = yMax - yMin || 1;
  const norm = v => 1 - (v - yMin) / range; // 0 en haut, 1 en bas du plot area

  groups.forEach((g, i) => {
    const cx = px + (i + 0.5) * colW;
    const accent = g.accent ? COL.ORANGE : COL.NAVY;

    // Whisker bas
    segment(slide, cx, py + norm(g.min) * ph, cx, py + norm(g.q1) * ph, COL.TEXT_MUTED, 0.75);
    segment(slide, cx - boxW / 4, py + norm(g.min) * ph, cx + boxW / 4, py + norm(g.min) * ph, COL.TEXT_MUTED, 0.75);

    // Whisker haut
    segment(slide, cx, py + norm(g.q3) * ph, cx, py + norm(g.max) * ph, COL.TEXT_MUTED, 0.75);
    segment(slide, cx - boxW / 4, py + norm(g.max) * ph, cx + boxW / 4, py + norm(g.max) * ph, COL.TEXT_MUTED, 0.75);

    // Boîte Q1-Q3
    const boxTop = py + norm(g.q3) * ph;
    const boxBot = py + norm(g.q1) * ph;
    slide.addShape('rect', {
      x: cx - boxW / 2, y: boxTop, w: boxW, h: boxBot - boxTop,
      fill: { color: g.accent ? COL.ORANGE : COL.WHITE }, line: { color: accent, width: 1 },
    });

    // Médiane
    segment(slide, cx - boxW / 2, py + norm(g.median) * ph, cx + boxW / 2, py + norm(g.median) * ph, accent, 1.5);

    // Étiquette groupe (sous l'axe X)
    slide.addText(g.label, {
      x: cx - colW / 2, y: py + ph + 0.05, w: colW, h: 0.2,
      fontSize: 8, fontFace: FONT, color: COL.TEXT_DARK, bold: true, align: 'center',
    });
  });
}

// ============================================================
// SCATTER + droite de régression
// ============================================================
export function plotScatter(slide, { x, y, w, h, title, showFit = true, slope = 1, intercept = 0.1, scatter = 0.08 }) {
  const { px, py, pw, ph } = frameAndArea(slide, {
    x, y, w, h, title,
    xLabel: 'Variable X', yLabel: 'Variable Y',
  });

  // Génère ~22 points autour d'une tendance linéaire
  const pts = [];
  const seed = (i) => Math.sin(i * 12.9898) * 43758.5453; // pseudo-aléatoire stable
  for (let i = 0; i < 22; i++) {
    const rx = (i + 0.5) / 22;
    const noise = (seed(i) - Math.floor(seed(i)) - 0.5) * 2 * scatter;
    const ry = intercept + slope * rx + noise;
    pts.push([rx, Math.max(0.02, Math.min(0.98, ry))]);
  }
  pts.forEach(([rx, ry]) => {
    dot(slide, px + rx * pw, py + (1 - ry) * ph, COL.NAVY, 0.075);
  });

  // Droite de régression
  if (showFit) {
    const y0 = intercept;
    const y1 = intercept + slope;
    segment(slide,
      px, py + (1 - y0) * ph,
      px + pw, py + (1 - y1) * ph,
      COL.ORANGE, 1.5,
    );
  }
}

// ============================================================
// COURBE ROC
// ============================================================
export function plotROC(slide, { x, y, w, h, title = 'Courbe ROC', auc }) {
  const { px, py, pw, ph } = frameAndArea(slide, {
    x, y, w, h, title,
    xLabel: '1 − Spécificité', yLabel: 'Sensibilité',
  });

  // Diagonale (random classifier)
  segment(slide, px, py + ph, px + pw, py, COL.TEXT_MUTED, 0.75, 'dash');

  // Courbe ROC : enchaînement de segments
  // Pour AUC ~ 0.78, courbe qui monte vite puis se rapproche du plafond
  const curvePts = [
    [0.00, 0.00], [0.04, 0.18], [0.08, 0.32], [0.12, 0.45],
    [0.18, 0.58], [0.25, 0.68], [0.33, 0.76], [0.42, 0.82],
    [0.52, 0.87], [0.62, 0.91], [0.72, 0.94], [0.82, 0.96],
    [0.90, 0.98], [1.00, 1.00],
  ];
  for (let i = 0; i < curvePts.length - 1; i++) {
    const [x1, y1] = curvePts[i];
    const [x2, y2] = curvePts[i + 1];
    segment(slide,
      px + x1 * pw, py + (1 - y1) * ph,
      px + x2 * pw, py + (1 - y2) * ph,
      COL.ORANGE, 2,
    );
  }

  // Étiquette AUC
  if (auc !== undefined) {
    slide.addText(`AUC = ${auc}`, {
      x: px + pw * 0.55, y: py + ph * 0.55, w: pw * 0.4, h: 0.3,
      fontSize: 11, fontFace: FONT, color: COL.ORANGE, bold: true, align: 'center',
    });
  }
}

// ============================================================
// COURBE KAPLAN-MEIER (1 ou 2 courbes)
// ============================================================
export function plotKM(slide, { x, y, w, h, title = 'Kaplan-Meier · survie', curves }) {
  const { px, py, pw, ph } = frameAndArea(slide, {
    x, y, w, h, title,
    xLabel: 'Temps (mois)',
    yLabel: 'Survie (%)',
  });

  curves.forEach((curve, idx) => {
    const color = curve.color || (idx === 0 ? COL.ORANGE : COL.NAVY);
    // Function en escalier : on dessine horizontal puis vertical
    for (let i = 0; i < curve.points.length - 1; i++) {
      const [t1, s1] = curve.points[i];
      const [t2, s2] = curve.points[i + 1];
      // Horizontale (palier)
      segment(slide,
        px + t1 * pw, py + (1 - s1) * ph,
        px + t2 * pw, py + (1 - s1) * ph,
        color, 1.75,
      );
      // Verticale (chute à l'événement)
      if (s1 !== s2) {
        segment(slide,
          px + t2 * pw, py + (1 - s1) * ph,
          px + t2 * pw, py + (1 - s2) * ph,
          color, 1.75,
        );
      }
    }
    // Petite légende
    slide.addText(curve.label, {
      x: px + 0.1, y: py + 0.05 + idx * 0.25, w: 2.5, h: 0.22,
      fontSize: 9, fontFace: FONT, color, bold: true,
    });
  });
}

// ============================================================
// POPULATION (grille de points colorés selon catégorie)
// ============================================================
/**
 * Représente une population de n individus en grille, colorés selon une
 * répartition. opts.categories = [{ n, color, label? }, ...].
 * Exemple : population de 100 avec 70 sains, 30 malades dont 25 détectés.
 */
export function plotPopulation(slide, { x, y, w, h, title, cols = 10, rows = 10, categories, legend = true }) {
  slide.addShape('rect', {
    x, y, w, h, fill: { color: COL.WHITE }, line: { color: COL.BORDER, width: 0.5 },
  });
  if (title) {
    slide.addText(title, {
      x: x + 0.1, y: y + 0.04, w: w - 0.2, h: 0.25,
      fontSize: 9, fontFace: FONT, color: COL.TEXT_DARK, bold: true, align: 'center',
    });
  }
  const padTop = title ? 0.32 : 0.1;
  const padBottom = legend ? 0.7 : 0.15;
  const padX = 0.15;
  const gridW = w - 2 * padX;
  const gridH = h - padTop - padBottom;
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  const dotSize = Math.min(cellW, cellH) * 0.7;

  // Construit la liste de couleurs en parcourant les catégories
  const total = cols * rows;
  const colors = [];
  categories.forEach(cat => {
    for (let i = 0; i < cat.n && colors.length < total; i++) {
      colors.push(cat.color);
    }
  });
  while (colors.length < total) colors.push(COL.BORDER);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const cx = x + padX + c * cellW + cellW / 2;
      const cy = y + padTop + r * cellH + cellH / 2;
      slide.addShape('ellipse', {
        x: cx - dotSize / 2, y: cy - dotSize / 2, w: dotSize, h: dotSize,
        fill: { color: colors[idx] }, line: { type: 'none' },
      });
    }
  }

  // Légende sous la grille
  if (legend) {
    const legY = y + h - padBottom + 0.1;
    const legendW = w - 0.2;
    const itemW = legendW / categories.length;
    categories.forEach((cat, i) => {
      const legX = x + 0.1 + i * itemW;
      slide.addShape('ellipse', {
        x: legX, y: legY + 0.08, w: 0.18, h: 0.18,
        fill: { color: cat.color }, line: { type: 'none' },
      });
      slide.addText(`${cat.label ?? ''} (${cat.n})`, {
        x: legX + 0.22, y: legY + 0.02, w: itemW - 0.3, h: 0.35,
        fontSize: 9, fontFace: FONT, color: COL.TEXT_DARK, valign: 'middle',
      });
    });
  }
}

// ============================================================
// DISTRIBUTIONS NORMALES (1 ou 2 courbes en cloche)
// ============================================================
/**
 * Trace 1 ou 2 distributions normales approximées par segments.
 * curves = [{ mean, sd, color, fill?, label? }]
 * shadeFromRight = valeur x à partir de laquelle griser (p-value)
 */
export function plotDistributions(slide, opts) {
  const { x, y, w, h, title, curves, xLabel = 'Valeur', shadeFromRight, shadeBetween, rejectRegion } = opts;
  const { px, py, pw, ph } = frameAndArea(slide, { x, y, w, h, title, xLabel });

  // Range global
  const xMin = Math.min(...curves.map(c => c.mean - 3.5 * c.sd));
  const xMax = Math.max(...curves.map(c => c.mean + 3.5 * c.sd));
  const xRange = xMax - xMin;

  // Densité max (pour normaliser)
  const maxDensity = Math.max(...curves.map(c => 1 / (c.sd * Math.sqrt(2 * Math.PI))));

  // Helper : convertir une valeur x logique en x sur le plot
  const toPx = v => px + ((v - xMin) / xRange) * pw;
  const toPy = density => py + ph - (density / maxDensity) * ph * 0.9;

  // Zone de rejet (hachurer avant tracer les courbes)
  if (rejectRegion) {
    const zones = Array.isArray(rejectRegion) ? rejectRegion : [rejectRegion];
    zones.forEach(zone => {
      const zx1 = toPx(zone.from ?? xMin);
      const zx2 = toPx(zone.to ?? xMax);
      slide.addShape('rect', {
        x: Math.min(zx1, zx2), y: py, w: Math.abs(zx2 - zx1), h: ph,
        fill: { type: 'solid', color: COL.ORANGE, transparency: 70 },
        line: { type: 'none' },
      });
    });
  }
  if (shadeFromRight !== undefined) {
    const zx = toPx(shadeFromRight);
    slide.addShape('rect', {
      x: zx, y: py, w: px + pw - zx, h: ph,
      fill: { type: 'solid', color: COL.ORANGE, transparency: 65 },
      line: { type: 'none' },
    });
  }
  if (shadeBetween) {
    const zx1 = toPx(shadeBetween[0]);
    const zx2 = toPx(shadeBetween[1]);
    slide.addShape('rect', {
      x: zx1, y: py, w: zx2 - zx1, h: ph,
      fill: { type: 'solid', color: COL.ORANGE, transparency: 65 },
      line: { type: 'none' },
    });
  }

  // Trace chaque courbe en segments
  curves.forEach(c => {
    const N = 40;
    const step = (c.mean + 3.5 * c.sd - (c.mean - 3.5 * c.sd)) / N;
    let prevX = null, prevY = null;
    for (let i = 0; i <= N; i++) {
      const vx = c.mean - 3.5 * c.sd + i * step;
      const density = (1 / (c.sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((vx - c.mean) / c.sd, 2));
      const cx = toPx(vx);
      const cy = toPy(density);
      if (prevX !== null) {
        segment(slide, prevX, prevY, cx, cy, c.color || COL.NAVY, 1.5);
      }
      prevX = cx;
      prevY = cy;
    }
  });

  // Légende
  curves.forEach((c, i) => {
    if (c.label) {
      slide.addText(c.label, {
        x: px + 0.1, y: py + 0.08 + i * 0.22, w: pw - 0.2, h: 0.2,
        fontSize: 9, fontFace: FONT, color: c.color || COL.NAVY, bold: true,
      });
    }
  });
}

// ============================================================
// FLOW (étapes avec flèches)
// ============================================================
/**
 * Diagramme de flux horizontal ou vertical. Steps = [{ label, sub? }]
 */
export function plotFlow(slide, { x, y, w, h, title, steps, vertical = false, accent = 'auto' }) {
  if (title) {
    slide.addText(title, {
      x, y, w, h: 0.3,
      fontSize: 11, fontFace: FONT, color: COL.TEXT_DARK, bold: true, align: 'center',
    });
  }
  const startY = title ? y + 0.35 : y;
  const availH = h - (title ? 0.35 : 0);

  if (vertical) {
    const stepH = (availH - (steps.length - 1) * 0.4) / steps.length;
    steps.forEach((step, i) => {
      const sy = startY + i * (stepH + 0.4);
      const isAccent = accent === 'auto' ? (i === steps.length - 1) : false;
      const bg = isAccent ? COL.ORANGE : COL.WHITE;
      const txtColor = isAccent ? COL.NAVY : COL.TEXT_DARK;
      slide.addShape('roundRect', {
        x, y: sy, w, h: stepH,
        fill: { color: bg }, line: { color: isAccent ? COL.ORANGE_DEEP : COL.BORDER, width: 1 },
        rectRadius: 0.08,
      });
      slide.addText(step.label, {
        x: x + 0.15, y: sy + 0.1, w: w - 0.3, h: 0.4,
        fontSize: 12, fontFace: FONT, color: txtColor, bold: true, align: 'center', valign: 'middle',
      });
      if (step.sub) {
        slide.addText(step.sub, {
          x: x + 0.15, y: sy + 0.5, w: w - 0.3, h: stepH - 0.55,
          fontSize: 10, fontFace: FONT, color: txtColor, italic: true, align: 'center', valign: 'top',
        });
      }
      if (i < steps.length - 1) {
        const arrowY = sy + stepH + 0.05;
        segment(slide, x + w / 2, arrowY, x + w / 2, arrowY + 0.3, COL.ORANGE, 1.5);
        // pointe
        segment(slide, x + w / 2 - 0.08, arrowY + 0.22, x + w / 2, arrowY + 0.3, COL.ORANGE, 1.5);
        segment(slide, x + w / 2 + 0.08, arrowY + 0.22, x + w / 2, arrowY + 0.3, COL.ORANGE, 1.5);
      }
    });
  } else {
    const arrowGap = 0.3;
    const stepW = (w - (steps.length - 1) * arrowGap) / steps.length;
    steps.forEach((step, i) => {
      const sx = x + i * (stepW + arrowGap);
      const isAccent = accent === 'auto' ? (i === steps.length - 1) : false;
      const bg = isAccent ? COL.ORANGE : COL.WHITE;
      const txtColor = isAccent ? COL.NAVY : COL.TEXT_DARK;
      slide.addShape('roundRect', {
        x: sx, y: startY, w: stepW, h: availH,
        fill: { color: bg }, line: { color: isAccent ? COL.ORANGE_DEEP : COL.BORDER, width: 1 },
        rectRadius: 0.08,
      });
      slide.addText(step.label, {
        x: sx + 0.1, y: startY + 0.15, w: stepW - 0.2, h: 0.5,
        fontSize: 11, fontFace: FONT, color: txtColor, bold: true, align: 'center',
        lineSpacingMultiple: 1.15,
      });
      if (step.sub) {
        slide.addText(step.sub, {
          x: sx + 0.1, y: startY + 0.7, w: stepW - 0.2, h: availH - 0.85,
          fontSize: 9, fontFace: FONT, color: txtColor, italic: true, align: 'center', valign: 'top',
          lineSpacingMultiple: 1.3,
        });
      }
      if (i < steps.length - 1) {
        const arrowX = sx + stepW + 0.05;
        segment(slide, arrowX, startY + availH / 2, arrowX + arrowGap - 0.1, startY + availH / 2, COL.ORANGE, 1.5);
        segment(slide, arrowX + arrowGap - 0.18, startY + availH / 2 - 0.08, arrowX + arrowGap - 0.1, startY + availH / 2, COL.ORANGE, 1.5);
        segment(slide, arrowX + arrowGap - 0.18, startY + availH / 2 + 0.08, arrowX + arrowGap - 0.1, startY + availH / 2, COL.ORANGE, 1.5);
      }
    });
  }
}

// ============================================================
// FOREST PLOT (OR/HR avec IC95%)
// ============================================================
/**
 * Forest plot horizontal. items = [{ label, est, low, high, accent? }]
 * refLine = ligne de référence (1 pour OR/RR/HR, 0 pour différences).
 */
export function plotForest(slide, opts) {
  const { x, y, w, h, title, items, refLine = 1, xLabel = 'OR ajusté (IC95%)' } = opts;
  // Frame manuel (pas de Y axis)
  slide.addShape('rect', {
    x, y, w, h, fill: { color: COL.WHITE }, line: { color: COL.BORDER, width: 0.5 },
  });
  if (title) {
    slide.addText(title, {
      x: x + 0.1, y: y + 0.05, w: w - 0.2, h: 0.25,
      fontSize: 9, fontFace: FONT, color: COL.TEXT_DARK, bold: true, align: 'center',
    });
  }
  const padTop = title ? 0.35 : 0.15;
  const padBottom = 0.4;
  const labelW = Math.min(1.6, w * 0.3);
  const plotX = x + labelW + 0.1;
  const plotW = w - labelW - 0.25;
  const plotY = y + padTop;
  const plotH = h - padTop - padBottom;

  // Range
  const minVal = Math.min(refLine, ...items.map(it => it.low));
  const maxVal = Math.max(refLine, ...items.map(it => it.high));
  const valRange = maxVal - minVal || 1;
  const padRange = valRange * 0.1;
  const xMin = minVal - padRange;
  const xMax = maxVal + padRange;
  const toPx = v => plotX + ((v - xMin) / (xMax - xMin)) * plotW;

  // Ligne de référence
  segment(slide, toPx(refLine), plotY, toPx(refLine), plotY + plotH, COL.TEXT_MUTED, 1, 'dash');

  // Items
  const rowH = plotH / items.length;
  items.forEach((it, i) => {
    const cy = plotY + i * rowH + rowH / 2;
    // Étiquette
    slide.addText(it.label, {
      x: x + 0.1, y: cy - 0.18, w: labelW - 0.1, h: 0.36,
      fontSize: 10, fontFace: FONT, color: COL.TEXT_DARK, bold: true, valign: 'middle',
    });
    // IC ligne
    segment(slide, toPx(it.low), cy, toPx(it.high), cy, it.accent ? COL.ORANGE : COL.NAVY, 1.5);
    // Barres aux extrémités
    segment(slide, toPx(it.low), cy - 0.06, toPx(it.low), cy + 0.06, it.accent ? COL.ORANGE : COL.NAVY, 1.5);
    segment(slide, toPx(it.high), cy - 0.06, toPx(it.high), cy + 0.06, it.accent ? COL.ORANGE : COL.NAVY, 1.5);
    // Carré au point estimé
    slide.addShape('rect', {
      x: toPx(it.est) - 0.07, y: cy - 0.07, w: 0.14, h: 0.14,
      fill: { color: it.accent ? COL.ORANGE : COL.NAVY }, line: { type: 'none' },
    });
  });

  // Axe X avec graduations
  segment(slide, plotX, plotY + plotH + 0.05, plotX + plotW, plotY + plotH + 0.05, COL.NAVY, 0.5);
  // Tick à la ligne de référence
  slide.addText(`${refLine}`, {
    x: toPx(refLine) - 0.2, y: plotY + plotH + 0.1, w: 0.4, h: 0.2,
    fontSize: 8, fontFace: FONT, color: COL.TEXT_MUTED, align: 'center',
  });
  if (xLabel) {
    slide.addText(xLabel, {
      x: plotX, y: plotY + plotH + 0.25, w: plotW, h: 0.2,
      fontSize: 8, fontFace: FONT, color: COL.TEXT_MUTED, italic: true, align: 'center',
    });
  }
}

// ============================================================
// SIGMOID (régression logistique conceptuelle)
// ============================================================
export function plotSigmoid(slide, { x, y, w, h, title = 'Modèle logistique · sigmoïde' }) {
  const { px, py, pw, ph } = frameAndArea(slide, {
    x, y, w, h, title,
    xLabel: 'X (prédicteur)', yLabel: 'P(Y = 1)',
  });

  // Référence à 0.5
  segment(slide, px, py + ph * 0.5, px + pw, py + ph * 0.5, COL.TEXT_MUTED, 0.5, 'dash');

  // Courbe sigmoïde
  const N = 40;
  let prevX = null, prevY = null;
  for (let i = 0; i <= N; i++) {
    const rx = -6 + (i / N) * 12;
    const ry = 1 / (1 + Math.exp(-rx));
    const cx = px + ((rx + 6) / 12) * pw;
    const cy = py + (1 - ry) * ph;
    if (prevX !== null) segment(slide, prevX, prevY, cx, cy, COL.ORANGE, 2);
    prevX = cx;
    prevY = cy;
  }
}

// ============================================================
// VENN (pour multicollinéarité — 2 cercles qui se chevauchent)
// ============================================================
export function plotVenn(slide, { x, y, w, h, title, leftLabel, rightLabel, overlap = 0.4 }) {
  if (title) {
    slide.addText(title, {
      x, y: y + 0.05, w, h: 0.3,
      fontSize: 11, fontFace: FONT, color: COL.TEXT_DARK, bold: true, align: 'center',
    });
  }
  const cy = y + h / 2 + 0.2;
  const r = Math.min(h, w) * 0.32;
  const cx1 = x + w * (0.5 - (1 - overlap) * 0.25);
  const cx2 = x + w * (0.5 + (1 - overlap) * 0.25);

  slide.addShape('ellipse', {
    x: cx1 - r, y: cy - r, w: 2 * r, h: 2 * r,
    fill: { type: 'solid', color: COL.ORANGE, transparency: 65 },
    line: { color: COL.ORANGE_DEEP, width: 1.5 },
  });
  slide.addShape('ellipse', {
    x: cx2 - r, y: cy - r, w: 2 * r, h: 2 * r,
    fill: { type: 'solid', color: COL.NAVY, transparency: 65 },
    line: { color: COL.NAVY_LIGHT, width: 1.5 },
  });

  slide.addText(leftLabel, {
    x: cx1 - r - 0.5, y: cy - r - 0.5, w: 1.2, h: 0.4,
    fontSize: 11, fontFace: FONT, color: COL.ORANGE_DEEP, bold: true, align: 'center',
  });
  slide.addText(rightLabel, {
    x: cx2 + r - 0.7, y: cy - r - 0.5, w: 1.2, h: 0.4,
    fontSize: 11, fontFace: FONT, color: COL.NAVY, bold: true, align: 'center',
  });
}

// ============================================================
// TABLEAU 2×2 DIAGNOSTIQUE (slide M4)
// ============================================================
export function plot2x2(slide, { x, y, w, h, title, tp, fp, fn, tn }) {
  slide.addShape('rect', {
    x, y, w, h,
    fill: { color: COL.WHITE }, line: { color: COL.BORDER, width: 0.5 },
  });
  if (title) {
    slide.addText(title, {
      x: x + 0.1, y: y + 0.05, w: w - 0.2, h: 0.3,
      fontSize: 10, fontFace: FONT, color: COL.TEXT_DARK, bold: true, align: 'center',
    });
  }

  const innerX = x + 0.4;
  const innerY = y + 0.55;
  const cellW = (w - 0.55) / 3;
  const cellH = (h - 0.7) / 3;

  function txt(c, r, value, opts = {}) {
    slide.addText(value, {
      x: innerX + c * cellW, y: innerY + r * cellH, w: cellW, h: cellH,
      fontSize: opts.fontSize ?? 11,
      fontFace: opts.mono ? 'Consolas' : FONT,
      color: opts.color ?? COL.TEXT_DARK,
      bold: opts.bold ?? false,
      align: 'center', valign: 'middle',
    });
  }
  function box(c, r, bg = COL.WHITE, border = COL.BORDER) {
    slide.addShape('rect', {
      x: innerX + c * cellW, y: innerY + r * cellH, w: cellW, h: cellH,
      fill: { color: bg }, line: { color: border, width: 0.75 },
    });
  }

  // En-têtes
  txt(0, 0, '', {});
  txt(1, 0, 'Malade +', { fontSize: 10, bold: true, color: COL.ORANGE });
  txt(2, 0, 'Malade −', { fontSize: 10, bold: true, color: COL.ORANGE });
  txt(0, 1, 'Test +', { fontSize: 10, bold: true, color: COL.ORANGE });
  txt(0, 2, 'Test −', { fontSize: 10, bold: true, color: COL.ORANGE });

  // Cellules
  box(1, 1, COL.WHITE);   txt(1, 1, `VP\n${tp}`, { fontSize: 13, bold: true, mono: true, color: COL.GREEN });
  box(2, 1);              txt(2, 1, `FP\n${fp}`, { fontSize: 13, bold: true, mono: true, color: COL.RED });
  box(1, 2);              txt(1, 2, `FN\n${fn}`, { fontSize: 13, bold: true, mono: true, color: COL.RED });
  box(2, 2, COL.WHITE);   txt(2, 2, `VN\n${tn}`, { fontSize: 13, bold: true, mono: true, color: COL.GREEN });
}
