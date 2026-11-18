# Build Plan

Features in rough build order. Details come later in `/feature`, which must follow
`project-plan.md` and `docs/01_GAME_DESIGN_PLAN.md`. Chapter features are added only after
that chapter's gameplay spec is approved and saved in `docs/chapters/`.

Pre-build (not features): scaffold, test setup (`/tests`), docs folder.

## Your features

- [x] 1. **Save system** - versioned player save behind a `SaveStore` interface, localStorage first, safe fallback on missing or corrupt data
- [x] 2. **Layout and navigation** - title screen to scene view, 1-bit CSS base and fonts, phone and desktop widths
- [x] 3. **Scene with hotspots** - background image plus clickable, keyboard-reachable hotspots defined in config
- [ ] 4. **Dialogue** - scripted lines by speaker with simple branching choices and end events, logic separate from the component
- [ ] 5. **Progression model** - chapter and Ore/Smelt/Refine states, unlock order, mastery chips, upgrades, saved through the save system
