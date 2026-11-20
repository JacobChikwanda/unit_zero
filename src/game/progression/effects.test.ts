import { describe, expect, it } from 'vitest'
import { createDefaultPlayerSave } from '../save/defaults'
import { parsePlayerSave } from '../save/parse'
import { createLocalStorageSaveStore } from '../save/save-store'
import type { PlayerSave } from '../save/types'
import { applyEffect, applyEvent } from './effects'
import type { Effect, EventEffectMap } from './types'
import { CHIP_LADDER } from './types'

function memoryStorage(initial: Record<string, string> = {}): Storage {
  const map = new Map<string, string>(Object.entries(initial))
  return {
    get length() {
      return map.size
    },
    clear() {
      map.clear()
    },
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null
    },
    key(index: number) {
      return [...map.keys()][index] ?? null
    },
    removeItem(key: string) {
      map.delete(key)
    },
    setItem(key: string, value: string) {
      map.set(key, value)
    },
  }
}

describe('applyEffect', () => {
  it('passChallenge marks an available challenge and no-ops otherwise', () => {
    const save = createDefaultPlayerSave()
    const afterOre = applyEffect(save, {
      type: 'passChallenge',
      chapterId: 'ch01',
      challenge: 'ore',
    })
    expect(afterOre.chapterStates.ch01.challenges).toEqual({
      ore: true,
      smelt: false,
      refine: false,
    })
    expect(afterOre).not.toBe(save)

    expect(
      applyEffect(afterOre, {
        type: 'passChallenge',
        chapterId: 'ch01',
        challenge: 'ore',
      }),
    ).toBe(afterOre)

    expect(
      applyEffect(save, {
        type: 'passChallenge',
        chapterId: 'ch01',
        challenge: 'smelt',
      }),
    ).toBe(save)

    expect(
      applyEffect(save, {
        type: 'passChallenge',
        chapterId: 'ch02',
        challenge: 'ore',
      }),
    ).toBe(save)
  })

  it('raiseChip takes the higher of current and to on CHIP_LADDER', () => {
    const save = createDefaultPlayerSave()
    const toHalfLit: Effect = {
      type: 'raiseChip',
      conceptId: 'c1',
      to: 'half_lit',
    }
    const raised = applyEffect(save, toHalfLit)
    expect(raised.conceptChips.c1.level).toBe('half_lit')

    const atLit: PlayerSave = {
      ...createDefaultPlayerSave(),
      conceptChips: { c1: { level: 'lit' } },
    }
    expect(
      applyEffect(atLit, {
        type: 'raiseChip',
        conceptId: 'c1',
        to: 'outline',
      }),
    ).toBe(atLit)

    expect(applyEffect(raised, toHalfLit)).toBe(raised)
    expect(CHIP_LADDER.indexOf('half_lit')).toBeGreaterThan(
      CHIP_LADDER.indexOf('dark'),
    )
  })

  it('grantUpgrade, unlockLocation, addClue, flags, and voice logs are idempotent', () => {
    const save = createDefaultPlayerSave()

    const withUpgrade = applyEffect(save, {
      type: 'grantUpgrade',
      upgradeId: 'u1',
    })
    expect(withUpgrade.upgrades).toEqual(['u1'])
    expect(
      applyEffect(withUpgrade, { type: 'grantUpgrade', upgradeId: 'u1' }),
    ).toBe(withUpgrade)

    const withLocation = applyEffect(save, {
      type: 'unlockLocation',
      locationId: 'kansenshi',
    })
    expect(withLocation.locations.kansenshi).toEqual({
      unlocked: true,
      mapMarkerVisible: true,
    })
    expect(
      applyEffect(withLocation, {
        type: 'unlockLocation',
        locationId: 'kansenshi',
      }),
    ).toBe(withLocation)

    const withClue = applyEffect(save, { type: 'addClue', clueId: 'clue-1' })
    expect(withClue.notebookClueIds).toEqual(['clue-1'])
    expect(
      applyEffect(withClue, { type: 'addClue', clueId: 'clue-1' }),
    ).toBe(withClue)

    const withFlag = applyEffect(save, {
      type: 'setStoryFlag',
      key: 'demo.progressed',
      value: true,
    })
    expect(withFlag.storyFlags['demo.progressed']).toBe(true)
    expect(
      applyEffect(withFlag, {
        type: 'setStoryFlag',
        key: 'demo.progressed',
        value: true,
      }),
    ).toBe(withFlag)

    const withChoice = applyEffect(save, {
      type: 'recordChoice',
      key: 'path',
      value: 'left',
    })
    expect(withChoice.choiceFlags.path).toBe('left')
    expect(
      applyEffect(withChoice, {
        type: 'recordChoice',
        key: 'path',
        value: 'left',
      }),
    ).toBe(withChoice)

    const withLog = applyEffect(save, {
      type: 'unlockVoiceLog',
      voiceLogId: 'vl-1',
    })
    expect(withLog.unlockedVoiceLogIds).toEqual(['vl-1'])
    expect(
      applyEffect(withLog, {
        type: 'unlockVoiceLog',
        voiceLogId: 'vl-1',
      }),
    ).toBe(withLog)
  })
})

describe('applyEvent', () => {
  const eventMap: EventEffectMap = {
    'demo-path-one-end': [
      { type: 'setStoryFlag', key: 'demo.progressed', value: true },
    ],
    multi: [
      { type: 'grantUpgrade', upgradeId: 'u1' },
      { type: 'addClue', clueId: 'c1' },
    ],
  }

  it('applies known events and no-ops unknown ones', () => {
    const save = createDefaultPlayerSave()
    const afterUnknown = applyEvent(save, eventMap, 'missing-event')
    expect(afterUnknown).toBe(save)

    const afterKnown = applyEvent(save, eventMap, 'demo-path-one-end')
    expect(afterKnown.storyFlags['demo.progressed']).toBe(true)

    const afterMulti = applyEvent(save, eventMap, 'multi')
    expect(afterMulti.upgrades).toEqual(['u1'])
    expect(afterMulti.notebookClueIds).toEqual(['c1'])
  })
})

describe('progressed save round trip', () => {
  it('save -> load keeps a progressed PlayerSave', () => {
    const effects: Effect[] = [
      { type: 'passChallenge', chapterId: 'ch01', challenge: 'ore' },
      { type: 'passChallenge', chapterId: 'ch01', challenge: 'smelt' },
      { type: 'passChallenge', chapterId: 'ch01', challenge: 'refine' },
      { type: 'raiseChip', conceptId: 'c1', to: 'half_lit' },
      { type: 'grantUpgrade', upgradeId: 'u1' },
      { type: 'unlockLocation', locationId: 'kansenshi' },
      { type: 'addClue', clueId: 'clue-1' },
      { type: 'setStoryFlag', key: 'demo.progressed', value: true },
      { type: 'recordChoice', key: 'path', value: 'one' },
      { type: 'unlockVoiceLog', voiceLogId: 'vl-1' },
    ]

    const progressed = effects.reduce(
      (save, effect) => applyEffect(save, effect),
      createDefaultPlayerSave(),
    )

    const storage = memoryStorage()
    const store = createLocalStorageSaveStore({ getStorage: () => storage })
    expect(store.save(progressed)).toBe(true)

    const loaded = store.load()
    expect(loaded).toEqual(progressed)
    expect(parsePlayerSave(loaded)).toEqual(progressed)
  })
})
