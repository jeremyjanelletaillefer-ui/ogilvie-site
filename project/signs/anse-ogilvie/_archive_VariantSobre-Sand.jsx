/* OGILVIE — L'Anse Ogilvie · Variante 1 — SOBRE (v2)
   ---------------------------------------------------
   Refonte: cadre extérieur visible, marge intérieure constante,
   grille claire, échelle de typo réduite et hiérarchique.
   Tout est posé sur une grille — pas de texte qui se chevauche.
*/

const V1_PAD = 56;          // marge intérieure des deux panneaux (≈ 4.6 po à l'échelle)
const V1_BORDER = 3;        // épaisseur du cadre noir extérieur

const VSobreFrame = ({ children, bg = '#FDFBF6' }) => (
  <Panel bg={bg}>
    {/* cadre extérieur noir — donne la finition / cadrage */}
    <div style={{
      position: 'absolute',
      inset: 18,
      border: `${V1_BORDER}px solid #000`,
      pointerEvents: 'none',
    }} />
    {children}
  </Panel>
);

const VariantSobre = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: SIGN_W, height: TOTAL_H }}>

      {/* ============== HAUT — Titre & branding ============== */}
      <VSobreFrame bg="#D5C5A4">
        {/* Bandeau supérieur : eyebrow gauche + wordmark droite */}
        <div style={{
          position: 'absolute',
          top: 18 + V1_BORDER,
          left: 18 + V1_BORDER,
          right: 18 + V1_BORDER,
          height: 70,
          padding: `0 ${V1_PAD - 18 - V1_BORDER}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #000',
          background: '#D5C5A4',
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 16, letterSpacing: '0.30em',
            textTransform: 'uppercase',
            color: '#3A352C', fontWeight: 500,
          }}>
            Développement résidentiel · Mont-Blanc
          </div>
          <Wordmark height={34} />
        </div>

        {/* Bloc central — Titre énorme centré verticalement */}
        <div style={{
          position: 'absolute',
          top: 18 + V1_BORDER + 70 + 24,
          bottom: 18 + V1_BORDER + 90 + 16,
          left: V1_PAD,
          right: V1_PAD,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {/* Eyebrow numéro projet */}
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14, letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#575146', fontWeight: 600,
            marginBottom: 14,
          }}>
            Phase 01 · Neuf terrains
          </div>
          <div style={{
            fontFamily: 'Gloock, serif',
            fontSize: 220,
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            color: '#000',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}>
            L&rsquo;Anse<br />Ogilvie
          </div>
        </div>

        {/* Pied du panneau haut : tagline italique gauche · coords droite */}
        <div style={{
          position: 'absolute',
          bottom: 18 + V1_BORDER,
          left: 18 + V1_BORDER,
          right: 18 + V1_BORDER,
          height: 90,
          padding: `0 ${V1_PAD - 18 - V1_BORDER}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #000',
        }}>
          <div style={{
            fontFamily: 'Ibarra Real Nova, serif',
            fontStyle: 'italic',
            fontSize: 28,
            lineHeight: 1.2,
            color: '#3A352C',
            maxWidth: 760,
            fontWeight: 400,
          }}>
            Accès exclusif au Lac&nbsp;Rougeaud — forêt, grandes pierres,
            soleil sud-ouest.
          </div>
          <div style={{
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 13, letterSpacing: '0.05em',
            color: '#575146',
            textAlign: 'right',
          }}>
            -74.394739, 46.096005
          </div>
        </div>
      </VSobreFrame>

      {/* ============== BAS — Plan + Courtier ============== */}
      <VSobreFrame bg="#FDFBF6">

        {/* Plan à gauche, dans le cadre */}
        <div style={{
          position: 'absolute',
          top: 18 + V1_BORDER,
          bottom: 18 + V1_BORDER,
          left: 18 + V1_BORDER,
          width: 720,
          overflow: 'hidden',
          borderRight: '1px solid #000',
        }}>
          <LotsPlan />
          {/* Étiquette plan */}
          <div style={{
            position: 'absolute', top: 18, left: 18,
            background: '#FDFBF6',
            border: '1px solid #000',
            padding: '8px 14px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            Plan des terrains
          </div>
        </div>

        {/* Bloc droit : courtier + QR */}
        <div style={{
          position: 'absolute',
          top: 18 + V1_BORDER,
          bottom: 18 + V1_BORDER,
          left: 18 + V1_BORDER + 720,
          right: 18 + V1_BORDER,
          padding: `${V1_PAD - 18 - V1_BORDER}px ${V1_PAD - 18 - V1_BORDER}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Header courtier */}
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13, letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#575146', fontWeight: 600,
              marginBottom: 14,
            }}>
              Courtier immobilier
            </div>
            <div style={{
              fontFamily: 'Gloock, serif',
              fontSize: 40,
              lineHeight: 1.0,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: '#000',
              marginBottom: 6,
            }}>
              Laurier<br />Balthazard
            </div>
            <div style={{
              fontFamily: 'Ibarra Real Nova, serif',
              fontStyle: 'italic',
              fontSize: 18,
              color: '#575146',
              marginBottom: 22,
            }}>
              Engel &amp; Völkers
            </div>

            {/* Coordonnées dans un encadré net */}
            <div style={{
              border: '1px solid #000',
              padding: '14px 16px',
              background: '#F7F1E5',
            }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 11,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#575146',
                fontWeight: 600,
                marginBottom: 8,
              }}>
                Pour information
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 26,
                fontWeight: 700,
                color: '#000',
                letterSpacing: '0.01em',
                lineHeight: 1.15,
              }}>
                514 891 3827
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 12,
                color: '#3A352C',
                marginTop: 4,
                wordBreak: 'break-word',
              }}>
                laurier.balthazard@engelvoelkers.com
              </div>
            </div>
          </div>

          {/* QR + label aligné en bas */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 16,
            paddingTop: 16,
            borderTop: '1px solid #000',
          }}>
            <div style={{ border: '3px solid #000', padding: 0 }}>
              <QRPlaceholder size={100} />
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 10,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: '#3A352C',
              fontWeight: 600,
              maxWidth: 120,
              lineHeight: 1.5,
              paddingBottom: 6,
            }}>
              Scannez pour les détails du projet
            </div>
          </div>
        </div>
      </VSobreFrame>
    </div>
  );
};

window.VariantSobre = VariantSobre;
