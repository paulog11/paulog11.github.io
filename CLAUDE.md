# Paulo's GitHub Pages Site

Personal website hosted at GitHub Pages. Vue 3 landing page at root links to subprojects under `projects/`.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 6, Tailwind CSS 3
- Fonts: Shippori Mincho (display), DM Sans (body), DM Mono (mono)
- Base path: `./` (relative) for GitHub Pages compatibility

## Key Files
- `App.vue` — main landing page, contains `apps` array defining all card entries
- `components/AppCard.vue` — reusable card component (icon, title, tags, coming-soon state)
- `main.js` / `style.css` — Vue entry point and global Tailwind styles
- `vite.config.js` — Vite config with `base: './'`
- `tailwind.config.js` — custom theme (ink/parchment/warm/muted/accent colors, fade-up animation)

## Commands
- `npm run dev` — local dev server
- `npm run deploy` — build + copy dist output to root for GitHub Pages

## Deploy Workflow
`npm run deploy` does: `vite build` → clean old hashed assets → copy `dist/assets/*` to `assets/` → copy `dist/index.html` to root. Built assets are committed to git (no CI build step). Always use relative paths.

## Adding a New App Card
Add an entry to the `apps` array in `App.vue`:
```js
{ id: 'my-app', title: 'My App', subtitle: 'Description', description: '...', tags: ['Tag'], icon: 'emoji', url: './projects/my-app/dist/index.html', comingSoon: false }
```
Card URLs should point to `./projects/<name>/dist/index.html` (relative paths for GitHub Pages).

## Subprojects
- `projects/algo-lab/` — algorithm simulation lab ([CLAUDE.md](projects/algo-lab/CLAUDE.md))
- `projects/ported-games/flip7/` — Flip 7 card game ([CLAUDE.md](projects/ported-games/flip7/CLAUDE.md))
- `projects/profile/` — static portfolio page ([CLAUDE.md](projects/profile/CLAUDE.md))
- `projects/right-word/` — Japanese language assistant ([CLAUDE.md](projects/right-word/CLAUDE.md))
