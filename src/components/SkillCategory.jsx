export default function SkillCategory({ category, isOpen, onToggle }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-colors duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <span className="font-display text-lg text-zinc-100">{category.title}</span>
          <span
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-zinc-100 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>
      </h3>

      <div
        className={`grid transition-all duration-500 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden px-5 pb-5">
          <ul className="flex flex-wrap gap-2 pt-2" role="list">
            {category.items.map((skill) => (
              <li key={skill.name} className="group relative">
                <span
                  tabIndex={0}
                  className="inline-flex cursor-help rounded-full border border-white/15 bg-zinc-900/70 px-3 py-1.5 text-sm text-zinc-200 transition-colors duration-300 hover:border-cyan-300/40 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {skill.name}
                </span>
                <span className="pointer-events-none absolute -top-11 left-1/2 z-20 w-max max-w-[220px] -translate-x-1/2 rounded-md border border-cyan-300/40 bg-zinc-950/95 px-2 py-1 text-xs text-cyan-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                  {skill.tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
