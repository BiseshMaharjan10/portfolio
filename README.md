# Bisesh Maharjan Portfolio

Production-ready React + Tailwind portfolio website with modular, reusable components and a modern dark glassmorphism UI.

## Features

- Animated About section with looping role transitions
- Reusable, state-driven skill accordion with hover/focus tooltips
- Reusable project cards with interactive hover effects
- Accessible contact form with validation and submit feedback animation
- Smooth scrolling, soft fade-ins, and responsive layout
- Data-driven content for easy maintenance

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 3
- ESLint 9

## Folder Structure

```text
portfolio/
	src/
		components/
			AboutMe.jsx
			ContactForm.jsx
			ProjectCard.jsx
			SkillCategory.jsx
			SocialIcon.jsx
		data/
			portfolioData.js
		App.jsx
		index.css
		main.jsx
	tailwind.config.js
	postcss.config.js
	package.json
```

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Customization

- Update profile details, social links, skills, and projects in `src/data/portfolioData.js`.
- Replace project image URLs with your own hosted images.
- Update contact form integration in `src/components/ContactForm.jsx` to connect with your backend/email service.
