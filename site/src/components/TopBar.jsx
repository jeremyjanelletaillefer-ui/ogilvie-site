import { Wordmark, Button, Coords } from './Primitives'

const NAV_ITEMS = [
  { id: 'accueil',  label: 'Accueil' },
  { id: 'terrains', label: 'Terrains' },
  { id: 'carte',    label: 'Carte' },
  { id: 'histoire', label: 'Histoire' },
  { id: 'contact',  label: 'Contact' },
]

export function TopBar({ current, onNav }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 10,
      background: '#FDFBF6',
      borderBottom: '1px solid #000',
      height: 64, display: 'flex', alignItems: 'center',
      padding: '0 40px', gap: 40,
    }}>
      <button
        onClick={() => onNav('accueil')}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <Wordmark size={20} />
      </button>
      <nav style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center' }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              background: 'none', border: 'none', padding: '4px 0',
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
              fontFamily: 'var(--font-body)',
              color: current === item.id ? '#9B6B43' : '#000',
              cursor: 'pointer',
              borderBottom: `1px solid ${current === item.id ? '#9B6B43' : 'transparent'}`,
              transition: 'color 160ms cubic-bezier(.2,0,0,1)',
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <Coords />
      <Button variant="secondary" size="sm" onClick={() => onNav('contact')}>
        Réserver une visite
      </Button>
    </header>
  )
}
