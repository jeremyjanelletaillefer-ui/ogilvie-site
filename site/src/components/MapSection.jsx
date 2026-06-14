import { Eyebrow, Coords } from './Primitives'

const PINS = [
  { id: '01', x: 18, y: 64 }, { id: '02', x: 30, y: 48 }, { id: '03', x: 44, y: 38 },
  { id: '04', x: 58, y: 52 }, { id: '05', x: 72, y: 66 }, { id: '09', x: 26, y: 74 },
  { id: '12', x: 54, y: 70 }, { id: '07', x: 68, y: 40 },
]

export function MapSection() {
  return (
    <section style={{ background: '#000', color: '#D5C5A4', padding: '96px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 40 }}>
          <div>
            <Eyebrow color="#8C8A73">La carte</Eyebrow>
            <div style={{
              marginTop: 12,
              fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
              textTransform: 'uppercase', letterSpacing: '-0.02em',
              fontSize: 56, lineHeight: 0.98, color: '#D5C5A4',
            }}>
              Un plan,<br />une crête.
            </div>
          </div>
          <Coords color="#8C8A73" />
        </div>
        <div style={{
          position: 'relative', aspectRatio: '16/9',
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(213,197,164,0.08) 0%, transparent 50%),
            repeating-radial-gradient(ellipse at 48% 52%, transparent 0 18px, rgba(213,197,164,0.09) 18px 19px),
            #0a0a0a
          `,
          border: '1px solid rgba(213,197,164,0.25)', borderRadius: 4, overflow: 'hidden',
        }}>
          {PINS.map(p => (
            <div key={p.id} style={{
              position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
              transform: 'translate(-50%,-50%)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <div style={{
                width: 8, height: 8, background: '#9B6B43', borderRadius: '50%',
                boxShadow: '0 0 0 3px rgba(155,107,67,0.25)',
              }} />
              <span style={{ fontSize: 10, letterSpacing: '0.18em', color: '#D5C5A4', fontFamily: 'var(--font-body)' }}>
                {p.id}
              </span>
            </div>
          ))}
          <div style={{
            position: 'absolute', left: 20, bottom: 16,
            fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10,
            color: 'rgba(213,197,164,0.5)', letterSpacing: '0.1em',
          }}>
            N ↑ · 1:5 000 · Équidistance 5 m
          </div>
          <div style={{
            position: 'absolute', right: 20, top: 16,
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(213,197,164,0.5)', fontFamily: 'var(--font-body)',
          }}>
            Mont-Blanc, Laurentides
          </div>
        </div>
      </div>
    </section>
  )
}
