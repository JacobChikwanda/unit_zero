# Project Plan

> Full game design: `docs/01_GAME_DESIGN_PLAN.md`. Chapter gameplay specs: `docs/chapters/`.
> If this file and the design plan disagree, the design plan wins. Chapter specs are written
> and approved outside this repo (Claude Project "Unit Zero") before any chapter feature is built.

## 1. Problem - What problem are we solving?

Learning AI is hard because it's taught as theory and formulas, cut off from real problems. Students memorise formulas without being able to apply them. Beginners find the subject closed to them.

Unit Zero is a web adventure game that teaches AI from "what is AI?" up to neural networks, language models and deployment. The player switches on Zero, a robot that knows nothing, and rebuilds its mind chapter by chapter in real Ndola and the Copperbelt. Every problem in the story needs a real AI concept to solve it. Finishing the game should mean the player can explain, calculate, apply and critique every core concept.

Principle: the adventure is how you learn; mastery is the goal. Every feature must be fun to interact with, help understanding, and make the player want to continue.

## 2. Users - Who is this for?

- **AI and computer science students** preparing for exams. They need theory and calculation practice on realistic scenarios.
- **Curious beginners** with no AI background, including school leavers.
- Both play the same game. Layered learning serves both: experience → understanding → mastery → optional coding workshop. The main story requires mastery (layer 3).
- First real players: Jacob and a few ZUT students in Ndola, Zambia. Many will play on low-cost Android phones.

## 3. Features - What does the MVP need?

MVP = the foundation plus Chapter 1 ("Waking Zero"). The first 10 minutes are built and playtested before the rest of Chapter 1.

- Title screen and navigation between scenes
- Scenes: background images with clickable hotspots (inspect, talk, collect clues)
- Dialogue with characters, including simple branching choices
- Reusable learning activities: sorting, investigation, choice with justification, Teach it back
- Chapter progression: Learn → Ore → Smelt → Refine → Upgrade
- Zero's brain map: mastery chips per concept
- Upgrades that change Zero's look and abilities
- Voice logs (story mystery) unlocked by progress
- Local save and load, versioned

Later, not MVP: chapters 2–19 and the finale, problem generators for calculation challenges, Morning Shift spaced review, Python workshops, offline support, sound.

## 4. Data - What are we storing?

**Player save** (on the device, versioned schema):
- Chapter states, and per-challenge states for Ore, Smelt and Refine (locked, available, passed)
- Mastery chips per concept (dark, outline, half-lit, lit, refined)
- Upgrades owned. Player rank is not stored: it is derived from chapter progress.
- Unlocked locations and map markers
- Clues in Zero's notebook, story flags, and choices that change the story
- Unlocked voice logs

**Settings:** text size, sound on or off. Deferred: not in the v1 save. Added when a settings UI exists.

**Game content is not stored data.** Chapters, dialogue, activities, answers, hints and explanations are TypeScript files in the repo: typed, reviewable in git diffs and tested. Learning content changes in the chapter spec first, then in code.

**Storage rule:** all saving goes through a `SaveStore` interface in `src/game/save/`. The first implementation uses `localStorage`. Nothing else touches storage, so it can move to IndexedDB or SQLite later without touching the game. Game rules stay in TypeScript, never in storage.

## 5. Tech - What stack are we using?

- Vite + React + TypeScript (strict), pnpm
- Plain CSS for the 1-bit look and simple animations
- Scenes: background images with absolutely positioned HTML hotspots (no canvas)
- KaTeX for formulas (when the first formula appears)
- Vitest for tests
- No backend, database server, game engine, router or state library

Architecture, in three separate layers:
- **Adventure:** `src/components/` (Scene, Dialogue, layout) and `src/chapters/` (content and configuration only)
- **Learning activities:** `src/activities/`. Each receives a problem as props and reports a result through a callback. Answer-checking logic is plain TypeScript with tests.
- **Progression:** `src/game/` (progression rules, save)

## 6. Monetize - How will this make money?

Not decided. The first version is free, with no ads, payments or accounts. Revisit after Chapter 1 is playtested.

## 7. UI/UX - How should this look and feel?

- **1-bit:** pure black on white. No colour, no gradients. The Chrome dino game is the style reference: simple, fast, uncluttered.
- Pixel sprites: Zero is 16×16, townspeople 12×12, buildings as outlines of real Ndola places.
- Meaning never relies on colour: right = solid fill, wrong = inverted flash, uncertain = dotted outline, active = blinking.
- A chunky pixel font for the world. A clean, readable font for dialogue and formulas.
- Zero's sprite changes with each upgrade.
- Mobile-first: works on a small Android phone screen, and on desktop.
- Hotspots can be reached by keyboard and have accessible labels.
- Fast: the first screen loads quickly on a cheap phone and slow mobile data.

## 8. Deployment - Where and how will this ship?

- App type: static single-page web app
- Build command: `pnpm build`
- Output directory: `dist`
- Env vars: none
- Database or storage: none on a server; saves stay on the player's device
- Workers or cron jobs: none
- Health check: not applicable
- Host: any free static host. Not chosen yet.
- Later: service worker for offline play (`vite-plugin-pwa`), after the opening works

## 9. Usage model and constraints (optional)

- Single-player, runs entirely in the browser. No accounts. No data leaves the device.
- Players are trusted; there's nothing to protect between users.
- Early scale: Jacob plus a small group of students for playtesting.
- Non-requirements for MVP: authentication, multi-user, cloud sync, analytics, admin tools.
- Known risk: clearing browser data deletes saves. Save export/import comes later.
