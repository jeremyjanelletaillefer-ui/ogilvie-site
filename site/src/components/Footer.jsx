import { Wordmark } from './Primitives'

const COLS = [
  { h: 'Le projet', l: ['Histoire', 'Vision', 'Équipe', 'Architectes partenaires'] },
  { h: 'Terrains',  l: ['Tous les secteurs', 'L\'Anse Ogilvie', 'Les Hauteurs du Manoir', 'Forêt d\'érables'] },
  { h: 'Contact',   l: ['Nous écrire', 'Brochure', 'Visite guidée', 'Notaire'] },
]

export function Footer() {
  return (
    <footer style={{ background: '#000', color: '#D5C5A4', padding: '64px 40px 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
        <div>
          <Wordmark size={48} color="#D5C5A4" />
          <div style={{
            marginTop: 16,
            fontFamily: 'Ibarra Real Nova, Georgia, serif', fontStyle: 'italic',
            fontSize: 20, color: '#D5C5A4', opacity: 0.85, maxWidth: 360, lineHeight: 1.2,
          }}>
            « Le paysage est le premier architecte ; la maison n'y arrive qu'ensuite. »
          </div>
        </div>
        {COLS.map(col => (
          <div key={col.h}>
            <div style={{
              fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
              opacity: 0.55, marginBottom: 14, fontFamily: 'var(--font-body)',
            }}>
              {col.h}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.l.map(x => (
                <li key={x} style={{ fontSize: 14, cursor: 'pointer', opacity: 0.9 }}>
                  <a href="#" style={{ borderBottom: 'none' }}>{x}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        borderTop: '1px solid rgba(213,197,164,0.18)', paddingTop: 24,
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6,
        fontFamily: 'var(--font-body)',
      }}>
        <span>© OGILVIE. 2025 — Mont-Blanc, Laurentides, QC</span>
        <span>−74.394739, 46.096005</span>
      </div>
    </footer>
  )
}
