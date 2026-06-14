import heroImg from '../assets/hero-landscape.jpg'
import { Eyebrow, Button, Coords } from './Primitives'

export function Hero({ onNav }) {
  return (
    <section style={{
      position: 'relative', height: 'calc(100vh - 64px)', minHeight: 640,
      background: '#000', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'sepia(.12) saturate(.95) contrast(1.02)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,.55) 100%)',
      }} />
      <div style={{
        position: 'relative', height: '100%',
        display: 'grid', gridTemplateRows: '1fr auto',
        padding: '40px 40px 48px',
        color: '#D5C5A4',
      }}>
        <div style={{ alignSelf: 'start', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Eyebrow color="#D5C5A4" style={{ opacity: 0.85 }}>
            Développement résidentiel de terrains
          </Eyebrow>
          <Coords color="#D5C5A4" />
        </div>
        <div>
          <div style={{
            fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
            textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.92,
            fontSize: 'clamp(56px, 10vw, 148px)', color: '#D5C5A4',
            maxWidth: 1100,
          }}>
            Les grands<br />espaces.
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginTop: 28, flexWrap: 'wrap' }}>
            <div style={{
              fontFamily: 'Ibarra Real Nova, serif', fontStyle: 'italic',
              fontSize: 24, color: '#D5C5A4', opacity: 0.9, maxWidth: 560, lineHeight: 1.25,
            }}>
              Dix-sept parcelles boisées et riveraines, à quarante minutes de Mont-Tremblant.
            </div>
            <div style={{ display: 'flex', gap: 10, marginLeft: 'auto' }}>
              <Button variant="primary" size="lg" onClick={() => onNav('terrains')}>
                Voir les terrains
              </Button>
              <Button variant="onDark" size="lg" onClick={() => onNav('contact')}>
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StatsStrip() {
  const stats = [
    ['17',      'Parcelles au total'],
    ['1,24 ha', 'Superficie moyenne'],
    ['09 / 17', 'Disponibles'],
    ['40 min',  'De Mont-Tremblant'],
  ]
  return (
    <section style={{
      background: '#D5C5A4', padding: '48px 40px',
      borderTop: '1px solid #000', borderBottom: '1px solid #000',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {stats.map(([n, l]) => (
          <div key={l} style={{ borderLeft: '1px solid #000', paddingLeft: 16 }}>
            <div style={{
              fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
              fontSize: 48, letterSpacing: '-0.02em', lineHeight: 1, color: '#000',
            }}>
              {n}
            </div>
            <div style={{
              marginTop: 10, fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#575146', fontFamily: 'var(--font-body)',
            }}>
              {l}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Manifest() {
  return (
    <section style={{ background: '#FDFBF6', padding: '120px 40px', borderBottom: '1px solid #000' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
        <div>
          <Eyebrow>Le manifeste</Eyebrow>
          <div style={{
            marginTop: 18,
            fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
            textTransform: 'uppercase', letterSpacing: '-0.02em',
            fontSize: 56, lineHeight: 0.98, color: '#000',
          }}>
            Habiter le<br />paysage, pas<br />le remplacer.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 12 }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 19, lineHeight: 1.55,
            color: '#575146', margin: 0, maxWidth: 620,
          }}>
            OGILVIE dessine un développement résidentiel en Laurentides guidé par le relief.
            Chaque parcelle a été arpentée à pied, chaque arbre mature relevé. Les chemins suivent
            les crêtes existantes ; l'emprise de bâti est tracée autour des érables centenaires,
            pas au travers.
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 19, lineHeight: 1.55,
            color: '#575146', margin: 0, maxWidth: 620,
          }}>
            Un cahier architectural partagé encadre les volumes, les matériaux et les couleurs
            autorisés — acier Corten, bois brûlé, pierre locale — de manière à ce que le voisinage
            reste un voisinage de forêt avant d'être un voisinage de maisons.
          </p>
          <hr style={{ border: 0, borderTop: '1px solid #000', margin: '8px 0' }} />
          <div style={{ display: 'flex', gap: 48 }}>
            <div>
              <Eyebrow>Architectes</Eyebrow>
              <div style={{ marginTop: 6, fontSize: 15, color: '#000' }}>Atelier Pelletier · Studio Noire</div>
            </div>
            <div>
              <Eyebrow>Arpentage</Eyebrow>
              <div style={{ marginTop: 6, fontSize: 15, color: '#000' }}>Groupe Laurentides</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditorialCut() {
  return (
    <section style={{ background: '#D5C5A4', padding: '120px 40px', borderTop: '1px solid #000' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Ibarra Real Nova, serif', fontStyle: 'italic',
          fontSize: 44, lineHeight: 1.2, color: '#575146', letterSpacing: '-0.005em',
        }}>
          « On n'achète pas un terrain. On achète une orientation, une forêt,
          un silence, un angle de lumière à sept heures du soir. »
        </div>
        <div style={{
          marginTop: 32, fontSize: 11, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#000', fontFamily: 'var(--font-body)',
        }}>
          — Extrait du cahier d'arpentage, printemps 2025
        </div>
      </div>
    </section>
  )
}

export function ContactStrip({ onOpenContact }) {
  return (
    <section style={{ background: '#FDFBF6', padding: '96px 40px', borderTop: '1px solid #000' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <Eyebrow>Visiter</Eyebrow>
          <div style={{
            marginTop: 14,
            fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
            textTransform: 'uppercase', letterSpacing: '-0.02em',
            fontSize: 56, lineHeight: 0.98, color: '#000',
          }}>
            Venez<br />marcher.
          </div>
          <p style={{ marginTop: 24, fontSize: 17, color: '#575146', lineHeight: 1.55, maxWidth: 480 }}>
            Les visites se font en présence d'un arpenteur, à pied, par temps sec.
            Durée deux heures. Bottes recommandées.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
            <Button variant="primary" size="lg" onClick={onOpenContact}>
              Prendre rendez-vous
            </Button>
            <Button variant="outline" size="lg">
              Télécharger la brochure
            </Button>
          </div>
        </div>
        <div style={{ border: '1px solid #000', padding: 32, background: '#F3ECDF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              ['Téléphone', '+1 514 891 3827'],
              ['Courriel', 'laurier.balthazard@engelvoelkers.com'],
              ['Bureau', 'Mont-Blanc, QC'],
              ['Coordonnées', '−74.394739,\n46.096005'],
            ].map(([label, val]) => (
              <div key={label}>
                <Eyebrow>{label}</Eyebrow>
                <div style={{ marginTop: 6, fontSize: 15, color: '#000', whiteSpace: 'pre-line' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
