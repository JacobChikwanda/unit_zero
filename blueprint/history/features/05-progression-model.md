# Feature: Progression model

**From build-plan:** feature 5
**Build attempt:** 1
**Branch:** feature/progression-model
**Status:** verified

## Goal

Add a pure TypeScript progression layer under `src/game/progression/` that stores only happened facts on `PlayerSave` v1, derives chapter/challenge availability and rank, and applies typed effects (including dialogue event maps). Wire the dialogue demo so one end event persists a harmless story flag through the existing save system.

## In scope

- New `src/game/progression/` module: `CHAPTER_ORDER`, derivations, `Effect` union, `applyEffect`, `applyEvent` — no React, no chapter story content
- Reshape stored `ChapterState` on schemaVersion `1`: drop `status` / `in_progress`; store only which of ore / smelt / refine have been passed
- Pure derivations: chapter status, challenge availability, rank
- App applies demo end-event effects then `save()`; short UI message when `save()` returns `false`
- Demo event map: at least one dialogue end event → one harmless `setStoryFlag`; after reload, Continue appears (save non-null)
- Vitest coverage for every derivation (including rank boundaries), every effect and no-op case, chip monotonicity, `applyEvent` known/unknown, and save → load round trip of a progressed save
- Update `blueprint/context/project-overview.md` PlayerSave / ChapterState passages to match the new stored shape

## Out of scope

- Brain map UI
- Chip fading and Morning Shift (timestamps later)
- Lesson gating (chapter specs decide it)
- Zero’s sprite / visual upgrades
- Real chapter content, real concept ids, or real upgrade ids beyond opaque string ids in tests/demo
- Migrations (no real player saves yet; v1 may change in place)
- Settings on the save
- Map / notebook screens

## Build loop

`workflow.stepReview` is `feature`: after each build step, present what changed and wait for approval before the next step. `workflow.checkpointCommits` is `disabled`: do not create checkpoint commits; `/complete` creates the final feature commit.

## Build steps

- [x] **1. Branch and stored chapter facts**
  Create and check out `feature/progression-model`. Change `ChapterState` in `src/game/save/types.ts` so it no longer has `status`. Store only passed challenge facts as booleans:

  ```ts
  challenges: { ore: boolean; smelt: boolean; refine: boolean }
  ```

  Update `parse.ts` / `parse.test.ts` accordingly (reject `status`, reject non-booleans for challenges). Keep `ChipLevel`, `LocationState`, and other PlayerSave fields. Remove unused stored `ChapterStatus` / stored `ChallengeStatus` if nothing else needs them; derived types live under progression.
  **Done when:** `pnpm test` passes; a valid save with boolean challenge flags round-trips through `parsePlayerSave`; payloads that still send `status` or string challenge statuses are rejected.

- [x] **2. CHAPTER_ORDER and derivations**
  Add `src/game/progression/` with `CHAPTER_ORDER`: `ch01` … `ch19`, then `finale` (ids only). Pure helpers (names may match repo style):

  - Chapter status: `locked` | `available` | `completed`. Available when the previous id in `CHAPTER_ORDER` is completed (first id `ch01` is available with no previous). Completed when that chapter’s refine is passed (`true` in save; missing chapter entry ⇒ not passed).
  - Challenge availability: `locked` | `available` | `passed`. Ore available when the chapter is available or completed; Smelt needs ore passed; Refine needs smelt passed. Already-passed challenges report `passed`.
  - Rank from count of completed chapters in `CHAPTER_ORDER`: 0–3 Apprentice, 4–8 Technician, 9–13 Engineer, 14+ Architect.

  **Done when:** Vitest covers every derivation rule above, including rank boundaries at completed counts 3/4, 8/9, and 13/14; `pnpm test` passes.

- [x] **3. Effects and applyEvent**
  Typed `Effect` union and pure `applyEffect(save, effect) → save` (immutable; never mutates input):

  - `passChallenge` — chapterId + ore|smelt|refine; no-op if that challenge is not `available`; no-op if already passed
  - `raiseChip` - conceptId + `to: ChipLevel`; result is the higher of current (absent = dark) and `to` on CHIP_LADDER; same or lower `to` is a no-op (same save object)
  - `grantUpgrade` — upgradeId; no-op if already owned
  - `unlockLocation` — locationId; sets `unlocked: true` and `mapMarkerVisible: true` (creates the location entry if missing); no-op when both already true
  - `addClue` — clueId; no-op if already in `notebookClueIds`
  - `setStoryFlag` — key + `boolean | string`; no-op when the key already holds that exact value
  - `recordChoice` — key + string; no-op when the key already holds that exact value
  - `unlockVoiceLog` — voiceLogId; no-op if already unlocked

  `applyEvent(save, eventMap, event)` looks up `Record<string, Effect[]>` and folds `applyEffect`; unknown event is a no-op (returns the same logical save).
  **Done when:** Tests cover every effect, listed no-ops, chips never decrease, known and unknown `applyEvent`; `pnpm test` passes.

- [x] **4. Persist demo end event through App**
  Keep a PlayerSave (or null) in App from `SaveStore.load()` on start. Map demo dialogue end events to effects (content-side `Record<string, Effect[]>` near the demo chapter files is fine; chapters may import `Effect` types from `game/progression` but must not import `SaveStore`). On dialogue `onEvent` / `onEnd`, run `applyEvent`, then `saveStore.save(next)`. If `save()` is `false`, show a short message that progress wasn’t saved. At least one end event (e.g. `demo-path-one-end` or `demo-path-two-end`) sets a harmless story flag. `canContinue` remains “save load is non-null”.
  **Done when:** Manual check — Start → finish demo dialogue path that applies the flag → reload → Continue is shown; `pnpm test` still passes. Optional: unit-level round trip test `save → parse/load` of a progressed save in progression or save tests.

- [x] **5. Overview contract sync**
  Update `blueprint/context/project-overview.md` Data model: ChapterState without `status`; challenges as passed booleans; note derived chapter status, challenge availability, and rank; mention `src/game/progression/` effects/`applyEvent`.
  **Done when:** Overview matches the shipped v1 shape; no leftover `in_progress` / stored challenge locked|available docs.

## Files / areas

- `src/game/progression/` (new: order, derive, effects, types, index, co-located `*.test.ts`)
- `src/game/save/types.ts`, `parse.ts`, `parse.test.ts` (and defaults only if needed)
- `src/App.tsx` (+ light CSS if the save-failure message needs it)
- `src/chapters/demoDialogue.ts` and/or a small demo event-map module beside it
- `blueprint/context/project-overview.md` (data-model passages only)

## Data / contracts

**PlayerSave v1 (stored facts only; Feature 5 may change v1 in place):**

| Field | Stored meaning |
| --- | --- |
| `schemaVersion` | `1` |
| `upgrades` | upgrade ids owned |
| `chapterStates` | per chapterId: `{ challenges: { ore, smelt, refine: boolean } }` — `true` means passed |
| `conceptChips` | per conceptId: `{ level: ChipLevel }` |
| `locations` | per locationId: `{ unlocked, mapMarkerVisible }` |
| `notebookClueIds` | clue ids |
| `storyFlags` | `Record<string, boolean \| string>` |
| `choiceFlags` | `Record<string, string>` |
| `unlockedVoiceLogIds` | voice log ids |

**Never stored (derive only):** chapter status, challenge locked/available, rank.

**CHAPTER_ORDER:** `['ch01','ch02',…,'ch19','finale']`.

**Rank:** from completed-chapter count in that order — Apprentice 0–3, Technician 4–8, Engineer 9–13, Architect 14+.

**Effects:** typed union listed in step 3; `applyEffect` / `applyEvent` pure and idempotent for repeats.

**Persistence UX:** App applies effects then `save()`; `false` ⇒ short “progress wasn’t saved” message. Adventure components still do not import `game/save`.

**Chosen internals (not product forks):** `raiseChip` uses max(current, `to`) on CHIP_LADDER (absent = `dark`). `unlockLocation` sets both `unlocked` and `mapMarkerVisible` to `true`.

## Testing

- Command: `pnpm test` (Vitest). No Verify command in `AGENTS.md`; no Browser tests command — use manual reload for the demo persistence done-when.
- Baseline before this feature: 6 files / 48 tests passed (`pnpm test`).
- Required coverage: all derivations + rank boundaries 3/4, 8/9, 13/14; all effects + no-ops + chip monotonicity; `applyEvent` known/unknown; progressed save → load round trip.
- Do not claim browser automation evidence.

## Notes for the AI

- Pure TypeScript only in `src/game/progression/`; no React.
- Do not invent dialogue, characters, story, concept ids, or upgrade ids; demo flag key/value may be generic (e.g. `demo.progressed` / `true`).
- Do not weaken or invent scoring/mastery beyond the chip ladder and rank bands above.
- No new dependencies.
- Keep layers: App owns SaveStore; progression owns apply/derive; chapters may hold event→effect maps typed against progression.
- Prefer immutable updates (spread / copy records and arrays); never mutate the save passed into `applyEffect`.
- After schema change, fix any save tests that still use `status` or string challenge statuses.
- Proportional engineering: no middleware, no effect queue, no migration layer.


<!-- blueprint:completion {"schemaVersion":2,"specBytes":9320,"specSha256":"1fa41bf51e09ace058027005364b4d14a538d6fa033613d583cffe194fe5b353","branch":"refs/heads/feature/progression-model","head":"a5974fea920c4e0f4873791d4094f044e44ab1fe","baseRef":"refs/heads/main","baseCommit":"a5974fea920c4e0f4873791d4094f044e44ab1fe","sourceTree":"47fbbbb84690fc62106f954876af832cf0c82491","landing":"local-merge","absentOptional":[]} -->

## Try it now

Run or do:

1. `pnpm dev` and open http://localhost:5173
2. Start -> activate Region A -> finish either dialogue path to an end
3. Reload the page

Expected:

Continue is visible on the title screen (a save now exists with storyFlags["demo.progressed"] === true).

This proves:

Demo end events apply a progression effect and persist through SaveStore so Continue appears after reload.
