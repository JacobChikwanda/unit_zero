import type { PlayerSave } from './types'

export const CURRENT_SCHEMA_VERSION = 1

export function createDefaultPlayerSave(): PlayerSave {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    upgrades: [],
    chapterStates: {},
    conceptChips: {},
    locations: {},
    notebookClueIds: [],
    storyFlags: {},
    choiceFlags: {},
    unlockedVoiceLogIds: [],
  }
}
