# Paulo's GitHub Pages Site

Personal website hosted at GitHub Pages. Vue 3 landing page at root links to subprojects under `projects/`.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 6, Tailwind CSS 3
- Fonts: Shippori Mincho (display), DM Sans (body), DM Mono (project metadata)
- Base path: `./` (relative) for GitHub Pages compatibility

## Key Files
- `App.vue` — owns the `apps` array (single source of truth for every project) and renders `ProjectList`
- `components/ProjectList.vue` — the landing page: profile/résumé links plus one card per project
- `main.js` / `style.css` — Vue entry point and global Tailwind styles
- `index.source.html` — permanent Vite entry template (references `./main.js`); never overwritten by deploy
- `index.html` — at rest this is the built output for GitHub Pages; `predev`/`prebuild` hooks restore it from `index.source.html` before Vite runs
- `vite.config.js` — Vite config with `base: './'`
- `tailwind.config.js` — night palette (night/asphalt/lantern/kabuki/neon/paper)
- `lattice/` — separate throwaway isometric Shinjuku sandbox (own `package.json`, not deployed). See `lattice/NEXT.md`
- `reference/` and the root `*.png`/`*.jpg` — Shinjuku reference imagery for `lattice/`

The old three.js Shinjuku landing page (`scene/`, `spike/`, `test/`, `components/ShinjukuScene.vue`) was deleted; it lives in git history before the commit that removed it.

## Commands
- `npm run dev` — local dev server
- `npm run deploy` — build + copy dist output to root for GitHub Pages

## Deploy Workflow
`npm run deploy` does: restore `index.source.html` → `vite build` → clean old hashed assets → copy `dist/assets/*` to `assets/` → copy `dist/index.html` to root. Built assets are committed to git (no CI build step). Always use relative paths.

**Important:** `index.source.html` is the canonical Vite entry. The `predev`/`prebuild`/`deploy` scripts all restore `index.html` from it before Vite runs. Do NOT manually edit `index.html` — edit `index.source.html` instead. Running `npx vite build` directly skips that hook and builds the stale deployed `index.html`.

## Adding a New Project
Append to the `apps` array in `App.vue`:
```js
{
  id: 'my-app', indexNumber: 10, title: 'My App',
  tagline: 'short line under the title',
  description: 'Longer sentence for the list and SEO.',
  category: 'games',            // language | games | maps | simulations | reading
  year: '2026',
  tools: ['vue', 'vite'],
  status: 'live',               // live | WIP | coming-soon
  url: './projects/my-app/dist/index.html',
  github: '',
}
```
URLs are relative (`./projects/<name>/dist/index.html`) for GitHub Pages.

## Subprojects
- `projects/algo-lab/` — algorithm simulation lab ([CLAUDE.md](projects/algo-lab/CLAUDE.md))
- `projects/beleriand-realms/` — 2-player asymmetrical deckbuilder (Tolkien First Age) ([CLAUDE.md](projects/beleriand-realms/CLAUDE.md))
- `projects/ported-games/flip7/` — Flip 7 card game ([CLAUDE.md](projects/ported-games/flip7/CLAUDE.md))
- `projects/profile/` — static portfolio page ([CLAUDE.md](projects/profile/CLAUDE.md))
- `projects/right-word/` — Japanese language assistant ([CLAUDE.md](projects/right-word/CLAUDE.md))
- `projects/venue-search/` — Tokyo venue search ([CLAUDE.md](projects/venue-search/CLAUDE.md))
