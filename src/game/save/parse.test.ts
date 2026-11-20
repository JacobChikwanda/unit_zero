import { describe, expect, it } from 'vitest'
import { createDefaultPlayerSave } from './defaults'
import { parsePlayerSave } from './parse'

describe('parsePlayerSave', () => {
  it('accepts a default save', () => {
    const save = createDefaultPlayerSave()
    expect(parsePlayerSave(save)).toEqual(save)
  })

  it('accepts a fully populated valid save', () => {
    const save = {
      ...createDefaultPlayerSave(),
      upgrades: ['antenna'],
      chapterStates: {
        ch01: {
          challenges: { ore: true, smelt: false, refine: false },
        },
      },
      conceptChips: { 'prob.bayes': { level: 'half_lit' } },
      locations: { kansenshi: { unlocked: true, mapMarkerVisible: false } },
      notebookClueIds: ['clue-1'],
      storyFlags: { metBupe: true, note: 'ok' },
      choiceFlags: { path: 'left' },
      unlockedVoiceLogIds: ['vl-1'],
    }

    expect(parsePlayerSave(save)).toEqual(save)
  })

  it('rejects non-object input', () => {
    expect(parsePlayerSave(null)).toBeNull()
    expect(parsePlayerSave('save')).toBeNull()
    expect(parsePlayerSave([])).toBeNull()
  })

  it('rejects the wrong schemaVersion', () => {
    expect(
      parsePlayerSave({ ...createDefaultPlayerSave(), schemaVersion: 2 }),
    ).toBeNull()
  })

  it('rejects missing required fields', () => {
    const { upgrades: _upgrades, ...rest } = createDefaultPlayerSave()
    expect(parsePlayerSave(rest)).toBeNull()
  })

  it('rejects wrong field types', () => {
    expect(
      parsePlayerSave({ ...createDefaultPlayerSave(), upgrades: [1] }),
    ).toBeNull()
    expect(
      parsePlayerSave({ ...createDefaultPlayerSave(), storyFlags: { a: 1 } }),
    ).toBeNull()
  })

  it('rejects an otherwise valid save with one bad chip level', () => {
    const save = {
      ...createDefaultPlayerSave(),
      conceptChips: {
        'prob.bayes': { level: 'half_lit' },
        'search.astar': { level: 'glowing' },
      },
    }

    expect(parsePlayerSave(save)).toBeNull()
  })

  it('rejects chapter state that still includes status', () => {
    const save = {
      ...createDefaultPlayerSave(),
      chapterStates: {
        ch01: {
          status: 'available',
          challenges: { ore: true, smelt: false, refine: false },
        },
      },
    }

    expect(parsePlayerSave(save)).toBeNull()
  })

  it('rejects string challenge statuses', () => {
    const save = {
      ...createDefaultPlayerSave(),
      chapterStates: {
        ch01: {
          challenges: { ore: 'passed', smelt: false, refine: false },
        },
      },
    }

    expect(parsePlayerSave(save)).toBeNull()
  })
})
