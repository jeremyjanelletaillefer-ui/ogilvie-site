// Signs.jsx — OGILVIE lot-sale signs, 18×24 po portrait, 2 variants.
// The site plan is the dominant element (~55-60% of sign surface).

// ─── Constants ──────────────────────────────────────────────────────────
const PX_PER_IN = 30;
const TRIM_W   = 18 * PX_PER_IN;   // 540
const TRIM_H   = 24 * PX_PER_IN;   // 720
const BLEED    = 0.25 * PX_PER_IN; // 7.5
const BLEED_W  = TRIM_W + BLEED * 2;
const BLEED_H  = TRIM_H + BLEED * 2;

const SIGN = {
  lot:       '07',
  secteur:   'Secteur 04 — La Crête',
  cadastre:  '6 482 913',
  superficie:'8 741 m²  ·  2,16 acres',
  agent:     'Marc Ogilvie',
  role:      'Courtier immobilier',
  phone:     '514 891 3827',
  email:     'info@domaineogilvie.com',
  url:       'domaineogilvie.com',
};

// ─── QR placeholder ─────────────────────────────────────────────────────
function QRBlock({ size = 120, color = '#000', bg = 'transparent' }) {
  const N = 21;
  const cells = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const inFinder = (x<7&&y<7)||(x>N-8&&y<7)||(x<7&&y>N-8);
    const finderOn = (() => {
      const ix = x < 7 ? x : (x - (N-7));
      const iy = y < 7 ? y : (y - (N-7));
      const onRing = ix===0||ix===6||iy===0||iy===6;
      const onCore = ix>=2&&ix<=4&&iy>=2&&iy<=4;
      return onRing || onCore;
    })();
    let on = false;
    if (inFinder) on = finderOn;
    else {
      const h = Math.sin(x*12.9898 + y*78.233) * 43758.5453;
      on = (h - Math.floor(h)) > 0.55;
    }
    if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />);
  }
  return (
    <svg viewBox={`0 0 ${N} ${N}`} width={size} height={size} shapeRendering="crispEdges"
         style={{ display: 'block', background: bg }}>{cells}</svg>
  );
}

// ─── Crop marks ─────────────────────────────────────────────────────────
function CropMarks({ w, h, bleed, color = '#888' }) {
  const len = 10, off = 4;
  const marks = [
    { x1: -off-len, y1: bleed, x2: -off, y2: bleed },
    { x1: bleed, y1: -off-len, x2: bleed, y2: -off },
    { x1: w-bleed, y1: -off-len, x2: w-bleed, y2: -off },
    { x1: w+off, y1: bleed, x2: w+off+len, y2: bleed },
    { x1: -off-len, y1: h-bleed, x2: -off, y2: h-bleed },
    { x1: bleed, y1: h+off, x2: bleed, y2: h+off+len },
    { x1: w+off, y1: h-bleed, x2: w+off+len, y2: h-bleed },
    { x1: w-bleed, y1: h+off, x2: w-bleed, y2: h+off+len },
  ];
  return (
    <svg width={w+len*4} height={h+len*4}
         style={{ position:'absolute', left:-len*2, top:-len*2, pointerEvents:'none' }}>
      <g transform={`translate(${len*2},${len*2})`} stroke={color} strokeWidth="0.5">
        {marks.map((m, i) => <line key={i} {...m} />)}
      </g>
    </svg>
  );
}

// ─── SitePlan — the dominant element ────────────────────────────────────
// A schematic site plan of ~20 adjacent parcels. The featured lot is
// highlighted. Roads, a creek, a lake edge, contour rings, a north arrow,
// scale bar. Tone + accent colors swap via props.
function SitePlan({
  width, height,
  paper      = '#FDFBF6',          // background "paper"
  ink        = '#000',             // default line + text
  muted      = 'rgba(0,0,0,0.35)', // contours, adjacent parcels
  highlight  = '#9B6B43',          // the featured lot
  water      = 'rgba(87,81,70,0.18)',
  forest     = 'rgba(140,138,115,0.22)',
  label      = '07',
  borderTone = 'rgba(0,0,0,0.6)',
  inset      = false,              // true = variant B dark style
}) {
  // ViewBox — internal coords, projected onto any container size.
  // Map roughly represents ~800 m × 1000 m area.
  const V = { w: 800, h: 1000 };

  // Road (main spine) — zig-zag entering top-right, exits bottom-left.
  const road = "M 780 80 L 640 230 L 620 380 L 520 470 L 500 600 L 360 680 L 240 810 L 60 940";

  // Creek — flows NW to SE
  const creek = "M 80 120 C 200 260, 260 360, 240 480 S 320 680, 420 780";

  // Parcels — rectilinear plan, 20 of them, one highlighted.
  // Each parcel is a polygon; cadastral lines are visible.
  // Coords are hand-composed to feel like a real subdivision.
  const parcels = [
    // column 1 — west of road
    { pts:'100 140, 300 140, 300 260, 100 260', n:'01' },
    { pts:'100 260, 300 260, 300 370, 100 370', n:'02' },
    { pts:'100 370, 300 370, 280 490, 100 490', n:'03' },
    { pts:'100 490, 280 490, 260 600, 100 600', n:'04' },
    { pts:'100 600, 260 600, 240 710, 100 710', n:'05' },
    { pts:'100 710, 240 710, 220 820, 100 820', n:'06' },
    // column 2 — middle strip
    { pts:'300 140, 460 140, 460 260, 300 260', n:'08' },
    { pts:'300 260, 460 260, 460 370, 300 370', n:'09' },
    { pts:'300 370, 500 370, 500 490, 280 490', n:'10' },
    { pts:'280 490, 500 490, 500 600, 260 600', n:'11' },
    { pts:'260 600, 500 600, 480 710, 240 710', n:'12' },
    { pts:'240 710, 480 710, 460 820, 220 820', n:'13' },
    // highlighted — column 3, row 2 (the "07")
    { pts:'460 140, 620 140, 620 260, 460 260', n:'07', highlight: true },
    // column 3 — east
    { pts:'460 260, 620 260, 620 370, 460 370', n:'14' },
    { pts:'500 370, 640 370, 640 490, 500 490', n:'15' },
    { pts:'500 490, 640 490, 640 600, 500 600', n:'16' },
    { pts:'500 600, 620 600, 620 710, 480 710', n:'17' },
    { pts:'480 710, 620 710, 600 820, 460 820', n:'18' },
  ];

  const labels = parcels.filter(p => !p.highlight).map(p => {
    const coords = p.pts.split(',').map(s => s.trim().split(' ').map(Number));
    const cx = coords.reduce((a,c)=>a+c[0],0) / coords.length;
    const cy = coords.reduce((a,c)=>a+c[1],0) / coords.length;
    return { n: p.n, cx, cy };
  });

  const highlighted = parcels.find(p => p.highlight);
  const hCoords = highlighted.pts.split(',').map(s => s.trim().split(' ').map(Number));
  const hcx = hCoords.reduce((a,c)=>a+c[0],0) / hCoords.length;
  const hcy = hCoords.reduce((a,c)=>a+c[1],0) / hCoords.length;

  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} width={width} height={height}
         preserveAspectRatio="xMidYMid slice"
         style={{ display: 'block', background: paper }}>

      {/* 1 — base forest tint covers the whole background lightly */}
      <rect x="0" y="0" width={V.w} height={V.h} fill={forest} />

      {/* 2 — lake corner (bottom-right) */}
      <path d={`M ${V.w} ${V.h-240} C ${V.w-120} ${V.h-180}, ${V.w-200} ${V.h-80}, ${V.w-280} ${V.h} L ${V.w} ${V.h} Z`} fill={water} />

      {/* 3 — contour rings, subtle */}
      <g fill="none" stroke={muted} strokeWidth="0.6" opacity="0.5">
        {[140, 180, 230, 290, 360].map((r, i) => (
          <ellipse key={i} cx="380" cy="520" rx={r} ry={r*0.7} />
        ))}
      </g>

      {/* 4 — creek */}
      <path d={creek} stroke={water.replace('0.18','0.55').replace('0.22','0.55')} strokeWidth="3" fill="none" opacity="0.8"/>
      <path d={creek} stroke={muted} strokeWidth="0.5" fill="none" strokeDasharray="3 2" opacity="0.7"/>

      {/* 5 — parcels (non-highlighted) */}
      <g>
        {parcels.filter(p=>!p.highlight).map((p,i) => (
          <polygon key={i} points={p.pts}
            fill={inset ? 'rgba(213,197,164,0.10)' : 'rgba(253,251,246,0.55)'}
            stroke={muted} strokeWidth="0.8" />
        ))}
      </g>

      {/* 6 — road on top of parcels, thick */}
      <path d={road} stroke={ink} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d={road} stroke={paper} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeDasharray="8 8"/>

      {/* 7 — highlighted parcel — painted last so it sits above road ticks */}
      <polygon points={highlighted.pts}
        fill={highlight} fillOpacity="0.18"
        stroke={highlight} strokeWidth="3" />
      <polygon points={highlighted.pts}
        fill="none" stroke={highlight} strokeWidth="1" strokeDasharray="6 4" opacity="0.9"/>

      {/* 8 — small parcel numbers */}
      <g fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill={muted}>
        {labels.map(l => (
          <text key={l.n} x={l.cx} y={l.cy+4} textAnchor="middle">{l.n}</text>
        ))}
      </g>

      {/* 9 — highlighted lot big number */}
      <g>
        <circle cx={hcx} cy={hcy} r="42"
          fill={paper} stroke={highlight} strokeWidth="2.5" />
        <text x={hcx} y={hcy+14} textAnchor="middle"
              fontFamily="Gloock, serif" fontSize="40" fill={highlight}>
          {label}
        </text>
      </g>

      {/* 10 — north arrow, top-left */}
      <g transform="translate(50,60)" fill={ink}>
        <polygon points="0,-22 6,6 0,0 -6,6" opacity="0.85"/>
        <text x="0" y="22" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="11"
              fontWeight="600" letterSpacing="0.18em" fill={ink}>N</text>
      </g>

      {/* 11 — scale bar, bottom-left */}
      <g transform={`translate(40,${V.h-40})`}>
        <rect x="0" y="-4" width="60" height="6" fill={ink}/>
        <rect x="60" y="-4" width="60" height="6" fill="none" stroke={ink} strokeWidth="1"/>
        <text x="0"   y="-12" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill={ink}>0</text>
        <text x="120" y="-12" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill={ink} textAnchor="end">100 m</text>
      </g>

      {/* 12 — legend, bottom-right */}
      <g transform={`translate(${V.w-210},${V.h-88})`}
         fontFamily="'DM Sans',sans-serif" fontSize="11" fill={ink}>
        <rect x="0" y="-4" width="14" height="10" fill={highlight} fillOpacity="0.22" stroke={highlight} strokeWidth="1.5"/>
        <text x="22" y="5">Lot disponible</text>
        <rect x="0" y="14" width="14" height="10" fill={inset?'rgba(213,197,164,0.10)':'rgba(253,251,246,0.55)'} stroke={muted}/>
        <text x="22" y="23">Lots voisins</text>
        <line x1="0" y1="40" x2="14" y2="40" stroke={ink} strokeWidth="3"/>
        <text x="22" y="43">Chemin</text>
        <line x1="0" y1="56" x2="14" y2="56" stroke={water.replace('0.18','0.7').replace('0.22','0.7')} strokeWidth="2.5"/>
        <text x="22" y="59">Ruisseau</text>
      </g>

      {/* 13 — outer frame */}
      <rect x="0" y="0" width={V.w} height={V.h} fill="none" stroke={borderTone} strokeWidth="1"/>
    </svg>
  );
}

// ─── SubLabel helper ────────────────────────────────────────────────────
function SubLabel({ children, size = 10, color = 'currentColor', track = '0.22em', style = {} }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500, fontSize: size,
      letterSpacing: track, textTransform: 'uppercase',
      color, lineHeight: 1.3, ...style,
    }}>{children}</div>
  );
}

// ─── VARIANT A — Sobre / éditorial ──────────────────────────────────────
function VariantA() {
  const PAD = 36;
  const headerH = 92;
  const planH = 410;     // dominant
  return (
    <div style={{
      width: TRIM_W, height: TRIM_H,
      background: 'var(--sable-patine)',
      color: '#000', position: 'relative',
      padding: `${PAD}px ${PAD}px ${PAD}px`,
      boxSizing: 'border-box',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header — compact banner */}
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-start',
        borderBottom: '1px solid #000', paddingBottom: 14, marginBottom: 14,
      }}>
        <div>
          <div style={{ fontFamily:"'Gloock', serif", fontSize: 34, letterSpacing:'0.02em', lineHeight: 1 }}>
            OGILVIE.
          </div>
          <SubLabel size={8} track="0.28em" style={{ marginTop: 6 }}>
            Les Grands Espaces · Mont-Blanc
          </SubLabel>
        </div>
        <div style={{ textAlign:'right' }}>
          <SubLabel size={9} track="0.24em" style={{ color:'rgba(0,0,0,0.55)' }}>Lot</SubLabel>
          <div style={{ fontFamily:"'Gloock', serif", fontSize: 54, lineHeight: 0.9, letterSpacing:'-0.02em', marginTop: 2 }}>
            {SIGN.lot}
          </div>
          <SubLabel size={8} track="0.22em" style={{ marginTop: 4, color:'rgba(0,0,0,0.55)' }}>
            À vendre
          </SubLabel>
        </div>
      </div>

      {/* PLAN — dominant */}
      <div style={{
        border: '1px solid #000', background:'#FDFBF6',
        height: planH, overflow:'hidden', position:'relative',
      }}>
        <SitePlan
          width="100%" height="100%"
          paper="#FDFBF6" ink="#000"
          muted="rgba(0,0,0,0.4)"
          highlight="#9B6B43"
          water="rgba(87,81,70,0.22)"
          forest="rgba(140,138,115,0.20)"
          label={SIGN.lot}
          borderTone="transparent"
        />
        <div style={{
          position:'absolute', left: 10, bottom: 10,
          background:'rgba(253,251,246,0.92)', padding: '5px 8px',
          border:'1px solid rgba(0,0,0,0.2)',
        }}>
          <SubLabel size={8} track="0.24em">Plan du domaine · Secteur 04</SubLabel>
        </div>
      </div>

      {/* Specs strip */}
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12,
        borderBottom:'1px solid #000', padding:'14px 0', margin:'14px 0 14px',
      }}>
        <div>
          <SubLabel size={8} track="0.24em" style={{ color:'rgba(0,0,0,0.55)' }}>Secteur</SubLabel>
          <div style={{ fontSize: 12, marginTop: 3, fontWeight: 500 }}>{SIGN.secteur.replace('Secteur 04 — ','')}</div>
        </div>
        <div>
          <SubLabel size={8} track="0.24em" style={{ color:'rgba(0,0,0,0.55)' }}>Cadastre</SubLabel>
          <div style={{ fontSize: 12, marginTop: 3, fontFamily:'ui-monospace, Menlo, monospace' }}>{SIGN.cadastre}</div>
        </div>
        <div>
          <SubLabel size={8} track="0.24em" style={{ color:'rgba(0,0,0,0.55)' }}>Superficie</SubLabel>
          <div style={{ fontSize: 12, marginTop: 3, fontFamily:'ui-monospace, Menlo, monospace' }}>{SIGN.superficie}</div>
        </div>
      </div>

      {/* Footer — contact + QR */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 16, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <SubLabel size={8} track="0.24em" style={{ color:'rgba(0,0,0,0.55)' }}>Contactez</SubLabel>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{SIGN.agent}</div>
          <div style={{ fontSize: 10, color:'rgba(0,0,0,0.6)', marginTop: 1 }}>{SIGN.role}</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8, fontFamily:'ui-monospace, Menlo, monospace' }}>
            {SIGN.phone}
          </div>
          <div style={{ fontSize: 10, marginTop: 2, color:'rgba(0,0,0,0.7)' }}>{SIGN.email}</div>
          <div style={{ fontFamily:"'Gloock', serif", fontSize: 16, letterSpacing:'0.02em', marginTop: 8, textTransform:'uppercase' }}>
            {SIGN.url}
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ background:'#fff', padding: 5, border:'1px solid #000' }}>
            <QRBlock size={74} color="#000" />
          </div>
          <SubLabel size={7} track="0.22em" style={{ marginTop: 5, color:'rgba(0,0,0,0.55)', textAlign:'center' }}>
            Voir<br/>le plan complet
          </SubLabel>
        </div>
      </div>
    </div>
  );
}

// ─── VARIANT B — Contraste fort ─────────────────────────────────────────
function VariantB() {
  const PAD = 36;
  const planH = 420;
  return (
    <div data-pancarte="B" style={{
      width: TRIM_W, height: TRIM_H,
      background: '#000',
      color: 'var(--sable-patine)', position:'relative',
      padding: `${PAD}px ${PAD}px ${PAD}px`,
      boxSizing:'border-box',
      fontFamily:"'DM Sans', sans-serif",
      display:'flex', flexDirection:'column',
    }}>
      {/* Header */}
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-start',
        borderBottom:'1px solid var(--sable-patine)', paddingBottom: 14, marginBottom: 14,
      }}>
        <div>
          <div style={{ fontFamily:"'Gloock', serif", fontSize: 34, letterSpacing:'0.02em', lineHeight: 1, color:'var(--sable-patine)' }}>
            OGILVIE.
          </div>
          <SubLabel size={8} track="0.28em" style={{ marginTop: 6, color:'var(--sable-patine)' }}>
            Les Grands Espaces · Mont-Blanc
          </SubLabel>
        </div>
        <div style={{ textAlign:'right' }}>
          <SubLabel size={9} track="0.24em" style={{ color:'var(--corten)' }}>Lot</SubLabel>
          <div style={{ fontFamily:"'Gloock', serif", fontSize: 54, lineHeight: 0.9, letterSpacing:'-0.02em', marginTop: 2, color:'var(--sable-patine)' }}>
            {SIGN.lot}
          </div>
          <SubLabel size={8} track="0.22em" style={{ marginTop: 4, color:'rgba(213,197,164,0.65)' }}>
            À vendre
          </SubLabel>
        </div>
      </div>

      {/* PLAN — dark chrome, sand-on-black */}
      <div style={{
        border:'1px solid var(--sable-patine)',
        background:'#0d0c09', height: planH, overflow:'hidden', position:'relative',
      }}>
        <SitePlan
          width="100%" height="100%"
          paper="#0d0c09"
          ink="#D5C5A4"
          muted="rgba(213,197,164,0.4)"
          highlight="#C48355"
          water="rgba(140,138,115,0.30)"
          forest="rgba(213,197,164,0.06)"
          label={SIGN.lot}
          borderTone="transparent"
          inset
        />
        <div style={{
          position:'absolute', left: 10, bottom: 10,
          background:'rgba(0,0,0,0.65)', padding: '5px 8px',
          border:'1px solid rgba(213,197,164,0.4)',
        }}>
          <SubLabel size={8} track="0.24em" style={{ color:'var(--sable-patine)' }}>
            Plan du domaine · Secteur 04
          </SubLabel>
        </div>
      </div>

      {/* Specs */}
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12,
        borderBottom:'1px solid var(--sable-patine)', padding:'14px 0', margin:'14px 0 14px',
        color:'var(--sable-patine)',
      }}>
        <div>
          <SubLabel size={8} track="0.24em" style={{ color:'rgba(213,197,164,0.55)' }}>LES GRANDS ESPACES · MONT-BLANC</SubLabel>
          <div style={{ fontSize: 12, marginTop: 3, fontWeight: 500 }}>{SIGN.secteur.replace('Secteur 04 — ','')}</div>
        </div>
        <div>
          <SubLabel size={8} track="0.24em" style={{ color:'rgba(213,197,164,0.55)' }}>LES GRANDS ESPACES · MONT-BLANC</SubLabel>
          <div style={{ fontSize: 12, marginTop: 3, fontFamily:'ui-monospace, Menlo, monospace' }}>{SIGN.cadastre}</div>
        </div>
        <div>
          <SubLabel size={8} track="0.24em" style={{ color:'rgba(213,197,164,0.55)' }}>Superficie</SubLabel>
          <div style={{ fontSize: 12, marginTop: 3, fontFamily:'ui-monospace, Menlo, monospace' }}>{SIGN.superficie}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 16, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <SubLabel size={8} track="0.24em" style={{ color:'rgba(213,197,164,0.55)' }}>Contactez</SubLabel>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color:'var(--sable-patine)' }}>{SIGN.agent}</div>
          <div style={{ fontSize: 10, color:'rgba(213,197,164,0.65)', marginTop: 1 }}>{SIGN.role}</div>
          <div style={{
            fontSize: 16, fontWeight: 600, marginTop: 8,
            fontFamily:'ui-monospace, Menlo, monospace', color:'var(--sable-patine)',
          }}>
            {SIGN.phone}
          </div>
          <div style={{ fontSize: 10, marginTop: 2, color:'rgba(213,197,164,0.7)' }}>{SIGN.email}</div>
          <div style={{ fontFamily:"'Gloock', serif", fontSize: 16, letterSpacing:'0.02em', marginTop: 8, textTransform:'uppercase', color:'var(--corten)' }}>
            {SIGN.url}
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ background:'var(--sable-patine)', padding: 5 }}>
            <QRBlock size={74} color="#000" />
          </div>
          <SubLabel size={7} track="0.22em" style={{ marginTop: 5, color:'rgba(213,197,164,0.6)', textAlign:'center' }}>
            Voir<br/>le plan complet
          </SubLabel>
        </div>
      </div>
    </div>
  );
}

// ─── Artboard with bleed + crop marks ───────────────────────────────────
function SignArtboard({ label, children, bleedBg }) {
  return (
    <DCArtboard label={label} width={BLEED_W} height={BLEED_H}
                style={{ background: bleedBg, boxShadow: '0 4px 28px rgba(0,0,0,0.10)' }}>
      <div style={{ position:'relative', width: BLEED_W, height: BLEED_H }}>
        <div style={{ position:'absolute', left: BLEED, top: BLEED }}>
          {children}
        </div>
        <svg width={BLEED_W} height={BLEED_H}
             style={{ position:'absolute', inset: 0, pointerEvents:'none' }}>
          <rect x={BLEED} y={BLEED} width={TRIM_W} height={TRIM_H}
                fill="none" stroke="rgba(255,0,0,0.35)" strokeWidth="0.5" strokeDasharray="4 3" />
        </svg>
        <CropMarks w={BLEED_W} h={BLEED_H} bleed={BLEED} />
      </div>
    </DCArtboard>
  );
}

// ─── App ────────────────────────────────────────────────────────────────
function App() {
  return (
    <DesignCanvas>
      <div style={{ padding: '20px 60px 40px' }}>
        <div style={{
          fontFamily:"'Gloock', serif",
          fontSize: 42, letterSpacing:'0.02em', textTransform:'uppercase',
          color:'#1a1510', marginBottom: 6,
        }}>Pancartes de lot</div>
        <div style={{
          fontFamily:"'DM Sans', sans-serif", fontSize: 14,
          color:'rgba(40,30,20,0.7)', maxWidth: 720, lineHeight: 1.55,
        }}>
          18 po × 24 po portrait, coroplaste, fond perdu 0,25 po. Le plan du domaine occupe désormais
          plus de la moitié de la pancarte — l'information pratique (lot, cadastre, contact, QR)
          est compactée en haut et en bas.
        </div>
      </div>

      <DCSection
        title="Variante A — Sobre / éditorial"
        subtitle="Fond sable, plan sur papier crème, lot ciblé en corten."
      >
        <SignArtboard
          label={`${BLEED_W} × ${BLEED_H} px · 18 po × 24 po + 0,25 po bleed · échelle 30 px/po`}
          bleedBg="var(--sable-patine)"
        >
          <VariantA />
        </SignArtboard>
        <DCPostIt top={60} left={-30} rotate={-3} width={200}>
          Plan = ~55 % de la surface. Lisible à ~3-4 m. Le gros numéro de lot en haut à droite reste
          l'ancre visuelle de loin.
        </DCPostIt>
      </DCSection>

      <DCSection
        title="Variante B — Contraste fort"
        subtitle="Charbon, plan inversé en tons sable, lot ciblé en corten plus chaud."
      >
        <SignArtboard
          label={`${BLEED_W} × ${BLEED_H} px · 18 po × 24 po + 0,25 po bleed · échelle 30 px/po`}
          bleedBg="#000"
        >
          <VariantB />
        </SignArtboard>
        <DCPostIt top={80} left={-30} rotate={2} width={200}>
          Attention à la chaleur du coroplaste noir en plein soleil. Ok en sous-bois.
        </DCPostIt>
      </DCSection>

      <DCSection
        title="Notes de production"
        subtitle="Pour l'imprimeur · coroplaste 4 mm, fixation par clous à tête large sur arbre."
      >
        <div style={{
          width: 620, padding: '24px 28px', background:'#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          fontFamily:"'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.55, color:'#2a2620',
        }}>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li><b>Trim</b> : 18 po × 24 po portrait · <b>Fond perdu</b> : +0,25 po → 18,5 po × 24,5 po</li>
            <li><b>Plan</b> : SVG vectoriel à régénérer par lot (surface couverte ≈ 55-60 %)</li>
            <li><b>Couleurs</b> : Noir 100 % · Sable #D5C5A4 · Corten #9B6B43</li>
            <li><b>Typos</b> : Gloock (OGILVIE + numéros), DM Sans 500 tracké +240 pour les sous-étiquettes</li>
            <li><b>QR</b> : pointe vers <code>domaineogilvie.com/lot/{'{lot}'}</code></li>
            <li><b>Fixation</b> : clous à tête large sur arbre · zone utile à ≥ 1 po des bords</li>
          </ul>
        </div>
      </DCSection>
    </DesignCanvas>
  );
}

// Expose components for standalone pages
Object.assign(window, { VariantA, VariantB, QRBlock, CropMarks, SitePlan, SubLabel, SignArtboard, App });

// Only auto-mount the canvas App if DesignCanvas is loaded (i.e. we're in Pancartes.html).
// Standalone pages (Pancarte-A.html / Pancarte-B.html) handle their own mounting.
if (typeof DesignCanvas !== 'undefined' && !window.__OGILVIE_SIGNS_MOUNTED__) {
  window.__OGILVIE_SIGNS_MOUNTED__ = true;
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
