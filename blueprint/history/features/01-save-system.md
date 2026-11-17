# Feature: Save system

**From build-plan:** feature 1
**Build attempt:** 1
**Branch:** feature/save-system

## Goal

Ship a versioned `PlayerSave` schema and a `SaveStore` that reads and writes it through localStorage only, with safe null fallbacks for missing or corrupt data, so later layout and progression features can persist without touching storage themselves.

## In scope

- `PlayerSave` and nested types (`ChapterState`, `ChipState`, `LocationState`) — progression fields only; no rank, no settings
- `CURRENT_SCHEMA_VERSION = 1`, `createDefaultPlayerSave()`, and deep parse/validate that accepts only a well-formed v1 save
- `SaveStore` interface: `load(): PlayerSave | null`, `save(data: PlayerSave): boolean`, `clear(): void`
- First implementation: localStorage-backed store; single storage key; no other module may call `localStorage` for player progress
- Lazy storage access: read `globalThis.localStorage` (or an injected getter) inside each method’s try block — never at module load or store construction
- Safe handling: missing key → `null`; invalid JSON / failed shape / wrong `schemaVersion` → `null` and **leave the key unchanged**; Storage API throws → `load` returns `null`, `save` returns `false`, `clear` no-ops; none of the three throw
- Vitest coverage next to the logic (node env + in-memory Storage mock; no new test dependency)
- Make an empty test suite fail: remove `passWithNoTests` from `vite.config.ts` (or ensure it is not `true`)

## Out of scope

- Title-screen start/continue UI or any React wiring (feature 2)
- Progression rules, unlock order, mastery updates, chapter seed data, derived rank (feature 5)
- Save export/import, IndexedDB, cloud sync, accounts
- Settings (text size, sound) — deferred; do not put them on `PlayerSave`
- Schema migrations (none until after first playtest; see Notes)
- New npm dependencies, backend, or state libraries
- Deleting or rewriting a bad save on load

## Build loop

- `workflow.stepReview`: **feature** — pause after each build step for review before the next
- `workflow.checkpointCommits`: **disabled** — no mid-feature commits; `/complete` creates the work commit
- After the last step, stop for `/check` (and audit if requested); do not implement beyond this spec

## Build steps

- [x] 1. Fix empty-suite behavior in `vite.config.ts` (remove `passWithNoTests` / do not allow pass-with-no-tests). Add `src/game/save/` types for `PlayerSave`, `ChapterState`, `ChallengeStatus`, `ChipState`, and `LocationState`, plus `CURRENT_SCHEMA_VERSION` and `createDefaultPlayerSave()` that returns empty collections and `schemaVersion: 1` (no `rank`, no `settings`). Add a focused test for the default factory so the suite is not empty.
  - **Done when:** with no matching tests, `pnpm test` would fail; with the new default-factory test, `pnpm test` and `pnpm build` pass; default save matches the field set below.

- [x] 2. Add deep parse/validate (`unknown` → `PlayerSave | null`) that checks `schemaVersion === CURRENT_SCHEMA_VERSION` and **every** record entry and array item against its union or type; one bad entry rejects the whole save.
  - **Done when:** `pnpm test` covers valid default through parse, wrong version, missing fields, wrong types, non-object input, and a valid-looking save with one bad chip `level`; all new tests pass.

- [x] 3. Add `SaveStore` and `createLocalStorageSaveStore({ key?, getStorage? }?)` (default key `unit-zero.player-save`; default getter reads `globalThis.localStorage` inside the try). Implement load/save/clear with the safe behaviors above; export the public API from `src/game/save/index.ts`.
  - **Done when:** `pnpm test` covers missing key, corrupt JSON, invalid payload (**key left in place**), successful save→load, `save` true/false, clear, Storage method throws, and a **storage getter that throws**; `pnpm test` and `pnpm build` both pass.

**Status:** verified

## Files / areas

- `vite.config.ts` — empty-suite must fail
- `src/game/save/` (new) — types, default factory, parse, `SaveStore`, localStorage implementation, colocated `*.test.ts`, barrel `index.ts`
- No changes required to `src/App.tsx` / `src/main.tsx` in this feature; callers arrive in features 2 and 5
- Do not add `src/lib/` or `src/types/` (coding standards)

## Data / contracts

**`PlayerSave` (schemaVersion 1):**

| Field | Type | Notes |
| --- | --- | --- |
| `schemaVersion` | `number` | Must equal `1` on load |
| `upgrades` | `string[]` | Default `[]`; each item must be a string |
| `chapterStates` | `Record<string, ChapterState>` | Default `{}`; every value deeply validated |
| `conceptChips` | `Record<string, ChipState>` | Default `{}`; every value deeply validated |
| `locations` | `Record<string, LocationState>` | Default `{}`; every value deeply validated |
| `notebookClueIds` | `string[]` | Default `[]`; each item must be a string |
| `storyFlags` | `Record<string, boolean \| string>` | Default `{}`; every value boolean or string |
| `choiceFlags` | `Record<string, string>` | Default `{}`; every value string |
| `unlockedVoiceLogIds` | `string[]` | Default `[]`; each item must be a string |

Not on the save: `rank` (derived from chapter progress in feature 5), `settings` (deferred).

**`ChapterState`:** `status`: `locked` \| `available` \| `in_progress` \| `completed`; `challenges`: `{ ore, smelt, refine }` each `locked` \| `available` \| `passed`.

**`ChipState`:** `level`: `dark` \| `outline` \| `half_lit` \| `lit` \| `refined`.

**`LocationState`:** `unlocked: boolean`; `mapMarkerVisible: boolean`.

**`SaveStore`:**

- `load(): PlayerSave | null` — on invalid JSON, failed shape, or wrong `schemaVersion`, return `null` and **do not** remove or rewrite the key
- `save(data: PlayerSave): boolean` — JSON.stringify into the key; `true` on success, `false` if Storage threw; never throws
- `clear(): void` — remove the key; on Storage error, no-op; never throws

**Storage:** key `unit-zero.player-save`. Serialized form is JSON of `PlayerSave`. Only `src/game/save/` may touch this key. Access storage only inside try blocks via `getStorage()` (default: `() => globalThis.localStorage`). Tests inject an in-memory Storage and a getter that throws.

**Client vs server:** client-only; no network. Persisted data is device-local and trusted for this MVP (no auth).

## Testing

- Command: `pnpm test` (Vitest, `environment: 'node'`, `src/**/*.test.ts`)
- Empty suite must fail (coding standards); no `passWithNoTests: true`
- No Browser tests command — do not add browser automation
- Required cases: parse happy path; deep reject (including one bad chip level in an otherwise valid save); reject bad version/shape; load missing → null; load corrupt/invalid → null **without** clearing the key; save/load round-trip; `save` returns false when Storage throws; clear; storage **getter** throws → safe fallbacks
- Final gate this checkout: `pnpm test` and `pnpm build` (no `Verify` command in `AGENTS.md` yet)
- Observed before spec: `pnpm test` exit 0 with no `src/**/*.test.ts` files (incorrect empty-suite behavior); `pnpm build` exit 0 on Vite scaffold

## Notes for the AI

- This v1 payload is a starting point. Feature 5 owns the progression fields and may change v1 directly, because no player saves exist yet. No migration needed until after the first playtest.
- Follow `docs/01_GAME_DESIGN_PLAN.md`; do not invent progression defaults beyond the empty/default save above. Rank is not stored (design plan §3 ties it to chapter bands).
- Overview still lists `rank` / `settings` on `PlayerSave`; this feature intentionally drops both — update overview only if a later `/overview` pass is requested, not in this feature’s code steps
- Keep logic plain TypeScript outside React; no Zustand/Redux or new deps
- Prefer a small number of files under `src/game/save/`; no abstraction beyond `SaveStore` + one localStorage factory
- Proportional engineering: in-memory mock Storage in tests, not jsdom/happy-dom
- Branch is `feature/save-system`; do not rename or bump attempt


<!-- blueprint:completion {"schemaVersion":2,"specBytes":8068,"specSha256":"06cc75dd1fea928ab0b7b63c7b43ad1c69a68bcca892c59e1b56518690fecc37","branch":"refs/heads/feature/save-system","head":"bb7551ff190d4c6eb4125f8a9af70e97a9d11388","baseRef":"refs/heads/main","baseCommit":"bb7551ff190d4c6eb4125f8a9af70e97a9d11388","sourceTree":"7ff7d949fbfb29b1d66e81a7d07b025a0166798d","landing":"local-merge"} -->
