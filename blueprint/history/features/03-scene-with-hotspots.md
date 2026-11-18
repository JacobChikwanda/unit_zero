# Feature: Scene with hotspots

**From build-plan:** feature 3
**Build attempt:** 1
**Branch:** feature/scene-with-hotspots

## Goal

Replace the scene stub with a config-driven scene: a fixed-aspect background frame and absolutely positioned HTML hotspots that are clickable and keyboard-reachable, with accessible names, keeping hotspot logic free of dialogue and save concerns.

## Design reference

- Style: Chrome dino — simple, fast, uncluttered; pure black on white; no colour; no gradients; meaning never depends on colour (design plan §2; overview UI/UX).
- Scenes: background images with absolutely positioned HTML hotspots; **no canvas** (overview stack; coding standards).
- Frame: CSS `aspect-ratio` from the art’s own pixel `width` / `height` on `SceneConfig`; the image fills that frame exactly so hotspots stay aligned at every size and nothing jumps while the image loads.
- Pixel art: scene `<img>` uses `image-rendering: pixelated` (no effect on the SVG placeholder; required for real pixel art later).
- Signal marks (design plan §2) are **reserved for meaning** and must **not** style hotspots: solid fill = right, inverted flash = wrong, dotted outline = uncertain, blinking = active. Demo hotspots use a thin solid outline plus label text only; focus uses the existing `:focus-visible` ring. Final hotspot look is a Chapter 1 decision.
- Fonts: hotspot labels use `--font-world` at 16/24/32 only; longer reading text stays `--font-ui` (reserved for feature 4).
- No prototype folder or chapter art yet — use a geometric 1-bit placeholder background (not Ndola story art). Do not invent skyline, characters, or places. Demo art size is **320×180**; real chapter art size is a Chapter 1 decision.

## In scope

- Typed `SceneConfig` / hotspot config (TypeScript in-repo content, not persisted), including art `width` and `height` in pixels
- Pure `validateSceneConfig(config)` that returns a list of errors (ids unique; hotspot numbers in 0–100; `left + width ≤ 100` and `top + height ≤ 100`; art `width`/`height` positive), living next to the scene types — **not** under `src/lib/`
- Vitest for each validation error case, a valid demo config, and running validation over the demo fixture
- One non-story demo fixture (abstract region labels only — no invented dialogue, characters, or Ndola locations); demo frame **320×180**
- Placeholder 1-bit background asset under `public/` (SVG or PNG), referenced by the fixture
- `Scene` renders a relative frame with `aspect-ratio: width / height`; background `<img>` with `display: block; width: 100%; height: 100%; image-rendering: pixelated`; hotspots as focusable `<button type="button">` elements, absolutely positioned as percentages of that frame
- Demo hotspot chrome: thin solid outline + label text; no §2 signal marks; `:focus-visible` for focus
- Accessible name per hotspot from config (`label`); keyboard: Tab to each hotspot, Activate with Enter/Space
- Activation reports via `onHotspotActivate(hotspotId)` prop only (parent decides what happens; App may no-op or set a tiny in-memory last-id for manual check)
- Wire `App` so Start/Continue still reach this scene with the demo config
- Layout checks at **360×640** and **1280×800**; demo hotspot boxes sized so each hit area is at least **44×44 CSS px** at the phone check width
- Preserve save-system Vitest suite and feature 2 navigation contracts

## Out of scope

- Dialogue, branching, speaker lines, end events (feature 4)
- Progression, chapter unlock, mastery chips, upgrades, writing saves from play (feature 5)
- Real Chapter 1 (or any chapter) art, copy, characters, or `docs/chapters/` gameplay specs
- Choosing final chapter art pixel size (Chapter 1 decision; demo stays 320×180)
- Final hotspot visual language beyond the demo thin outline + label (Chapter 1 decision); do not use §2 signal marks on hotspots
- Inspect / talk / collect clue game rules beyond firing `onHotspotActivate`
- Brain map, notebook, map screens, router, state library
- Canvas, new npm dependencies, backend, PWA/offline, sound
- Changing `SaveStore`, schema, storage key, or adventure components importing `src/game/save/`
- Visible cursor tooltips systems beyond the labeled hotspot buttons themselves
- Any helper under `src/lib/`

## Build loop

- `workflow.stepReview`: **feature** — pause after each build step for review before the next
- `workflow.checkpointCommits`: **disabled** — no mid-feature commits; `/complete` creates the work commit
- After the last step, stop for `/check` (and audit if requested); do not implement beyond this spec

## Build steps

- [x] 1. Add scene/hotspot types, `validateSceneConfig`, and a demo fixture. Put types + `validateSceneConfig` next to each other under `src/components/Scene/` (or the same scene-types module). `SceneConfig` includes `id`, `backgroundSrc`, `backgroundAlt`, art `width` and `height` (positive pixel sizes of the art), and `hotspots[]` (`id`, `label`, `left`/`top`/`width`/`height` as 0–100 percentages of the scene frame). `validateSceneConfig(config)` returns a list of errors for: duplicate ids; any hotspot number outside 0–100; `left + width > 100` or `top + height > 100`; non-positive art `width`/`height`. Add a demo fixture under `src/chapters/` with abstract labels (e.g. Region A / Region B), art size **320×180**, and a geometric 1-bit placeholder under `public/` (e.g. `public/scenes/demo-scene.svg`). Add Vitest covering each error case, a valid config, and `validateSceneConfig(demoFixture)` with an empty error list.
  - **Done when:** types, validator, fixture, asset, and Vitest cases exist; `backgroundSrc` matches a real `public/` path; demo uses 320×180; `pnpm test` and `pnpm build` pass.

- [x] 2. Implement `Scene` from config props. Replace the stub with a relative scene frame using `aspect-ratio: width / height` from the config’s art size. Background `<img>` uses `backgroundSrc` / `backgroundAlt`, `display: block; width: 100%; height: 100%; image-rendering: pixelated`. One button per hotspot, absolutely positioned from the percent fields, thin solid outline + visible label text (no §2 signal marks), accessible name from `label`, keyboard-reachable, calls `onHotspotActivate(id)` on activate. `App` imports the demo fixture (not `game/save` from components), passes config + handler into `Scene`. Empty `hotspots` array remains valid (background only). Do not open dialogue or mutate saves.
  - **Done when:** Start/Continue still reach the scene; fixed-aspect frame shows demo background and at least two hotspots aligned as percentages; click and keyboard activation invoke the handler with the correct id; `Scene` stays free of `game/save` imports; `pnpm test` and `pnpm build` pass.

- [x] 3. Confirm layout and a11y at check sizes. At **360×640** and **1280×800**, the frame keeps 320∶180, hotspots stay aligned to the frame (no jump vs unloaded image), each demo hit target is ≥44×44 px at 360px width, and focus order / `:focus-visible` rings work without §2 signal styling. No Vite scaffold leftovers introduced.
  - **Done when:** manual or screenshot evidence at both sizes shows fixed-aspect background + outlined labeled hotspots and keyboard activation; `pnpm test` and `pnpm build` pass.

## Files / areas

- `src/components/Scene/Scene.tsx`, `Scene.css` — replace stub; presentational; props only
- `src/components/Scene/` — scene types and `validateSceneConfig` (+ Vitest) next to those types; any helper lives here, not under `src/lib/`
- `src/chapters/...` — demo `SceneConfig` fixture only (content/config, not engine code)
- `public/scenes/` (or similar) — placeholder 1-bit background asset
- `src/App.tsx` — pass demo config and `onHotspotActivate` into `Scene`
- Do not add a router, canvas, or dialogue component
- Do not change `src/game/save/` contracts
- Do not add helpers under `src/lib/`

## Data / contracts

**SceneConfig (in-repo TypeScript; not persisted):**

- `id: string`
- `backgroundSrc: string` — URL path to a static asset under `public/`
- `backgroundAlt: string` — non-story description of the placeholder (e.g. `Demo scene background`)
- `width: number` — art width in pixels (demo: `320`); must be positive
- `height: number` — art height in pixels (demo: `180`); must be positive
- `hotspots: HotspotConfig[]` — may be empty

**HotspotConfig:**

- `id: string` — stable id passed to `onHotspotActivate`; unique within the scene
- `label: string` — accessible name (and visible label text for the demo)
- `left`, `top`, `width`, `height: number` — percentages 0–100 relative to the scene frame; must satisfy `left + width ≤ 100` and `top + height ≤ 100`

**validateSceneConfig(config): string[] (or equivalent error list):**

- Duplicate hotspot ids → error
- Any hotspot `left`/`top`/`width`/`height` outside 0–100 → error
- `left + width > 100` or `top + height > 100` → error
- Art `width` or `height` ≤ 0 → error
- Valid demo fixture → empty list
- Chapter scenes will be typed by hand; this validator catches overhanging hotspots before playtest

**Scene frame / image CSS contracts:**

- Frame: `aspect-ratio: width / height` from config art size
- Image: `display: block; width: 100%; height: 100%; image-rendering: pixelated`
- Hotspots: percentages of that frame

**Scene props:**

- `config: SceneConfig`
- `onHotspotActivate: (hotspotId: string) => void`

**Demo hotspot look:**

- Thin solid outline + label text
- Focus: existing `:focus-visible` only
- Must not use design plan §2 signal marks (solid fill / inverted flash / dotted outline / blinking)

**Behavior:**

- Happy: fixed-aspect frame; render background filling the frame; render one button per hotspot; activate → `onHotspotActivate(id)` once per activation
- Empty hotspots: render background only; no hotspot buttons
- Invalid config at runtime: not required to block render in the UI this feature; validation is enforced by Vitest on fixtures (including the demo)
- Invalid/missing asset: rely on `backgroundAlt` on the image; no extra error UI required for trusted static files
- Loading: frame aspect ratio reserves space so layout does not jump while the image loads
- Denied / auth: N/A (no accounts)
- Client-only SPA; no network; no persistence in this feature

**View state (unchanged from feature 2):**

- `'title' | 'scene'`; Start/Continue → `'scene'` without clearing storage

**Client vs server:** client-only; no auth or tenant boundaries.

## Testing

- Command: `pnpm test` (Vitest); no Browser tests command — do not add browser automation
- Required: Vitest for `validateSceneConfig` — each error case above, a valid config, and the demo fixture (expect no errors)
- Do not add brittle React component unit tests
- Gate: existing save tests stay green; UI evidence via `pnpm build` plus manual/screenshot at **360×640** and **1280×800**, including Tab/Enter (or Space) on a hotspot and stable aspect ratio
- Final gate this checkout: `pnpm test` and `pnpm build`
- Observed before spec: Vitest **3 files, 17 tests passed**; `tsc -b` + `vite build` succeeded (scene still stub); `pnpm` CLI was unavailable on PATH this session — used local `vitest` / `tsc` / `vite` binaries

## Notes for the AI

- Selected target: build-plan feature 3 — Scene with hotspots
- Do not invent dialogue, characters, story events, Ndola places, or chapter learning content; demo labels stay abstract
- Do not pull feature 4 dialogue UI or feature 5 progression into this branch
- Keep layers: adventure components presentational; chapter folder = config only; `App` wires props; no `game/save` imports under `src/components/`
- Scene types + `validateSceneConfig` live together next to Scene; **never** under `src/lib/`
- Frame aspect ratio comes from config art pixels; hotspots are % of that frame; image fills the frame exactly
- Do not style hotspots with §2 signal marks; demo is thin outline + label only
- Proportional engineering: no hotspot manager service, no global store, no new dependencies
- Branch is `feature/scene-with-hotspots`; create it at `/implement` start; do not rename or bump attempt
- This skill does not implement

## Critique notes

Review revision added fixed `aspect-ratio` from art `width`/`height` (demo 320×180), exact image fill + `image-rendering: pixelated`, forbidden §2 signal marks on hotspots (demo thin outline + label), required `validateSceneConfig` with Vitest per error case and demo fixture, and banned `src/lib/` helpers. Chapter 1 still owns real art size and final hotspot look.

**Status:** verified

**Step 3 evidence (observed):** phone 360×640 — frame 328×184.5 (aspect 320∶180), Region A/B hotspots ≈98×66 px (≥44×44); desktop 1280×800 — frame 736×414 (same aspect), both labeled outlined hotspots; Start reaches scene; hotspot buttons focusable; no §2 signal styling.


<!-- blueprint:completion {"schemaVersion":2,"specBytes":12896,"specSha256":"ccd030b6750fd6dba595d576efd0f886ea1dd4751b28b8dc5e70e5dd81e076d0","branch":"refs/heads/feature/scene-with-hotspots","head":"8fc181fdcc7f6c051c9c30678ae974d56c8910e7","baseRef":"refs/heads/main","baseCommit":"8fc181fdcc7f6c051c9c30678ae974d56c8910e7","sourceTree":"9d7d088a23ef604cbd340a83f82306f877eb8b89","landing":"local-merge"} -->

## Try it now

Run or do:

```bash
npx vite
```

Open http://localhost:5173/ → **Start** → click or Tab/Enter **Region A** / **Region B**.

Expected:

Fixed-aspect demo background with two thin-outlined labeled hotspots aligned to the drawn boxes; activation fires without opening dialogue or writing saves.

This proves:

Config-driven scene rendering and hotspot activation from the title screen.
