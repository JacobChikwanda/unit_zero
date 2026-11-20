export type ChipLevel = 'dark' | 'outline' | 'half_lit' | 'lit' | 'refined'

export interface ChapterState {
  challenges: {
    ore: boolean
    smelt: boolean
    refine: boolean
  }
}

export interface ChipState {
  level: ChipLevel
}

export interface LocationState {
  unlocked: boolean
  mapMarkerVisible: boolean
}

export interface PlayerSave {
  schemaVersion: number
  upgrades: string[]
  chapterStates: Record<string, ChapterState>
  conceptChips: Record<string, ChipState>
  locations: Record<string, LocationState>
  notebookClueIds: string[]
  storyFlags: Record<string, boolean | string>
  choiceFlags: Record<string, string>
  unlockedVoiceLogIds: string[]
}
