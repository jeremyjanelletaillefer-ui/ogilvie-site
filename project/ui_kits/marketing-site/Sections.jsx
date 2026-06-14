/* global React */
const { useState: useStateP } = React;

function ParcelGrid({ onOpen }) {
  const parcels = [
    { id:'04-12', sector:'Secteur 04', name:'Crête du lac',       ha:'1,24 ha', orient:'Sud-ouest', kind:'Boisé',   price:'285 000 $', status:'dispo',  tone:1 },
    { id:'02-07', sector:'Secteur 02', name:'Versant des érables',ha:'0,96 ha', orient:'Est',       kind:'Mixte',   price:'210 000 $', status:'reserve',tone:2 },
    { id:'05-03', sector:'Secteur 05', name:'Anse du ruisseau',   ha:'1,58 ha', orient:'Sud',       kind:'Riverain',price:'410 000 $', status:'dispo',  tone:3 },
    { id:'01-09', sector:'Secteur 01', name:'Plateau des pins',   ha:'0,88 ha', orient:'Ouest',     kind:'Boisé',   price:'198 000 $', status:'dispo',  tone:1 },
    { id:'03-02', sector:'Secteur 03', name:'Clairière haute',    ha:'1,10 ha', orient:'Sud-est',   kind:'Ouvert',  price:'245 000 $', status:'vendu',  tone:2 },
    { id:'04-05', sector:'Secteur 04', name:'Belvédère nord',     ha:'1,42 ha', orient:'Nord',      kind:'Boisé',   price:'315 000 $', status:'dispo',  tone:3 },
  ];
  const tones = {
    1: 'linear-gradient(180deg,#BFAE8C,#8C8A73)',
    2: 'linear-gradient(180deg,#9B6B43,#575146)',
    3: 'linear-gradient(180deg,#8C8A73,#575146)',
  };
  const statusTag = s => ({
    dispo:   <Tag variant="outline"><span style={{width:6,height:6,borderRadius:'50%',background:'#9B6B43'}}/>Disponible</Tag>,
    reserve: <Tag variant="solid">Réservé</Tag>,
    vendu:   <Tag variant="solid"><span style={{width:6,height:6,borderRadius:'50%',background:'#D5C5A4'}}/>Vendu</Tag>,
  }[s]);
  return (
    <section style={{ background:'#FDFBF6', padding:'96px 40px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:48 }}>
          <div>
            <Eyebrow>17 parcelles · 5 secteurs</Eyebrow>
            <div style={{ marginTop:12, fontFamily:'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'-0.02em', fontSize:56, lineHeight:0.98, color:'#000' }}>
              Les terrains.
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <Tag variant="outline">Tous</Tag>
            <Tag variant="sage">Boisé</Tag>
            <Tag variant="sage">Riverain</Tag>
            <Tag variant="sage">Ouvert</Tag>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24 }}>
          {parcels.map(p => (
            <article key={p.id}
              onClick={()=>onOpen?.(p)}
              style={{
                background:'#FDFBF6', border:'1px solid rgba(87,81,70,0.18)', borderRadius:4,
                padding:18, display:'flex', flexDirection:'column', gap:12,
                cursor:'pointer', transition:'box-shadow 260ms cubic-bezier(.2,0,0,1)',
                boxShadow:'0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(87,81,70,0.18)',
              }}>
              <div style={{ height:200, background:tones[p.tone], borderRadius:2, filter:'sepia(.2)' }}/>
              <Eyebrow>{p.sector} · Parcelle {p.id.split('-')[1]}</Eyebrow>
              <div style={{ fontFamily:'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'-0.01em', fontSize:24, lineHeight:1.05, color:'#000' }}>{p.name}</div>
              <div style={{ display:'flex', gap:14, fontFamily:'ui-monospace, Menlo, monospace', fontSize:11, color:'#8C8A73', textTransform:'uppercase' }}>
                <span>{p.ha}</span><span>{p.orient}</span><span>{p.kind}</span>
              </div>
              <hr style={{ border:0, borderTop:'1px solid rgba(87,81,70,0.18)', margin:'4px 0'}}/>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontFamily:'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight:400, fontSize:18, color:'#9B6B43' }}>{p.price}</span>
                {statusTag(p.status)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  // A simplified schematic: sand canvas, contour lines (pure CSS), numbered parcels
  const pins = [
    { id:'01', x:18, y:64 }, { id:'02', x:30, y:48 }, { id:'03', x:44, y:38 },
    { id:'04', x:58, y:52 }, { id:'05', x:72, y:66 }, { id:'09', x:26, y:74 },
    { id:'12', x:54, y:70 }, { id:'07', x:68, y:40 },
  ];
  return (
    <section style={{ background:'#000', color:'#D5C5A4', padding:'96px 40px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:40 }}>
          <div>
            <Eyebrow color="#8C8A73">La carte</Eyebrow>
            <div style={{ marginTop:12, fontFamily:'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'-0.02em', fontSize:56, lineHeight:0.98, color:'#D5C5A4' }}>
              Un plan,<br/>une crête.
            </div>
          </div>
          <Coords color="#8C8A73" />
        </div>
        <div style={{
          position:'relative', aspectRatio:'16/9',
          background:`
            radial-gradient(ellipse at 30% 30%, rgba(213,197,164,0.08) 0%, transparent 50%),
            repeating-radial-gradient(ellipse at 48% 52%, transparent 0 18px, rgba(213,197,164,0.09) 18px 19px),
            #0a0a0a
          `,
          border:'1px solid rgba(213,197,164,0.25)', borderRadius:4, overflow:'hidden',
        }}>
          {pins.map(p => (
            <div key={p.id} style={{
              position:'absolute', left:`${p.x}%`, top:`${p.y}%`, transform:'translate(-50%,-50%)',
              display:'flex', alignItems:'center', gap:6,
            }}>
              <div style={{ width:8, height:8, background:'#9B6B43', borderRadius:'50%', boxShadow:'0 0 0 3px rgba(155,107,67,0.25)' }}/>
              <span style={{ fontSize:10, letterSpacing:'0.18em', color:'#D5C5A4' }}>{p.id}</span>
            </div>
          ))}
          <div style={{ position:'absolute', left:20, bottom:16, fontFamily:'ui-monospace, Menlo, monospace', fontSize:10, color:'rgba(213,197,164,0.5)', letterSpacing:'0.1em' }}>
            N ↑ · 1:5 000 · Équidistance 5 m
          </div>
          <div style={{ position:'absolute', right:20, top:16, fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(213,197,164,0.5)' }}>
            Mont-Blanc, Laurentides
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialCut() {
  return (
    <section style={{ background:'#D5C5A4', padding:'120px 40px', borderTop:'1px solid #000' }}>
      <div style={{ maxWidth:960, margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontFamily:'Ibarra Real Nova, serif', fontStyle:'italic', fontSize:44, lineHeight:1.2, color:'#575146', letterSpacing:'-0.005em' }}>
          « On n'achète pas un terrain. On achète une orientation, une forêt, un silence, un angle de lumière à sept heures du soir. »
        </div>
        <div style={{ marginTop:32, fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase', color:'#000' }}>
          — Extrait du cahier d'arpentage, printemps 2025
        </div>
      </div>
    </section>
  );
}

function ContactStrip({ onOpenContact }) {
  return (
    <section style={{ background:'#FDFBF6', padding:'96px 40px', borderTop:'1px solid #000' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
        <div>
          <Eyebrow>Visiter</Eyebrow>
          <div style={{ marginTop:14, fontFamily:'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'-0.02em', fontSize:56, lineHeight:0.98, color:'#000' }}>
            Venez<br/>marcher.
          </div>
          <p style={{ marginTop:24, fontSize:17, color:'#575146', lineHeight:1.55, maxWidth:480 }}>
            Les visites se font en présence d'un arpenteur, à pied, par temps sec. Durée deux heures. Bottes recommandées.
          </p>
          <div style={{ marginTop:28, display:'flex', gap:12 }}>
            <Button variant="primary" size="lg" onClick={onOpenContact}>Prendre rendez-vous</Button>
            <Button variant="outline" size="lg">Télécharger la brochure</Button>
          </div>
        </div>
        <div style={{ border:'1px solid #000', padding:32, background:'#F3ECDF' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            <div><Eyebrow>Téléphone</Eyebrow><div style={{ marginTop:6, fontSize:17, color:'#000' }}>+1 819 555 0174</div></div>
            <div><Eyebrow>Courriel</Eyebrow><div style={{ marginTop:6, fontSize:17, color:'#000' }}>bonjour@ogilvie.ca</div></div>
            <div><Eyebrow>Bureau</Eyebrow><div style={{ marginTop:6, fontSize:17, color:'#000' }}>Mont-Blanc, QC</div></div>
            <div><Eyebrow>Coordonnées</Eyebrow><div style={{ marginTop:6, fontFamily:'ui-monospace, Menlo, monospace', fontSize:13, color:'#000' }}>−74.394739,<br/>46.096005</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ParcelGrid, MapSection, EditorialCut, ContactStrip });
