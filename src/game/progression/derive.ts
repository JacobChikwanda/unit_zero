import type { ChapterState, PlayerSave } from '../save/types'
import { CHAPTER_ORDER } from './chapterOrder'
import type {
  ChallengeAvailability,
  ChallengeId,
  ChapterStatus,
  Rank,
} from './types'

function getChapterProgress(
  save: PlayerSave,
  chapterId: string,
): ChapterState | undefined {
  return save.chapterStates[chapterId]
}

export function isChallengePassed(
  save: PlayerSave,
  chapterId: string,
  challenge: ChallengeId,
): boolean {
  return getChapterProgress(save, chapterId)?.challenges[challenge] === true
}

export function isChapterCompleted(
  save: PlayerSave,
  chapterId: string,
): boolean {
  return isChallengePassed(save, chapterId, 'refine')
}

export function countCompletedChapters(save: PlayerSave): number {
  return CHAPTER_ORDER.filter((chapterId) =>
    isChapterCompleted(save, chapterId),
  ).length
}

export function getChapterStatus(
  save: PlayerSave,
  chapterId: string,
): ChapterStatus {
  if (isChapterCompleted(save, chapterId)) {
    return 'completed'
  }

  const index = CHAPTER_ORDER.indexOf(
    chapterId as (typeof CHAPTER_ORDER)[number],
  )
  if (index === -1) {
    return 'locked'
  }

  if (index === 0) {
    return 'available'
  }

  const previousId = CHAPTER_ORDER[index - 1]
  if (isChapterCompleted(save, previousId)) {
    return 'available'
  }

  return 'locked'
}

export function getChallengeAvailability(
  save: PlayerSave,
  chapterId: string,
  challenge: ChallengeId,
): ChallengeAvailability {
  if (isChallengePassed(save, chapterId, challenge)) {
    return 'passed'
  }

  const chapterStatus = getChapterStatus(save, chapterId)
  if (chapterStatus === 'locked') {
    return 'locked'
  }

  if (challenge === 'ore') {
    return 'available'
  }

  if (challenge === 'smelt') {
    return isChallengePassed(save, chapterId, 'ore') ? 'available' : 'locked'
  }

  return isChallengePassed(save, chapterId, 'smelt') ? 'available' : 'locked'
}

export function getRank(save: PlayerSave): Rank {
  const completed = countCompletedChapters(save)
  if (completed <= 3) {
    return 'Apprentice'
  }
  if (completed <= 8) {
    return 'Technician'
  }
  if (completed <= 13) {
    return 'Engineer'
  }
  return 'Architect'
}
