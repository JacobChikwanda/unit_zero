import { describe, expect, it } from 'vitest'
import { createDefaultPlayerSave, CURRENT_SCHEMA_VERSION } from './defaults'

describe('createDefaultPlayerSave', () => {
  it('returns schemaVersion 1 with empty progression collections', () => {
    const save = createDefaultPlayerSave()

    expect(save).toEqual({
      schemaVersion: CURRENT_SCHEMA_VERSION,
      upgrades: [],
      chapterStates: {},
      conceptChips: {},
      locations: {},
      notebookClueIds: [],
      storyFlags: {},
      choiceFlags: {},
      unlockedVoiceLogIds: [],
    })
    expect(save).not.toHaveProperty('rank')
    expect(save).not.toHaveProperty('settings')
  })
})
