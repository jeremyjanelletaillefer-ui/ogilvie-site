/* OGILVIE — L'Anse Ogilvie · Variante 1 — SOBRE / SOMBRE
   --------------------------------------------------------
   Réécriture: palette charbon + forestier + sable pâle pour le texte.
   Inspiration: OVI Construction, architecture noire en forêt québécoise.
   Photo paysage en grand sur le panneau du HAUT (sépia désaturé presque N&B),
   bandeau sombre en bas avec plan + courtier + QR.
   Aucune trace de "sable Tintin" — tout est éteint, profond, forestier.
*/

const V1_PAD = 56;
const V1_BORDER = 2;
const FRAME_INSET = 22;

// Couleurs
const C_INK = '#0E0D0B';        // charbon profond presque noir
const C_FOREST = '#1B1F1A';     // forestier très sombre
const C_BARK = '#2A2620';       // bark
const C_SAND_PALE = '#E8E1D2';  // sable pâle pour texte sur fond sombre
const C_SAND_DIM = '#A89F8A';   // sable étouffé pour texte secondaire
const C_CORTEN = '#8B5A36';     // corten étouffé

const VFrame = ({ children, bg = C_INK, accent = C_SAND_DIM }) => (
  <Panel bg={bg}>
    <div style={{
      position: 'absolute',
      inset: FRAME_INSET,
      border: `${V1_BORDER}px solid ${accent}`,
      pointerEvents: 'none',
    }} />
    {children}
  </Panel>
);

const VariantSobre = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: SIGN_W, height: TOTAL_H }}>

      {/* ============== HAUT — Photo paysage + titre ============== */}
      <VFrame bg={C_INK} accent="rgba(232,225,210,0.32)">
        {/* Photo full-bleed */}
        <div style={{
          position: 'absolute',
          inset: FRAME_INSET + V1_BORDER,
          overflow: 'hidden',
        }}>
          <img
            src="landscape.jpg"
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 60%',
              filter: 'grayscale(0.35) brightness(0.62) contrast(1.08) saturate(0.7)',
              display: 'block',
            }}
          />
          {/* Vignette pour ancrer la typo */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(14,13,11,0.55) 0%, rgba(14,13,11,0.05) 30%, rgba(14,13,11,0.0) 55%, rgba(14,13,11,0.78) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(14,13,11,0.55) 0%, rgba(14,13,11,0) 35%)',
          }} />
        </div>

        {/* Bandeau supérieur — eyebrow / wordmark */}
        <div style={{
          position: 'absolute',
          top: FRAME_INSET + V1_BORDER + 32,
          left: V1_PAD,
          right: V1_PAD,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: C_SAND_PALE,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14, letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: C_SAND_PALE, fontWeight: 500, opacity: 0.85,
          }}>
            Les Grands Espaces — Mont-Blanc
          </div>
          <Wordmark height={30} color="#fff" />
        </div>

        {/* Titre éditorial bas-gauche */}
        <div style={{
          position: 'absolute',
          bottom: FRAME_INSET + V1_BORDER + 40,
          left: V1_PAD,
          right: V1_PAD,
          color: C_SAND_PALE,
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13, letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: C_SAND_DIM, fontWeight: 600,
            marginBottom: 18,
          }}>
            Phase 01 · Neuf terrains
          </div>
          <div style={{
            fontFamily: 'Gloock, serif',
            fontSize: 188,
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            color: C_SAND_PALE,
            textTransform: 'uppercase',
            fontWeight: 400,
          }}>
            L&rsquo;Anse<br />Ogilvie
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 24,
            paddingTop: 18,
            borderTop: `1px solid ${C_SAND_DIM}`,
          }}>
            <div style={{
              fontFamily: 'Ibarra Real Nova, serif',
              fontStyle: 'italic',
              fontSize: 26,
              lineHeight: 1.25,
              color: C_SAND_PALE,
              maxWidth: 760,
              fontWeight: 400,
              opacity: 0.9,
            }}>
              Accès exclusif au Lac&nbsp;Rougeaud — forêt mature, pierres, exposition sud-ouest.
            </div>
            <div style={{
              fontFamily: 'ui-monospace, Menlo, monospace',
              fontSize: 12, letterSpacing: '0.06em',
              color: C_SAND_DIM,
              textAlign: 'right',
              whiteSpace: 'nowrap',
            }}>
              -74.394739, 46.096005
            </div>
          </div>
        </div>
      </VFrame>

      {/* ============== BAS — Plan + Courtier sur fond charbon ============== */}
      <VFrame bg={C_FOREST} accent="rgba(232,225,210,0.28)">

        {/* Plan à gauche — encadré dans une "fenêtre" sable pâle */}
        <div style={{
          position: 'absolute',
          top: FRAME_INSET + V1_BORDER + 32,
          bottom: FRAME_INSET + V1_BORDER + 32,
          left: V1_PAD,
          width: 700,
          background: '#EFE9DA',
          padding: 14,
          boxShadow: '0 2px 0 rgba(0,0,0,0.6)',
        }}>
          <div style={{
            position: 'relative',
            width: '100%', height: '100%',
            overflow: 'hidden',
          }}>
            <LotsPlan />
            <div style={{
              position: 'absolute', top: 14, left: 14,
              background: '#0E0D0B',
              color: C_SAND_PALE,
              padding: '8px 14px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              Plan des 9 terrains
            </div>
          </div>
        </div>

        {/* Bloc droit : courtier + QR */}
        <div style={{
          position: 'absolute',
          top: FRAME_INSET + V1_BORDER + 32,
          bottom: FRAME_INSET + V1_BORDER + 32,
          left: V1_PAD + 700 + 32,
          right: V1_PAD,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: C_SAND_PALE,
        }}>
          <div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12, letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: C_SAND_DIM, fontWeight: 600,
              marginBottom: 14,
            }}>
              Courtier immobilier
            </div>
            <div style={{
              fontFamily: 'Gloock, serif',
              fontSize: 42,
              lineHeight: 1.0,
              textTransform: 'uppercase',
              letterSpacing: '-0.012em',
              color: C_SAND_PALE,
              marginBottom: 6,
            }}>
              Laurier<br />Balthazard
            </div>
            <div style={{
              fontFamily: 'Ibarra Real Nova, serif',
              fontStyle: 'italic',
              fontSize: 18,
              color: C_SAND_DIM,
              marginBottom: 24,
            }}>
              Engel &amp; Völkers
            </div>

            <div style={{
              borderTop: `1px solid ${C_SAND_DIM}`,
              borderBottom: `1px solid ${C_SAND_DIM}`,
              padding: '16px 0',
            }}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 11,
                letterSpacing: '0.30em',
                textTransform: 'uppercase',
                color: C_SAND_DIM,
                fontWeight: 600,
                marginBottom: 8,
              }}>
                Pour information
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 28,
                fontWeight: 600,
                color: C_SAND_PALE,
                letterSpacing: '0.01em',
                lineHeight: 1.15,
              }}>
                514 891 3827
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 12,
                color: C_SAND_DIM,
                marginTop: 6,
                wordBreak: 'break-word',
              }}>
                laurier.balthazard@engelvoelkers.com
              </div>
            </div>
          </div>

          {/* QR + label */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 16,
          }}>
            <div style={{ background: C_SAND_PALE, padding: 6 }}>
              <QRPlaceholder size={104} fg={C_INK} bg={C_SAND_PALE} />
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 10,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: C_SAND_PALE,
              fontWeight: 600,
              maxWidth: 130,
              lineHeight: 1.5,
              paddingBottom: 6,
              opacity: 0.9,
            }}>
              Scannez pour les détails du projet
            </div>
          </div>
        </div>
      </VFrame>
    </div>
  );
};

window.VariantSobre = VariantSobre;
