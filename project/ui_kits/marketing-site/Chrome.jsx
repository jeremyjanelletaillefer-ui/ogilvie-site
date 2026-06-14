/* global React */

function TopBar({ current = 'accueil', onNav }) {
  const items = [
    { id:'accueil',  label:'Accueil' },
    { id:'terrains', label:'Terrains' },
    { id:'carte',    label:'Carte' },
    { id:'histoire', label:'Histoire' },
    { id:'contact',  label:'Contact' },
  ];
  return (
    <header style={{
      position:'sticky', top:0, zIndex:10,
      background:'#FDFBF6',
      borderBottom:'1px solid #000',
      height:64, display:'flex', alignItems:'center',
      padding:'0 40px', gap:40,
    }}>
      <Wordmark size={20} />
      <nav style={{ display:'flex', gap:28, flex:1, justifyContent:'center' }}>
        {items.map(it => (
          <a key={it.id}
             onClick={(e)=>{e.preventDefault(); onNav?.(it.id);}}
             href={`#${it.id}`}
             style={{
               fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', fontWeight:500,
               color: current===it.id ? '#9B6B43' : '#000',
               textDecoration:'none', borderBottom:'none',
               padding:'4px 0',
               borderBottomStyle:'solid', borderBottomWidth:1,
               borderBottomColor: current===it.id ? '#9B6B43' : 'transparent',
             }}>{it.label}</a>
        ))}
      </nav>
      <Coords />
      <Button variant="secondary" size="sm" onClick={()=>onNav?.('contact')}>Réserver une visite</Button>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ background:'#000', color:'#D5C5A4', padding:'64px 40px 32px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:48, marginBottom:64 }}>
        <div>
          <Wordmark size={48} color="#D5C5A4" />
          <div style={{
            marginTop:16,
            fontFamily:'Ibarra Real Nova, Georgia, serif', fontStyle:'italic',
            fontSize:20, color:'#D5C5A4', opacity:.85, maxWidth:360, lineHeight:1.2,
          }}>
            « Le paysage est le premier architecte ; la maison n'y arrive qu'ensuite. »
          </div>
        </div>
        {[
          { h:'Le projet', l:['Histoire','Vision','Équipe','Architectes partenaires'] },
          { h:'Terrains',  l:['Tous les secteurs','Crête du lac','Versant sud','Forêt d\'érables'] },
          { h:'Contact',   l:['Nous écrire','Brochure','Visite guidée','Notaire'] },
        ].map(col => (
          <div key={col.h}>
            <div style={{ fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', opacity:.55, marginBottom:14 }}>{col.h}</div>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
              {col.l.map(x => <li key={x} style={{ fontSize:14 }}>{x}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid rgba(213,197,164,0.18)', paddingTop:24, display:'flex', justifyContent:'space-between', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', opacity:.6 }}>
        <span>© OGILVIE. 2025 — Mont-Blanc, Laurentides, QC</span>
        <span>−74.394739, 46.096005</span>
      </div>
    </footer>
  );
}

Object.assign(window, { TopBar, Footer });
