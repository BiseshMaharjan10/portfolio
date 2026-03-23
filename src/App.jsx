import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AboutMe from './components/AboutMe'
import ContactForm from './components/ContactForm'
import ProjectCard from './components/ProjectCard'
import Starfield from './components/Starfield'
import SocialIcon from './components/SocialIcon'
import { profile, projects, skills } from './data/portfolioData'
import SkillsTree from './components/SkillsTree'

function SkillsSection() {
  return <SkillsTree categories={skills} />
}

function ProjectsSection() {
  const wheelLockRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalProjects = projects.length

  const getRelativeOffset = (index) => {
    const raw = index - activeIndex
    if (raw > totalProjects / 2) return raw - totalProjects
    if (raw < -totalProjects / 2) return raw + totalProjects
    return raw
  }

  const shiftProject = (direction) => {
    setActiveIndex((current) => {
      return (current + direction + totalProjects) % totalProjects
    })
  }

  const handleWheel = (event) => {
    const now = Date.now()
    if (now - wheelLockRef.current < 420) {
      return
    }

    const horizontalDelta = event.deltaX

    if (Math.abs(horizontalDelta) < 4) {
      return
    }

    event.preventDefault()
    wheelLockRef.current = now
    shiftProject(horizontalDelta > 0 ? 1 : -1)
  }

  return (
    <section
      id="projects"
      className="scroll-mt-24 space-y-4"
      aria-labelledby="projects-title"
    >
      <h2
        id="projects-title"
        className="fade-in font-display text-3xl text-zinc-100 md:text-4xl"
      >
        Featured Projects
      </h2>
      <p className="fade-in max-w-2xl text-zinc-300">
        Three selected builds focused on reliable backend architecture,
        performant frontend experiences, and practical product outcomes.
      </p>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">
          Swipe left or right to view projects
        </p>

        <div className="-mx-1 overflow-x-auto pb-1 md:hidden no-scrollbar">
          <div className="flex snap-x snap-mandatory gap-4 px-1">
            {projects.map((project) => (
              <div key={`mobile-${project.title}`} className="w-[92%] max-w-[430px] flex-none snap-center">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        <div
          onWheel={handleWheel}
          className="relative hidden h-[560px] overflow-hidden rounded-3xl border border-cyan-300/20 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.10),rgba(2,6,23,0.95)_68%)] [perspective:1400px] md:block"
        >
          {projects.map((project, index) => {
            const offset = getRelativeOffset(index)
            const isVisible = Math.abs(offset) <= 1

            const transformByOffset = {
              '-1': 'translate(-96%, -50%) rotateY(42deg) translateZ(-40px) scale(0.88)',
              '0': 'translate(-50%, -50%) rotateY(0deg) translateZ(100px) scale(1)',
              '1': 'translate(-4%, -50%) rotateY(-42deg) translateZ(-40px) scale(0.88)',
            }

            return (
              <div
                key={project.title}
                className="absolute left-1/2 top-1/2 w-[78%] max-w-[760px] [transform-style:preserve-3d] transition-all duration-700"
                style={{
                  transform:
                    transformByOffset[String(offset)]
                    || 'translate(-50%, -50%) rotateY(0deg) translateZ(-240px) scale(0.78)',
                  opacity: isVisible ? (offset === 0 ? 1 : 0.62) : 0,
                  zIndex: offset === 0 ? 30 : 10,
                  pointerEvents: offset === 0 ? 'auto' : 'none',
                }}
              >
                <ProjectCard project={project} />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 space-y-4"
      aria-labelledby="contact-title"
    >
      <h2
        id="contact-title"
        className="fade-in font-display text-3xl text-zinc-100 md:text-4xl"
      >
        Contact
      </h2>
      <p className="fade-in max-w-2xl text-zinc-300">
        Have a project in mind? Send a quick message and I will reply with the
        next steps.
      </p>
      <ContactForm />
    </section>
  )
}

function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const sectionByPath = {
      '/': 'about',
      '/skills': 'skills',
      '/projects': 'projects',
      '/contact': 'contact',
    }

    const targetId = sectionByPath[pathname]
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const scrollToTarget = () => {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    window.requestAnimationFrame(scrollToTarget)
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-50">
      <Starfield />
      <ScrollManager />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(45,212,191,0.14),transparent_36%),radial-gradient(circle_at_10%_80%,rgba(56,189,248,0.12),transparent_40%)]" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
        <nav className="mx-auto grid w-full max-w-[1700px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 md:px-8 lg:px-14">
          <Link
            to="/"
            className="font-display text-lg tracking-wide text-cyan-100 transition-colors hover:text-cyan-300"
          >
            Bisesh Maharjan
          </Link>

          <ul className="flex items-center justify-center gap-4 text-sm text-zinc-300 md:gap-6">
            <li>
              <Link to="/skills" className="transition-colors hover:text-cyan-200">
                Skills
              </Link>
            </li>
            <li>
              <Link to="/projects" className="transition-colors hover:text-cyan-200">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-cyan-200">
                Contact
              </Link>
            </li>
          </ul>

          <Link
            to="/contact"
            className="rounded-lg border border-cyan-300/40 bg-cyan-400/15 px-3 py-2 text-sm font-medium text-cyan-100 transition-colors duration-300 hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
          >
            Hire Me
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-[1700px] flex-col gap-8 px-4 pb-8 pt-24 md:gap-10 md:px-8 md:pb-12 md:pt-28 lg:px-14">
        <AboutMe profile={profile} />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <footer className="mx-auto w-full max-w-[1700px] px-4 pb-10 text-sm text-zinc-400 md:px-8 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Bisesh Maharjan.</p>

          <ul className="flex flex-wrap items-center gap-4">
            {profile.socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-colors duration-300 hover:border-cyan-300/40 hover:text-cyan-200"
                >
                  <SocialIcon icon={social.icon} />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default App
