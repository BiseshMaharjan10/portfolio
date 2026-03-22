import { useMemo, useState } from 'react'

const nodeLayout = [
  { top: '12%', left: '50%' },
  { top: '30%', left: '76%' },
  { top: '68%', left: '76%' },
  { top: '86%', left: '50%' },
  { top: '68%', left: '24%' },
  { top: '30%', left: '24%' },
]

export default function SkillsTree({ categories }) {
  const frontendIndex = categories.findIndex((category) => category.title === 'Frontend')
  const defaultIndex = frontendIndex === -1 ? 0 : frontendIndex
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const activeCategory = categories[activeIndex]

  const activeNodePosition = useMemo(() => {
    return nodeLayout[activeIndex % nodeLayout.length]
  }, [activeIndex])

  return (
    <section
      id="skills"
      className="fade-in scroll-mt-24 space-y-4 rounded-3xl border border-white/10 bg-transparent p-6 md:p-8"
      aria-labelledby="skills-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="skills-title" className="font-display text-3xl text-zinc-100 md:text-4xl">
          Skills 
        </h2>
        <p className="text-sm uppercase tracking-[0.15em] text-zinc-400">
          Click a category node to expand branch
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Left: Tree Graph */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-300/25 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.20),rgba(3,7,18,0.95)_55%)] p-4 md:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_96%,rgba(34,211,238,0.08)_100%)] bg-[length:100%_7px] opacity-30" />

          <div className="relative mx-auto aspect-square w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-950/35 p-3">
            <svg
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="17" fill="rgba(34,211,238,0.09)" />
              {nodeLayout.map((position, index) => {
                const x = Number.parseFloat(position.left)
                const y = Number.parseFloat(position.top)
                const isActive = index === activeIndex

                return (
                  <line
                    key={`${position.left}-${position.top}`}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke={isActive ? 'rgba(34,211,238,0.85)' : 'rgba(148,163,184,0.25)'}
                    strokeWidth={isActive ? '0.8' : '0.45'}
                  />
                )
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/55 bg-cyan-500/20 shadow-[0_0_34px_rgba(34,211,238,0.45)]">
              <div className="text-center">
                <p className="font-display text-lg font-semibold text-zinc-50">Bisesh</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-100">Stack</p>
              </div>
            </div>

            {categories.map((category, index) => {
              const position = nodeLayout[index % nodeLayout.length]
              const isActive = index === activeIndex

              return (
                <button
                  key={category.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2 py-1.5 text-center text-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    isActive
                      ? 'border-cyan-300/75 bg-cyan-400/25 text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.45)]'
                      : 'border-slate-300/30 bg-slate-800/45 text-zinc-200 hover:border-cyan-300/50 hover:text-cyan-100'
                  }`}
                  style={{ top: position.top, left: position.left }}
                  aria-pressed={isActive}
                  aria-label={`Show ${category.title} skills`}
                >
                  <span className="block font-display text-[10px] uppercase tracking-[0.14em] md:text-xs">
                    {category.title}
                  </span>
                </button>
              )
            })}

            <div
              className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]"
              style={{ top: activeNodePosition.top, left: activeNodePosition.left }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right: Expanded Branch */}
        <div className="rounded-2xl border border-cyan-300/30 bg-zinc-950/55 p-4 md:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-xl text-cyan-100">
              {activeCategory.title}
            </h3>
            <span className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              {activeCategory.items.length} skills
            </span>
          </div>

          <ul className="space-y-2.5" role="tree" aria-label={`${activeCategory.title} skills`}>
            {activeCategory.items.map((skill) => (
              <li
                key={skill.name}
                role="treeitem"
                className="group relative rounded-lg border border-cyan-300/20 bg-cyan-500/5 px-3 py-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-cyan-100">{skill.name}</p>
                    <p className="text-xs text-zinc-400">{skill.tip}</p>
                  </div>
                  {skill.level && (
                    <span className="ml-2 text-xs text-cyan-200">{skill.level}%</span>
                  )}
                </div>
                {skill.level && (
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full border border-cyan-300/20 bg-zinc-900/50">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                      aria-valuenow={skill.level}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      role="progressbar"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
