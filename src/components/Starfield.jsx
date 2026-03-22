import { useMemo } from 'react'

function createRng(seed) {
  let state = seed

  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

function buildStars({ count, seed, minSize, maxSize, minDuration, maxDuration }) {
  const random = createRng(seed)

  return Array.from({ length: count }, (_, index) => {
    const size = minSize + random() * (maxSize - minSize)
    const left = random() * 100
    const top = random() * 100
    const opacity = 0.25 + random() * 0.75
    const duration = minDuration + random() * (maxDuration - minDuration)
    const delay = random() * -maxDuration

    return {
      id: `${seed}-${index}`,
      size,
      left,
      top,
      opacity,
      duration,
      delay,
    }
  })
}

export default function Starfield() {
  const nearStars = useMemo(() => {
    return buildStars({
      count: 95,
      seed: 42,
      minSize: 1.6,
      maxSize: 3.8,
      minDuration: 24,
      maxDuration: 46,
    })
  }, [])

  const farStars = useMemo(() => {
    return buildStars({
      count: 80,
      seed: 420,
      minSize: 1.2,
      maxSize: 2.5,
      minDuration: 34,
      maxDuration: 70,
    })
  }, [])

  return (
    <div className="starfield pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="star-dust absolute inset-0" />

      {farStars.map((star) => (
        <span
          key={star.id}
          className="star star-far"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s, ${Math.max(2.4, star.duration * 0.15)}s`,
            animationDelay: `${star.delay}s, ${star.delay * 0.3}s`,
          }}
        />
      ))}

      {nearStars.map((star) => (
        <span
          key={star.id}
          className="star star-near"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s, ${Math.max(2, star.duration * 0.11)}s`,
            animationDelay: `${star.delay}s, ${star.delay * 0.25}s`,
          }}
        />
      ))}
    </div>
  )
}
