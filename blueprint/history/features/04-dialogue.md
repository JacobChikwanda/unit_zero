# Feature: Dialogue

**From build-plan:** feature 4
**Build attempt:** 1
**Branch:** feature/dialogue

## Goal

Add scripted dialogue with speakers, linear and branching lines, and end/choice events: pure TypeScript logic and validator under `src/components/Dialogue/`, a presentational panel below the scene, and a Region A demo that opens a short non-story script — without touching saves or story progression.

## Design reference

- Style: Chrome dino — simple, fast, uncluttered; pure black on white; no colour; meaning never depends on colour (design plan §2; overview UI/UX).
- Fonts: speaker name uses `--font-world` at 16/24/32 only; line text uses `--font-ui` at **≥16px** (overview UI/UX; coding standards verbatim content).
- Layout: one dialogue panel **below** the scene, still inside `--layout-max` via existing `GameLayout`; same structure on phone and desktop. On phone the panel fills the empty space under the scene (flex grow on the panel, not a second max-width shell). The panel sits below the scene, never on top of it.
- No typewriter, portraits, or sound.
- Signal marks (design plan §2) are reserved for challenge feedback — do not use them to style dialogue chrome.
- Demo copy: abstract speakers and lines only (same non-story rule as Region A / Region B). Do not invent named characters, Ndola story lines, or Zero Capitals content here; Act I capitals belong in real chapter content later, written into the data, never transformed in code.

## In scope

- Typed `DialogueScript`, node shapes, and speakers map as in-repo TypeScript content under `src/chapters/` (not persisted)
- Pure logic in `src/components/Dialogue/` (no React): `startDialogue`, `advance`, `choose`, and `validateDialogueScript`
- Vitest covering every validator rule (including empty `choices` and each choice having exactly one of `next` or `end`), a linear script, a branch, a loop that can still reach an end, a choice that fires an optional `event` through `onEvent`, invalid-move no-ops (three cases), and `validateDialogueScript(demoFixture)` with an empty error list
- Presentational `Dialogue` component: props `script`, `speakers`, `onEvent(event)`, `onEnd(event)`; no save or story-state imports
- Panel UI: speaker + line + real **Next** button or real **choice** buttons (no click-anywhere); `aria-live="polite"` on the text region; focus moves to Next or the first choice when a new line appears
- While dialogue is open, scene hotspots cannot activate — set `inert` on the scene frame
- Wire App so demo hotspot **Region A** (`region-a`) opens the demo script; App remembers which hotspot opened the dialogue and returns focus to that hotspot when the dialogue closes; parent handles `onEvent` / `onEnd` in memory only (e.g. last event for manual check); feature 5 will interpret events for progression
- Preserve save-system and scene/hotspot contracts; `pnpm test` and `pnpm build` stay green

## Out of scope

- Typewriter effect, sound, portraits / speaker art
- Choices that depend on saved flags or story state (feature 5)
- Saving dialogue position / resume mid-script
- Voice logs
- Teach it back / SentenceBuilder
- Progression, chapter unlock, mastery chips, upgrades, writing saves from play (feature 5)
- Real Chapter 1 (or any chapter) dialogue, characters, or `docs/chapters/` gameplay specs
- Changing `SaveStore`, schema, or storage key; adventure components importing `src/game/save/`
- New npm dependencies, router, state library, canvas, backend
- Browser automation (no Browser tests command)
- Any helper under `src/lib/`

## Build loop

- `workflow.stepReview`: **feature** — pause after each build step for review before the next
- `workflow.checkpointCommits`: **disabled** — no mid-feature commits; `/complete` creates the work commit
- After the last step, stop for `/check` (and audit if requested); do not implement beyond this spec

## Build steps

- [x] 1. Add dialogue types, pure engine + validator, and Vitest. Under `src/components/Dialogue/` (no React), define `DialogueScript` / node / choice / speakers types and implement `validateDialogueScript`, `startDialogue`, `advance`, and `choose`. Put tests next to the logic (`*.test.ts`). Cover every validator rule listed in Data / contracts, plus runtime cases: linear script, branch, loop that still reaches an end, a choice that fires an optional `event`, and three invalid-move no-ops (`advance` on a choices node; `choose` with an unknown id; any call after ended) — each returns the state unchanged with no events.
  - **Done when:** types + engine + validator exist with no React imports; Vitest asserts each validator rule, the runtime cases, and the three invalid-move no-ops; `pnpm test` and `pnpm build` pass.

- [x] 2. Add non-story demo script and wire Region A. Add a demo fixture under `src/chapters/` (abstract speaker ids/names and abstract lines; one branch; at least one event). Add a Vitest case that runs `validateDialogueScript` over the demo fixture and expects no errors (same pattern as the scene validator). App: activating `region-a` opens that script in the dialogue panel; App stores the opening hotspot id and, when the dialogue closes, moves focus back to that hotspot; `onEvent` / `onEnd` stay in App (in-memory only). Region B unchanged. Dialogue and Scene components do not import `game/save`.
  - **Done when:** Region A opens the demo script; demo fixture validates with an empty error list; branch and event are reachable in the fixture; focus returns to the opening hotspot on close; components stay free of save imports; `pnpm test` and `pnpm build` pass.

- [x] 3. Implement `Dialogue` UI, scene `inert`, and layout. Render one panel below the scene inside `GameLayout` / `--layout-max` (below, never on top). Speaker in `--font-world`, line in `--font-ui` ≥16px. Real Next and choice buttons; on each new line, focus Next or the first choice; text region `aria-live="polite"`; no typewriter. While open, `inert` on the scene frame so hotspots cannot activate. Phone: panel fills space under the scene; desktop: same panel-below-scene structure. Closing dialogue restores focus to the hotspot that opened it.
  - **Done when:** manual or screenshot evidence at **360×640** and **1280×800** shows panel below scene, fonts, focus move into the panel, live region, inert hotspots during dialogue, Next/choice buttons, and focus return to the opening hotspot on close; `pnpm test` and `pnpm build` pass.

**Status:** verified

## Files / areas

- `src/components/Dialogue/` — types, `validateDialogueScript`, `startDialogue` / `advance` / `choose`, Vitest, `Dialogue.tsx`, `Dialogue.css` (logic files have no React)
- `src/chapters/` — demo `DialogueScript` + speakers fixture only (content, not engine)
- `src/components/Scene/Scene.tsx` (and CSS if needed) — support `inert` on the scene frame when dialogue is open (prop from parent); enough identity on hotspot controls for App to restore focus by hotspot id
- `src/App.tsx` — compose scene + dialogue panel below the scene; Region A opens demo; remember opening hotspot id; handle `onEvent` / `onEnd` without saves; return focus to that hotspot when dialogue closes
- Do not change `src/game/save/` contracts
- Do not add helpers under `src/lib/`
- Do not add a router or separate `AppView` for dialogue — stay on `scene` with a panel below the scene

## Data / contracts

**Speakers (in-repo; not persisted):** `Record<string, string>` — speaker id → display name. Unknown ids are validator errors. Display the mapped name and node `text` **verbatim** (no case changes, trim-for-display, or other transforms in code).

**DialogueScript (in-repo TypeScript; not persisted):**

- `id`: string
- `startNodeId`: string
- `nodes`: `Record<string, DialogueNode>`

**DialogueNode:**

- `speaker`: string (speaker id)
- `text`: string
- Exactly one of:
  - `next`: string (node id)
  - `choices`: `DialogueChoice[]` (must be non-empty)
  - `end`: `{ event: string }` (`event` required)

**DialogueChoice:**

- `id`: string
- `text`: string
- Exactly one of:
  - `next`: string (node id)
  - `end`: `{ event: string }` (`event` required)
- Plus optional `event?: string` (fires through `onEvent` whenever this choice is picked)

**`validateDialogueScript(script, speakers): string[]`** — collect all applicable errors (do not stop at the first):

1. `startNodeId` exists in `nodes`
2. Every `next` (node-level or choice-level) exists in `nodes`
3. Every node `speaker` is a key in `speakers`
4. Each node has **exactly one** of `next`, `choices`, or `end`
5. A node with `choices` must have a **non-empty** `choices` array
6. Choice `id`s are unique within a node
7. Each choice has **exactly one** of `next` or `end`
8. Every node can reach an end (loops allowed if an end remains reachable). A node-level `end` **or** a choice’s `end` counts as an end for this rule
9. No node is unreachable from `startNodeId`

**Engine (pure; no React):**

- `startDialogue(script, speakers)` → current view state for `startNodeId`
- `advance(state)` — valid when the current node has `next` (move there) or `end` (finish; terminating event is that `end.event` for `onEnd`)
- `choose(state, choiceId)` — select a choice on the current node:
  - If the choice has optional `event`, include it in this transition’s `events` (UI → `onEvent`)
  - If the choice has `next`, move to that node
  - If the choice has `end`, the dialogue ends; terminating event is `end.event` (UI → `onEnd`)
- **Invalid moves** leave the state unchanged and return no events:
  - `advance` when the current node has `choices`
  - `choose` with an unknown choice id
  - `advance` or `choose` after the dialogue has already ended

**View state returned by start / advance / choose** (field names may match existing folder style; keep this shape):

- Current line: speaker id, display name, `text` (verbatim)
- Choices on offer (empty when the node has `next` or `end`)
- `ended`: boolean
- `events`: optional choice `event` strings fired by **this** transition (for `onEvent`)
- Terminating end event (when `ended`): always a real `end.event` string from a node `end` or a choice `end` — never an empty stand-in

**`Dialogue` props:**

- `script`, `speakers`
- `onEvent(event: string)` — fired for a choice’s optional `event` whenever that choice is picked (whether the choice continues via `next` or ends via `end`)
- `onEnd(event: string)` — fired once when the dialogue ends, always with a real `end.event` from a node `end` or a choice `end`

**Scene interaction while open:** parent passes through so the scene frame has the HTML `inert` attribute; hotspots are not activatable and are removed from tab order by `inert`.

**Focus return:** App remembers the hotspot id that opened the dialogue. When the dialogue closes after `onEnd`, App moves focus back to that hotspot’s control so keyboard users are not left without a focus target.

**Demo fixture:** abstract speakers (e.g. Speaker A / Speaker B — not story cast); short script with one branch and one event; opened only from Region A. Must pass `validateDialogueScript` with no errors. No invented story characters or Ndola lines.

**Non-goals for this contract:** persistence, flag-gated choices, portraits, audio.

## Testing

- Command: `pnpm test` (Vitest); no Browser tests command — do not add browser automation
- Focus: every `validateDialogueScript` rule (including non-empty `choices` and each choice’s exactly-one-of `next`/`end`); linear / branch / loop / choice-`event` engine behavior; three invalid-move no-ops; `validateDialogueScript(demoFixture)` → `[]`
- Gate: existing save + scene tests stay green; UI evidence via `pnpm build` plus manual/screenshot at **360×640** and **1280×800** (panel below scene, fonts, focus into panel, `aria-live`, `inert` hotspots, real Next/choices, focus return to opening hotspot on close)
- Final gate this checkout: `pnpm test` and `pnpm build` (no `Verify` command in `AGENTS.md` yet)
- Observed before spec: `pnpm test` — 4 files, 25 tests passed; `pnpm build` — succeeded (`tsc -b && vite build`)

## Notes for the AI

- Follow docs and chapter specs for real story content later; this feature’s demo must stay abstract — never invent Zero / Ndola dialogue here
- Show content text verbatim; Zero Act I capitals are data, not CSS or string transforms
- Keep layers separate: Dialogue does not import `src/game/save/` or progression; App owns open/close, event side effects, and focus return to the opening hotspot
- Mirror Scene’s folder pattern: types + pure functions + tests beside the component; no `src/lib/`
- Choices end the same way nodes do: `end: { event }` with required `event` → `onEnd`; optional choice `event` → `onEvent` on pick; never invent an empty-string `onEnd` payload
- `workflow.stepReview` is `feature`: implement one build step, then stop for review
- No checkpoint commits; do not commit unless the user asks; `/complete` owns the work commit
- Do not pull feature 5 progression interpretation into this panel
- Proportional engineering: no abstraction beyond the script engine + presentational component; reuse `--layout-max`, `--font-world`, `--font-ui`, existing `GameLayout`


<!-- blueprint:completion {"schemaVersion":2,"specBytes":13252,"specSha256":"d4e713b6bc33c0caf80437fd4ee6f06ebf99e335c4e2263ce194b3526f47e079","branch":"refs/heads/feature/dialogue","head":"f4f5188f7d89b013a06c3b61af57a9880192aab0","baseRef":"refs/heads/main","baseCommit":"f4f5188f7d89b013a06c3b61af57a9880192aab0","sourceTree":"226b885e761f57c10a6ebb205c19052d07d895bd","landing":"local-merge"} -->

## Try it now

Run or do:

1. `pnpm dev` → open http://localhost:5173
2. Start → activate **Region A**
3. Advance with **Next**, pick a path, finish the script

Expected:

Dialogue panel appears **below** the scene (Speaker A/B, real Next/choice buttons). Hotspots are inert while it is open. On end, the panel closes and focus returns to **Region A**.

This proves:

Region A opens the demo script, the panel sits under the scene, and close restores hotspot focus.
