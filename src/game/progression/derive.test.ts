import { describe, expect, it } from 'vitest'
import { createDefaultPlayerSave } from '../save/defaults'
import type { PlayerSave } from '../save/types'
import { CHAPTER_ORDER } from './chapterOrder'
import {
  countCompletedChapters,
  getChallengeAvailability,
  getChapterStatus,
  getRank,
} from './derive'

function withRefinePassed(chapterIds: string[]): PlayerSave {
  const save = createDefaultPlayerSave()
  const chapterStates: PlayerSave['chapterStates'] = {}
  for (const chapterId of chapterIds) {
    chapterStates[chapterId] = {
      challenges: { ore: true, smelt: true, refine: true },
    }
  }
  return { ...save, chapterStates }
}

describe('CHAPTER_ORDER', () => {
  it('lists ch01-ch19 then finale', () => {
    expect(CHAPTER_ORDER).toHaveLength(20)
    expect(CHAPTER_ORDER[0]).toBe('ch01')
    expect(CHAPTER_ORDER[18]).toBe('ch19')
    expect(CHAPTER_ORDER[19]).toBe('finale')
  })
})

describe('getChapterStatus', () => {
  it('marks ch01 available on an empty save', () => {
    const save = createDefaultPlayerSave()
    expect(getChapterStatus(save, 'ch01')).toBe('available')
    expect(getChapterStatus(save, 'ch02')).toBe('locked')
  })

  it('marks a chapter completed when refine is passed', () => {
    const save = withRefinePassed(['ch01'])
    expect(getChapterStatus(save, 'ch01')).toBe('completed')
    expect(getChapterStatus(save, 'ch02')).toBe('available')
    expect(getChapterStatus(save, 'ch03')).toBe('locked')
  })

  it('locks unknown chapter ids', () => {
    expect(getChapterStatus(createDefaultPlayerSave(), 'unknown')).toBe(
      'locked',
    )
  })
})

describe('getChallengeAvailability', () => {
  it('locks all challenges when the chapter is locked', () => {
    const save = createDefaultPlayerSave()
    expect(getChallengeAvailability(save, 'ch02', 'ore')).toBe('locked')
    expect(getChallengeAvailability(save, 'ch02', 'smelt')).toBe('locked')
    expect(getChallengeAvailability(save, 'ch02', 'refine')).toBe('locked')
  })

  it('makes ore available when the chapter is available', () => {
    const save = createDefaultPlayerSave()
    expect(getChallengeAvailability(save, 'ch01', 'ore')).toBe('available')
    expect(getChallengeAvailability(save, 'ch01', 'smelt')).toBe('locked')
    expect(getChallengeAvailability(save, 'ch01', 'refine')).toBe('locked')
  })

  it('unlocks smelt after ore and refine after smelt', () => {
    const save: PlayerSave = {
      ...createDefaultPlayerSave(),
      chapterStates: {
        ch01: { challenges: { ore: true, smelt: false, refine: false } },
      },
    }
    expect(getChallengeAvailability(save, 'ch01', 'ore')).toBe('passed')
    expect(getChallengeAvailability(save, 'ch01', 'smelt')).toBe('available')
    expect(getChallengeAvailability(save, 'ch01', 'refine')).toBe('locked')

    const afterSmelt: PlayerSave = {
      ...save,
      chapterStates: {
        ch01: { challenges: { ore: true, smelt: true, refine: false } },
      },
    }
    expect(getChallengeAvailability(afterSmelt, 'ch01', 'refine')).toBe(
      'available',
    )
  })

  it('keeps challenges available on a completed chapter that still reports passed', () => {
    const save = withRefinePassed(['ch01'])
    expect(getChallengeAvailability(save, 'ch01', 'ore')).toBe('passed')
    expect(getChallengeAvailability(save, 'ch01', 'smelt')).toBe('passed')
    expect(getChallengeAvailability(save, 'ch01', 'refine')).toBe('passed')
  })
})

describe('getRank', () => {
  it('uses completed-chapter count boundaries 3/4, 8/9, and 13/14', () => {
    expect(getRank(withRefinePassed([]))).toBe('Apprentice')
    expect(
      getRank(withRefinePassed(CHAPTER_ORDER.slice(0, 3).map(String))),
    ).toBe('Apprentice')
    expect(
      getRank(withRefinePassed(CHAPTER_ORDER.slice(0, 4).map(String))),
    ).toBe('Technician')
    expect(
      getRank(withRefinePassed(CHAPTER_ORDER.slice(0, 8).map(String))),
    ).toBe('Technician')
    expect(
      getRank(withRefinePassed(CHAPTER_ORDER.slice(0, 9).map(String))),
    ).toBe('Engineer')
    expect(
      getRank(withRefinePassed(CHAPTER_ORDER.slice(0, 13).map(String))),
    ).toBe('Engineer')
    expect(
      getRank(withRefinePassed(CHAPTER_ORDER.slice(0, 14).map(String))),
    ).toBe('Architect')
    expect(
      getRank(withRefinePassed(CHAPTER_ORDER.map(String))),
    ).toBe('Architect')
  })

  it('counts only refine-passed chapters', () => {
    const save: PlayerSave = {
      ...createDefaultPlayerSave(),
      chapterStates: {
        ch01: { challenges: { ore: true, smelt: true, refine: false } },
      },
    }
    expect(countCompletedChapters(save)).toBe(0)
    expect(getRank(save)).toBe('Apprentice')
  })
})
