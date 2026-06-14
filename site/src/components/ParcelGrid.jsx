import { useState } from 'react'
import { Eyebrow, Tag } from './Primitives'

const PARCELS = [
  { id: '04-12', sector: 'Secteur 04', name: 'Crête du lac',        ha: '1,24 ha', orient: 'Sud-ouest', kind: 'Boisé',    price: '285 000 $', status: 'dispo',   tone: 1 },
  { id: '02-07', sector: 'Secteur 02', name: 'Versant des érables',  ha: '0,96 ha', orient: 'Est',       kind: 'Mixte',    price: '210 000 $', status: 'reserve', tone: 2 },
  { id: '05-03', sector: 'Secteur 05', name: 'Anse du ruisseau',     ha: '1,58 ha', orient: 'Sud',       kind: 'Riverain', price: '410 000 $', status: 'dispo',   tone: 3 },
  { id: '01-09', sector: 'Secteur 01', name: 'Plateau des pins',     ha: '0,88 ha', orient: 'Ouest',     kind: 'Boisé',    price: '198 000 $', status: 'dispo',   tone: 1 },
  { id: '03-02', sector: 'Secteur 03', name: 'Clairière haute',      ha: '1,10 ha', orient: 'Sud-est',   kind: 'Ouvert',   price: '245 000 $', status: 'vendu',   tone: 2 },
  { id: '04-05', sector: 'Secteur 04', name: 'Belvédère nord',       ha: '1,42 ha', orient: 'Nord',      kind: 'Boisé',    price: '315 000 $', status: 'dispo',   tone: 3 },
]

const TONES = {
  1: 'linear-gradient(180deg,#BFAE8C,#8C8A73)',
  2: 'linear-gradient(180deg,#9B6B43,#575146)',
  3: 'linear-gradient(180deg,#8C8A73,#575146)',
}

function StatusTag({ status }) {
  if (status === 'dispo') return (
    <Tag variant="outline">
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#9B6B43' }} />
      Disponible
    </Tag>
  )
  if (status === 'reserve') return <Tag variant="solid">Réservé</Tag>
  return (
    <Tag variant="solid">
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D5C5A4' }} />
      Vendu
    </Tag>
  )
}

const FILTERS = ['Tous', 'Boisé', 'Riverain', 'Ouvert', 'Mixte']

export function ParcelGrid({ onOpen }) {
  const [filter, setFilter] = useState('Tous')
  const visible = filter === 'Tous' ? PARCELS : PARCELS.filter(p => p.kind === filter)

  return (
    <section style={{ background: '#FDFBF6', padding: '96px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48 }}>
          <div>
            <Eyebrow>17 parcelles · 5 secteurs</Eyebrow>
            <div style={{
              marginTop: 12,
              fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
              textTransform: 'uppercase', letterSpacing: '-0.02em',
              fontSize: 56, lineHeight: 0.98, color: '#000',
            }}>
              Les terrains.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                }}
              >
                <Tag
                  variant={filter === f ? 'corten' : 'sage'}
                  style={{ cursor: 'pointer' }}
                >
                  {f}
                </Tag>
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {visible.map(p => (
            <ParcelCard key={p.id} parcel={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ParcelCard({ parcel: p, onOpen }) {
  const [hover, setHover] = useState(false)
  return (
    <article
      onClick={() => onOpen?.(p)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#FDFBF6', border: '1px solid rgba(87,81,70,0.18)', borderRadius: 4,
        padding: 18, display: 'flex', flexDirection: 'column', gap: 12,
        cursor: 'pointer',
        transition: 'box-shadow 260ms cubic-bezier(.2,0,0,1), transform 260ms cubic-bezier(.2,0,0,1)',
        boxShadow: hover
          ? '0 2px 8px rgba(0,0,0,0.06), 0 24px 48px -12px rgba(87,81,70,0.28)'
          : '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(87,81,70,0.18)',
        transform: hover ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ height: 200, background: TONES[p.tone], borderRadius: 2, filter: 'sepia(.2)' }} />
      <Eyebrow>
        {p.sector} · Parcelle {p.id.split('-')[1]}
      </Eyebrow>
      <div style={{
        fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
        textTransform: 'uppercase', letterSpacing: '-0.01em', fontSize: 24, lineHeight: 1.05, color: '#000',
      }}>
        {p.name}
      </div>
      <div style={{
        display: 'flex', gap: 14,
        fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11,
        color: '#8C8A73', textTransform: 'uppercase',
      }}>
        <span>{p.ha}</span><span>{p.orient}</span><span>{p.kind}</span>
      </div>
      <hr style={{ border: 0, borderTop: '1px solid rgba(87,81,70,0.18)', margin: '4px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
          fontSize: 18, color: '#9B6B43',
        }}>
          {p.price}
        </span>
        <StatusTag status={p.status} />
      </div>
    </article>
  )
}
