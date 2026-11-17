# Feature: Layout and navigation

**From build-plan:** feature 2
**Build attempt:** 1
**Branch:** feature/layout-and-navigation

## Goal

Replace the Vite scaffold with a 1-bit app shell that moves between a title screen (Start / Continue) and a stub scene view, using app-owned view state, plain CSS tokens and fonts, and layouts that work at phone and desktop check widths.

## Design reference

- Style reference: Chrome dino — simple, fast, uncluttered (design plan §2; overview UI/UX).
- Visual contracts: pure black on white; no colour; no gradients; meaning never depends on colour.
- Fonts (design plan §2): **chunky pixel for the world**, **clean for formulas** (and other long reading text).
  - `--font-world` (Silkscreen): game name, title line, **Start**, **Continue**, and other short game labels.
  - `--font-ui` (`system-ui` stack): longer reading text — dialogue (feature 4), explanations, and formulas. Not used for title-screen labels in this feature.
- World text size only in whole multiples of 8px (`16`, `24`, `32`) so pixel edges stay sharp.
- No prototype folder or screenshot under `blueprint/reference/` yet — match the written contracts above; do not invent skyline pixel art.

## In scope

- App-owned view state: `'title' | 'scene'` (no router library, no state library)
- Title screen: **Start** (always) and **Continue** only when a save exists — **omit** Continue from the DOM when there is no save (never a disabled/greyed Continue)
- One line of title copy from design plan §10 (not invented): *Ndola. Apex runs the city now.*
- Stub scene view: reachable shell only (no hotspots, dialogue, or chapter content)
- `GameLayout`, `TitleScreen`, and scene stub under `src/components/`
- Layer split: `App` creates the `SaveStore` once, computes `canContinue` from `load() !== null`, and passes `canContinue`, `onStart`, and `onContinue` into `TitleScreen`. Adventure components never import `src/game/save/`
- 1-bit CSS base: black/white CSS variables, focus styles; remove Vite scaffold UI
- Fonts: self-host Silkscreen Regular at `public/fonts/silkscreen-regular.woff2` with `public/fonts/OFL.txt` (user adds both files); `@font-face` with `font-display: swap`; `--font-world` stack Silkscreen then `ui-monospace`; `--font-ui` is a `system-ui` stack (no file)
- Layout checks at fixed sizes: phone **360×640**, desktop **1280×800**; title buttons at least **44px** tall at the phone size
- Single `GAME_TITLE` constant used for the on-screen game-name heading and the document title (working name still undecided between “Unit Zero” and “Copper Mind” — constant holds whichever string is set)
- Preserve existing save-system Vitest suite; UI verified with build + manual/screenshot evidence at the two check sizes (no Browser tests command)

## Out of scope

- Scene hotspots, backgrounds as gameplay, keyboard hotspot map (feature 3)
- Dialogue, branching, end events (feature 4) — but reserve `--font-ui` for that reading text later
- Progression rules, chapter seed, mastery chips UI, upgrades, writing saves from play (feature 5)
- “Press any key” cinematic / dusk skyline illustration from the first-10-minutes table (Chapter 1 content later)
- Brain map, notebook, map screens
- Confirm/overwrite flow when Start is chosen while a save exists (do **not** call `clear()` in this feature)
- Settings, sound, offline/PWA, new npm dependencies, backend, router, or state library
- Choosing the final product name (keep one `GAME_TITLE` string for now)
- Creating the Silkscreen/OFL font files (user adds `public/fonts/silkscreen-regular.woff2` and `public/fonts/OFL.txt`)

## Build loop

- `workflow.stepReview`: **feature** — pause after each build step for review before the next
- `workflow.checkpointCommits`: **disabled** — no mid-feature commits; `/complete` creates the work commit
- After the last step, stop for `/check` (and audit if requested); do not implement beyond this spec

## Build steps

- [x] 1. Strip the Vite welcome UI. Add 1-bit CSS tokens in `src/index.css` (and thin component CSS as needed): `--color-ink`, `--color-paper`, `--font-world`, `--font-ui`, `--layout-max`, visible `:focus-visible` rings that stay 1-bit. Add `@font-face` for Silkscreen (`/fonts/silkscreen-regular.woff2`, `font-display: swap`) with `--font-world: 'Silkscreen', ui-monospace, monospace` and `--font-ui` as a `system-ui` stack. Size any world text in 8px multiples only. Add `GAME_TITLE` in one module and use it for the document title (via `document.title` or equivalent from `App`/`main`, not a hard-coded second string in `index.html` alone). Add `src/components/GameLayout/` as the root chrome. Point `App` at `GameLayout`.
  - **Done when:** `pnpm build` succeeds; app shows a black-on-white shell with no Vite marketing chrome; CSS variables and `@font-face` are defined; `GAME_TITLE` is the single source for the visible name and document title; world text sizes are 16/24/32 only.

- [x] 2. Add title and scene views with app-owned state `'title' | 'scene'`. `App` constructs `createLocalStorageSaveStore()` once, sets `canContinue = store.load() !== null`, and renders `TitleScreen` with props `{ canContinue, onStart, onContinue }` only — **no** `game/save` imports under `src/components/`. Title shows `GAME_TITLE`, the design-plan line *Ndola. Apex runs the city now.*, **Start** (always, `--font-world`), and **Continue** only when `canContinue` is true (do not render Continue otherwise). Both actions set view to `'scene'`. Start must not call `clear()`. Scene is a labeled stub. Title buttons ≥44px tall at 360px width.
  - **Done when:** with no save, Continue is absent from the DOM and Start reaches the scene stub; with a valid save in `unit-zero.player-save`, Continue is present and reaches the same stub; keyboard can focus and activate the visible controls; `TitleScreen` has no save-layer imports; `pnpm test` and `pnpm build` both pass.

- [x] 3. Confirm layout at **360×640** and **1280×800** (full width on phone; centered content capped by `--layout-max` on desktop). Remove unused scaffold assets imported only by the old welcome screen. Assume font files are present at the paths above before treating this step as done (user-supplied).
  - **Done when:** manual or screenshot evidence at 360×640 and 1280×800 shows the title shell and touch-sized buttons; Silkscreen loads with swap (fallback `ui-monospace` until loaded); unused Vite hero/logo imports are gone; `pnpm test` and `pnpm build` both pass.

## Files / areas

- `index.html` — minimal shell; do not hard-code a second game name if `GAME_TITLE` owns the document title at runtime
- `src/App.tsx`, `src/main.tsx` — view state, create store once, derive `canContinue`, pass props; drop scaffold
- One small module for `GAME_TITLE` (e.g. next to App or under `src/components/` / a tiny constants file beside the entry — not `src/lib/` or `src/types/`)
- `src/index.css`, `src/App.css` — 1-bit base (replace or gut scaffold styles)
- `src/components/GameLayout/` — root layout
- `src/components/TitleScreen/` — presentational; props only; never imports `src/game/save/`
- `src/components/Scene/` or `SceneView/` — stub only
- `src/game/save/` — imported from `App` (or another non-component entry/orchestration file) only; do not change save contracts
- `public/fonts/silkscreen-regular.woff2`, `public/fonts/OFL.txt` — user-added; wire `@font-face` to that path
- Do not add a router

## Data / contracts

**View state (in-memory only, not persisted):**

- `'title' | 'scene'`
- Initial view: `'title'`
- Start → `'scene'` (does not mutate storage)
- Continue → `'scene'`; Continue control rendered **only** when `canContinue === true`
- `canContinue`: `store.load() !== null` computed in `App` (or orchestration), not inside TitleScreen
- Corrupt / missing save: `load()` is `null` → Continue not rendered

**Copy:**

- Game name: single `GAME_TITLE` constant (working string; final name still open)
- Tag line from design plan §10, exact: `Ndola. Apex runs the city now.`

**TitleScreen props:**

- `canContinue: boolean`
- `onStart: () => void`
- `onContinue: () => void`
- Optional: `title?: string` only if needed to pass `GAME_TITLE` — or import `GAME_TITLE` from the shared constant module (not from `game/save`)

**SaveStore (unchanged):**

- `load(): PlayerSave | null`, `save`, `clear` as shipped in feature 1
- Storage key remains `unit-zero.player-save`
- Only `src/game/save/` may touch storage APIs; components do not call the store

**Fonts:**

- World: Silkscreen Regular → `/fonts/silkscreen-regular.woff2`, `font-display: swap`, fallback `ui-monospace`
- UI: `system-ui` stack, no font file
- World font-size: `16px` | `24px` | `32px` only

**Layout checks:**

- Phone: 360×640; Desktop: 1280×800
- Title action buttons: min-height **44px** at the phone check

**CSS tokens (minimum):**

- `--color-ink` / `--color-paper`
- `--font-world` / `--font-ui` (roles as in Design reference)
- `--layout-max` — desktop content cap

**Client vs server:** client-only SPA; no network; no auth.

## Testing

- Command: `pnpm test` (Vitest); no Browser tests command — do not add browser automation
- No new pure-logic module required; do not add brittle component unit tests
- Gate: existing save tests stay green; UI evidence via `pnpm build` plus manual/screenshot at **360×640** and **1280×800**, including Continue absent vs present and ≥44px buttons on phone
- Final gate this checkout: `pnpm test` and `pnpm build` (no `Verify` command in `AGENTS.md` yet)
- Observed before spec: Vitest **3 files, 17 tests passed**; `tsc -b` and `vite build` succeeded (scaffold still present in UI)

## Notes for the AI

- Follow overview screens: `title` (start / continue) and `scene`; app-owned view state, not react-router
- Do not invent dialogue, characters, or story beyond the single design-plan title line above
- Do not change SaveStore behavior, schema, key, or tests’ expected contracts
- Keep adventure (`components/`) free of `game/save` imports; `App` is the seam
- Prefer small components under `src/components/<Name>/`
- Proportional engineering: no global store, no context unless props become painful, no new dependencies
- `--layout-max` suggestion if unset: `48rem` centered — swap freely on review
- Wait for user-added Silkscreen + OFL files before calling step 3 done; `@font-face` path must match `public/fonts/silkscreen-regular.woff2`
- Branch is `feature/layout-and-navigation`; do not rename or bump attempt
- Create the branch at `/implement` start; this skill does not implement

**Status:** verified

**Step 3 evidence (observed):** phone 360×640 — title shell, Silkscreen loaded, Start min-height 44px, Continue absent without save; desktop 1280×800 — `.game-layout` width 768px centered (256px gutters); Start → Scene; with valid `unit-zero.player-save`, Continue is present.


<!-- blueprint:completion {"schemaVersion":2,"specBytes":10930,"specSha256":"7314c601edae39c752a55b6d93016cb415362f02e90dd7007b1d3d81090275c6","branch":"refs/heads/feature/layout-and-navigation","head":"5e47c03d224d40e89348aef25560eb32ad28b05f","baseRef":"refs/heads/main","baseCommit":"5e47c03d224d40e89348aef25560eb32ad28b05f","sourceTree":"ccf7ed5566cf20f799bc7cd68a64344d7dbcb06e","landing":"local-merge"} -->

## Try it now

Run or do:

```bash
npx vite
```

Open http://127.0.0.1:5173/ — you should see **Unit Zero**, the Ndola line, and **Start** only. Click **Start** → **Scene**. In DevTools, set a valid `unit-zero.player-save` and reload → **Continue** appears.

This proves:

title ↔ scene navigation and Continue gated on save without a disabled button.
