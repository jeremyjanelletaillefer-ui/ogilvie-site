import { useState, useEffect } from 'react'
import { Eyebrow, Button } from './Primitives'

function Field({ label, placeholder, type = 'text', value, onChange }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{
        fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
        fontWeight: 500, color: '#8C8A73', marginBottom: 6, fontFamily: 'var(--font-body)',
      }}>
        {label}
      </div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 0',
          fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#000',
          background: 'transparent', border: 0, borderBottom: '1px solid #000',
          outline: 'none', borderRadius: 0,
        }}
      />
    </label>
  )
}

export function ContactSheet({ open, onClose }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', tel: '', secteur: '' })

  useEffect(() => {
    if (!open) {
      setSent(false)
      setForm({ nom: '', email: '', tel: '', secteur: '' })
    }
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(520px, 92vw)', background: '#FDFBF6',
          padding: 36, borderRadius: 4, border: '1px solid #000',
          animation: 'fadeUp 260ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }`}</style>
        {!sent ? (
          <>
            <Eyebrow>Prendre rendez-vous</Eyebrow>
            <div style={{
              marginTop: 10,
              fontFamily: 'Gloock, Ibarra Real Nova, Georgia, serif', fontWeight: 400,
              textTransform: 'uppercase', letterSpacing: '-0.01em', fontSize: 32, lineHeight: 1, color: '#000',
            }}>
              Venir marcher.
            </div>
            <p style={{ marginTop: 14, fontSize: 14, color: '#575146' }}>
              Nous vous recontactons sous 48 heures pour convenir d'une date et de la météo.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 24 }}>
              <Field label="Nom" placeholder="Marie Tremblay" value={form.nom} onChange={v => setForm(f => ({ ...f, nom: v }))} />
              <Field label="Courriel" type="email" placeholder="marie@exemple.ca" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
              <Field label="Téléphone" type="tel" placeholder="+1 514 555 0188" value={form.tel} onChange={v => setForm(f => ({ ...f, tel: v }))} />
              <Field label="Secteur préféré" placeholder="Crête du lac" value={form.secteur} onChange={v => setForm(f => ({ ...f, secteur: v }))} />
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={onClose}>Annuler</Button>
              <Button variant="primary" onClick={() => setSent(true)}>Envoyer</Button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              fontFamily: 'Ibarra Real Nova, serif', fontStyle: 'italic',
              fontSize: 32, color: '#575146', marginBottom: 18,
            }}>
              Bien reçu.
            </div>
            <p style={{ fontSize: 14, color: '#575146' }}>
              Nous revenons vers vous sous 48 heures.
            </p>
            <div style={{ marginTop: 24 }}>
              <Button variant="outline" onClick={onClose}>Fermer</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
