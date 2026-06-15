import { motion, useScroll, useSpring } from 'framer-motion'

// Décor global : aurora animée + grille + grain, et barre de progression de défilement.
export default function Background() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <>
      <div className="bg-aurora" aria-hidden="true">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />

      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-copper via-gold to-sky"
        aria-hidden="true"
      />
    </>
  )
}
