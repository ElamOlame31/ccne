import Background from './components/Background.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import MapExplorer from './components/MapExplorer.jsx'
import GapsSection from './components/GapsSection.jsx'
import DiasporaSection from './components/DiasporaSection.jsx'
import PartnershipsSection from './components/PartnershipsSection.jsx'
import ReportSection from './components/ReportSection.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Nav />
      <Hero />
      <main>
        <MapExplorer />
        <GapsSection />
        <DiasporaSection />
        <PartnershipsSection />
        <ReportSection />
      </main>
      <Footer />
    </div>
  )
}
