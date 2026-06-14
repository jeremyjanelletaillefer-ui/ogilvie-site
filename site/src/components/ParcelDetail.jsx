import { useEffect } from 'react'
import { Eyebrow, Button } from './Primitives'

const TONES = {
  1: 'linear-gradient(180deg,#BFAE8C,#8C8A73)',
  2: 'linear-gradient(180deg,#9B6B43,#575146)',
  3: 'linear-gradient(180deg,#8C8A73,#575146)',
}

export function ParcelDetail({ parcel, onClose, onReserve }) {
  useEffect(() => {
    if (!parcel) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [parcel, onClose])

  if (!parcel) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 50,
        display: 'flex', justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(640px, 92vw)', background: '#FDFBF6',
          height: '100%', overflow: 'auto',
          boxShadow: '-24px 0 48px rgba(0,0,0,0.2)',
          animation: 'slideIn 260ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>
        <div style={{ height: 300, background: TONES[parcel.tone], filter: 'sepia(.2)', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'transparent', border: '1px solid #FDFBF6', color: '#FDFBF6',
              padding: '6px 12px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              cursor: 'pointer', borderRadius: 4, fontFamily: 'var(--font-body)',
            }}
          >
            Fermer ×
          </button>
          <div style={{ position: 'absolute', left: 24, bottom: 16, color: '#FDFBF6' }}>
            <Eyebrow color="#FDFBF6" style={{ opacity: 0.8 }}>
              {parcel.sector} · Parcelle {parcel.id.split('-')[1]}
            </Eyebrow>
            <div style={{
              marginTop: 6,
              fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
              textTransform: 'uppercase', letterSpacing: '-0.02em',
              fontSize: 40, lineHeight: 1, color: '#FDFBF6',
            }}>
              {parcel.name}
            </div>
          </div>
        </div>
        <div style={{ padding: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginBottom: 24 }}>
            {[
              ['Superficie', parcel.ha],
              ['Orientation', parcel.orient],
              ['Type', parcel.kind],
              ['Prix', parcel.price],
            ].map(([k, v]) => (
              <div key={k} style={{ borderTop: '1px solid #000', paddingTop: 10 }}>
                <Eyebrow>{k}</Eyebrow>
                <div style={{
                  marginTop: 6,
                  fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
                  fontSize: 22, color: '#000',
                }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#575146' }}>
            Parcelle bordée d'une forêt mixte d'érables à sucre, de pins gris et de bouleaux.
            Accès par la route du Mont-Blanc, chemin privé partagé. Servitude de conservation
            de 30 m côté ruisseau.
          </p>
          <hr style={{ border: 0, borderTop: '1px solid #000', margin: '28px 0' }} />
          <Eyebrow>Cahier architectural</Eyebrow>
          <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#575146' }}>
            <li>Volume maximal : 420 m² — un seul niveau habitable apparent.</li>
            <li>Matériaux : bois brûlé, acier Corten, pierre des Laurentides.</li>
            <li>Couleurs extérieures : palette charbon, sable, corten, sauge.</li>
            <li>Conservation obligatoire des érables &gt; 30 cm de diamètre.</li>
          </ul>
          <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
            <Button variant="primary" size="lg" onClick={onReserve}>
              Réserver cette parcelle
            </Button>
            <Button variant="outline" size="lg">
              Demander le cahier
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
