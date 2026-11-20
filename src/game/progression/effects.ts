import type { ChapterState, ChipLevel, PlayerSave } from '../save/types'
import { getChallengeAvailability } from './derive'
import type { Effect, EventEffectMap } from './types'
import { CHIP_LADDER } from './types'

function emptyChallenges(): ChapterState['challenges'] {
  return { ore: false, smelt: false, refine: false }
}

function chipRank(level: ChipLevel): number {
  return CHIP_LADDER.indexOf(level)
}

export function applyEffect(save: PlayerSave, effect: Effect): PlayerSave {
  switch (effect.type) {
    case 'passChallenge': {
      if (
        getChallengeAvailability(save, effect.chapterId, effect.challenge) !==
        'available'
      ) {
        return save
      }

      const existing = save.chapterStates[effect.chapterId]
      const challenges = {
        ...(existing?.challenges ?? emptyChallenges()),
        [effect.challenge]: true,
      }

      return {
        ...save,
        chapterStates: {
          ...save.chapterStates,
          [effect.chapterId]: { challenges },
        },
      }
    }

    case 'raiseChip': {
      const current = save.conceptChips[effect.conceptId]?.level ?? 'dark'
      const result =
        chipRank(effect.to) > chipRank(current) ? effect.to : current
      if (result === current) {
        return save
      }

      return {
        ...save,
        conceptChips: {
          ...save.conceptChips,
          [effect.conceptId]: { level: result },
        },
      }
    }

    case 'grantUpgrade': {
      if (save.upgrades.includes(effect.upgradeId)) {
        return save
      }
      return {
        ...save,
        upgrades: [...save.upgrades, effect.upgradeId],
      }
    }

    case 'unlockLocation': {
      const existing = save.locations[effect.locationId]
      if (existing?.unlocked === true && existing.mapMarkerVisible === true) {
        return save
      }
      return {
        ...save,
        locations: {
          ...save.locations,
          [effect.locationId]: {
            unlocked: true,
            mapMarkerVisible: true,
          },
        },
      }
    }

    case 'addClue': {
      if (save.notebookClueIds.includes(effect.clueId)) {
        return save
      }
      return {
        ...save,
        notebookClueIds: [...save.notebookClueIds, effect.clueId],
      }
    }

    case 'setStoryFlag': {
      if (save.storyFlags[effect.key] === effect.value) {
        return save
      }
      return {
        ...save,
        storyFlags: {
          ...save.storyFlags,
          [effect.key]: effect.value,
        },
      }
    }

    case 'recordChoice': {
      if (save.choiceFlags[effect.key] === effect.value) {
        return save
      }
      return {
        ...save,
        choiceFlags: {
          ...save.choiceFlags,
          [effect.key]: effect.value,
        },
      }
    }

    case 'unlockVoiceLog': {
      if (save.unlockedVoiceLogIds.includes(effect.voiceLogId)) {
        return save
      }
      return {
        ...save,
        unlockedVoiceLogIds: [
          ...save.unlockedVoiceLogIds,
          effect.voiceLogId,
        ],
      }
    }
  }
}

export function applyEvent(
  save: PlayerSave,
  eventMap: EventEffectMap,
  event: string,
): PlayerSave {
  const effects = eventMap[event]
  if (effects === undefined) {
    return save
  }

  return effects.reduce(
    (current, effect) => applyEffect(current, effect),
    save,
  )
}
