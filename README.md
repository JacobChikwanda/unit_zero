# Unit Zero

A 1-bit adventure game set in Ndola where you teach a robot named **Zero** real AI, chapter by chapter, until you can explain and fix the systems that run the city.

The adventure is how you learn. Mastery is the goal.

## The pitch

Ndola's council handed traffic, fire alerts, minibuses and the dam gates to **Apex**, a fast outside AI. The demo was brilliant. Then the failures started, and nobody can say why.

You find a dusty crate stamped *COPPER MIND PROJECT — UNIT 0* behind Mama Bupe's repair shop. Inside is Zero. Apex was given answers. Zero has to be given understanding.

Across 19 chapters you walk Ndola and the Copperbelt, run algorithms by hand, catch classic mistakes, and upgrade Zero until Storm Night at Kafubu Dam.

## What you learn

Search, logic, probability, machine learning, regression, classification, clustering, reinforcement learning and neural networks. Each chapter has one memorable problem. You prove mastery by using the idea in Ore, Smelt and Refine challenges, not by sitting a theory exam.

Optional Python Workshops come later for players who want to write the real code in the browser.

## Look and feel

- Pure black on white, pixel sprites, side-view Ndola with clickable hotspots
- Chunky pixel font for the world, KaTeX for formulas
- Meaning without colour: solid fill, inverted flash, dotted outline, blink
- Fast load on a cheap phone; offline play planned after the opening works

## Stack

- Vite + React + TypeScript
- CSS scenes and HTML hotspots (no canvas at the start)
- KaTeX for formulas
- Vitest for learning logic
- Progress in `localStorage` (no backend or accounts at first)

## Status

Early setup. The Vite app is scaffolded. The full design lives in the docs. First build target: the opening 10 minutes, then Chapters 1–3.

## Docs

| Doc | What it is |
| --- | --- |
| [docs/01_GAME_DESIGN_PLAN.md](docs/01_GAME_DESIGN_PLAN.md) | Story, mastery rules, chapter ladder, architecture and build order |
| `docs/chapters/` | Chapter specs (follow these exactly once present) |

Do not invent dialogue, characters, story events, hints, learning goals, answers, tolerances, scoring or formulas. If something in a spec looks wrong, stop and report it.

## Commands

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build
pnpm preview
pnpm lint
```

No unit test command is wired yet. Add one with the project's `/tests` workflow when Vitest lands.

## Agent notes

Project rules for AI coding agents live in [AGENTS.md](AGENTS.md). Coding conventions are in [blueprint/context/coding-standards.md](blueprint/context/coding-standards.md).
