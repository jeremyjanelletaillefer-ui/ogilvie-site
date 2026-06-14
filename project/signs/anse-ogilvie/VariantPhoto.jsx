/* OGILVIE — L'Anse Ogilvie · Variante 3 — PHOTO DOMINANTE
   ---------------------------------------------------------
   Bandeau photo paysage sépia full-bleed sur le panneau du HAUT,
   avec le titre overlay en sable. Le bas reçoit le plan + courtier
   sur sable patiné. Effet édito.
*/

const VariantPhoto = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: SIGN_W, height: TOTAL_H }}>

      {/* ============== HAUT — Photo full-bleed ============== */}
      <Panel bg="#1c1812" side style={{ position: 'relative' }}>
        <img
          src="landscape.jpg"
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 65%',
            filter: 'sepia(0.45) saturate(0.85) brightness(0.95) contrast(1.05)',
          }}
        />
        {/* Vignette sombre bas pour lisibilité */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* Hairline sable en haut */}
        <div style={{
          position: 'absolute', top: 28, left: 56, right: 56,
          height: 1, background: '#D5C5A4',
        }} />

        {/* Wordmark + eyebrow */}
        <div style={{
          position: 'absolute', top: 44, left: 56, right: 56,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 18, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: '#D5C5A4', fontWeight: 500,
          }}>
            Les Grands Espaces — Mont-Blanc
          </div>
          <Wordmark height={44} color="#fff" />
        </div>

        {/* Titre — italique éditorial en bas, sable */}
        <div style={{
          position: 'absolute',
          bottom: 60, left: 56, right: 56,
          color: '#D5C5A4',
        }}>
          <div style={{
            fontFamily: 'Ibarra Real Nova, Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 240,
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            fontWeight: 400,
          }}>
            L'Anse&nbsp;Ogilvie
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginTop: 16,
          }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 24, letterSpacing: '0.04em',
              color: '#D5C5A4', fontWeight: 400,
              maxWidth: 720,
            }}>
              Neuf terrains privilèges avec accès exclusif au Lac Rougeaud.
            </div>
            <div style={{
              fontFamily: 'ui-monospace, Menlo, monospace',
              fontSize: 14, letterSpacing: '0.05em',
              color: '#D5C5A4', opacity: 0.8,
            }}>
              -74.394739, 46.096005
            </div>
          </div>
        </div>
      </Panel>

      {/* ============== BAS — Sable, plan + courtier ============== */}
      <Panel bg="#FDFBF6">
        {/* Plan à gauche, GRAND */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: 760,
          overflow: 'hidden',
          borderRight: '1px solid #000',
        }}>
          <LotsPlan />
        </div>

        {/* Légende plan */}
        <div style={{
          position: 'absolute', top: 24, left: 24,
          background: '#FDFBF6', border: '1px solid #000',
          padding: '10px 16px',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 13, letterSpacing: '0.24em',
          textTransform: 'uppercase', fontWeight: 500,
        }}>
          Plan des terrains
        </div>

        {/* Bloc droit */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: SIGN_W - 760,
          padding: '36px 48px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: '#575146',
              fontWeight: 600, marginBottom: 12,
            }}>
              Courtier immobilier
            </div>
            <div style={{
              fontFamily: 'Gloock, serif',
              fontSize: 42, lineHeight: 1.02,
              color: '#000', textTransform: 'uppercase',
              letterSpacing: '-0.01em', marginBottom: 6,
            }}>
              Laurier<br />Balthazard
            </div>
            <div style={{
              fontFamily: 'Ibarra Real Nova, serif', fontStyle: 'italic',
              fontSize: 18, color: '#575146', marginBottom: 24,
            }}>
              Engel &amp; Völkers
            </div>
            <div style={{ borderTop: '1px solid #000', paddingTop: 16 }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 30, fontWeight: 600, color: '#000',
                letterSpacing: '0.02em', lineHeight: 1.15,
              }}>
                514 891 3827
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13, color: '#575146', marginTop: 6,
                wordBreak: 'break-all',
              }}>
                laurier.balthazard@engelvoelkers.com
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
            <div style={{ border: '4px solid #000' }}>
              <QRPlaceholder size={120} />
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: '#575146',
              maxWidth: 110, lineHeight: 1.4, paddingBottom: 6,
              fontWeight: 600,
            }}>
              Scannez<br />pour les<br />détails
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

window.VariantPhoto = VariantPhoto;
