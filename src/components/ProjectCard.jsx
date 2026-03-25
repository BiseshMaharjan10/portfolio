export default function ProjectCard({ project }) {
  const usesContainImage = project.imageFit === 'contain'

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 px-2 md:px-4">
      <div
        className={`relative overflow-hidden ${
          usesContainImage ? 'bg-zinc-100' : ''
        }`}
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className={`h-32 w-full transition-transform duration-500 md:h-64 ${
            usesContainImage
              ? 'object-contain p-2'
              : 'object-cover group-hover:scale-105'
          }`}
        />
        {project.status && (
          <span
            className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${
              project.status === 'Production'
                ? 'border border-emerald-300/50 bg-emerald-400/15 text-emerald-200'
                : 'border border-amber-300/50 bg-amber-400/15 text-amber-200'
            }`}
          >
            {project.status}
          </span>
        )}
      </div>

      <div className="space-y-3 p-2 md:space-y-4 md:p-3">
        <h3 className="font-display text-xl text-zinc-100 md:text-2xl">{project.title}</h3>
        <p className="text-sm leading-relaxed text-zinc-300">{project.description}</p>

        <ul className="flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/15 bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-200"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-cyan-300/40 bg-cyan-400/15 px-3 py-2 text-sm font-medium text-cyan-100 transition-colors duration-300 hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              Live Demo
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-zinc-100 transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
