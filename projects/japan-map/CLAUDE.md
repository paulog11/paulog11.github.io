# Japan History Map

Interactive map app with two views: (1) significant events in Japanese history as markers on a Leaflet map, and (2) Tokyo's train system with colored rail lines and clickable stations.

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`) + **Vite**
- **Leaflet** for the map (no vue-leaflet wrapper — raw Leaflet in a Vue component)
- No router, no state management library — simple prop/emit flow

## Project Structure

```
src/
  App.vue              — root layout: header, view toggle, filters, map
  main.js              — app entry point
  constants.js         — shared categoryColors, categoryLabels, operatorColors, operatorLabels, tileLayers
  style.css            — global styles + Leaflet CSS import
  components/
    MapView.vue        — Leaflet map, markers, popups, tile layer swapping (history view)
    MapLegend.vue      — color legend overlay for history view
    EraFilter.vue      — era toggle buttons (history view)
    TrainMapView.vue   — Leaflet map, polylines, circle markers (train view)
    TrainLegend.vue    — per-line color legend overlay for train view
    LineFilter.vue     — operator toggle buttons (train view)
  data/
    events.json        — historical event data (60 events, static JSON)
    cities.json        — Japan's 10 most populous cities with multi-paragraph historical summaries
    stations.json      — Tokyo train station data (static JSON)
    lines.json         — Tokyo rail line metadata + coordinates (static JSON)
```

## Key Conventions

- **View switching**: `activeView` ref in App.vue (`"history"` | `"trains"`). Uses `v-if` to swap between history and train views. No router.
- **History modes**: `historyMode` ref in App.vue (`"events"` | `"cities"`). Toggled by pill buttons in EraFilter. In `"events"` mode, 60 event markers + era filter are shown. In `"cities"` mode, 10 city markers are shown and era filter is hidden. City markers are purple circles; city popups show a scrollable multi-paragraph history.
- **City data** lives in `src/data/cities.json`. Each city has: `id`, `name`, `nameJa`, `lat`, `lng`, `historicalName` (nullable), `description` (array of paragraph strings, up to 7).
- **Event data** lives in `src/data/events.json`. Each event has: `id`, `name`, `year`, `era`, `period`, `category`, `description`, `lat`, `lng`, `contemporarySite` (nullable object with `name` and `query` for Google Maps link).
- **Categories**: `battle`, `political`, `cultural`, `disaster` — colors defined in `constants.js`.
- **Eras**: `ancient` (pre-710), `classical` (710–1185), `medieval` (1185–1615), `edo` (1603–1868), `modern` (1868–1945), `postwar` (1945–present) — used by the era filter. The filter value `"all"` shows everything. 60 events total (10 per era).
- **Train data**: `stations.json` has `id`, `name`, `nameJa`, `lat`, `lng`, `operator`, `lines[]`. `lines.json` has `id`, `name`, `nameJa`, `operator`, `color`, `coordinates[]`. Lines: Yamanote, Chuo Rapid, Chuo-Sobu Local, Ginza, Marunouchi, Oedo, Keio, Keio Inokashira (~120 stations).
- **Operators**: `jr`, `metro`, `toei`, `private` — colors defined in `constants.js`. Filtered by `activeOperator` in LineFilter. TrainLegend shows individual line names + colors (not operator categories).
- **Map language toggle**: swaps tile layer between OSM Japan (Japanese labels) and CartoDB Positron (English/romanized labels, gray roads). Controlled via `mapLang` prop (`"ja"` | `"en"`). Shared across both views.
- **Muted tile styling**: CSS filter `saturate(0.4) brightness(1.05)` on `.leaflet-layer img` in `style.css` mutes road colors so markers and train lines stand out.
- Popup HTML is built as raw strings in `buildPopup()`/`buildStationPopup()` — Leaflet renders outside Vue's virtual DOM.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
