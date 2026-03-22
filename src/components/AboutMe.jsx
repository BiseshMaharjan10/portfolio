import { useEffect, useState } from 'react'
import SocialIcon from './SocialIcon'

export default function AboutMe({ profile }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [isRoleVisible, setIsRoleVisible] = useState(true)

  useEffect(() => {
    let swapTimer

    const interval = window.setInterval(() => {
      setIsRoleVisible(false)

      swapTimer = window.setTimeout(() => {
        setRoleIndex((current) => (current + 1) % profile.roles.length)
        setIsRoleVisible(true)
      }, 280)
    }, 2300)

    return () => {
      window.clearInterval(interval)
      if (swapTimer) {
        window.clearTimeout(swapTimer)
      }
    }
  }, [profile.roles.length])

  return (
    <section
      id="about"
      className="fade-in flex min-h-[calc(100svh-6.5rem)] flex-col justify-center space-y-8 md:space-y-10"
      aria-labelledby="about-title"
    >
      <div>
        <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          About Me
        </p>
        <h1
          id="about-title"
          className="font-display text-4xl font-bold tracking-tight text-zinc-100 md:text-6xl"
        >
          {profile.name}
        </h1>

        <div className="mt-5 h-10 overflow-hidden">
          <p
            className={`font-display text-xl text-cyan-100 transition-all duration-300 md:text-2xl ${
              isRoleVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-3 opacity-0'
            }`}
            aria-live="polite"
          >
            {profile.roles[roleIndex]}
          </p>
        </div>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
          {profile.description}
        </p>
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
    </section>
  )
}
