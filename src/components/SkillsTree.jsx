import { useEffect, useMemo, useRef, useState } from 'react'

const categoryPalette = {
  Languages: [96, 165, 250],
  Frontend: [167, 139, 250],
  Backend: [52, 211, 153],
  Databases: [45, 212, 191],
  Tools: [251, 191, 36],
  Concepts: [244, 114, 182],
}

const fallbackColor = [148, 163, 184]

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function toHex([r, g, b]) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

function normalizeCategory(title) {
  return (title || 'General').trim()
}

export default function SkillsTree({ categories = [] }) {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const ballsRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const hovRef = useRef(null)
  const rafRef = useRef(null)

  const [hovered, setHovered] = useState(null)

  const skillNodes = useMemo(() => {
    const flattened = []

    categories.forEach((category) => {
      const title = normalizeCategory(category.title)
      const color = categoryPalette[title] || fallbackColor

      category.items.forEach((item) => {
        const level = item.level || 70
        flattened.push({
          name: item.name.toUpperCase(),
          cat: title,
          tip: item.tip,
          level,
          color,
          size: clamp(Math.round(22 + level * 0.36), 32, 58),
        })
      })
    })

    return flattened
  }, [categories])

  const legend = useMemo(() => {
    return categories.map((category) => {
      const title = normalizeCategory(category.title)
      return {
        label: title,
        color: toHex(categoryPalette[title] || fallbackColor),
      }
    })
  }, [categories])

  const hoveredColor = hovered ? toHex(hovered.color) : '#ffffff'

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas || !skillNodes.length) {
      return undefined
    }

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0

    const spawnBalls = (w, h) => {
      const count = skillNodes.length
      const cols = w < 640 ? 3 : w < 900 ? 4 : Math.max(4, Math.ceil(Math.sqrt(count * 1.2)))
      const rows = Math.max(2, Math.ceil(count / cols))
      const sizeScale = w < 640 ? 0.72 : w < 900 ? 0.86 : 1

      ballsRef.current = skillNodes.map((node, index) => {
        const col = index % cols
        const row = Math.floor(index / cols)
        const zoneWidth = w / cols
        const zoneHeight = (h * 0.72) / rows

        return {
          ...node,
          x: zoneWidth * col + zoneWidth / 2 + (Math.random() - 0.5) * zoneWidth * 0.4,
          y: zoneHeight * row + h * 0.08 + zoneHeight / 2 + (Math.random() - 0.5) * zoneHeight * 0.34,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          phase: Math.random() * Math.PI * 2,
          alpha: 0,
          size: clamp(Math.round(node.size * sizeScale), 24, 58),
        }
      })
    }

    const resize = () => {
      const rect = stage.getBoundingClientRect()
      width = rect.width
      height = rect.height

      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      spawnBalls(width, height)
    }

    const drawBall = (ball, isHovered) => {
      const [r, g, b] = ball.color
      const radius = ball.size * (isHovered ? 1.16 : 1)

      ctx.globalAlpha = ball.alpha * (isHovered ? 1 : 0.8)

      const aura = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, radius * 2.2)
      aura.addColorStop(0, `rgba(${r},${g},${b},${isHovered ? 0.24 : 0.09})`)
      aura.addColorStop(1, `rgba(${r},${g},${b},0)`)

      ctx.beginPath()
      ctx.arc(ball.x, ball.y, radius * 2.2, 0, Math.PI * 2)
      ctx.fillStyle = aura
      ctx.fill()

      ctx.beginPath()
      ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r},${g},${b},${isHovered ? 0.22 : 0.12})`
      ctx.fill()

      ctx.beginPath()
      ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${r},${g},${b},${isHovered ? 0.92 : 0.45})`
      ctx.lineWidth = isHovered ? 1.6 : 0.85
      ctx.stroke()

      if (isHovered) {
        const pulseRadius = radius + 7 + Math.sin(ball.phase) * 2.5
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, pulseRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r},${g},${b},0.26)`
        ctx.lineWidth = 0.7
        ctx.stroke()
      }

      const fontSize = ball.size > 50 ? 13 : 11
      ctx.font = `${isHovered ? 600 : 500} ${fontSize}px "Space Grotesk", sans-serif`
      ctx.fillStyle = isHovered
        ? `rgb(${r},${g},${b})`
        : `rgba(${r},${g},${b},0.9)`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(ball.name, ball.x, ball.y)

      ctx.globalAlpha = 1
    }

    const repel = (ball) => {
      const dx = ball.x - mouseRef.current.x
      const dy = ball.y - mouseRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 92 && distance > 0) {
        const force = ((92 - distance) / 92) * 1.9
        ball.vx += (dx / distance) * force
        ball.vy += (dy / distance) * force
      }
    }

    const attract = (ball) => {
      const dx = ball.x - mouseRef.current.x
      const dy = ball.y - mouseRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 95 && distance < 210) {
        const force = ((210 - distance) / 210) * 0.085
        ball.vx -= (dx / distance) * force
        ball.vy -= (dy / distance) * force
      }
    }

    const collide = (a, b) => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const minDistance = a.size + b.size + 12

      if (distance < minDistance && distance > 0) {
        const nx = dx / distance
        const ny = dy / distance
        const overlap = (minDistance - distance) * 0.28

        a.x += nx * overlap
        a.y += ny * overlap
        b.x -= nx * overlap
        b.y -= ny * overlap

        const relative = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny
        if (relative < 0) {
          a.vx -= relative * nx * 0.52
          a.vy -= relative * ny * 0.52
          b.vx += relative * nx * 0.52
          b.vy += relative * ny * 0.52
        }
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = 'rgba(0,0,0,0.012)'
      for (let y = 0; y < height; y += 3) {
        ctx.fillRect(0, y, width, 1)
      }

      const balls = ballsRef.current
      let nextHovered = null

      balls.forEach((ball) => {
        ball.alpha = Math.min(1, ball.alpha + 0.015)
        ball.phase += 0.022
        ball.vx *= 0.972
        ball.vy *= 0.972
        ball.vx += (Math.random() - 0.5) * 0.018
        ball.vy += (Math.random() - 0.5) * 0.018

        repel(ball)
        attract(ball)

        ball.x += ball.vx
        ball.y += ball.vy

        const pad = ball.size + 2
        if (ball.x < pad) {
          ball.x = pad
          ball.vx = Math.abs(ball.vx) * 0.6
        }
        if (ball.x > width - pad) {
          ball.x = width - pad
          ball.vx = -Math.abs(ball.vx) * 0.6
        }
        if (ball.y < pad) {
          ball.y = pad
          ball.vy = Math.abs(ball.vy) * 0.6
        }
        if (ball.y > height - pad - 70) {
          ball.y = height - pad - 70
          ball.vy = -Math.abs(ball.vy) * 0.6
        }

        const mdx = ball.x - mouseRef.current.x
        const mdy = ball.y - mouseRef.current.y
        if (Math.sqrt(mdx * mdx + mdy * mdy) < ball.size + 12) {
          nextHovered = ball
        }
      })

      for (let pass = 0; pass < 3; pass += 1) {
        for (let i = 0; i < balls.length; i += 1) {
          for (let j = i + 1; j < balls.length; j += 1) {
            collide(balls[i], balls[j])
          }
        }
      }

      balls.forEach((ball) => {
        if (ball !== nextHovered) {
          drawBall(ball, false)
        }
      })
      if (nextHovered) {
        drawBall(nextHovered, true)
      }

      if (nextHovered !== hovRef.current) {
        hovRef.current = nextHovered
        setHovered(nextHovered ? { ...nextHovered } : null)
      }

      rafRef.current = window.requestAnimationFrame(loop)
    }

    resize()
    loop()

    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(rafRef.current)
      resize()
      loop()
    })

    observer.observe(stage)

    return () => {
      window.cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [skillNodes])

  const onMouseMove = (event) => {
    const rect = stageRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    mouseRef.current = { x, y }
  }

  const onMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 }
    setHovered(null)
    hovRef.current = null
  }

  const onClick = () => {
    ballsRef.current.forEach((ball) => {
      ball.vx += (Math.random() - 0.5) * 5
      ball.vy += (Math.random() - 0.5) * 5
    })
  }

  if (!skillNodes.length) {
    return null
  }

  return (
    <section
      id='skills'
      className='fade-in scroll-mt-24 space-y-4'
      aria-labelledby='skills-title'
    >
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h2 id='skills-title' className='font-display text-3xl text-zinc-100 md:text-4xl'>
          Skills
        </h2>
        <p className='text-sm uppercase tracking-[0.15em] text-zinc-400'>
          Move to explore and click to scatter
        </p>
      </div>

      <div className='w-full rounded-3xl border border-cyan-300/25 bg-[radial-gradient(circle_at_50%_18%,rgba(34,211,238,0.17),rgba(2,6,23,0.94)_58%)] p-3 md:p-5'>
        <div
          ref={stageRef}
          className='relative h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 md:h-[560px]'
          style={{ background: '#0b0c14', cursor: 'default' }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          <canvas ref={canvasRef} className='absolute inset-0' />

          <div
            className='pointer-events-none absolute bottom-6 left-1/2 max-w-[92%] -translate-x-1/2 overflow-hidden text-ellipsis text-center select-none whitespace-nowrap transition-all duration-300'
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: hovered ? 'clamp(28px,10vw,54px)' : 'clamp(22px,8vw,44px)',
              color: hovered ? hoveredColor : 'rgba(255,255,255,0.06)',
              letterSpacing: '0.08em',
            }}
          >
            {hovered ? hovered.name : 'HOVER'}
          </div>

        </div>
      </div>

      <div className='flex flex-wrap gap-5'>
        {legend.map((item) => (
          <div key={item.label} className='flex items-center gap-2'>
            <div className='h-2 w-2 flex-shrink-0 rounded-full' style={{ background: item.color }} />
            <span className='text-[11px] tracking-wide text-white/35'>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
