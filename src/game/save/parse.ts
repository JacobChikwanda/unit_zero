import { CURRENT_SCHEMA_VERSION } from './defaults'
import type {
  ChapterState,
  ChipLevel,
  ChipState,
  LocationState,
  PlayerSave,
} from './types'

const CHIP_LEVELS = new Set<ChipLevel>([
  'dark',
  'outline',
  'half_lit',
  'lit',
  'refined',
])

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function parseChapterState(value: unknown): ChapterState | null {
  if (!isPlainObject(value)) {
    return null
  }

  if ('status' in value) {
    return null
  }

  if (!isPlainObject(value.challenges)) {
    return null
  }

  const { ore, smelt, refine } = value.challenges
  if (
    typeof ore !== 'boolean' ||
    typeof smelt !== 'boolean' ||
    typeof refine !== 'boolean'
  ) {
    return null
  }

  return {
    challenges: { ore, smelt, refine },
  }
}

function parseChipState(value: unknown): ChipState | null {
  if (!isPlainObject(value)) {
    return null
  }

  const level = value.level
  if (typeof level !== 'string' || !CHIP_LEVELS.has(level as ChipLevel)) {
    return null
  }

  return { level: level as ChipLevel }
}

function parseLocationState(value: unknown): LocationState | null {
  if (!isPlainObject(value)) {
    return null
  }

  if (typeof value.unlocked !== 'boolean' || typeof value.mapMarkerVisible !== 'boolean') {
    return null
  }

  return {
    unlocked: value.unlocked,
    mapMarkerVisible: value.mapMarkerVisible,
  }
}

function parseChapterStates(
  value: unknown,
): Record<string, ChapterState> | null {
  if (!isPlainObject(value)) {
    return null
  }

  const result: Record<string, ChapterState> = {}
  for (const [key, entry] of Object.entries(value)) {
    const parsed = parseChapterState(entry)
    if (parsed === null) {
      return null
    }
    result[key] = parsed
  }
  return result
}

function parseConceptChips(value: unknown): Record<string, ChipState> | null {
  if (!isPlainObject(value)) {
    return null
  }

  const result: Record<string, ChipState> = {}
  for (const [key, entry] of Object.entries(value)) {
    const parsed = parseChipState(entry)
    if (parsed === null) {
      return null
    }
    result[key] = parsed
  }
  return result
}

function parseLocations(value: unknown): Record<string, LocationState> | null {
  if (!isPlainObject(value)) {
    return null
  }

  const result: Record<string, LocationState> = {}
  for (const [key, entry] of Object.entries(value)) {
    const parsed = parseLocationState(entry)
    if (parsed === null) {
      return null
    }
    result[key] = parsed
  }
  return result
}

function parseStoryFlags(
  value: unknown,
): Record<string, boolean | string> | null {
  if (!isPlainObject(value)) {
    return null
  }

  const result: Record<string, boolean | string> = {}
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry !== 'boolean' && typeof entry !== 'string') {
      return null
    }
    result[key] = entry
  }
  return result
}

function parseChoiceFlags(value: unknown): Record<string, string> | null {
  if (!isPlainObject(value)) {
    return null
  }

  const result: Record<string, string> = {}
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry !== 'string') {
      return null
    }
    result[key] = entry
  }
  return result
}

export function parsePlayerSave(value: unknown): PlayerSave | null {
  if (!isPlainObject(value)) {
    return null
  }

  if (value.schemaVersion !== CURRENT_SCHEMA_VERSION) {
    return null
  }

  if (!isStringArray(value.upgrades)) {
    return null
  }

  const chapterStates = parseChapterStates(value.chapterStates)
  if (chapterStates === null) {
    return null
  }

  const conceptChips = parseConceptChips(value.conceptChips)
  if (conceptChips === null) {
    return null
  }

  const locations = parseLocations(value.locations)
  if (locations === null) {
    return null
  }

  if (!isStringArray(value.notebookClueIds)) {
    return null
  }

  const storyFlags = parseStoryFlags(value.storyFlags)
  if (storyFlags === null) {
    return null
  }

  const choiceFlags = parseChoiceFlags(value.choiceFlags)
  if (choiceFlags === null) {
    return null
  }

  if (!isStringArray(value.unlockedVoiceLogIds)) {
    return null
  }

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    upgrades: value.upgrades,
    chapterStates,
    conceptChips,
    locations,
    notebookClueIds: value.notebookClueIds,
    storyFlags,
    choiceFlags,
    unlockedVoiceLogIds: value.unlockedVoiceLogIds,
  }
}
