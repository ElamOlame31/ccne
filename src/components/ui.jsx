import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'

// Révélation douce au scroll
export function Reveal({ children, delay = 0, y = 24, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Compteur animé déclenché à l'entrée dans le viewport
export function Counter({ to, duration = 1.9, format = (v) => Math.round(v).toLocaleString('fr-FR'), className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(format(0))

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(v)),
    })
    return controls.stop
  }, [inView, to, duration]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

// En-tête de section homogène
export function SectionHead({ eyebrow, title, lead, id, align = 'left' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl`} id={id}>
      <Reveal>
        <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-copper/60" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-8 bg-copper/60" />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-[2.7rem]">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-pretty text-[1.04rem] leading-relaxed text-muted">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}

// Carte avec spotlight qui suit le curseur
export function SpotlightCard({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag ref={ref} onMouseMove={onMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

// Bouton magnétique (suit légèrement le curseur)
export function Magnetic({ children, className = '', href, onClick, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = href ? motion.a : motion.button
  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </Comp>
  )
}

// Petite puce sectorielle colorée
export function Chip({ label, color = '#9bb3aa' }) {
  return (
    <span
      className="font-mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] tracking-wide"
      style={{ borderColor: `${color}55`, color: '#e6efe9', background: `${color}14` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  )
}
