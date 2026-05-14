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

  // Axes en L (gauche + bas)
  slide.addShape('line', {
    x: px, y: py + ph, w: pw, h: 0,
    line: { color: COL.NAVY, width: 0.75 },
  });
  slide.addShape('line', {
    x: px, y: py, w: 0, h: ph,
    line: { color: COL.NAVY, width: 0.75 },
  });

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

/** Segment de droite de (x1,y1) à (x2,y2). */
function segment(slide, x1, y1, x2, y2, color = COL.NAVY, width = 1, dash = null) {
  const lineOpts = { color, width };
  if (dash) lineOpts.dashType = dash;
  slide.addShape('line', {
    x: x1, y: y1, w: x2 - x1, h: y2 - y1,
    line: lineOpts,
  });
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
