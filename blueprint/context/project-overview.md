# Unit Zero - Project Overview

<!-- blueprint:source-hash d599b88166d5d4769635a082a7d04bda50a4cd38b4764124287cbc46983b4e70 -->

> A 1-bit Ndola adventure where teaching Zero real AI is how you finish the game.

## Problem

AI is often taught as formulas without problems that force use. Unit Zero is a browser adventure: the player wakes Zero, a robot that knows nothing, and rebuilds its mind chapter by chapter in Ndola and the Copperbelt. Finishing should mean the player can explain, calculate, apply, and critique every core concept. Principle: the adventure is how you learn; mastery is the goal.

## Users

- **AI / CS students** - exam prep with theory and calculation on realistic scenarios
- **Curious beginners** - no AI background; same game via layered learning (experience → understanding → mastery → optional workshop). Main story requires mastery
- **First players** - Jacob and a few ZUT students in Ndola; many on low-cost Android phones

## Usage model

- Single-player in the browser; no accounts; no data leaves the device
- Trusted players; early scale is Jacob plus a small playtest group
- MVP non-requirements: auth, multi-user, cloud sync, analytics, admin tools
- Risk: clearing browser data deletes saves; export/import comes later

## Features

Foundation first (current build plan). Chapter content and learning activities land after chapter specs exist in `docs/chapters/`. Full design: `docs/01_GAME_DESIGN_PLAN.md`.

1. **Save system** (done) - versioned `PlayerSave` behind `SaveStore`; localStorage first; safe null fallback on missing/corrupt data; `save` returns boolean
2. **Layout and navigation** - title → scene view; 1-bit CSS base and fonts; phone and desktop widths
3. **Scene with hotspots** - background image plus clickable, keyboard-reachable hotspots from config
4. **Dialogue** - scripted lines by speaker, simple branching, end events; logic separate from the UI component
5. **Progression model** - chapter and Ore/Smelt/Refine states, unlock order, mastery chips, upgrades; persisted via save; derives rank from chapter progress

Later (project plan, not yet in build plan): Chapter 1 opening + rest of Ch 1, reusable activities, voice logs, Ch 2–19, generators, Morning Shift, workshops, offline, sound.

## Data model

Game content (chapters, dialogue, activities, answers) is TypeScript in the repo, not runtime storage. Only player progress is persisted, through `src/game/save/` → `SaveStore` (localStorage first). Nothing else touches storage.

### PlayerSave

Shipped schemaVersion `1` (`CURRENT_SCHEMA_VERSION`). Deep-validated on load; one bad entry rejects the whole save. Invalid/corrupt payloads return `null` and leave the storage key unchanged.

- `schemaVersion` (number) - must equal `1` on load
- `upgrades` (string[]) - upgrade ids owned
- `chapterStates` (Record<chapterId, ChapterState>)
- `conceptChips` (Record<conceptId, ChipState>)
- `locations` (Record<locationId, LocationState>)
- `notebookClueIds` (string[])
- `storyFlags` (Record<string, boolean | string>)
- `choiceFlags` (Record<string, string>) - story-affecting decisions
- `unlockedVoiceLogIds` (string[])

Not on the save: `rank` (derived from chapter bands in feature 5; design plan §3) and `settings` (deferred; not locked into v1).

> Feature 5 owns progression fields and may change v1 directly until the first playtest creates real player saves. Add migrations only after that.

### ChapterState

- `status` (locked | available | in_progress | completed)
- `challenges` - `{ ore, smelt, refine }: ChallengeStatus` where ChallengeStatus is locked | available | passed

### ChipState

- `level` (dark | outline | half_lit | lit | refined) - brain-map mastery chip

### LocationState

- `unlocked` (boolean)
- `mapMarkerVisible` (boolean)

### SaveStore (interface)

- `load(): PlayerSave | null`
- `save(data: PlayerSave): boolean` - `true` on success, `false` if Storage threw; never throws
- `clear(): void`
- First impl: localStorage key `unit-zero.player-save`; storage accessed lazily inside try blocks. No other code touches storage.

## Tech stack

- **Vite + React + TypeScript (strict), pnpm** - static SPA
- **Plain CSS** - 1-bit look and simple animation
- **HTML hotspots on background images** - scenes; no canvas at start
- **KaTeX** - formulas when first needed
- **Vitest** - unit tests for learning logic and solvers (`pnpm test`); empty suite must fail
- **No** backend, DB server, game engine, router, or state library

Layers: adventure (`src/components/`, `src/chapters/`) · activities (`src/activities/`) · progression (`src/game/`).

## Monetization

Not in v1. Free, no ads, payments, or accounts. Revisit after Chapter 1 playtest.

## UI/UX

- 1-bit black on white; Chrome dino as simplicity reference
- Pixel sprites (Zero 16×16); meaning without colour (solid / invert / dotted / blink)
- Pixel font for world; clean font for dialogue and formulas
- Mobile-first; keyboard-reachable labeled hotspots; fast first paint on cheap phones

Screens (no router library; app-owned view state):

- `title` - start / continue
- `scene` - background + hotspots
- `dialogue` - speaker lines and choices
- > TODO: brain map / notebook / map screens when progression UI is specified

## Deployment

- Static SPA; `pnpm build` → `dist`
- Env vars: none · server DB: none · workers/cron: none · health: n/a
- Saves on device only
- > TODO: choose static host
- Later: `vite-plugin-pwa` for offline after the opening works

## Open questions

- Host not chosen
- Build plan is foundation-only; project-plan MVP also lists learning activities, brain-map UI, voice logs, and Chapter 1 content - add those as numbered features after chapter specs land (expected, not a conflict)
