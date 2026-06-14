/* @ds-bundle: {"format":3,"namespace":"OGILVIEDesignSystem_66064b","components":[],"sourceHashes":{"signs/Signs.jsx":"834dad4e9918","signs/anse-ogilvie/Shared.jsx":"e5d45aa498fc","signs/anse-ogilvie/VariantContraste.jsx":"be004f78f6d0","signs/anse-ogilvie/VariantEditorial.jsx":"1fd8b5cb4e88","signs/anse-ogilvie/VariantPhoto.jsx":"454fcd97879a","signs/anse-ogilvie/VariantSobre.jsx":"335021efe2c4","signs/anse-ogilvie/design-canvas.jsx":"5d0e39003628","signs/design-canvas.jsx":"3fc2600126c0","ui_kits/marketing-site/Chrome.jsx":"21dd7ce90b6a","ui_kits/marketing-site/Detail.jsx":"2cc5543d53cc","ui_kits/marketing-site/Hero.jsx":"39c64058db88","ui_kits/marketing-site/Primitives.jsx":"91e6890e4255","ui_kits/marketing-site/Sections.jsx":"fdef829d62d2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OGILVIEDesignSystem_66064b = window.OGILVIEDesignSystem_66064b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// signs/Signs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Signs.jsx — OGILVIE lot-sale signs, 18×24 po portrait, 2 variants.
// The site plan is the dominant element (~55-60% of sign surface).

// ─── Constants ──────────────────────────────────────────────────────────
const PX_PER_IN = 30;
const TRIM_W = 18 * PX_PER_IN; // 540
const TRIM_H = 24 * PX_PER_IN; // 720
const BLEED = 0.25 * PX_PER_IN; // 7.5
const BLEED_W = TRIM_W + BLEED * 2;
const BLEED_H = TRIM_H + BLEED * 2;
const SIGN = {
  lot: '07',
  secteur: 'Secteur 04 — La Crête',
  cadastre: '6 482 913',
  superficie: '8 741 m²  ·  2,16 acres',
  agent: 'Marc Ogilvie',
  role: 'Courtier immobilier',
  phone: '514 891 3827',
  email: 'info@domaineogilvie.com',
  url: 'domaineogilvie.com'
};

// ─── QR placeholder ─────────────────────────────────────────────────────
function QRBlock({
  size = 120,
  color = '#000',
  bg = 'transparent'
}) {
  const N = 21;
  const cells = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const inFinder = x < 7 && y < 7 || x > N - 8 && y < 7 || x < 7 && y > N - 8;
    const finderOn = (() => {
      const ix = x < 7 ? x : x - (N - 7);
      const iy = y < 7 ? y : y - (N - 7);
      const onRing = ix === 0 || ix === 6 || iy === 0 || iy === 6;
      const onCore = ix >= 2 && ix <= 4 && iy >= 2 && iy <= 4;
      return onRing || onCore;
    })();
    let on = false;
    if (inFinder) on = finderOn;else {
      const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      on = h - Math.floor(h) > 0.55;
    }
    if (on) cells.push(/*#__PURE__*/React.createElement("rect", {
      key: `${x}-${y}`,
      x: x,
      y: y,
      width: "1",
      height: "1",
      fill: color
    }));
  }
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${N} ${N}`,
    width: size,
    height: size,
    shapeRendering: "crispEdges",
    style: {
      display: 'block',
      background: bg
    }
  }, cells);
}

// ─── Crop marks ─────────────────────────────────────────────────────────
function CropMarks({
  w,
  h,
  bleed,
  color = '#888'
}) {
  const len = 10,
    off = 4;
  const marks = [{
    x1: -off - len,
    y1: bleed,
    x2: -off,
    y2: bleed
  }, {
    x1: bleed,
    y1: -off - len,
    x2: bleed,
    y2: -off
  }, {
    x1: w - bleed,
    y1: -off - len,
    x2: w - bleed,
    y2: -off
  }, {
    x1: w + off,
    y1: bleed,
    x2: w + off + len,
    y2: bleed
  }, {
    x1: -off - len,
    y1: h - bleed,
    x2: -off,
    y2: h - bleed
  }, {
    x1: bleed,
    y1: h + off,
    x2: bleed,
    y2: h + off + len
  }, {
    x1: w + off,
    y1: h - bleed,
    x2: w + off + len,
    y2: h - bleed
  }, {
    x1: w - bleed,
    y1: h + off,
    x2: w - bleed,
    y2: h + off + len
  }];
  return /*#__PURE__*/React.createElement("svg", {
    width: w + len * 4,
    height: h + len * 4,
    style: {
      position: 'absolute',
      left: -len * 2,
      top: -len * 2,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("g", {
    transform: `translate(${len * 2},${len * 2})`,
    stroke: color,
    strokeWidth: "0.5"
  }, marks.map((m, i) => /*#__PURE__*/React.createElement("line", _extends({
    key: i
  }, m)))));
}

// ─── SitePlan — the dominant element ────────────────────────────────────
// A schematic site plan of ~20 adjacent parcels. The featured lot is
// highlighted. Roads, a creek, a lake edge, contour rings, a north arrow,
// scale bar. Tone + accent colors swap via props.
function SitePlan({
  width,
  height,
  paper = '#FDFBF6',
  // background "paper"
  ink = '#000',
  // default line + text
  muted = 'rgba(0,0,0,0.35)',
  // contours, adjacent parcels
  highlight = '#9B6B43',
  // the featured lot
  water = 'rgba(87,81,70,0.18)',
  forest = 'rgba(140,138,115,0.22)',
  label = '07',
  borderTone = 'rgba(0,0,0,0.6)',
  inset = false // true = variant B dark style
}) {
  // ViewBox — internal coords, projected onto any container size.
  // Map roughly represents ~800 m × 1000 m area.
  const V = {
    w: 800,
    h: 1000
  };

  // Road (main spine) — zig-zag entering top-right, exits bottom-left.
  const road = "M 780 80 L 640 230 L 620 380 L 520 470 L 500 600 L 360 680 L 240 810 L 60 940";

  // Creek — flows NW to SE
  const creek = "M 80 120 C 200 260, 260 360, 240 480 S 320 680, 420 780";

  // Parcels — rectilinear plan, 20 of them, one highlighted.
  // Each parcel is a polygon; cadastral lines are visible.
  // Coords are hand-composed to feel like a real subdivision.
  const parcels = [
  // column 1 — west of road
  {
    pts: '100 140, 300 140, 300 260, 100 260',
    n: '01'
  }, {
    pts: '100 260, 300 260, 300 370, 100 370',
    n: '02'
  }, {
    pts: '100 370, 300 370, 280 490, 100 490',
    n: '03'
  }, {
    pts: '100 490, 280 490, 260 600, 100 600',
    n: '04'
  }, {
    pts: '100 600, 260 600, 240 710, 100 710',
    n: '05'
  }, {
    pts: '100 710, 240 710, 220 820, 100 820',
    n: '06'
  },
  // column 2 — middle strip
  {
    pts: '300 140, 460 140, 460 260, 300 260',
    n: '08'
  }, {
    pts: '300 260, 460 260, 460 370, 300 370',
    n: '09'
  }, {
    pts: '300 370, 500 370, 500 490, 280 490',
    n: '10'
  }, {
    pts: '280 490, 500 490, 500 600, 260 600',
    n: '11'
  }, {
    pts: '260 600, 500 600, 480 710, 240 710',
    n: '12'
  }, {
    pts: '240 710, 480 710, 460 820, 220 820',
    n: '13'
  },
  // highlighted — column 3, row 2 (the "07")
  {
    pts: '460 140, 620 140, 620 260, 460 260',
    n: '07',
    highlight: true
  },
  // column 3 — east
  {
    pts: '460 260, 620 260, 620 370, 460 370',
    n: '14'
  }, {
    pts: '500 370, 640 370, 640 490, 500 490',
    n: '15'
  }, {
    pts: '500 490, 640 490, 640 600, 500 600',
    n: '16'
  }, {
    pts: '500 600, 620 600, 620 710, 480 710',
    n: '17'
  }, {
    pts: '480 710, 620 710, 600 820, 460 820',
    n: '18'
  }];
  const labels = parcels.filter(p => !p.highlight).map(p => {
    const coords = p.pts.split(',').map(s => s.trim().split(' ').map(Number));
    const cx = coords.reduce((a, c) => a + c[0], 0) / coords.length;
    const cy = coords.reduce((a, c) => a + c[1], 0) / coords.length;
    return {
      n: p.n,
      cx,
      cy
    };
  });
  const highlighted = parcels.find(p => p.highlight);
  const hCoords = highlighted.pts.split(',').map(s => s.trim().split(' ').map(Number));
  const hcx = hCoords.reduce((a, c) => a + c[0], 0) / hCoords.length;
  const hcy = hCoords.reduce((a, c) => a + c[1], 0) / hCoords.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${V.w} ${V.h}`,
    width: width,
    height: height,
    preserveAspectRatio: "xMidYMid slice",
    style: {
      display: 'block',
      background: paper
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: V.w,
    height: V.h,
    fill: forest
  }), /*#__PURE__*/React.createElement("path", {
    d: `M ${V.w} ${V.h - 240} C ${V.w - 120} ${V.h - 180}, ${V.w - 200} ${V.h - 80}, ${V.w - 280} ${V.h} L ${V.w} ${V.h} Z`,
    fill: water
  }), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: muted,
    strokeWidth: "0.6",
    opacity: "0.5"
  }, [140, 180, 230, 290, 360].map((r, i) => /*#__PURE__*/React.createElement("ellipse", {
    key: i,
    cx: "380",
    cy: "520",
    rx: r,
    ry: r * 0.7
  }))), /*#__PURE__*/React.createElement("path", {
    d: creek,
    stroke: water.replace('0.18', '0.55').replace('0.22', '0.55'),
    strokeWidth: "3",
    fill: "none",
    opacity: "0.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: creek,
    stroke: muted,
    strokeWidth: "0.5",
    fill: "none",
    strokeDasharray: "3 2",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("g", null, parcels.filter(p => !p.highlight).map((p, i) => /*#__PURE__*/React.createElement("polygon", {
    key: i,
    points: p.pts,
    fill: inset ? 'rgba(213,197,164,0.10)' : 'rgba(253,251,246,0.55)',
    stroke: muted,
    strokeWidth: "0.8"
  }))), /*#__PURE__*/React.createElement("path", {
    d: road,
    stroke: ink,
    strokeWidth: "10",
    fill: "none",
    strokeLinecap: "round",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: road,
    stroke: paper,
    strokeWidth: "1.4",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: "8 8"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: highlighted.pts,
    fill: highlight,
    fillOpacity: "0.18",
    stroke: highlight,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: highlighted.pts,
    fill: "none",
    stroke: highlight,
    strokeWidth: "1",
    strokeDasharray: "6 4",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("g", {
    fontFamily: "ui-monospace, Menlo, monospace",
    fontSize: "11",
    fill: muted
  }, labels.map(l => /*#__PURE__*/React.createElement("text", {
    key: l.n,
    x: l.cx,
    y: l.cy + 4,
    textAnchor: "middle"
  }, l.n))), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: hcx,
    cy: hcy,
    r: "42",
    fill: paper,
    stroke: highlight,
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: hcx,
    y: hcy + 14,
    textAnchor: "middle",
    fontFamily: "Gloock, serif",
    fontSize: "40",
    fill: highlight
  }, label)), /*#__PURE__*/React.createElement("g", {
    transform: "translate(50,60)",
    fill: ink
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "0,-22 6,6 0,0 -6,6",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "22",
    textAnchor: "middle",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: "11",
    fontWeight: "600",
    letterSpacing: "0.18em",
    fill: ink
  }, "N")), /*#__PURE__*/React.createElement("g", {
    transform: `translate(40,${V.h - 40})`
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "-4",
    width: "60",
    height: "6",
    fill: ink
  }), /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "-4",
    width: "60",
    height: "6",
    fill: "none",
    stroke: ink,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "-12",
    fontFamily: "ui-monospace, Menlo, monospace",
    fontSize: "10",
    fill: ink
  }, "0"), /*#__PURE__*/React.createElement("text", {
    x: "120",
    y: "-12",
    fontFamily: "ui-monospace, Menlo, monospace",
    fontSize: "10",
    fill: ink,
    textAnchor: "end"
  }, "100 m")), /*#__PURE__*/React.createElement("g", {
    transform: `translate(${V.w - 210},${V.h - 88})`,
    fontFamily: "'DM Sans',sans-serif",
    fontSize: "11",
    fill: ink
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "-4",
    width: "14",
    height: "10",
    fill: highlight,
    fillOpacity: "0.22",
    stroke: highlight,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "22",
    y: "5"
  }, "Lot disponible"), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "14",
    width: "14",
    height: "10",
    fill: inset ? 'rgba(213,197,164,0.10)' : 'rgba(253,251,246,0.55)',
    stroke: muted
  }), /*#__PURE__*/React.createElement("text", {
    x: "22",
    y: "23"
  }, "Lots voisins"), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "40",
    x2: "14",
    y2: "40",
    stroke: ink,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "22",
    y: "43"
  }, "Chemin"), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "56",
    x2: "14",
    y2: "56",
    stroke: water.replace('0.18', '0.7').replace('0.22', '0.7'),
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "22",
    y: "59"
  }, "Ruisseau")), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: V.w,
    height: V.h,
    fill: "none",
    stroke: borderTone,
    strokeWidth: "1"
  }));
}

// ─── SubLabel helper ────────────────────────────────────────────────────
function SubLabel({
  children,
  size = 10,
  color = 'currentColor',
  track = '0.22em',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      fontSize: size,
      letterSpacing: track,
      textTransform: 'uppercase',
      color,
      lineHeight: 1.3,
      ...style
    }
  }, children);
}

// ─── VARIANT A — Sobre / éditorial ──────────────────────────────────────
function VariantA() {
  const PAD = 36;
  const headerH = 92;
  const planH = 410; // dominant
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: TRIM_W,
      height: TRIM_H,
      background: 'var(--sable-patine)',
      color: '#000',
      position: 'relative',
      padding: `${PAD}px ${PAD}px ${PAD}px`,
      boxSizing: 'border-box',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: '1px solid #000',
      paddingBottom: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Gloock', serif",
      fontSize: 34,
      letterSpacing: '0.02em',
      lineHeight: 1
    }
  }, "OGILVIE."), /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.28em",
    style: {
      marginTop: 6
    }
  }, "Les Grands Espaces \xB7 Mont-Blanc")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(SubLabel, {
    size: 9,
    track: "0.24em",
    style: {
      color: 'rgba(0,0,0,0.55)'
    }
  }, "Lot"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Gloock', serif",
      fontSize: 54,
      lineHeight: 0.9,
      letterSpacing: '-0.02em',
      marginTop: 2
    }
  }, SIGN.lot), /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.22em",
    style: {
      marginTop: 4,
      color: 'rgba(0,0,0,0.55)'
    }
  }, "\xC0 vendre"))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid #000',
      background: '#FDFBF6',
      height: planH,
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(SitePlan, {
    width: "100%",
    height: "100%",
    paper: "#FDFBF6",
    ink: "#000",
    muted: "rgba(0,0,0,0.4)",
    highlight: "#9B6B43",
    water: "rgba(87,81,70,0.22)",
    forest: "rgba(140,138,115,0.20)",
    label: SIGN.lot,
    borderTone: "transparent"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 10,
      bottom: 10,
      background: 'rgba(253,251,246,0.92)',
      padding: '5px 8px',
      border: '1px solid rgba(0,0,0,0.2)'
    }
  }, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em"
  }, "Plan du domaine \xB7 Secteur 04"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 12,
      borderBottom: '1px solid #000',
      padding: '14px 0',
      margin: '14px 0 14px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em",
    style: {
      color: 'rgba(0,0,0,0.55)'
    }
  }, "Secteur"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 3,
      fontWeight: 500
    }
  }, SIGN.secteur.replace('Secteur 04 — ', ''))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em",
    style: {
      color: 'rgba(0,0,0,0.55)'
    }
  }, "Cadastre"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 3,
      fontFamily: 'ui-monospace, Menlo, monospace'
    }
  }, SIGN.cadastre)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em",
    style: {
      color: 'rgba(0,0,0,0.55)'
    }
  }, "Superficie"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 3,
      fontFamily: 'ui-monospace, Menlo, monospace'
    }
  }, SIGN.superficie))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 16,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em",
    style: {
      color: 'rgba(0,0,0,0.55)'
    }
  }, "Contactez"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      marginTop: 4
    }
  }, SIGN.agent), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'rgba(0,0,0,0.6)',
      marginTop: 1
    }
  }, SIGN.role), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      marginTop: 8,
      fontFamily: 'ui-monospace, Menlo, monospace'
    }
  }, SIGN.phone), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      marginTop: 2,
      color: 'rgba(0,0,0,0.7)'
    }
  }, SIGN.email), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Gloock', serif",
      fontSize: 16,
      letterSpacing: '0.02em',
      marginTop: 8,
      textTransform: 'uppercase'
    }
  }, SIGN.url)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      padding: 5,
      border: '1px solid #000'
    }
  }, /*#__PURE__*/React.createElement(QRBlock, {
    size: 74,
    color: "#000"
  })), /*#__PURE__*/React.createElement(SubLabel, {
    size: 7,
    track: "0.22em",
    style: {
      marginTop: 5,
      color: 'rgba(0,0,0,0.55)',
      textAlign: 'center'
    }
  }, "Voir", /*#__PURE__*/React.createElement("br", null), "le plan complet"))));
}

// ─── VARIANT B — Contraste fort ─────────────────────────────────────────
function VariantB() {
  const PAD = 36;
  const planH = 420;
  return /*#__PURE__*/React.createElement("div", {
    "data-pancarte": "B",
    style: {
      width: TRIM_W,
      height: TRIM_H,
      background: '#000',
      color: 'var(--sable-patine)',
      position: 'relative',
      padding: `${PAD}px ${PAD}px ${PAD}px`,
      boxSizing: 'border-box',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: '1px solid var(--sable-patine)',
      paddingBottom: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Gloock', serif",
      fontSize: 34,
      letterSpacing: '0.02em',
      lineHeight: 1,
      color: 'var(--sable-patine)'
    }
  }, "OGILVIE."), /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.28em",
    style: {
      marginTop: 6,
      color: 'var(--sable-patine)'
    }
  }, "Les Grands Espaces \xB7 Mont-Blanc")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(SubLabel, {
    size: 9,
    track: "0.24em",
    style: {
      color: 'var(--corten)'
    }
  }, "Lot"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Gloock', serif",
      fontSize: 54,
      lineHeight: 0.9,
      letterSpacing: '-0.02em',
      marginTop: 2,
      color: 'var(--sable-patine)'
    }
  }, SIGN.lot), /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.22em",
    style: {
      marginTop: 4,
      color: 'rgba(213,197,164,0.65)'
    }
  }, "\xC0 vendre"))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--sable-patine)',
      background: '#0d0c09',
      height: planH,
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(SitePlan, {
    width: "100%",
    height: "100%",
    paper: "#0d0c09",
    ink: "#D5C5A4",
    muted: "rgba(213,197,164,0.4)",
    highlight: "#C48355",
    water: "rgba(140,138,115,0.30)",
    forest: "rgba(213,197,164,0.06)",
    label: SIGN.lot,
    borderTone: "transparent",
    inset: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 10,
      bottom: 10,
      background: 'rgba(0,0,0,0.65)',
      padding: '5px 8px',
      border: '1px solid rgba(213,197,164,0.4)'
    }
  }, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em",
    style: {
      color: 'var(--sable-patine)'
    }
  }, "Plan du domaine \xB7 Secteur 04"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 12,
      borderBottom: '1px solid var(--sable-patine)',
      padding: '14px 0',
      margin: '14px 0 14px',
      color: 'var(--sable-patine)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em",
    style: {
      color: 'rgba(213,197,164,0.55)'
    }
  }, "LES GRANDS ESPACES \xB7 MONT-BLANC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 3,
      fontWeight: 500
    }
  }, SIGN.secteur.replace('Secteur 04 — ', ''))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em",
    style: {
      color: 'rgba(213,197,164,0.55)'
    }
  }, "LES GRANDS ESPACES \xB7 MONT-BLANC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 3,
      fontFamily: 'ui-monospace, Menlo, monospace'
    }
  }, SIGN.cadastre)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em",
    style: {
      color: 'rgba(213,197,164,0.55)'
    }
  }, "Superficie"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 3,
      fontFamily: 'ui-monospace, Menlo, monospace'
    }
  }, SIGN.superficie))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 16,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SubLabel, {
    size: 8,
    track: "0.24em",
    style: {
      color: 'rgba(213,197,164,0.55)'
    }
  }, "Contactez"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      marginTop: 4,
      color: 'var(--sable-patine)'
    }
  }, SIGN.agent), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'rgba(213,197,164,0.65)',
      marginTop: 1
    }
  }, SIGN.role), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      marginTop: 8,
      fontFamily: 'ui-monospace, Menlo, monospace',
      color: 'var(--sable-patine)'
    }
  }, SIGN.phone), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      marginTop: 2,
      color: 'rgba(213,197,164,0.7)'
    }
  }, SIGN.email), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Gloock', serif",
      fontSize: 16,
      letterSpacing: '0.02em',
      marginTop: 8,
      textTransform: 'uppercase',
      color: 'var(--corten)'
    }
  }, SIGN.url)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sable-patine)',
      padding: 5
    }
  }, /*#__PURE__*/React.createElement(QRBlock, {
    size: 74,
    color: "#000"
  })), /*#__PURE__*/React.createElement(SubLabel, {
    size: 7,
    track: "0.22em",
    style: {
      marginTop: 5,
      color: 'rgba(213,197,164,0.6)',
      textAlign: 'center'
    }
  }, "Voir", /*#__PURE__*/React.createElement("br", null), "le plan complet"))));
}

// ─── Artboard with bleed + crop marks ───────────────────────────────────
function SignArtboard({
  label,
  children,
  bleedBg
}) {
  return /*#__PURE__*/React.createElement(DCArtboard, {
    label: label,
    width: BLEED_W,
    height: BLEED_H,
    style: {
      background: bleedBg,
      boxShadow: '0 4px 28px rgba(0,0,0,0.10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: BLEED_W,
      height: BLEED_H
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: BLEED,
      top: BLEED
    }
  }, children), /*#__PURE__*/React.createElement("svg", {
    width: BLEED_W,
    height: BLEED_H,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: BLEED,
    y: BLEED,
    width: TRIM_W,
    height: TRIM_H,
    fill: "none",
    stroke: "rgba(255,0,0,0.35)",
    strokeWidth: "0.5",
    strokeDasharray: "4 3"
  })), /*#__PURE__*/React.createElement(CropMarks, {
    w: BLEED_W,
    h: BLEED_H,
    bleed: BLEED
  })));
}

// ─── App ────────────────────────────────────────────────────────────────
function App() {
  return /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 60px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Gloock', serif",
      fontSize: 42,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      color: '#1a1510',
      marginBottom: 6
    }
  }, "Pancartes de lot"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 14,
      color: 'rgba(40,30,20,0.7)',
      maxWidth: 720,
      lineHeight: 1.55
    }
  }, "18 po \xD7 24 po portrait, coroplaste, fond perdu 0,25 po. Le plan du domaine occupe d\xE9sormais plus de la moiti\xE9 de la pancarte \u2014 l'information pratique (lot, cadastre, contact, QR) est compact\xE9e en haut et en bas.")), /*#__PURE__*/React.createElement(DCSection, {
    title: "Variante A \u2014 Sobre / \xE9ditorial",
    subtitle: "Fond sable, plan sur papier cr\xE8me, lot cibl\xE9 en corten."
  }, /*#__PURE__*/React.createElement(SignArtboard, {
    label: `${BLEED_W} × ${BLEED_H} px · 18 po × 24 po + 0,25 po bleed · échelle 30 px/po`,
    bleedBg: "var(--sable-patine)"
  }, /*#__PURE__*/React.createElement(VariantA, null)), /*#__PURE__*/React.createElement(DCPostIt, {
    top: 60,
    left: -30,
    rotate: -3,
    width: 200
  }, "Plan = ~55 % de la surface. Lisible \xE0 ~3-4 m. Le gros num\xE9ro de lot en haut \xE0 droite reste l'ancre visuelle de loin.")), /*#__PURE__*/React.createElement(DCSection, {
    title: "Variante B \u2014 Contraste fort",
    subtitle: "Charbon, plan invers\xE9 en tons sable, lot cibl\xE9 en corten plus chaud."
  }, /*#__PURE__*/React.createElement(SignArtboard, {
    label: `${BLEED_W} × ${BLEED_H} px · 18 po × 24 po + 0,25 po bleed · échelle 30 px/po`,
    bleedBg: "#000"
  }, /*#__PURE__*/React.createElement(VariantB, null)), /*#__PURE__*/React.createElement(DCPostIt, {
    top: 80,
    left: -30,
    rotate: 2,
    width: 200
  }, "Attention \xE0 la chaleur du coroplaste noir en plein soleil. Ok en sous-bois.")), /*#__PURE__*/React.createElement(DCSection, {
    title: "Notes de production",
    subtitle: "Pour l'imprimeur \xB7 coroplaste 4 mm, fixation par clous \xE0 t\xEAte large sur arbre."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 620,
      padding: '24px 28px',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 13,
      lineHeight: 1.55,
      color: '#2a2620'
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", null, "Trim"), " : 18 po \xD7 24 po portrait \xB7 ", /*#__PURE__*/React.createElement("b", null, "Fond perdu"), " : +0,25 po \u2192 18,5 po \xD7 24,5 po"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", null, "Plan"), " : SVG vectoriel \xE0 r\xE9g\xE9n\xE9rer par lot (surface couverte \u2248 55-60 %)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", null, "Couleurs"), " : Noir 100 % \xB7 Sable #D5C5A4 \xB7 Corten #9B6B43"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", null, "Typos"), " : Gloock (OGILVIE + num\xE9ros), DM Sans 500 track\xE9 +240 pour les sous-\xE9tiquettes"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", null, "QR"), " : pointe vers ", /*#__PURE__*/React.createElement("code", null, "domaineogilvie.com/lot/", '{lot}')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", null, "Fixation"), " : clous \xE0 t\xEAte large sur arbre \xB7 zone utile \xE0 \u2265 1 po des bords")))));
}

// Expose components for standalone pages
Object.assign(window, {
  VariantA,
  VariantB,
  QRBlock,
  CropMarks,
  SitePlan,
  SubLabel,
  SignArtboard,
  App
});

// Only auto-mount the canvas App if DesignCanvas is loaded (i.e. we're in Pancartes.html).
// Standalone pages (Pancarte-A.html / Pancarte-B.html) handle their own mounting.
if (typeof DesignCanvas !== 'undefined' && !window.__OGILVIE_SIGNS_MOUNTED__) {
  window.__OGILVIE_SIGNS_MOUNTED__ = true;
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "signs/Signs.jsx", error: String((e && e.message) || e) }); }

// signs/anse-ogilvie/Shared.jsx
try { (() => {
/* OGILVIE — Composants partagés pour la méga pancarte L'Anse Ogilvie
   ----------------------------------------------------------------
   La pancarte finale fait 8 pi × 8 pi (deux 4×8 empilés en paysage).
   Échelle d'écran : 1 pi = 144 px → 1152 × 1152 px par pancarte virtuelle.
   On rend chaque variante en deux <Panel /> séparés (top/bottom) qui s'affichent
   collés ; un repère discret marque la jonction physique.
*/

const SCALE = 144; // px par pied
const SIGN_W = 8 * SCALE; // 1152 px
const SIGN_H = 4 * SCALE; // 576 px par panneau
const TOTAL_H = 2 * SIGN_H; // 1152 px (8 pi de haut)

// --- Repère de jonction physique entre les deux 4×8 ----------------------
const SeamMark = ({
  side = 'left'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    [side]: -28,
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: 9,
    letterSpacing: '0.18em',
    color: 'rgba(0,0,0,0.35)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  }
}, side === 'left' ? '— jonction 4\u00d78 / 4\u00d78 —' : '— 8\u00d78 ft —');

// --- QR code dessiné en "fonctionnel placeholder" ------------------------
//     (motif déterministe, pas un vrai QR — à remplacer par un PNG réel)
const QRPlaceholder = ({
  size = 140,
  fg = '#000',
  bg = '#fff'
}) => {
  const grid = 21;
  const cell = size / grid;
  // pattern stable dérivé d'une seed
  const cells = [];
  let seed = 9301;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      seed = (seed * 9301 + 49297) % 233280;
      const on = seed / 233280 > 0.55;
      // Forcer les 3 marqueurs de coin
      const inFinder = x < 7 && y < 7 || x >= grid - 7 && y < 7 || x < 7 && y >= grid - 7;
      if (inFinder) {
        const lx = x < 7 ? x : x - (grid - 7);
        const ly = y < 7 ? y : y - (grid - 7);
        const onFinder = lx === 0 || lx === 6 || ly === 0 || ly === 6 || lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
        if (onFinder) cells.push([x, y]);
      } else if (on) {
        cells.push([x, y]);
      }
    }
  }
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    width: size,
    height: size,
    fill: bg
  }), cells.map(([x, y], i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: x * cell,
    y: y * cell,
    width: cell,
    height: cell,
    fill: fg
  })));
};

// --- Logo OGILVIE. en SVG (pour fidélité d'impression) -------------------
//     On utilise le PNG transmis dans assets, à charger via <img>.
const Wordmark = ({
  height = 120,
  color = '#000',
  style = {}
}) => /*#__PURE__*/React.createElement("img", {
  src: "logo-ogilvie.png",
  alt: "OGILVIE.",
  style: {
    height,
    display: 'block',
    filter: color === '#000' ? 'none' : `brightness(0) invert(1)`,
    ...style
  }
});

// --- Plan des lots ------------------------------------------------------
const LotsPlan = ({
  style = {},
  mode = 'natural'
}) => {
  // mode: 'natural' | 'sepia' | 'mono'
  const filter = mode === 'sepia' ? 'sepia(0.7) saturate(0.7) contrast(0.95)' : mode === 'mono' ? 'grayscale(1) contrast(1.05)' : 'none';
  return /*#__PURE__*/React.createElement("img", {
    src: "plan-lots.png",
    alt: "Plan des lots \u2014 L'Anse Ogilvie",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
      filter,
      ...style
    }
  });
};

// --- Cadre de panneau — utilisé par toutes les variantes ----------------
const Panel = ({
  children,
  bg = '#FDFBF6',
  side,
  style = {}
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    width: SIGN_W,
    height: SIGN_H,
    background: bg,
    color: '#000',
    overflow: 'hidden',
    fontFamily: 'DM Sans, sans-serif',
    ...style
  }
}, children, side && /*#__PURE__*/React.createElement(SeamMark, {
  side: "left"
}));

// --- Container 8x8 unifié ------------------------------------------------
const SignBoard = ({
  children,
  label,
  scale = 0.42
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: SIGN_W,
    height: TOTAL_H
  }
}, children);

// Export to window for use by other Babel scripts
Object.assign(window, {
  SCALE,
  SIGN_W,
  SIGN_H,
  TOTAL_H,
  SeamMark,
  QRPlaceholder,
  Wordmark,
  LotsPlan,
  Panel,
  SignBoard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "signs/anse-ogilvie/Shared.jsx", error: String((e && e.message) || e) }); }

// signs/anse-ogilvie/VariantContraste.jsx
try { (() => {
/* OGILVIE — L'Anse Ogilvie · Variante 2 — CONTRASTÉ
   --------------------------------------------------
   Charbon profond + corten. Le plan des lots est inversé / éclairé,
   posé sur le panneau du bas. OGILVIE. dévore le panneau du haut.
   À lire de très loin. Effet "monolithe".
*/

const VariantContraste = () => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: SIGN_W,
      height: TOTAL_H
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    bg: "#000000",
    side: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 28,
      left: 56,
      right: 56,
      height: 1,
      background: '#9B6B43'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 44,
      left: 56,
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 18,
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: '#9B6B43',
      fontWeight: 500
    }
  }, "OGILVIE. \u2014 Anse"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 44,
      right: 56,
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 14,
      letterSpacing: '0.04em',
      color: '#D5C5A4'
    }
  }, "-74.394739, 46.096005"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 110,
      left: 48,
      right: 48,
      fontFamily: 'Gloock, serif',
      fontSize: 360,
      lineHeight: 0.86,
      letterSpacing: '-0.035em',
      color: '#D5C5A4',
      textTransform: 'uppercase',
      fontWeight: 400
    }
  }, "L'Anse"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 60,
      right: 56,
      fontFamily: 'Ibarra Real Nova, serif',
      fontStyle: 'italic',
      fontSize: 36,
      lineHeight: 1.15,
      color: '#9B6B43',
      textAlign: 'right',
      maxWidth: 580
    }
  }, "Neuf terrains privil\xE8ges", /*#__PURE__*/React.createElement("br", null), "avec acc\xE8s exclusif au Lac\xA0Rougeaud.")), /*#__PURE__*/React.createElement(Panel, {
    bg: "#D5C5A4"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 86,
      background: '#9B6B43',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 56px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Gloock, serif',
      fontSize: 64,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: '#000',
      textTransform: 'uppercase'
    }
  }, "OGILVIE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 18,
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: '#000',
      fontWeight: 600
    }
  }, "9 Terrains \xB7 Lac Rougeaud \xB7 Mont-Blanc")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 86,
      left: 0,
      bottom: 0,
      width: 760,
      overflow: 'hidden',
      borderRight: '1px solid #000'
    }
  }, /*#__PURE__*/React.createElement(LotsPlan, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 20,
      left: 20,
      background: '#000',
      color: '#D5C5A4',
      padding: '10px 16px',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 13,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      fontWeight: 500
    }
  }, "Plan des 9 terrains")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 86,
      right: 0,
      bottom: 0,
      width: SIGN_W - 760,
      padding: '32px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 13,
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: '#575146',
      fontWeight: 600,
      marginBottom: 10
    }
  }, "Courtier"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Gloock, serif',
      fontSize: 38,
      lineHeight: 1.02,
      color: '#000',
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      marginBottom: 6
    }
  }, "Laurier", /*#__PURE__*/React.createElement("br", null), "Balthazard"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Ibarra Real Nova, serif',
      fontStyle: 'italic',
      fontSize: 16,
      color: '#575146',
      marginBottom: 18
    }
  }, "Engel & V\xF6lkers"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#000',
      color: '#D5C5A4',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: '0.04em',
      lineHeight: 1.2
    }
  }, "514 891 3827"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 11,
      opacity: 0.85,
      marginTop: 4,
      wordBreak: 'break-all'
    }
  }, "laurier.balthazard@engelvoelkers.com"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '4px solid #000',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement(QRPlaceholder, {
    size: 110
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 10,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: '#000',
      maxWidth: 100,
      lineHeight: 1.4,
      paddingBottom: 4,
      fontWeight: 600
    }
  }, "Scannez", /*#__PURE__*/React.createElement("br", null), "pour les", /*#__PURE__*/React.createElement("br", null), "d\xE9tails")))));
};
window.VariantContraste = VariantContraste;
})(); } catch (e) { __ds_ns.__errors.push({ path: "signs/anse-ogilvie/VariantContraste.jsx", error: String((e && e.message) || e) }); }

// signs/anse-ogilvie/VariantEditorial.jsx
try { (() => {
/* OGILVIE — L'Anse Ogilvie · Variante 4 — ÉDITORIAL
   --------------------------------------------------
   Composition asymétrique. Le plan des lots déborde de bas en haut
   sur la GAUCHE des deux panneaux (effet continuité totale qui prouve
   que les 4×8 ne sont qu'une coupure mécanique). Typo italique.
*/

const VariantEditorial = () => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: SIGN_W,
      height: TOTAL_H,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    bg: "#FDFBF6",
    side: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: 580,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "plan-lots.png",
    alt: "Plan",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 580,
      height: TOTAL_H,
      // déborde sur 8 pi !
      objectFit: 'cover',
      objectPosition: 'left top',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 28,
      left: 612,
      right: 56,
      height: 1,
      background: '#000'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 44,
      left: 612,
      right: 56,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 16,
      letterSpacing: '0.30em',
      textTransform: 'uppercase',
      color: '#575146',
      fontWeight: 500
    }
  }, "N\xB0 02 \u2014 L'Anse"), /*#__PURE__*/React.createElement(Wordmark, {
    height: 36
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 130,
      left: 612,
      right: 48,
      fontFamily: 'Ibarra Real Nova, Playfair Display, serif',
      fontStyle: 'italic',
      fontSize: 200,
      lineHeight: 0.9,
      color: '#000',
      letterSpacing: '-0.025em',
      fontWeight: 400
    }
  }, "L'Anse", /*#__PURE__*/React.createElement("br", null), "Ogilvie."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 60,
      left: 612,
      right: 56,
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 24,
      lineHeight: 1.35,
      letterSpacing: '0.02em',
      color: '#575146',
      maxWidth: 480
    }
  }, "Neuf terrains privil\xE8ges avec acc\xE8s exclusif au Lac\xA0Rougeaud.")), /*#__PURE__*/React.createElement(Panel, {
    bg: "#9B6B43"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: 580,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "plan-lots.png",
    alt: "",
    style: {
      position: 'absolute',
      top: -SIGN_H,
      left: 0,
      width: 580,
      height: TOTAL_H,
      objectFit: 'cover',
      objectPosition: 'left top',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 580,
      right: 0,
      bottom: 0,
      padding: '32px 56px 40px',
      color: '#FDFBF6',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 14,
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: '#FDFBF6',
      fontWeight: 500,
      marginBottom: 14,
      opacity: 0.85
    }
  }, "Courtier \xB7 Renseignements"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Gloock, serif',
      fontSize: 64,
      lineHeight: 1.0,
      color: '#FDFBF6',
      textTransform: 'uppercase',
      letterSpacing: '-0.015em',
      marginBottom: 8
    }
  }, "Laurier", /*#__PURE__*/React.createElement("br", null), "Balthazard"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Ibarra Real Nova, serif',
      fontStyle: 'italic',
      fontSize: 22,
      opacity: 0.9,
      marginBottom: 20
    }
  }, "Engel & V\xF6lkers"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 38,
      fontWeight: 600,
      letterSpacing: '0.03em',
      lineHeight: 1.1
    }
  }, "514 891 3827"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 16,
      opacity: 0.85,
      marginTop: 8,
      wordBreak: 'break-all'
    }
  }, "laurier.balthazard@engelvoelkers.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '4px solid #FDFBF6',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement(QRPlaceholder, {
    size: 130
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 12,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: '#FDFBF6',
      maxWidth: 130,
      lineHeight: 1.4,
      paddingBottom: 6,
      fontWeight: 600
    }
  }, "Scannez", /*#__PURE__*/React.createElement("br", null), "pour les", /*#__PURE__*/React.createElement("br", null), "d\xE9tails du projet")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 12,
      letterSpacing: '0.05em',
      color: '#FDFBF6',
      opacity: 0.75,
      textAlign: 'right'
    }
  }, "-74.394739", /*#__PURE__*/React.createElement("br", null), "46.096005")))));
};
window.VariantEditorial = VariantEditorial;
})(); } catch (e) { __ds_ns.__errors.push({ path: "signs/anse-ogilvie/VariantEditorial.jsx", error: String((e && e.message) || e) }); }

// signs/anse-ogilvie/VariantPhoto.jsx
try { (() => {
/* OGILVIE — L'Anse Ogilvie · Variante 3 — PHOTO DOMINANTE
   ---------------------------------------------------------
   Bandeau photo paysage sépia full-bleed sur le panneau du HAUT,
   avec le titre overlay en sable. Le bas reçoit le plan + courtier
   sur sable patiné. Effet édito.
*/

const VariantPhoto = () => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: SIGN_W,
      height: TOTAL_H
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    bg: "#1c1812",
    side: true,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "landscape.jpg",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 65%',
      filter: 'sepia(0.45) saturate(0.85) brightness(0.95) contrast(1.05)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.55) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 28,
      left: 56,
      right: 56,
      height: 1,
      background: '#D5C5A4'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 44,
      left: 56,
      right: 56,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 18,
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: '#D5C5A4',
      fontWeight: 500
    }
  }, "Les Grands Espaces \u2014 Mont-Blanc"), /*#__PURE__*/React.createElement(Wordmark, {
    height: 44,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 60,
      left: 56,
      right: 56,
      color: '#D5C5A4'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Ibarra Real Nova, Playfair Display, serif',
      fontStyle: 'italic',
      fontSize: 240,
      lineHeight: 0.92,
      letterSpacing: '-0.025em',
      fontWeight: 400
    }
  }, "L'Anse\xA0Ogilvie"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 24,
      letterSpacing: '0.04em',
      color: '#D5C5A4',
      fontWeight: 400,
      maxWidth: 720
    }
  }, "Neuf terrains privil\xE8ges avec acc\xE8s exclusif au Lac Rougeaud."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 14,
      letterSpacing: '0.05em',
      color: '#D5C5A4',
      opacity: 0.8
    }
  }, "-74.394739, 46.096005")))), /*#__PURE__*/React.createElement(Panel, {
    bg: "#FDFBF6"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: 760,
      overflow: 'hidden',
      borderRight: '1px solid #000'
    }
  }, /*#__PURE__*/React.createElement(LotsPlan, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 24,
      left: 24,
      background: '#FDFBF6',
      border: '1px solid #000',
      padding: '10px 16px',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 13,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      fontWeight: 500
    }
  }, "Plan des terrains"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: SIGN_W - 760,
      padding: '36px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 13,
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: '#575146',
      fontWeight: 600,
      marginBottom: 12
    }
  }, "Courtier immobilier"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Gloock, serif',
      fontSize: 42,
      lineHeight: 1.02,
      color: '#000',
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      marginBottom: 6
    }
  }, "Laurier", /*#__PURE__*/React.createElement("br", null), "Balthazard"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Ibarra Real Nova, serif',
      fontStyle: 'italic',
      fontSize: 18,
      color: '#575146',
      marginBottom: 24
    }
  }, "Engel & V\xF6lkers"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #000',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 30,
      fontWeight: 600,
      color: '#000',
      letterSpacing: '0.02em',
      lineHeight: 1.15
    }
  }, "514 891 3827"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 13,
      color: '#575146',
      marginTop: 6,
      wordBreak: 'break-all'
    }
  }, "laurier.balthazard@engelvoelkers.com"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '4px solid #000'
    }
  }, /*#__PURE__*/React.createElement(QRPlaceholder, {
    size: 120
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 11,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: '#575146',
      maxWidth: 110,
      lineHeight: 1.4,
      paddingBottom: 6,
      fontWeight: 600
    }
  }, "Scannez", /*#__PURE__*/React.createElement("br", null), "pour les", /*#__PURE__*/React.createElement("br", null), "d\xE9tails")))));
};
window.VariantPhoto = VariantPhoto;
})(); } catch (e) { __ds_ns.__errors.push({ path: "signs/anse-ogilvie/VariantPhoto.jsx", error: String((e && e.message) || e) }); }

// signs/anse-ogilvie/VariantSobre.jsx
try { (() => {
/* OGILVIE — L'Anse Ogilvie · Variante 1 — SOBRE / SOMBRE
   --------------------------------------------------------
   Réécriture: palette charbon + forestier + sable pâle pour le texte.
   Inspiration: OVI Construction, architecture noire en forêt québécoise.
   Photo paysage en grand sur le panneau du HAUT (sépia désaturé presque N&B),
   bandeau sombre en bas avec plan + courtier + QR.
   Aucune trace de "sable Tintin" — tout est éteint, profond, forestier.
*/

const V1_PAD = 56;
const V1_BORDER = 2;
const FRAME_INSET = 22;

// Couleurs
const C_INK = '#0E0D0B'; // charbon profond presque noir
const C_FOREST = '#1B1F1A'; // forestier très sombre
const C_BARK = '#2A2620'; // bark
const C_SAND_PALE = '#E8E1D2'; // sable pâle pour texte sur fond sombre
const C_SAND_DIM = '#A89F8A'; // sable étouffé pour texte secondaire
const C_CORTEN = '#8B5A36'; // corten étouffé

const VFrame = ({
  children,
  bg = C_INK,
  accent = C_SAND_DIM
}) => /*#__PURE__*/React.createElement(Panel, {
  bg: bg
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: FRAME_INSET,
    border: `${V1_BORDER}px solid ${accent}`,
    pointerEvents: 'none'
  }
}), children);
const VariantSobre = () => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: SIGN_W,
      height: TOTAL_H
    }
  }, /*#__PURE__*/React.createElement(VFrame, {
    bg: C_INK,
    accent: "rgba(232,225,210,0.32)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: FRAME_INSET + V1_BORDER,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "landscape.jpg",
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 60%',
      filter: 'grayscale(0.35) brightness(0.62) contrast(1.08) saturate(0.7)',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(14,13,11,0.55) 0%, rgba(14,13,11,0.05) 30%, rgba(14,13,11,0.0) 55%, rgba(14,13,11,0.78) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(14,13,11,0.55) 0%, rgba(14,13,11,0) 35%)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: FRAME_INSET + V1_BORDER + 32,
      left: V1_PAD,
      right: V1_PAD,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: C_SAND_PALE
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 14,
      letterSpacing: '0.34em',
      textTransform: 'uppercase',
      color: C_SAND_PALE,
      fontWeight: 500,
      opacity: 0.85
    }
  }, "Les Grands Espaces \u2014 Mont-Blanc"), /*#__PURE__*/React.createElement(Wordmark, {
    height: 30,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: FRAME_INSET + V1_BORDER + 40,
      left: V1_PAD,
      right: V1_PAD,
      color: C_SAND_PALE
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 13,
      letterSpacing: '0.34em',
      textTransform: 'uppercase',
      color: C_SAND_DIM,
      fontWeight: 600,
      marginBottom: 18
    }
  }, "Phase 01 \xB7 Neuf terrains"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Gloock, serif',
      fontSize: 188,
      lineHeight: 0.92,
      letterSpacing: '-0.025em',
      color: C_SAND_PALE,
      textTransform: 'uppercase',
      fontWeight: 400
    }
  }, "L\u2019Anse", /*#__PURE__*/React.createElement("br", null), "Ogilvie"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 24,
      paddingTop: 18,
      borderTop: `1px solid ${C_SAND_DIM}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Ibarra Real Nova, serif',
      fontStyle: 'italic',
      fontSize: 26,
      lineHeight: 1.25,
      color: C_SAND_PALE,
      maxWidth: 760,
      fontWeight: 400,
      opacity: 0.9
    }
  }, "Acc\xE8s exclusif au Lac\xA0Rougeaud \u2014 for\xEAt mature, pierres, exposition sud-ouest."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 12,
      letterSpacing: '0.06em',
      color: C_SAND_DIM,
      textAlign: 'right',
      whiteSpace: 'nowrap'
    }
  }, "-74.394739, 46.096005")))), /*#__PURE__*/React.createElement(VFrame, {
    bg: C_FOREST,
    accent: "rgba(232,225,210,0.28)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: FRAME_INSET + V1_BORDER + 32,
      bottom: FRAME_INSET + V1_BORDER + 32,
      left: V1_PAD,
      width: 700,
      background: '#EFE9DA',
      padding: 14,
      boxShadow: '0 2px 0 rgba(0,0,0,0.6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(LotsPlan, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: 14,
      background: '#0E0D0B',
      color: C_SAND_PALE,
      padding: '8px 14px',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 11,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      fontWeight: 600
    }
  }, "Plan des 9 terrains"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: FRAME_INSET + V1_BORDER + 32,
      bottom: FRAME_INSET + V1_BORDER + 32,
      left: V1_PAD + 700 + 32,
      right: V1_PAD,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: C_SAND_PALE
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 12,
      letterSpacing: '0.34em',
      textTransform: 'uppercase',
      color: C_SAND_DIM,
      fontWeight: 600,
      marginBottom: 14
    }
  }, "Courtier immobilier"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Gloock, serif',
      fontSize: 42,
      lineHeight: 1.0,
      textTransform: 'uppercase',
      letterSpacing: '-0.012em',
      color: C_SAND_PALE,
      marginBottom: 6
    }
  }, "Laurier", /*#__PURE__*/React.createElement("br", null), "Balthazard"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Ibarra Real Nova, serif',
      fontStyle: 'italic',
      fontSize: 18,
      color: C_SAND_DIM,
      marginBottom: 24
    }
  }, "Engel & V\xF6lkers"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${C_SAND_DIM}`,
      borderBottom: `1px solid ${C_SAND_DIM}`,
      padding: '16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 11,
      letterSpacing: '0.30em',
      textTransform: 'uppercase',
      color: C_SAND_DIM,
      fontWeight: 600,
      marginBottom: 8
    }
  }, "Pour information"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 28,
      fontWeight: 600,
      color: C_SAND_PALE,
      letterSpacing: '0.01em',
      lineHeight: 1.15
    }
  }, "514 891 3827"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 12,
      color: C_SAND_DIM,
      marginTop: 6,
      wordBreak: 'break-word'
    }
  }, "laurier.balthazard@engelvoelkers.com"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: C_SAND_PALE,
      padding: 6
    }
  }, /*#__PURE__*/React.createElement(QRPlaceholder, {
    size: 104,
    fg: C_INK,
    bg: C_SAND_PALE
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 10,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: C_SAND_PALE,
      fontWeight: 600,
      maxWidth: 130,
      lineHeight: 1.5,
      paddingBottom: 6,
      opacity: 0.9
    }
  }, "Scannez pour les d\xE9tails du projet")))));
};
window.VariantSobre = VariantSobre;
})(); } catch (e) { __ds_ns.__errors.push({ path: "signs/anse-ogilvie/VariantSobre.jsx", error: String((e && e.message) || e) }); }

// signs/anse-ogilvie/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), labels/titles are inline-editable,
// and any artboard can be opened in a fullscreen focus overlay (←/→/Esc).
// State persists to a .design-canvas.state.json sidecar via the host
// bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}', '.dc-card{transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px}', '.dc-grip{cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{cursor:pointer;border-radius:4px;padding:3px 6px;display:flex;align-items:center;transition:background .12s}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-expand{position:absolute;bottom:100%;right:0;margin-bottom:5px;z-index:2;opacity:0;transition:opacity .12s,background .12s;', '  width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center}', '.dc-expand:hover{background:rgba(0,0,0,.06);color:#2a251f}', '[data-dc-slot]:hover .dc-expand{opacity:1}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, focused
// artboard). Order/titles/labels persist to a .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Only direct DCSection > DCArtboard children are
  // walked — wrapping them in other elements opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  React.Children.forEach(children, sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const srcIds = [];
    React.Children.forEach(sec.props.children, ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (!aid) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if (e.ctrlKey) {
        // trackpad pinch (or explicit ctrl+wheel)
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(children);
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const srcOrder = artboards.map(a => a.props.id ?? a.props.label);
  const sec = ctx && sid && ctx.section(sid) || {};
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 80,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px 56px'
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow",
    style: {
      position: 'absolute',
      bottom: '100%',
      left: -4,
      marginBottom: 4,
      color: DC.label
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    onPointerDown: e => e.stopPropagation(),
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    const ns = sectionOrder[(secIdx + d + sectionOrder.length) % sectionOrder.length];
    const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
    if (first) ctx.setFocus(`${ns}/${first}`);
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "signs/anse-ogilvie/design-canvas.jsx", error: String((e && e.message) || e) }); }

// signs/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// No assets, no deps.

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// ─────────────────────────────────────────────────────────────
// Main canvas — transform-based pan/zoom viewport
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DesignCanvas({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if (e.ctrlKey) {
        // trackpad pinch (or explicit ctrl+wheel)
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button starting on the
    // canvas background (not inside an artboard).
    let drag = null;
    const onPointerDown = e => {
      const onBg = e.target === vp || e.target === worldRef.current;
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px',
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Section — title + subtitle + h-stack of artboards (no wrap)
// ─────────────────────────────────────────────────────────────
function DCSection({
  title,
  subtitle,
  children,
  gap = 48
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 80,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px 36px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.3,
      marginBottom: 4
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      color: DC.subtitle
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Artboard — labeled card
// ─────────────────────────────────────────────────────────────
function DCArtboard({
  label,
  children,
  width,
  height,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '100%',
      left: 0,
      paddingBottom: 8,
      fontSize: 12,
      fontWeight: 500,
      color: DC.label,
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "signs/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Chrome.jsx
try { (() => {
/* global React */

function TopBar({
  current = 'accueil',
  onNav
}) {
  const items = [{
    id: 'accueil',
    label: 'Accueil'
  }, {
    id: 'terrains',
    label: 'Terrains'
  }, {
    id: 'carte',
    label: 'Carte'
  }, {
    id: 'histoire',
    label: 'Histoire'
  }, {
    id: 'contact',
    label: 'Contact'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: '#FDFBF6',
      borderBottom: '1px solid #000',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      padding: '0 40px',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      flex: 1,
      justifyContent: 'center'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.id,
    onClick: e => {
      e.preventDefault();
      onNav?.(it.id);
    },
    href: `#${it.id}`,
    style: {
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: current === it.id ? '#9B6B43' : '#000',
      textDecoration: 'none',
      borderBottom: 'none',
      padding: '4px 0',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: current === it.id ? '#9B6B43' : 'transparent'
    }
  }, it.label))), /*#__PURE__*/React.createElement(Coords, null), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => onNav?.('contact')
  }, "R\xE9server une visite"));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: '#000',
      color: '#D5C5A4',
      padding: '64px 40px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 48,
      marginBottom: 64
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
    size: 48,
    color: "#D5C5A4"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontFamily: 'Ibarra Real Nova, Georgia, serif',
      fontStyle: 'italic',
      fontSize: 20,
      color: '#D5C5A4',
      opacity: .85,
      maxWidth: 360,
      lineHeight: 1.2
    }
  }, "\xAB Le paysage est le premier architecte ; la maison n'y arrive qu'ensuite. \xBB")), [{
    h: 'Le projet',
    l: ['Histoire', 'Vision', 'Équipe', 'Architectes partenaires']
  }, {
    h: 'Terrains',
    l: ['Tous les secteurs', 'Crête du lac', 'Versant sud', 'Forêt d\'érables']
  }, {
    h: 'Contact',
    l: ['Nous écrire', 'Brochure', 'Visite guidée', 'Notaire']
  }].map(col => /*#__PURE__*/React.createElement("div", {
    key: col.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      opacity: .55,
      marginBottom: 14
    }
  }, col.h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, col.l.map(x => /*#__PURE__*/React.createElement("li", {
    key: x,
    style: {
      fontSize: 14
    }
  }, x)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(213,197,164,0.18)',
      paddingTop: 24,
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      opacity: .6
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 OGILVIE. 2025 \u2014 Mont-Blanc, Laurentides, QC"), /*#__PURE__*/React.createElement("span", null, "\u221274.394739, 46.096005")));
}
Object.assign(window, {
  TopBar,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Detail.jsx
try { (() => {
/* global React */
const {
  useState: useStateD
} = React;
function ParcelDetail({
  parcel,
  onClose,
  onReserve
}) {
  if (!parcel) return null;
  const tones = {
    1: 'linear-gradient(180deg,#BFAE8C,#8C8A73)',
    2: 'linear-gradient(180deg,#9B6B43,#575146)',
    3: 'linear-gradient(180deg,#8C8A73,#575146)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.55)',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'flex-end'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(640px, 92vw)',
      background: '#FDFBF6',
      height: '100%',
      overflow: 'auto',
      boxShadow: '-24px 0 48px rgba(0,0,0,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 300,
      background: tones[parcel.tone],
      filter: 'sepia(.2)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      background: 'transparent',
      border: '1px solid #FDFBF6',
      color: '#FDFBF6',
      padding: '6px 12px',
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      borderRadius: 4
    }
  }, "Fermer"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      bottom: 16,
      color: '#FDFBF6'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "#FDFBF6",
    style: {
      opacity: .8
    }
  }, parcel.sector, " \xB7 Parcelle ", parcel.id.split('-')[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      fontSize: 40,
      lineHeight: 1,
      color: '#FDFBF6'
    }
  }, parcel.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 18,
      marginBottom: 24
    }
  }, [['Superficie', parcel.ha], ['Orientation', parcel.orient], ['Type', parcel.kind], ['Prix', parcel.price]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      borderTop: '1px solid #000',
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, k), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      fontSize: 22,
      color: '#000'
    }
  }, v)))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: '#575146'
    }
  }, "Parcelle bord\xE9e d'une for\xEAt mixte d'\xE9rables \xE0 sucre, de pins gris et de bouleaux. Acc\xE8s par la route du Mont-Blanc, chemin priv\xE9 partag\xE9. Servitude de conservation de 30 m c\xF4t\xE9 ruisseau."), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: '1px solid #000',
      margin: '28px 0'
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, null, "Cahier architectural"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '12px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontSize: 14,
      color: '#575146'
    }
  }, /*#__PURE__*/React.createElement("li", null, "Volume maximal : 420 m\xB2 \u2014 un seul niveau habitable apparent."), /*#__PURE__*/React.createElement("li", null, "Mat\xE9riaux : bois br\xFBl\xE9, acier Corten, pierre des Laurentides."), /*#__PURE__*/React.createElement("li", null, "Couleurs ext\xE9rieures : palette charbon, sable, corten, sauge."), /*#__PURE__*/React.createElement("li", null, "Conservation obligatoire des \xE9rables ", '>', " 30 cm de diam\xE8tre.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onReserve
  }, "R\xE9server cette parcelle"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg"
  }, "Demander le cahier")))));
}
function ContactSheet({
  open,
  onClose
}) {
  const [sent, setSent] = useStateD(false);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(520px, 92vw)',
      background: '#FDFBF6',
      padding: 36,
      borderRadius: 4,
      border: '1px solid #000'
    }
  }, !sent ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Prendre rendez-vous"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      fontSize: 32,
      lineHeight: 1,
      color: '#000'
    }
  }, "Venir marcher."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 14,
      color: '#575146'
    }
  }, "Nous vous recontactons sous 48 heures pour convenir d'une date et de la m\xE9t\xE9o."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nom",
    value: "Marie Tremblay"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Courriel",
    value: "marie@exemple.ca"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "T\xE9l\xE9phone",
    value: "+1 514 555 0188"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Secteur pr\xE9f\xE9r\xE9",
    value: "Cr\xEAte du lac"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onClose
  }, "Annuler"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setSent(true)
  }, "Envoyer"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Ibarra Real Nova, serif',
      fontStyle: 'italic',
      fontSize: 32,
      color: '#575146',
      marginBottom: 18
    }
  }, "Bien re\xE7u."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: '#575146'
    }
  }, "Nous revenons vers vous sous 48 heures."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: onClose
  }, "Fermer")))));
}
function Field({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: '#8C8A73',
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    defaultValue: value,
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '10px 0',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 15,
      color: '#000',
      background: 'transparent',
      border: 0,
      borderBottom: '1px solid #000',
      outline: 'none',
      borderRadius: 0
    }
  }));
}
Object.assign(window, {
  ParcelDetail,
  ContactSheet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Detail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Hero.jsx
try { (() => {
/* global React */

function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      height: 'calc(100vh - 64px)',
      minHeight: 640,
      background: '#000',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'url(../../assets/hero-landscape.jpg) center/cover no-repeat',
      filter: 'sepia(.12) saturate(.95) contrast(1.02)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,.55) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'grid',
      gridTemplateRows: '1fr auto',
      padding: '40px 40px 48px',
      color: '#D5C5A4'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'start',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "#D5C5A4",
    style: {
      opacity: .85
    }
  }, "D\xE9veloppement r\xE9sidentiel de terrains"), /*#__PURE__*/React.createElement(Coords, {
    color: "#D5C5A4"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      lineHeight: 0.92,
      fontSize: 'clamp(56px, 10vw, 148px)',
      color: '#D5C5A4',
      maxWidth: 1100
    }
  }, "Les grands", /*#__PURE__*/React.createElement("br", null), "espaces."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 24,
      marginTop: 28,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Ibarra Real Nova, serif',
      fontStyle: 'italic',
      fontSize: 24,
      color: '#D5C5A4',
      opacity: .9,
      maxWidth: 560,
      lineHeight: 1.25
    }
  }, "Dix-sept parcelles bois\xE9es et riveraines, \xE0 quarante minutes de Mont-Tremblant."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "Voir les terrains"), /*#__PURE__*/React.createElement(Button, {
    variant: "onDark",
    size: "lg"
  }, "Prendre rendez-vous"))))));
}
function StatsStrip() {
  const rows = [['17', 'Parcelles au total'], ['1,24 ha', 'Superficie moyenne'], ['09 / 17', 'Disponibles'], ['40 min', 'De Mont-Tremblant']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#D5C5A4',
      padding: '48px 40px',
      borderTop: '1px solid #000',
      borderBottom: '1px solid #000'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 24
    }
  }, rows.map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      borderLeft: '1px solid #000',
      paddingLeft: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      fontSize: 48,
      letterSpacing: '-0.02em',
      lineHeight: 1,
      color: '#000'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#575146'
    }
  }, l)))));
}
function Manifest() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#FDFBF6',
      padding: '120px 40px',
      borderBottom: '1px solid #000'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: 80
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Le manifeste"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      fontSize: 56,
      lineHeight: 0.98,
      color: '#000'
    }
  }, "Habiter le", /*#__PURE__*/React.createElement("br", null), "paysage, pas", /*#__PURE__*/React.createElement("br", null), "le remplacer.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 19,
      lineHeight: 1.55,
      color: '#575146',
      margin: 0,
      maxWidth: 620
    }
  }, "OGILVIE dessine un d\xE9veloppement r\xE9sidentiel en Laurentides guid\xE9 par le relief. Chaque parcelle a \xE9t\xE9 arpent\xE9e \xE0 pied, chaque arbre mature relev\xE9. Les chemins suivent les cr\xEAtes existantes ; l'emprise de b\xE2ti est trac\xE9e autour des \xE9rables centenaires, pas au travers."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 19,
      lineHeight: 1.55,
      color: '#575146',
      margin: 0,
      maxWidth: 620
    }
  }, "Un cahier architectural partag\xE9 encadre les volumes, les mat\xE9riaux et les couleurs autoris\xE9s \u2014 acier Corten, bois br\xFBl\xE9, pierre locale \u2014 de mani\xE8re \xE0 ce que le voisinage reste un voisinage de for\xEAt avant d'\xEAtre un voisinage de maisons."), /*#__PURE__*/React.createElement(Rule, {
    color: "#000",
    margin: 8
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Architectes"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 15,
      color: '#000'
    }
  }, "Atelier Pelletier \xB7 Studio Noire")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Arpentage"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 15,
      color: '#000'
    }
  }, "Groupe Laurentides"))))));
}
Object.assign(window, {
  Hero,
  StatsStrip,
  Manifest
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Primitives.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

// ═══════════════════════════════════════════════════════════
//  OGILVIE — Marketing site components
//  (Cosmetic recreations; shared via window.* for other scripts)
// ═══════════════════════════════════════════════════════════

function Wordmark({
  size = 22,
  color = '#000'
}) {
  const invert = color === '#000' || color === 'black' ? 'none' : 'invert(1)';
  return /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-ogilvie-plain.png",
    alt: "OGILVIE.",
    style: {
      height: size * 1.2,
      width: 'auto',
      display: 'block',
      filter: invert
    }
  });
}
function Eyebrow({
  children,
  color = 'var(--fg-3)',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      fontWeight: 500,
      color,
      ...style
    }
  }, children);
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  style
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: 'DM Sans, system-ui, sans-serif',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    fontWeight: 500,
    borderRadius: 4,
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 160ms cubic-bezier(.2,0,0,1)'
  };
  const sizes = {
    sm: {
      padding: '8px 12px',
      fontSize: 10
    },
    md: {
      padding: '12px 18px',
      fontSize: 11
    },
    lg: {
      padding: '16px 26px',
      fontSize: 12
    }
  };
  const variants = {
    primary: {
      background: '#9B6B43',
      color: '#FDFBF6'
    },
    secondary: {
      background: '#000',
      color: '#D5C5A4'
    },
    outline: {
      background: 'transparent',
      color: '#000',
      borderColor: '#000'
    },
    ghost: {
      background: 'transparent',
      color: '#575146',
      borderColor: 'rgba(87,81,70,0.18)'
    },
    onDark: {
      background: 'transparent',
      color: '#D5C5A4',
      borderColor: '#D5C5A4'
    }
  };
  const [hover, setHover] = useState(false);
  const hoverStyle = hover ? {
    primary: {
      background: '#7F5533'
    },
    secondary: {
      background: '#222'
    },
    outline: {
      background: '#000',
      color: '#D5C5A4'
    },
    ghost: {
      color: '#000'
    },
    onDark: {
      background: '#D5C5A4',
      color: '#000'
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...hoverStyle,
      ...style
    }
  }, children);
}
function Rule({
  color = '#000',
  margin = 32
}) {
  return /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: `1px solid ${color}`,
      margin: `${margin}px 0`
    }
  });
}
function Tag({
  children,
  variant = 'outline',
  style
}) {
  const v = {
    outline: {
      border: '1px solid #000',
      color: '#000',
      background: 'transparent'
    },
    solid: {
      background: '#000',
      color: '#D5C5A4'
    },
    corten: {
      background: '#9B6B43',
      color: '#FDFBF6'
    },
    sage: {
      border: '1px solid #8C8A73',
      color: '#575146',
      background: 'transparent'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 999,
      fontSize: 10,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      fontWeight: 500,
      ...v,
      ...style
    }
  }, children);
}
function Coords({
  value = '−74.394739, 46.096005',
  color = 'var(--fg-2)'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 12,
      letterSpacing: 0,
      color
    }
  }, value);
}
Object.assign(window, {
  Wordmark,
  Eyebrow,
  Button,
  Rule,
  Tag,
  Coords
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Sections.jsx
try { (() => {
/* global React */
const {
  useState: useStateP
} = React;
function ParcelGrid({
  onOpen
}) {
  const parcels = [{
    id: '04-12',
    sector: 'Secteur 04',
    name: 'Crête du lac',
    ha: '1,24 ha',
    orient: 'Sud-ouest',
    kind: 'Boisé',
    price: '285 000 $',
    status: 'dispo',
    tone: 1
  }, {
    id: '02-07',
    sector: 'Secteur 02',
    name: 'Versant des érables',
    ha: '0,96 ha',
    orient: 'Est',
    kind: 'Mixte',
    price: '210 000 $',
    status: 'reserve',
    tone: 2
  }, {
    id: '05-03',
    sector: 'Secteur 05',
    name: 'Anse du ruisseau',
    ha: '1,58 ha',
    orient: 'Sud',
    kind: 'Riverain',
    price: '410 000 $',
    status: 'dispo',
    tone: 3
  }, {
    id: '01-09',
    sector: 'Secteur 01',
    name: 'Plateau des pins',
    ha: '0,88 ha',
    orient: 'Ouest',
    kind: 'Boisé',
    price: '198 000 $',
    status: 'dispo',
    tone: 1
  }, {
    id: '03-02',
    sector: 'Secteur 03',
    name: 'Clairière haute',
    ha: '1,10 ha',
    orient: 'Sud-est',
    kind: 'Ouvert',
    price: '245 000 $',
    status: 'vendu',
    tone: 2
  }, {
    id: '04-05',
    sector: 'Secteur 04',
    name: 'Belvédère nord',
    ha: '1,42 ha',
    orient: 'Nord',
    kind: 'Boisé',
    price: '315 000 $',
    status: 'dispo',
    tone: 3
  }];
  const tones = {
    1: 'linear-gradient(180deg,#BFAE8C,#8C8A73)',
    2: 'linear-gradient(180deg,#9B6B43,#575146)',
    3: 'linear-gradient(180deg,#8C8A73,#575146)'
  };
  const statusTag = s => ({
    dispo: /*#__PURE__*/React.createElement(Tag, {
      variant: "outline"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#9B6B43'
      }
    }), "Disponible"),
    reserve: /*#__PURE__*/React.createElement(Tag, {
      variant: "solid"
    }, "R\xE9serv\xE9"),
    vendu: /*#__PURE__*/React.createElement(Tag, {
      variant: "solid"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#D5C5A4'
      }
    }), "Vendu")
  })[s];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#FDFBF6',
      padding: '96px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'end',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "17 parcelles \xB7 5 secteurs"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      fontSize: 56,
      lineHeight: 0.98,
      color: '#000'
    }
  }, "Les terrains.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "outline"
  }, "Tous"), /*#__PURE__*/React.createElement(Tag, {
    variant: "sage"
  }, "Bois\xE9"), /*#__PURE__*/React.createElement(Tag, {
    variant: "sage"
  }, "Riverain"), /*#__PURE__*/React.createElement(Tag, {
    variant: "sage"
  }, "Ouvert"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    }
  }, parcels.map(p => /*#__PURE__*/React.createElement("article", {
    key: p.id,
    onClick: () => onOpen?.(p),
    style: {
      background: '#FDFBF6',
      border: '1px solid rgba(87,81,70,0.18)',
      borderRadius: 4,
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      cursor: 'pointer',
      transition: 'box-shadow 260ms cubic-bezier(.2,0,0,1)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(87,81,70,0.18)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 200,
      background: tones[p.tone],
      borderRadius: 2,
      filter: 'sepia(.2)'
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, null, p.sector, " \xB7 Parcelle ", p.id.split('-')[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      fontSize: 24,
      lineHeight: 1.05,
      color: '#000'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 11,
      color: '#8C8A73',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", null, p.ha), /*#__PURE__*/React.createElement("span", null, p.orient), /*#__PURE__*/React.createElement("span", null, p.kind)), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: '1px solid rgba(87,81,70,0.18)',
      margin: '4px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      fontSize: 18,
      color: '#9B6B43'
    }
  }, p.price), statusTag(p.status)))))));
}
function MapSection() {
  // A simplified schematic: sand canvas, contour lines (pure CSS), numbered parcels
  const pins = [{
    id: '01',
    x: 18,
    y: 64
  }, {
    id: '02',
    x: 30,
    y: 48
  }, {
    id: '03',
    x: 44,
    y: 38
  }, {
    id: '04',
    x: 58,
    y: 52
  }, {
    id: '05',
    x: 72,
    y: 66
  }, {
    id: '09',
    x: 26,
    y: 74
  }, {
    id: '12',
    x: 54,
    y: 70
  }, {
    id: '07',
    x: 68,
    y: 40
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#000',
      color: '#D5C5A4',
      padding: '96px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'end',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "#8C8A73"
  }, "La carte"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      fontSize: 56,
      lineHeight: 0.98,
      color: '#D5C5A4'
    }
  }, "Un plan,", /*#__PURE__*/React.createElement("br", null), "une cr\xEAte.")), /*#__PURE__*/React.createElement(Coords, {
    color: "#8C8A73"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '16/9',
      background: `
            radial-gradient(ellipse at 30% 30%, rgba(213,197,164,0.08) 0%, transparent 50%),
            repeating-radial-gradient(ellipse at 48% 52%, transparent 0 18px, rgba(213,197,164,0.09) 18px 19px),
            #0a0a0a
          `,
      border: '1px solid rgba(213,197,164,0.25)',
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, pins.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      position: 'absolute',
      left: `${p.x}%`,
      top: `${p.y}%`,
      transform: 'translate(-50%,-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      background: '#9B6B43',
      borderRadius: '50%',
      boxShadow: '0 0 0 3px rgba(155,107,67,0.25)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      letterSpacing: '0.18em',
      color: '#D5C5A4'
    }
  }, p.id))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 20,
      bottom: 16,
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 10,
      color: 'rgba(213,197,164,0.5)',
      letterSpacing: '0.1em'
    }
  }, "N \u2191 \xB7 1:5 000 \xB7 \xC9quidistance 5 m"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 20,
      top: 16,
      fontSize: 10,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'rgba(213,197,164,0.5)'
    }
  }, "Mont-Blanc, Laurentides"))));
}
function EditorialCut() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#D5C5A4',
      padding: '120px 40px',
      borderTop: '1px solid #000'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 960,
      margin: '0 auto',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Ibarra Real Nova, serif',
      fontStyle: 'italic',
      fontSize: 44,
      lineHeight: 1.2,
      color: '#575146',
      letterSpacing: '-0.005em'
    }
  }, "\xAB On n'ach\xE8te pas un terrain. On ach\xE8te une orientation, une for\xEAt, un silence, un angle de lumi\xE8re \xE0 sept heures du soir. \xBB"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: '#000'
    }
  }, "\u2014 Extrait du cahier d'arpentage, printemps 2025")));
}
function ContactStrip({
  onOpenContact
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#FDFBF6',
      padding: '96px 40px',
      borderTop: '1px solid #000'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Visiter"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      fontSize: 56,
      lineHeight: 0.98,
      color: '#000'
    }
  }, "Venez", /*#__PURE__*/React.createElement("br", null), "marcher."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontSize: 17,
      color: '#575146',
      lineHeight: 1.55,
      maxWidth: 480
    }
  }, "Les visites se font en pr\xE9sence d'un arpenteur, \xE0 pied, par temps sec. Dur\xE9e deux heures. Bottes recommand\xE9es."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onOpenContact
  }, "Prendre rendez-vous"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg"
  }, "T\xE9l\xE9charger la brochure"))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid #000',
      padding: 32,
      background: '#F3ECDF'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "T\xE9l\xE9phone"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 17,
      color: '#000'
    }
  }, "+1 819 555 0174")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Courriel"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 17,
      color: '#000'
    }
  }, "bonjour@ogilvie.ca")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Bureau"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 17,
      color: '#000'
    }
  }, "Mont-Blanc, QC")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Coordonn\xE9es"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 13,
      color: '#000'
    }
  }, "\u221274.394739,", /*#__PURE__*/React.createElement("br", null), "46.096005"))))));
}
Object.assign(window, {
  ParcelGrid,
  MapSection,
  EditorialCut,
  ContactStrip
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Sections.jsx", error: String((e && e.message) || e) }); }

})();
