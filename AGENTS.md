# AGENTS.md

Instructions for AI coding agents working in this project. This is the cross-tool
entry point. Cursor reads this file as project agent guidance. Compatible tools
such as Codex, Google Antigravity, and OpenCode read it too.

Cursor, Claude Code, Codex, and every other AI tool must not add AI attribution
to commits or pull requests, including
`Co-authored-by: Cursor <cursoragent@cursor.com>`, other AI `Co-Authored-By`
trailers, `Made-with: Cursor`, or generated-by signatures. Preserve genuine
human attribution. See
[Commit and PR attribution](blueprint/context/ai-interaction.md#commit-and-pr-attribution)
for Cursor, Claude Code, and optional tool settings.

## What this is

A description of your project and the problem it solves.

This project is built with the **AI Blueprint**, a workflow layer, not an
app skeleton. To start a new project, scaffold the app first in an empty folder
(create-next-app, Vite, etc.), then overlay these files on top. Never run a
framework scaffolder inside a directory that already holds the blueprint files
(`AGENTS.md`, `.agents/`, `blueprint/`); it fails because the directory isn't
empty.

The workflow is defined by the local skills and context files below.

## Proportional engineering

Build for established requirements, not hypothetical scale, threats, or future
flexibility. Reuse existing code, the standard library, native platform features,
and installed dependencies before adding machinery.

- Unknown scale or extensibility defaults to the smaller reversible design. Do
  not infer enterprise, multi-tenant, hostile-user, or compliance requirements.
- Derive trust and data-integrity boundaries from actual reachability: untrusted
  input, auth/session/ownership, shared persisted data, destructive operations,
  payments, secrets, and sensitive data.
- Ask only when an unknown materially changes behavior, architecture, persisted
  data, interoperability, a real security boundary, or cost. Otherwise choose the
  simplest repository-native implementation.
- Add an abstraction, dependency, service, configuration surface, compatibility
  layer, or security mechanism only for a current requirement.
- Simplicity never removes real trust-boundary validation, data-loss prevention,
  accessibility, explicit security requirements, configured tests, or project rules.
- Stack-specific template standards apply only when the project uses that stack.

## Read these when relevant

- `blueprint/config.json` - deterministic project workflow settings
- `blueprint/workflow.md` - workflow reference for configuration, skills, dashboard activity, and checks
- `blueprint/context/project-overview.md` - the project's source of truth
- `blueprint/context/coding-standards.md` - read before changing code
- `blueprint/context/ai-interaction.md` - read when running the Blueprint workflow
- `blueprint/context/current-feature.md` - the one feature or fix being built in this checkout

Reuse relevant context already loaded in the session. Blueprint skills load the
other context files only when the current command needs them.

## Workflow

Build one feature or fix at a time, behind review gates. The feature
loop is `/feature` -> `/implement` -> `/check` -> `/audit current` ->
`/complete`; approve the Feature spec before Implement. Each command is a local
skill at `.agents/skills/<skill>/SKILL.md` that carries its own instructions.
In Cursor, ask for the skill by name or follow the matching `SKILL.md`. Other
tools may use `/feature` or `$feature` depending on the adapter.

Skills: `adopt`, `audit`, `blueprint-doctor`, `blueprint-status`, `brief`,
`check`, `ci`, `complete`, `debug`, `discovery`, `explore`, `feature`, `fix`,
`implement`, `onboard`, `overview`, `prototype`, and `tests`, plus the
explicit-only `autopilot` and `continuous`.

- Keep one active work item per checkout. Parallel work needs its own clone or
  Git worktree and branch; never replace another worker's active spec.
- `blueprint/config.json` can make review or verification stricter and tune
  local workflow settings. It never grants permission to commit, merge, push,
  deploy, publish, send, delete data, waive a failing check, or accept a finding.
- Never create or edit `blueprint/.state/run.json` directly. Tracked skills
  record dashboard activity through the managed helper.

## Commands

- Dev server: `pnpm dev` (http://localhost:5173)
- Build: `pnpm build`
- Preview: `pnpm preview`
- Lint: `pnpm lint`

No unit test command is configured yet. Testing is opt-in; run `/tests` to add a
runner and update this section with the real test commands.

Browser testing is also opt-in. Run `/tests browser` to add or normalize a
browser harness and document its exact command as `Browser tests`. Check and
Continuous Mode can then reuse it without installing tooling mid-feature.
