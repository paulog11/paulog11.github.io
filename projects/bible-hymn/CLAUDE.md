# Hymn Learning Kids App

## Overview
A single-page kids' hymn learning app for "Before the Throne of God Above." Built with Vue 3 (CDN), no build system. Just open `hymn-app.html` in a browser.

## Architecture
- **`hymn-app.html`** — The entire app: HTML + CSS + Vue 3 JS in one file
- **`hymn.mp3`** — Vocal recording of the hymn (~154.5s)
- **`images/`** — SVG placeholder icons (26 files) for vocabulary illustrations. These are simple colored circle placeholders meant to be replaced with real artwork later.

## Key Features

### Learn Tab (Karaoke)
- Word-level highlighting synced to audio via `requestAnimationFrame` loop (~60fps)
- `ALL_TIMINGS` array built from per-section `wordTimes` — binary search finds the active word
- Tappable underlined words open a popup with an image and kid-friendly definition
- Section progress dots at the bottom

### Lyrics Tab
- Static display of all sections with the same tappable word popups

### Review Tab (Quiz)
- Fill-in-the-blank multiple choice questions from `QUESTIONS` array
- Web Speech API (`SpeechSynthesis`) reads questions aloud for pre-readers
- Auto-speaks on tab entry and after each "Next"; "Read Again" button to replay
- Score tracking with stars and encouraging feedback

## Data Structures
- **`IMG` dict** — Maps word strings to `{image, desc}`. Image values are SVG file paths in `images/`.
- **`w()` function** — Creates word objects by looking up the IMG dict. Strips punctuation for matching.
- **`SECTIONS`** — Array of `{label, words[], wordTimes[]}`. Words built via `w()`, times are seconds into the audio.
- **`ALL_TIMINGS`** — Flat sorted array built from SECTIONS, used by binary search for karaoke sync.
- **`QUESTIONS`** — Quiz data with `{before, after, answer, options[], hint}`.

## Audio Timing
- Intro: 0–8.3s (no words)
- Verse 1: 8.3–43.5s
- Gap: 43.5–44.5s
- Chorus: 44.5–88s
- Gap: 88–98.5s
- Verse 2: 98.5–142.4s
- Last word capped at 1.5s duration

## Speech Synthesis
Uses browser-native `SpeechSynthesis` API with rate=0.85, pitch=1.1 for kid-friendly voice. Quality varies by device (good on Mac/iOS, variable on Android).
