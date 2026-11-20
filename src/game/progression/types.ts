import type { ChipLevel } from '../save/types'

export type ChapterStatus = 'locked' | 'available' | 'completed'

export type ChallengeId = 'ore' | 'smelt' | 'refine'

export type ChallengeAvailability = 'locked' | 'available' | 'passed'

export type Rank =
  | 'Apprentice'
  | 'Technician'
  | 'Engineer'
  | 'Architect'

export type Effect =
  | { type: 'passChallenge'; chapterId: string; challenge: ChallengeId }
  | { type: 'raiseChip'; conceptId: string; to: ChipLevel }
  | { type: 'grantUpgrade'; upgradeId: string }
  | { type: 'unlockLocation'; locationId: string }
  | { type: 'addClue'; clueId: string }
  | { type: 'setStoryFlag'; key: string; value: boolean | string }
  | { type: 'recordChoice'; key: string; value: string }
  | { type: 'unlockVoiceLog'; voiceLogId: string }

export type EventEffectMap = Record<string, Effect[]>

export const CHIP_LADDER: readonly ChipLevel[] = [
  'dark',
  'outline',
  'half_lit',
  'lit',
  'refined',
] as const
