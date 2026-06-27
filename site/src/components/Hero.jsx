import { useEffect, useRef } from 'react'
import { Button, Eyebrow } from './Primitives'
// ── PHOTO PLACEHOLDER ─────────────────────────────────────────
// Pour utiliser votre photo : remplacez la ligne ci-dessous par
// import sectionPhoto from '../assets/maison-noire.jpg'
// et passez-la à <PhotoTextSection photo={sectionPhoto} />
import sectionPhoto from '../assets/DKA.png'

function YoutubeLoop({ videoId, start, end }) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(tag, firstScript)

    function createPlayer() {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, loop: 0,
          rel: 0, showinfo: 0, iv_load_policy: 3,
          start, end, playsinline: 1, disablekb: 1,
        },
        events: {
          onReady: (e) => { e.target.setPlaybackQuality('hd1080'); e.target.playVideo() },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED || e.data === window.YT.PlayerState.PAUSED) {
              e.target.seekTo(start)
              e.target.playVideo()
            }
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      window.onYouTubeIframeAPIReady = createPlayer
    }

    return () => { if (playerRef.current) playerRef.current.destroy() }
  }, [videoId, start, end])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div ref={containerRef} style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'max(100%, calc(100vh * 16/9))',
        height: 'max(100%, calc(100vw * 9/16))',
      }} />
    </div>
  )
}

export function Hero({ onNav }) {
  return (
    <div style={{ background: '#FDFBF6' }}>
      {/* Giant wordmark — edge to edge */}
      <div style={{ paddingTop: 72, overflow: 'hidden', lineHeight: 1 }}>
        <div style={{
          fontFamily: 'Gloock, Georgia, serif', fontWeight: 400,
          textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.85,
          fontSize: '19.2vw',
          color: '#000',
          padding: '48px 0 56px',
          whiteSpace: 'nowrap',
          display: 'block',
          width: '100%',
        }}>
          OGILVIE.
        </div>
      </div>

      {/* Vidéo YouTube — loop 0:46→0:56 */}
      <div style={{ width: '100%', height: '75vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
        <YoutubeLoop videoId="TULzjXFTjhU" start={161} end={171} />
      </div>
    </div>
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
          <div style={{
            marginTop: 18,
            fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
            textTransform: 'uppercase', letterSpacing: '-0.02em',
            fontSize: 56, lineHeight: 0.98, color: '#000',
          }}>
            Habiter le<br />paysage,<br />Pas le<br />remplacer.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 12 }}>
          <div>
            <Eyebrow style={{ fontWeight: 700 }}>Terrains à bâtir à vendre · Mont-Blanc</Eyebrow>
            <hr style={{ border: 0, borderTop: '1px solid #000', margin: '16px 0 0' }} />
          </div>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 19, lineHeight: 1.55,
            color: '#575146', margin: 0, maxWidth: 620,
          }}>
            Certains <strong style={{ color: '#000' }}>terrains</strong> se révèlent au premier regard. D'autres demandent qu'on les parcoure. Pendant des années, ces <strong style={{ color: '#000' }}>six cents acres</strong> de Mont-Blanc ont été ceux d'un parcours de golf, accroché à la <strong style={{ color: '#000' }}>montagne</strong> et déroulé le long de <strong style={{ color: '#000' }}>deux lacs</strong>. Tracer ce parcours, c'était arpenter chaque pli du terrain, deviner où la vue porte, où la pente accueille.
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 19, lineHeight: 1.55,
            color: '#575146', margin: 0, maxWidth: 620,
          }}>
            Ce travail-là ne s'efface pas. Le site avait été <strong style={{ color: '#000' }}>lu bien avant d'être habité</strong>, et c'est cette connaissance que prolonge le domaine Ogilvie. Un milieu de vie à Mont-Blanc où l'on peut aujourd'hui <strong style={{ color: '#000' }}>acquérir</strong> l'un de ces <strong style={{ color: '#000' }}>terrains</strong>, chacun face aux lacs, ouvert sur la montagne.
          </p>
        </div>
      </div>
    </section>
  )
}

export function EditorialCut() {
  return (
    <section style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
      <div style={{
        width: '100%', height: '600px',
        background: '#E7DAC2',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
        position: 'relative',
      }}>
        {/* Crosshair */}
        <div style={{ position: 'relative', width: 48, height: 48 }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#575146' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: '#575146' }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 10, height: 10, borderRadius: '50%',
            border: '1px solid #9B6B43', background: '#FDFBF6',
          }} />
        </div>
        <div style={{
          fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#575146', fontFamily: 'var(--font-body)', fontWeight: 500,
        }}>
          Carte interactive — à venir
        </div>
        <div style={{
          fontSize: 13, color: '#8C8A73', fontFamily: 'var(--font-body)',
          maxWidth: 320, textAlign: 'center', lineHeight: 1.5,
        }}>
          Plan des terrains avec localisation GPS, courbes de niveau et accès aux fiches de lots.
        </div>
        {/* Corner marks */}
        {[['0,0','top:16px;left:16px'],['90,0','top:16px;right:16px'],['0,90','bottom:16px;left:16px'],['90,90','bottom:16px;right:16px']].map(([,pos],i) => (
          <div key={i} style={{
            position: 'absolute', width: 16, height: 16,
            ...Object.fromEntries(pos.split(';').map(s => s.split(':').map(x => x.trim()))),
            borderTop: i < 2 ? '1px solid #575146' : 'none',
            borderBottom: i >= 2 ? '1px solid #575146' : 'none',
            borderLeft: i % 2 === 0 ? '1px solid #575146' : 'none',
            borderRight: i % 2 === 1 ? '1px solid #575146' : 'none',
          }} />
        ))}
      </div>
    </section>
  )
}

export function PhotoTextSection({ photo = sectionPhoto }) {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: 640,
      borderBottom: '1px solid #000',
    }}>
      {/* Left: Photo pleine hauteur */}
      <div style={{ overflow: 'hidden', minHeight: 480 }}>
        <img
          src={photo}
          alt="Maison noire en forêt — Domaine Ogilvie"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Right: Texte */}
      <div style={{
        padding: '80px 72px 80px 64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        background: '#FDFBF6',
      }}>
        <Eyebrow style={{ marginBottom: 28 }}>Terrains à bâtir · Mont-Blanc</Eyebrow>

        <h2 style={{
          fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif',
          fontWeight: 400,
          fontSize: 'clamp(36px, 3.4vw, 54px)',
          lineHeight: 1.04,
          letterSpacing: '-0.025em',
          color: '#000',
          marginBottom: 32,
          maxWidth: 440,
          margin: '0 0 32px',
        }}>
          Un domaine en onze phases.
        </h2>

        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 17,
          lineHeight: 1.65,
          color: '#575146',
          maxWidth: 400,
          margin: '0 0 52px',
        }}>
          Onze secteurs distincts, pensés un à un. Des terrains gros format —
          1,5 acre en moyenne, souvent davantage — pour que chaque maison
          garde sa distance et sa forêt.
        </p>

        {/* Hairline */}
        <hr style={{
          width: '100%', maxWidth: 400,
          border: 'none', borderTop: '1px solid #DDDDDD',
          margin: '0 0 44px',
        }} />

        {/* Distances */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            ['10 min',  'Station Mont-Blanc'],
            ['18 min',  'Centre-ville de Tremblant'],
            ['30 min',  'Station Mont-Tremblant'],
            ['1 h 15',  'Montréal'],
          ].map(([time, place]) => (
            <div key={place} style={{
              display: 'flex', alignItems: 'baseline',
              fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1,
            }}>
              <span style={{
                width: 72, flexShrink: 0,
                fontWeight: 600, color: '#000',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {time}
              </span>
              <span style={{
                width: 28, flexShrink: 0,
                color: '#DDDDDD', textAlign: 'center',
                userSelect: 'none',
              }}>
                —
              </span>
              <span style={{ fontWeight: 400, color: '#575146' }}>
                {place}
              </span>
            </div>
          ))}
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
