/* OGILVIE — Composants partagés pour la méga pancarte L'Anse Ogilvie
   ----------------------------------------------------------------
   La pancarte finale fait 8 pi × 8 pi (deux 4×8 empilés en paysage).
   Échelle d'écran : 1 pi = 144 px → 1152 × 1152 px par pancarte virtuelle.
   On rend chaque variante en deux <Panel /> séparés (top/bottom) qui s'affichent
   collés ; un repère discret marque la jonction physique.
*/

const SCALE = 144;            // px par pied
const SIGN_W = 8 * SCALE;     // 1152 px
const SIGN_H = 4 * SCALE;     // 576 px par panneau
const TOTAL_H = 2 * SIGN_H;   // 1152 px (8 pi de haut)

// --- Repère de jonction physique entre les deux 4×8 ----------------------
const SeamMark = ({ side = 'left' }) => (
  <div style={{
    position: 'absolute',
    [side]: -28,
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: 9,
    letterSpacing: '0.18em',
    color: 'rgba(0,0,0,0.35)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  }}>
    {side === 'left' ? '— jonction 4\u00d78 / 4\u00d78 —' : '— 8\u00d78 ft —'}
  </div>
);

// --- QR code dessiné en "fonctionnel placeholder" ------------------------
//     (motif déterministe, pas un vrai QR — à remplacer par un PNG réel)
const QRPlaceholder = ({ size = 140, fg = '#000', bg = '#fff' }) => {
  const grid = 21;
  const cell = size / grid;
  // pattern stable dérivé d'une seed
  const cells = [];
  let seed = 9301;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      seed = (seed * 9301 + 49297) % 233280;
      const on = (seed / 233280) > 0.55;
      // Forcer les 3 marqueurs de coin
      const inFinder = (
        (x < 7 && y < 7) ||
        (x >= grid - 7 && y < 7) ||
        (x < 7 && y >= grid - 7)
      );
      if (inFinder) {
        const lx = x < 7 ? x : x - (grid - 7);
        const ly = y < 7 ? y : y - (grid - 7);
        const onFinder =
          (lx === 0 || lx === 6 || ly === 0 || ly === 6) ||
          (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
        if (onFinder) cells.push([x, y]);
      } else if (on) {
        cells.push([x, y]);
      }
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <rect width={size} height={size} fill={bg} />
      {cells.map(([x, y], i) => (
        <rect key={i} x={x * cell} y={y * cell} width={cell} height={cell} fill={fg} />
      ))}
    </svg>
  );
};

// --- Logo OGILVIE. en SVG (pour fidélité d'impression) -------------------
//     On utilise le PNG transmis dans assets, à charger via <img>.
const Wordmark = ({ height = 120, color = '#000', style = {} }) => (
  <img
    src="logo-ogilvie.png"
    alt="OGILVIE."
    style={{
      height,
      display: 'block',
      filter: color === '#000' ? 'none' : `brightness(0) invert(1)`,
      ...style,
    }}
  />
);

// --- Plan des lots ------------------------------------------------------
const LotsPlan = ({ style = {}, mode = 'natural' }) => {
  // mode: 'natural' | 'sepia' | 'mono'
  const filter =
    mode === 'sepia'
      ? 'sepia(0.7) saturate(0.7) contrast(0.95)'
      : mode === 'mono'
      ? 'grayscale(1) contrast(1.05)'
      : 'none';
  return (
    <img
      src="plan-lots.png"
      alt="Plan des lots — L'Anse Ogilvie"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        filter,
        ...style,
      }}
    />
  );
};

// --- Cadre de panneau — utilisé par toutes les variantes ----------------
const Panel = ({ children, bg = '#FDFBF6', side, style = {} }) => (
  <div style={{
    position: 'relative',
    width: SIGN_W,
    height: SIGN_H,
    background: bg,
    color: '#000',
    overflow: 'hidden',
    fontFamily: 'DM Sans, sans-serif',
    ...style,
  }}>
    {children}
    {side && <SeamMark side="left" />}
  </div>
);

// --- Container 8x8 unifié ------------------------------------------------
const SignBoard = ({ children, label, scale = 0.42 }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: SIGN_W,
    height: TOTAL_H,
  }}>
    {children}
  </div>
);

// Export to window for use by other Babel scripts
Object.assign(window, {
  SCALE, SIGN_W, SIGN_H, TOTAL_H,
  SeamMark, QRPlaceholder, Wordmark, LotsPlan, Panel, SignBoard,
});
