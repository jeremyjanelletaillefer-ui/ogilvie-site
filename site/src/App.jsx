import { useState, useEffect } from 'react'
import './index.css'

import { TopBar } from './components/TopBar'
import { Footer } from './components/Footer'
import { Hero, StatsStrip, Manifest, EditorialCut, PhotoTextSection, ContactStrip } from './components/Hero'
import { ParcelGrid } from './components/ParcelGrid'
import { MapSection } from './components/MapSection'
import { ParcelDetail } from './components/ParcelDetail'
import { ContactSheet } from './components/ContactSheet'

export default function App() {
  const [route, setRoute] = useState(() => localStorage.getItem('ogilvie:route') || 'accueil')
  const [openParcel, setOpenParcel] = useState(null)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('ogilvie:route', route)
    window.scrollTo(0, 0)
  }, [route])

  const nav = (id) => {
    if (id === 'contact') setContactOpen(true)
    else setRoute(id)
  }

  return (
    <div>
      <TopBar current={route} onNav={nav} />

      {route === 'accueil' && (
        <>
          <Hero onNav={nav} />
          <Manifest />
          <EditorialCut />
          <PhotoTextSection />
          <ContactStrip onOpenContact={() => setContactOpen(true)} />
        </>
      )}

      {route === 'terrains' && (
        <>
          <ParcelGrid onOpen={setOpenParcel} />
          <EditorialCut />
        </>
      )}

      {route === 'carte' && (
        <>
          <MapSection />
          <ContactStrip onOpenContact={() => setContactOpen(true)} />
        </>
      )}

      {route === 'histoire' && (
        <>
          <Manifest />
          <EditorialCut />
          <ContactStrip onOpenContact={() => setContactOpen(true)} />
        </>
      )}

      <Footer />

      <ParcelDetail
        parcel={openParcel}
        onClose={() => setOpenParcel(null)}
        onReserve={() => { setOpenParcel(null); setContactOpen(true) }}
      />
      <ContactSheet open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
