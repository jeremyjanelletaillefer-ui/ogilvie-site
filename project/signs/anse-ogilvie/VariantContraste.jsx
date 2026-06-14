/* OGILVIE — L'Anse Ogilvie · Variante 2 — CONTRASTÉ
   --------------------------------------------------
   Charbon profond + corten. Le plan des lots est inversé / éclairé,
   posé sur le panneau du bas. OGILVIE. dévore le panneau du haut.
   À lire de très loin. Effet "monolithe".
*/

const VariantContraste = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: SIGN_W, height: TOTAL_H }}>

      {/* ============== HAUT — Charbon, OGILVIE. en monumental ============== */}
      <Panel bg="#000000" side>
        {/* Hairline corten */}
        <div style={{
          position: 'absolute', top: 28, left: 56, right: 56,
          height: 1, background: '#9B6B43',
        }} />

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: 44, left: 56,
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 18, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: '#9B6B43', fontWeight: 500,
        }}>
          OGILVIE. — Anse
        </div>

        {/* Coordonnées droite */}
        <div style={{
          position: 'absolute', top: 44, right: 56,
          fontFamily: 'ui-monospace, Menlo, monospace',
          fontSize: 14, letterSpacing: '0.04em',
          color: '#D5C5A4',
        }}>
          -74.394739, 46.096005
        </div>

        {/* Titre éclatant */}
        <div style={{
          position: 'absolute',
          top: 110, left: 48, right: 48,
          fontFamily: 'Gloock, serif',
          fontSize: 360, lineHeight: 0.86,
          letterSpacing: '-0.035em',
          color: '#D5C5A4',
          textTransform: 'uppercase',
          fontWeight: 400,
        }}>
          L'Anse
        </div>

        {/* Tagline italique en bas droite, corten */}
        <div style={{
          position: 'absolute', bottom: 60, right: 56,
          fontFamily: 'Ibarra Real Nova, serif',
          fontStyle: 'italic', fontSize: 36, lineHeight: 1.15,
          color: '#9B6B43', textAlign: 'right', maxWidth: 580,
        }}>
          Neuf terrains privilèges<br />
          avec accès exclusif au Lac&nbsp;Rougeaud.
        </div>
      </Panel>

      {/* ============== BAS — Sable + plan + courtier + QR ============== */}
      <Panel bg="#D5C5A4">
        {/* Bandeau corten en haut du panneau bas (= debordement visuel) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 86, background: '#9B6B43',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 56px',
        }}>
          <div style={{
            fontFamily: 'Gloock, serif',
            fontSize: 64, lineHeight: 1, letterSpacing: '-0.02em',
            color: '#000', textTransform: 'uppercase',
          }}>
            OGILVIE
          </div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 18, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: '#000', fontWeight: 600,
          }}>
            9 Terrains · Lac Rougeaud · Mont-Blanc
          </div>
        </div>

        {/* Plan à gauche — sur fond sable */}
        <div style={{
          position: 'absolute',
          top: 86, left: 0, bottom: 0,
          width: 760,
          overflow: 'hidden',
          borderRight: '1px solid #000',
        }}>
          <LotsPlan />
          <div style={{
            position: 'absolute', top: 20, left: 20,
            background: '#000', color: '#D5C5A4',
            padding: '10px 16px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13, letterSpacing: '0.24em',
            textTransform: 'uppercase', fontWeight: 500,
          }}>
            Plan des 9 terrains
          </div>
        </div>

        {/* Courtier + QR à droite */}
        <div style={{
          position: 'absolute',
          top: 86, right: 0, bottom: 0,
          width: SIGN_W - 760,
          padding: '32px 48px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: '#575146',
              fontWeight: 600, marginBottom: 10,
            }}>
              Courtier
            </div>
            <div style={{
              fontFamily: 'Gloock, serif',
              fontSize: 38, lineHeight: 1.02,
              color: '#000', textTransform: 'uppercase',
              letterSpacing: '-0.01em', marginBottom: 6,
            }}>
              Laurier<br />Balthazard
            </div>
            <div style={{
              fontFamily: 'Ibarra Real Nova, serif', fontStyle: 'italic',
              fontSize: 16, color: '#575146', marginBottom: 18,
            }}>
              Engel &amp; Völkers
            </div>
            <div style={{ background: '#000', color: '#D5C5A4', padding: '14px 16px' }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 24, fontWeight: 600,
                letterSpacing: '0.04em', lineHeight: 1.2,
              }}>514 891 3827</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 11, opacity: 0.85, marginTop: 4,
                wordBreak: 'break-all',
              }}>
                laurier.balthazard@engelvoelkers.com
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
            <div style={{ border: '4px solid #000', background: '#fff' }}>
              <QRPlaceholder size={110} />
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 10, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: '#000',
              maxWidth: 100, lineHeight: 1.4, paddingBottom: 4,
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

window.VariantContraste = VariantContraste;
