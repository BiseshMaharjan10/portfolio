import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SocialIcon from './SocialIcon'
import profileImage from '../assets/profile.jpeg'

export default function AboutMe({ profile }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [isRoleVisible, setIsRoleVisible] = useState(true)

  useEffect(() => {
    if (!profile.roles?.length) return undefined

    let swapTimer

    const interval = window.setInterval(() => {
      setIsRoleVisible(false)

      swapTimer = window.setTimeout(() => {
        setRoleIndex((current) => (current + 1) % profile.roles.length)
        setIsRoleVisible(true)
      }, 520)
    }, 3600)

    return () => {
      window.clearInterval(interval)
      if (swapTimer) {
        window.clearTimeout(swapTimer)
      }
    }
  }, [profile.roles])

  const currentRole = profile.roles?.[roleIndex] || 'Fullstack Developer'

  return (
    <section
      id="about"
      className="fade-in relative min-h-[calc(100svh-9.5rem)] w-full overflow-hidden"
      aria-labelledby="about-title"
    >
      <div className="relative grid w-full items-center gap-8 pt-8 lg:grid-cols-[0.9fr_minmax(460px,700px)_0.9fr] lg:pt-4">
        <div className="space-y-7">
          <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
            Career-focused Fullstack Builder
          </p>

          <div>
            <h1
              id="about-title"
              className="font-display text-4xl font-bold tracking-tight text-zinc-100 md:text-6xl"
            >
              {profile.name}
            </h1>

            <p
              className={`mt-4 font-display text-xl text-cyan-100 transition-all duration-700 ease-out md:text-2xl ${
                isRoleVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
              aria-live="polite"
            >
              {currentRole}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/Bisesh-Maharjan-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-white/15 hover:text-cyan-100"
            >
              Download CV
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xs">
                →
              </span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-500/8 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300/22"
            >
              Book a Call
            </Link>
          </div>

          <ul className="flex flex-wrap gap-3" aria-label="Social links">
            {profile.socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-zinc-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  aria-label={`${social.label} ${social.handle}`}
                >
                  <SocialIcon icon={social.icon} />
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-6 md:gap-10">
            {profile.stats?.map((stat) => (
              <li key={stat.label} className="space-y-1">
                <p className="text-3xl font-bold text-cyan-300 md:text-4xl">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex h-[620px] items-end justify-center md:h-[740px]">
          <img
            src={profileImage}
            alt={`${profile.name} portrait`}
            className="relative z-10 h-full w-auto max-w-full object-contain drop-shadow-[0_24px_64px_rgba(0,0,0,0.65)]"
            loading="eager"
          />
        </div>

        <div className="space-y-5 lg:pl-2">
          <p className="max-w-md text-base leading-relaxed text-zinc-300 md:text-lg">
            {profile.description}
          </p>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Current Focus</p>
            <p
              className={`mt-2 font-display text-3xl leading-tight text-zinc-100 transition-all duration-700 ease-out md:text-4xl ${
                isRoleVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              {currentRole}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
