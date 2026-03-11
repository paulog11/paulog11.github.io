# The Right Word (Japanese)

Japanese language assistant — uses Claude API to suggest natural phrases for what the user wants to say in English.

## Tech Stack
- Plain HTML + embedded CSS + vanilla JavaScript (single file: `nihongo-assist.html`)
- Anthropic Claude API (model: claude-sonnet-4-20250514, direct browser calls)
- Google Fonts: Noto Serif JP, DM Mono, Sora

## How It Works
1. User enters their Claude API key (stored in localStorage)
2. Selects context: casual, polite, formal, or domain-specific (taxi, shopping, restaurant)
3. Types what they want to say in English
4. App calls Claude API with a system prompt requesting 3-6 JSON phrase suggestions
5. Each suggestion: Japanese text, hiragana reading, English translation, register (politeness level), optional tip
6. Results render with color-coded register tags (casual=green, polite=blue, formal=red)

## Key Features
- "Show to someone" button — large overlay displaying results clearly for native speakers to read
- Context buttons for quick register switching
- Direct browser-to-API calls (requires `anthropic-dangerous-direct-browser-access: true` header)

## No build step
Serve `nihongo-assist.html` directly. API key is never sent to any server besides Anthropic's API.
