import futsalImage from '../assets/futsal.jpeg'
import strideLogoImage from '../assets/logo.png'
import verduraImage from '../assets/ver.jpg'

export const profile = {
  name: 'Bisesh Maharjan',
  roles: [
    'Fullstack Developer',
    'Backend Developer',
    'Frontend Developer',
    'API Architecture',
  ],
  description:
    'I build resilient fullstack products with a focus on maintainable backend systems, thoughtful UI, and secure API design.',
  stats: [
    { label: 'freelancing', value: '3+' },
    { label: 'projects', value: '12+' },
    { label: 'technologies', value: '20+' },
  ],
  available: true,
  availability: 'Remote, Full-time & Freelance',
  socialLinks: [
    {
      label: 'GitHub',
      href: 'https://github.com/',
      handle: '@bisesh',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/',
      handle: '/in/bisesh',
      icon: 'linkedin',
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/',
      handle: '@bisesh.dev',
      icon: 'instagram',
    },
  ],
}

export const skills = [
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript', tip: 'Dynamic language for modern web apps.', level: 88 },
      { name: 'Python', tip: 'Great for APIs, automation, and scripting.', level: 75 },
      { name: 'SQL', tip: 'Used for querying and modeling relational data.', level: 82 },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React.js', tip: 'Component-driven UI with reusable stateful logic.', level: 92 },
      { name: 'Next.js', tip: 'React framework for hybrid rendering and routing.', level: 85 },
      { name: 'HTML5', tip: 'Semantic structure for accessible interfaces.', level: 90 },
      { name: 'CSS3', tip: 'Layout, animation, and responsive styling.', level: 88 },
      { name: 'Tailwind CSS', tip: 'Utility-first styling for rapid UI iteration.', level: 90 },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', tip: 'JavaScript runtime for scalable backend services.', level: 88 },
      { name: 'Express.js', tip: 'Minimal framework for APIs and server logic.', level: 85 },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'PostgreSQL', tip: 'Reliable relational database with strong SQL features.', level: 80 },
      { name: 'MongoDB', tip: 'Flexible document database for evolving schemas.', level: 78 },
      { name: 'MySQL', tip: 'Popular relational database for web backends.', level: 82 },
      { name: 'Firebase', tip: 'Managed backend services for auth and realtime data.', level: 75 },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'VS Code', tip: 'Primary editor with extensions for productivity.', level: 95 },
      { name: 'Postman', tip: 'API testing, documentation, and environment setup.', level: 88 },
      { name: 'Git', tip: 'Version control for collaborative development workflows.', level: 92 },
    ],
  },
  {
    title: 'Concepts',
    items: [
      { name: 'REST API Design', tip: 'Resource-oriented APIs with predictable contracts.', level: 90 },
      { name: 'Agile Development', tip: 'Iterative delivery with rapid feedback loops.', level: 85 },
      { name: 'MVC Architecture', tip: 'Separation of concerns for maintainable systems.', level: 87 },
      { name: 'JWT Auth', tip: 'Token-based auth for stateless API sessions.', level: 85 },
    ],
  },
]

export const projects = [
  {
    title: 'Goalpost Fullstack',
    description:
      'Goalpost is a fullstack football platform that turns match organization into a smooth digital workflow. With structured team management, fixture coordination, and real-time progress tracking, it helps players and organizers run every game cycle from planning to results in one place.',
    image: futsalImage,
    stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://example.com/live-1',
    sourceUrl: 'https://github.com/BiseshMaharjan10/Goalpost-Fullstack',
    status: 'Production',
  },
  {
    title: 'CodeYatra 2.0 - Async Avengers Stride',
    description:
      'Stride is an AI-powered productivity ecosystem that transforms career-building into a manageable daily routine. By combining psychometric discovery with dynamic, Trello-style roadmaps, Stride helps students navigate their future through progress forecasting and integrated burnout checks.',
    image: strideLogoImage,
    imageFit: 'contain',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://example.com/live-2',
    sourceUrl: 'https://github.com/beebek1/codeyatra2.0_AsyncAvengers_Stride',
    status: 'Production',
  },
  {
    title: 'Verdura',
    description:
      'Verdura is a sustainability-focused web platform designed to make eco-conscious action practical and collaborative. It combines awareness, guided engagement, and shared contribution features to help users build greener habits through clear, community-driven experiences.',
    image: verduraImage,
    stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://example.com/live-3',
    sourceUrl: 'https://github.com/beebek1/verdura',
    status: 'WIP',
  },
]
