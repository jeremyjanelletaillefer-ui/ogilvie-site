/* OGILVIE — L'Anse Ogilvie · Variante 4 — ÉDITORIAL
   --------------------------------------------------
   Composition asymétrique. Le plan des lots déborde de bas en haut
   sur la GAUCHE des deux panneaux (effet continuité totale qui prouve
   que les 4×8 ne sont qu'une coupure mécanique). Typo italique.
*/

const VariantEditorial = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: SIGN_W, height: TOTAL_H,
      position: 'relative',
    }}>
      {/* ============== HAUT ============== */}
      <Panel bg="#FDFBF6" side>
        {/* Plan déborde du haut au bas SUR LA GAUCHE */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: 580,
          overflow: 'hidden',
        }}>
          <img
            src="plan-lots.png"
            alt="Plan"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: 580,
              height: TOTAL_H,            // déborde sur 8 pi !
              objectFit: 'cover',
              objectPosition: 'left top',
              display: 'block',
            }}
          />
        </div>
        {/* Hairline structurante */}
        <div style={{
          position: 'absolute',
          top: 28, left: 612, right: 56,
          height: 1, background: '#000',
        }} />

        {/* Eyebrow + wordmark */}
        <div style={{
          position: 'absolute', top: 44, left: 612, right: 56,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 16, letterSpacing: '0.30em', textTransform: 'uppercase',
            color: '#575146', fontWeight: 500,
          }}>
            N° 02 — L'Anse
          </div>
          <Wordmark height={36} />
        </div>

        {/* Titre italique éditorial */}
        <div style={{
          position: 'absolute', top: 130, left: 612, right: 48,
          fontFamily: 'Ibarra Real Nova, Playfair Display, serif',
          fontStyle: 'italic',
          fontSize: 200, lineHeight: 0.9,
          color: '#000', letterSpacing: '-0.025em',
          fontWeight: 400,
        }}>
          L'Anse<br />Ogilvie.
        </div>

        {/* Sub */}
        <div style={{
          position: 'absolute', bottom: 60, left: 612, right: 56,
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 24, lineHeight: 1.35,
          letterSpacing: '0.02em',
          color: '#575146', maxWidth: 480,
        }}>
          Neuf terrains privilèges avec accès exclusif au Lac&nbsp;Rougeaud.
        </div>
      </Panel>

      {/* ============== BAS ============== */}
      <Panel bg="#9B6B43">
        {/* Continuation du plan, partie inférieure (offset -SIGN_H) */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: 580,
          overflow: 'hidden',
        }}>
          <img
            src="plan-lots.png"
            alt=""
            style={{
              position: 'absolute',
              top: -SIGN_H, left: 0,
              width: 580,
              height: TOTAL_H,
              objectFit: 'cover',
              objectPosition: 'left top',
              display: 'block',
            }}
          />
        </div>

        {/* Bandeau corten — bloc texte+contact à droite */}
        <div style={{
          position: 'absolute',
          top: 0, left: 580, right: 0, bottom: 0,
          padding: '32px 56px 40px',
          color: '#FDFBF6',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: '#FDFBF6',
              fontWeight: 500, marginBottom: 14, opacity: 0.85,
            }}>
              Courtier · Renseignements
            </div>
            <div style={{
              fontFamily: 'Gloock, serif',
              fontSize: 64, lineHeight: 1.0,
              color: '#FDFBF6', textTransform: 'uppercase',
              letterSpacing: '-0.015em', marginBottom: 8,
            }}>
              Laurier<br />Balthazard
            </div>
            <div style={{
              fontFamily: 'Ibarra Real Nova, serif', fontStyle: 'italic',
              fontSize: 22, opacity: 0.9, marginBottom: 20,
            }}>
              Engel &amp; Völkers
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 38, fontWeight: 600,
              letterSpacing: '0.03em', lineHeight: 1.1,
            }}>
              514 891 3827
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 16, opacity: 0.85, marginTop: 8,
              wordBreak: 'break-all',
            }}>
              laurier.balthazard@engelvoelkers.com
            </div>
          </div>

          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
              <div style={{ border: '4px solid #FDFBF6', background: '#fff' }}>
                <QRPlaceholder size={130} />
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 12, letterSpacing: '0.24em',
                textTransform: 'uppercase', color: '#FDFBF6',
                maxWidth: 130, lineHeight: 1.4, paddingBottom: 6,
                fontWeight: 600,
              }}>
                Scannez<br />pour les<br />détails du projet
              </div>
            </div>
            <div style={{
              fontFamily: 'ui-monospace, Menlo, monospace',
              fontSize: 12, letterSpacing: '0.05em',
              color: '#FDFBF6', opacity: 0.75, textAlign: 'right',
            }}>
              -74.394739<br />46.096005
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

window.VariantEditorial = VariantEditorial;
