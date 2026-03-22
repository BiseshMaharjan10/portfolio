import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AboutMe from './components/AboutMe'
import ContactForm from './components/ContactForm'
import ProjectCard from './components/ProjectCard'
import Starfield from './components/Starfield'
import { profile, projects, skills } from './data/portfolioData'
import SkillsTree from './components/SkillsTree'

function SkillsSection() {
  return <SkillsTree categories={skills} />
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 space-y-4 rounded-3xl border border-white/10 bg-transparent p-6 md:p-8"
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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="fade-in"
            style={{ animationDelay: `${120 + index * 120}ms` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
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
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <Starfield />
      <ScrollManager />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(45,212,191,0.14),transparent_36%),radial-gradient(circle_at_10%_80%,rgba(56,189,248,0.12),transparent_40%)]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <nav className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 md:px-8">
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 md:gap-10 md:px-8 md:py-12">
        <AboutMe profile={profile} />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <footer className="mx-auto w-full max-w-6xl px-5 pb-10 text-sm text-zinc-400 md:px-8">
        <p>© {new Date().getFullYear()} Bisesh Maharjan. Built with React + Tailwind CSS.</p>
      </footer>
    </div>
  )
}

export default App
