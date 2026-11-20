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
2. **Layout and navigation** (done) - title → scene view state; 1-bit CSS tokens; Silkscreen world font + `system-ui` reading font; `GAME_TITLE`; Start always, Continue omitted when no save; phone/desktop check widths
3. **Scene with hotspots** (done) - config-driven fixed-aspect background + keyboard-reachable labeled HTML hotspots; `onHotspotActivate`; demo Region A/B
4. **Dialogue** (done) - scripted lines by speaker, branching choices, end events; pure engine + validator; panel below the scene; parent owns `onEvent` / `onEnd`
5. **Progression model** - pure `src/game/progression/`; store facts, derive chapter/challenge availability and rank; typed effects + `applyEvent`; demo end event persists a story flag

Later (project plan, not yet in build plan): Chapter 1 opening + rest of Ch 1, reusable activities, voice logs, Ch 2–19, generators, Morning Shift, workshops, offline, sound.

## Data model

Game content (chapters, dialogue scripts, activities, answers) is TypeScript in the repo, not runtime storage. Only player progress is persisted through `src/game/save/` → `SaveStore` (localStorage first). Nothing else touches storage. Adventure components do not import `src/game/save/`; `App` creates the store and passes props.

### PlayerSave

Shipped schemaVersion `1` (`CURRENT_SCHEMA_VERSION`). Deep-validated on load; one bad entry rejects the whole save. Invalid/corrupt payloads return `null` and leave the storage key unchanged. Store only happened facts; derive the rest in `src/game/progression/`.

- `schemaVersion` (number) - must equal `1` on load
- `upgrades` (string[]) - upgrade ids owned
- `chapterStates` (Record<chapterId, ChapterState>) - passed challenge facts only
- `conceptChips` (Record<conceptId, ChipState>)
- `locations` (Record<locationId, LocationState>)
- `notebookClueIds` (string[])
- `storyFlags` (Record<string, boolean | string>)
- `choiceFlags` (Record<string, string>) - story-affecting decisions
- `unlockedVoiceLogIds` (string[])

Not on the save (derive only): chapter status, challenge locked/available, and `rank` (from completed-chapter count; design plan §3). `settings` deferred until a settings UI exists.

> Feature 5 owns progression fields and may change v1 directly until the first playtest creates real player saves. Add migrations only after that.

### ChapterState

- `challenges` - `{ ore, smelt, refine }: boolean` — `true` means that challenge was passed
- No stored `status` or `in_progress`

### Derived progression (`src/game/progression/`)

- `CHAPTER_ORDER`: `ch01`…`ch19`, then `finale`
- Chapter status: `locked` | `available` | `completed` (available when previous in order is completed; `ch01` starts available; completed when refine is passed)
- Challenge availability: ore when chapter available/completed; smelt after ore; refine after smelt; already-passed → `passed`
- Rank: Apprentice 0–3 completed chapters, Technician 4–8, Engineer 9–13, Architect 14+
- Typed `Effect` union applied by pure `applyEffect(save, effect)`; content maps event names to `Effect[]` via `applyEvent(save, eventMap, event)` (unknown event = no-op)
- App applies effects then `SaveStore.save()`; `false` → short “progress wasn’t saved” message

### ChipState

- `level` (dark | outline | half_lit | lit | refined) - brain-map mastery chip; `raiseChip` sets level to the higher of current (absent = dark) and `to` on CHIP_LADDER

### LocationState

- `unlocked` (boolean)
- `mapMarkerVisible` (boolean)

### SaveStore (interface)

- `load(): PlayerSave | null`
- `save(data: PlayerSave): boolean` - `true` on success, `false` if Storage threw; never throws
- `clear(): void`
- First impl: localStorage key `unit-zero.player-save`; storage accessed lazily inside try blocks

### Dialogue content (in-repo; not persisted)

- `DialogueScript` - `{ id, startNodeId, nodes }`
- Node: `speaker`, `text`, and exactly one of `next` | `choices` (non-empty) | `end: { event }`
- Choice: exactly one of `next` | `end: { event }`, plus optional `event` → `onEvent`; `end.event` → `onEnd`
- Speakers: id → display name; text shown verbatim

## Tech stack

- **Vite + React + TypeScript (strict), pnpm** - static SPA
- **Plain CSS** - 1-bit look and simple animation; CSS variables `--color-ink`, `--color-paper`, `--font-world`, `--font-ui`, `--layout-max`
- **HTML hotspots on background images** - scenes; no canvas at start
- **KaTeX** - formulas when first needed
- **Vitest** - unit tests for learning logic and solvers (`pnpm test`); empty suite must fail
- **No** backend, DB server, game engine, router, or state library

Layers: adventure (`src/components/`, `src/chapters/`) · activities (`src/activities/`) · progression (`src/game/`).

## Monetization

Not in v1. Free, no ads, payments, or accounts. Revisit after Chapter 1 playtest.

## UI/UX

- 1-bit black on white; Chrome dino as simplicity reference; meaning never depends on colour
- Pixel sprites (Zero 16×16); solid / invert / dotted / blink for meaning
- World: Silkscreen (`--font-world`, sizes 16/24/32 only); reading text: `system-ui` (`--font-ui`) for dialogue, explanations, formulas
- Mobile-first; check sizes 360×640 and 1280×800; title actions ≥44px tall on phone; keyboard-reachable labeled hotspots; fast first paint on cheap phones
- Product name via single `GAME_TITLE` constant (working string `Unit Zero`; Copper Mind still a candidate)

Screens (no router library; app-owned view state `'title' | 'scene'`):

- `title` - Start always; Continue only when `SaveStore.load()` is non-null (omit from DOM otherwise)
- `scene` - fixed-aspect background + hotspots; optional dialogue panel **below** the scene (not a separate view); scene frame `inert` while dialogue is open
- > TODO: brain map / notebook / map screens when progression UI is specified

## Deployment

- Static SPA; `pnpm build` → `dist`
- Env vars: none · server DB: none · workers/cron: none · health: n/a
- Saves on device only
- > TODO: choose static host
- Later: `vite-plugin-pwa` for offline after the opening works

## Open questions

- Host not chosen
- Final product name (`GAME_TITLE` is `Unit Zero`; Copper Mind still a candidate)
- Build plan is foundation-only; project-plan MVP also lists learning activities, brain-map UI, voice logs, and Chapter 1 content — add those as numbered features after chapter specs land (expected gap, not a conflict)
