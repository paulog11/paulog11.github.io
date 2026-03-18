# Venue Search — Tokyo Event Spaces

Search and filter rentable event spaces in Tokyo from curated venue data.

## Tech Stack
- Vue 3 (Composition API, `<script setup>`), Vite 6, Tailwind CSS 3
- Fonts: Shippori Mincho (display), Noto Sans JP + DM Sans (body), DM Mono (mono)
- Base path: `./` (relative) for GitHub Pages compatibility

## Key Files
- `src/App.vue` — Shell with header, search form, filters, results grid
- `src/components/SearchForm.vue` — Search inputs (area, guests, date, event type)
- `src/components/VenueCard.vue` — Individual venue result card with link-out
- `src/components/VenueList.vue` — Results grid with loading/empty states
- `src/components/FilterBar.vue` — Sort, budget, and amenity filters
- `src/composables/useVenueSearch.js` — Core search state and logic
- `src/composables/useFilters.js` — Post-search filtering and sorting
- `src/services/venue-data.js` — Static data loader and search function
- `src/data/tokyo-venues.json` — Curated venue dataset

## Commands
- `npm run dev` — local dev server
- `npm run build` — build to dist/

## Data Schema
Each venue in `tokyo-venues.json`:
```json
{
  "id": "venue-001",
  "name": "English Name",
  "nameJa": "日本語名",
  "area": "Shibuya",
  "areaJa": "渋谷",
  "capacity": { "min": 10, "max": 80 },
  "priceRange": { "hourly": 15000, "currency": "JPY" },
  "types": ["party", "workshop", "corporate"],
  "amenities": ["kitchen", "projector", "wifi"],
  "sourceUrl": "https://...",
  "description": "Brief description"
}
```

## Adding Venues
Add entries to `src/data/tokyo-venues.json`. Areas, event types, and amenities are auto-derived from the data.
