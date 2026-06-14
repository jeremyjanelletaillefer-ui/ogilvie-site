/* global React */
const { useState: useStateD } = React;

function ParcelDetail({ parcel, onClose, onReserve }) {
  if (!parcel) return null;
  const tones = {
    1: 'linear-gradient(180deg,#BFAE8C,#8C8A73)',
    2: 'linear-gradient(180deg,#9B6B43,#575146)',
    3: 'linear-gradient(180deg,#8C8A73,#575146)',
  };
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:50, display:'flex', justifyContent:'flex-end' }}
         onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ width:'min(640px, 92vw)', background:'#FDFBF6', height:'100%', overflow:'auto', boxShadow:'-24px 0 48px rgba(0,0,0,0.2)' }}>
        <div style={{ height:300, background:tones[parcel.tone], filter:'sepia(.2)', position:'relative' }}>
          <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'transparent', border:'1px solid #FDFBF6', color:'#FDFBF6', padding:'6px 12px', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', cursor:'pointer', borderRadius:4 }}>Fermer</button>
          <div style={{ position:'absolute', left:24, bottom:16, color:'#FDFBF6' }}>
            <Eyebrow color="#FDFBF6" style={{ opacity:.8 }}>{parcel.sector} · Parcelle {parcel.id.split('-')[1]}</Eyebrow>
            <div style={{ marginTop:6, fontFamily:'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'-0.02em', fontSize:40, lineHeight:1, color:'#FDFBF6' }}>{parcel.name}</div>
          </div>
        </div>
        <div style={{ padding:32 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:18, marginBottom:24 }}>
            {[
              ['Superficie', parcel.ha],
              ['Orientation', parcel.orient],
              ['Type',        parcel.kind],
              ['Prix',        parcel.price],
            ].map(([k,v]) => (
              <div key={k} style={{ borderTop:'1px solid #000', paddingTop:10 }}>
                <Eyebrow>{k}</Eyebrow>
                <div style={{ marginTop:6, fontFamily:'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight:400, fontSize:22, color:'#000' }}>{v}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize:15, lineHeight:1.6, color:'#575146' }}>
            Parcelle bordée d'une forêt mixte d'érables à sucre, de pins gris et de bouleaux. Accès par la route du Mont-Blanc, chemin privé partagé. Servitude de conservation de 30 m côté ruisseau.
          </p>
          <hr style={{ border:0, borderTop:'1px solid #000', margin:'28px 0' }}/>
          <Eyebrow>Cahier architectural</Eyebrow>
          <ul style={{ margin:'12px 0 0', padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:8, fontSize:14, color:'#575146' }}>
            <li>Volume maximal : 420 m² — un seul niveau habitable apparent.</li>
            <li>Matériaux : bois brûlé, acier Corten, pierre des Laurentides.</li>
            <li>Couleurs extérieures : palette charbon, sable, corten, sauge.</li>
            <li>Conservation obligatoire des érables {'>'} 30 cm de diamètre.</li>
          </ul>
          <div style={{ display:'flex', gap:10, marginTop:32 }}>
            <Button variant="primary" size="lg" onClick={onReserve}>Réserver cette parcelle</Button>
            <Button variant="outline" size="lg">Demander le cahier</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSheet({ open, onClose }) {
  const [sent, setSent] = useStateD(false);
  if (!open) return null;
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:60, display:'flex', alignItems:'center', justifyContent:'center' }}
         onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ width:'min(520px, 92vw)', background:'#FDFBF6', padding:36, borderRadius:4, border:'1px solid #000' }}>
        {!sent ? (
          <>
            <Eyebrow>Prendre rendez-vous</Eyebrow>
            <div style={{ marginTop:10, fontFamily:'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight:400, textTransform:'uppercase', letterSpacing:'-0.01em', fontSize:32, lineHeight:1, color:'#000' }}>Venir marcher.</div>
            <p style={{ marginTop:14, fontSize:14, color:'#575146' }}>Nous vous recontactons sous 48 heures pour convenir d'une date et de la météo.</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginTop:24 }}>
              <Field label="Nom"     value="Marie Tremblay" />
              <Field label="Courriel" value="marie@exemple.ca" />
              <Field label="Téléphone" value="+1 514 555 0188" />
              <Field label="Secteur préféré" value="Crête du lac" />
            </div>
            <div style={{ marginTop:28, display:'flex', gap:10, justifyContent:'flex-end' }}>
              <Button variant="ghost" onClick={onClose}>Annuler</Button>
              <Button variant="primary" onClick={()=>setSent(true)}>Envoyer</Button>
            </div>
          </>
        ) : (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontFamily:'Ibarra Real Nova, serif', fontStyle:'italic', fontSize:32, color:'#575146', marginBottom:18 }}>Bien reçu.</div>
            <p style={{ fontSize:14, color:'#575146' }}>Nous revenons vers vous sous 48 heures.</p>
            <div style={{ marginTop:24 }}><Button variant="outline" onClick={onClose}>Fermer</Button></div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <label style={{ display:'block' }}>
      <div style={{ fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', fontWeight:500, color:'#8C8A73', marginBottom:6 }}>{label}</div>
      <input defaultValue={value} style={{ width:'100%', boxSizing:'border-box', padding:'10px 0', fontFamily:'DM Sans, sans-serif', fontSize:15, color:'#000', background:'transparent', border:0, borderBottom:'1px solid #000', outline:'none', borderRadius:0 }}/>
    </label>
  );
}

Object.assign(window, { ParcelDetail, ContactSheet });
