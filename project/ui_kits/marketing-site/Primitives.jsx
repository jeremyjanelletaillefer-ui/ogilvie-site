/* global React */
const { useState } = React;

// ═══════════════════════════════════════════════════════════
//  OGILVIE — Marketing site components
//  (Cosmetic recreations; shared via window.* for other scripts)
// ═══════════════════════════════════════════════════════════

function Wordmark({ size = 22, color = '#000' }) {
  const invert = (color === '#000' || color === 'black') ? 'none' : 'invert(1)';
  return (
    <img
      src="../../assets/logo-ogilvie-plain.png"
      alt="OGILVIE."
      style={{ height: size * 1.2, width: 'auto', display: 'block', filter: invert }}
    />
  );
}

function Eyebrow({ children, color = 'var(--fg-3)', style }) {
  return (
    <div style={{
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      fontWeight: 500,
      color,
      ...style,
    }}>{children}</div>
  );
}

function Button({ children, variant = 'primary', size = 'md', onClick, style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: 'DM Sans, system-ui, sans-serif',
    letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
    borderRadius: 4, border: '1px solid transparent', cursor: 'pointer',
    transition: 'all 160ms cubic-bezier(.2,0,0,1)',
  };
  const sizes = {
    sm: { padding: '8px 12px', fontSize: 10 },
    md: { padding: '12px 18px', fontSize: 11 },
    lg: { padding: '16px 26px', fontSize: 12 },
  };
  const variants = {
    primary:  { background: '#9B6B43', color: '#FDFBF6' },
    secondary:{ background: '#000',    color: '#D5C5A4' },
    outline:  { background: 'transparent', color: '#000', borderColor: '#000' },
    ghost:    { background: 'transparent', color: '#575146', borderColor: 'rgba(87,81,70,0.18)' },
    onDark:   { background: 'transparent', color: '#D5C5A4', borderColor: '#D5C5A4' },
  };
  const [hover, setHover] = useState(false);
  const hoverStyle = hover ? {
    primary:   { background: '#7F5533' },
    secondary: { background: '#222' },
    outline:   { background: '#000', color: '#D5C5A4' },
    ghost:     { color: '#000' },
    onDark:    { background: '#D5C5A4', color: '#000' },
  }[variant] : {};
  return (
    <button
      onClick={onClick}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{ ...base, ...sizes[size], ...variants[variant], ...hoverStyle, ...style }}
    >{children}</button>
  );
}

function Rule({ color = '#000', margin = 32 }) {
  return <hr style={{ border: 0, borderTop: `1px solid ${color}`, margin: `${margin}px 0` }}/>;
}

function Tag({ children, variant='outline', style }) {
  const v = {
    outline: { border:'1px solid #000', color:'#000', background:'transparent' },
    solid:   { background:'#000', color:'#D5C5A4' },
    corten:  { background:'#9B6B43', color:'#FDFBF6' },
    sage:    { border:'1px solid #8C8A73', color:'#575146', background:'transparent' },
  }[variant];
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding:'4px 10px', borderRadius:999,
      fontSize:10, letterSpacing:'0.16em', textTransform:'uppercase', fontWeight:500,
      ...v, ...style,
    }}>{children}</span>
  );
}

function Coords({ value = '−74.394739, 46.096005', color = 'var(--fg-2)' }) {
  return (
    <span style={{
      fontFamily:'ui-monospace, Menlo, monospace',
      fontSize:12, letterSpacing:0, color,
    }}>{value}</span>
  );
}

Object.assign(window, { Wordmark, Eyebrow, Button, Rule, Tag, Coords });
