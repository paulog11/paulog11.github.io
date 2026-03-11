# Profile / Portfolio Page

Static portfolio and resume page. Self-contained single HTML file, no build step.

## Tech Stack
- Plain HTML + embedded CSS + vanilla JavaScript
- Google Fonts: DM Serif Display, DM Mono, DM Sans
- Color scheme: warm beige (#F7F5F0 bg), dark ink, blue accent (#2B6CB0)

## Structure (single file: `index.html`)
- Hero section with CTA buttons
- About section with skills grid (C#/.NET, JavaScript, Vue, Node.js, PHP, SQL, AWS, Docker, PostgreSQL, Redis, GitHub Actions)
- Work history timeline (3 positions)
- Projects grid (placeholder entries)
- Contact section with form + email/GitHub/LinkedIn links
- Footer

## Features
- Fixed navigation with scroll spy and backdrop blur
- Intersection Observer for scroll-reveal animations
- Responsive grids (2-col desktop, 1-col mobile)

## No build step
Just serve `index.html` directly. Linked from the root landing page as "Portfolio & Profile".
