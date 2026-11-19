import { describe, expect, it } from 'vitest'
import {
  advance,
  choose,
  startDialogue,
  type DialogueState,
} from './dialogueEngine'
import type { DialogueScript, Speakers } from './dialogueTypes'

const speakers: Speakers = {
  a: 'Speaker A',
  b: 'Speaker B',
}

const linearScript: DialogueScript = {
  id: 'linear',
  startNodeId: 'n1',
  nodes: {
    n1: { speaker: 'a', text: 'One', next: 'n2' },
    n2: { speaker: 'b', text: 'Two', end: { event: 'done' } },
  },
}

const branchScript: DialogueScript = {
  id: 'branch',
  startNodeId: 'n1',
  nodes: {
    n1: {
      speaker: 'a',
      text: 'Pick a path',
      choices: [
        { id: 'left', text: 'Left', next: 'n2' },
        { id: 'right', text: 'Right', next: 'n3' },
      ],
    },
    n2: { speaker: 'b', text: 'Left path', end: { event: 'left-done' } },
    n3: { speaker: 'b', text: 'Right path', end: { event: 'right-done' } },
  },
}

const loopScript: DialogueScript = {
  id: 'loop',
  startNodeId: 'n1',
  nodes: {
    n1: {
      speaker: 'a',
      text: 'Again?',
      choices: [
        { id: 'again', text: 'Again', next: 'n1' },
        { id: 'stop', text: 'Stop', end: { event: 'loop-done' } },
      ],
    },
  },
}

const choiceEventScript: DialogueScript = {
  id: 'choice-event',
  startNodeId: 'n1',
  nodes: {
    n1: {
      speaker: 'a',
      text: 'Choose',
      choices: [
        {
          id: 'go',
          text: 'Go',
          next: 'n2',
          event: 'picked-go',
        },
        {
          id: 'quit',
          text: 'Quit',
          end: { event: 'quit-end' },
          event: 'picked-quit',
        },
      ],
    },
    n2: { speaker: 'b', text: 'Went', end: { event: 'go-done' } },
  },
}

function expectLine(
  state: DialogueState,
  speakerId: string,
  text: string,
) {
  expect(state.line.speakerId).toBe(speakerId)
  expect(state.line.speakerName).toBe(speakers[speakerId])
  expect(state.line.text).toBe(text)
}

describe('dialogueEngine', () => {
  it('runs a linear script to an end event', () => {
    let state = startDialogue(linearScript, speakers)
    expectLine(state, 'a', 'One')
    expect(state.choices).toEqual([])
    expect(state.ended).toBe(false)

    state = advance(state)
    expectLine(state, 'b', 'Two')
    expect(state.ended).toBe(false)

    state = advance(state)
    expect(state.ended).toBe(true)
    expect(state.endEvent).toBe('done')
    expect(state.events).toEqual([])
  })

  it('runs a branch through either choice', () => {
    let state = startDialogue(branchScript, speakers)
    expect(state.choices.map((c) => c.id)).toEqual(['left', 'right'])

    state = choose(state, 'left')
    expectLine(state, 'b', 'Left path')
    state = advance(state)
    expect(state.ended).toBe(true)
    expect(state.endEvent).toBe('left-done')

    state = startDialogue(branchScript, speakers)
    state = choose(state, 'right')
    expectLine(state, 'b', 'Right path')
    state = advance(state)
    expect(state.endEvent).toBe('right-done')
  })

  it('allows a loop that can still reach an end', () => {
    let state = startDialogue(loopScript, speakers)
    state = choose(state, 'again')
    expectLine(state, 'a', 'Again?')
    expect(state.ended).toBe(false)

    state = choose(state, 'stop')
    expect(state.ended).toBe(true)
    expect(state.endEvent).toBe('loop-done')
  })

  it('fires a choice event when a choice is picked', () => {
    let state = startDialogue(choiceEventScript, speakers)
    state = choose(state, 'go')
    expect(state.events).toEqual(['picked-go'])
    expect(state.ended).toBe(false)
    expectLine(state, 'b', 'Went')

    state = startDialogue(choiceEventScript, speakers)
    state = choose(state, 'quit')
    expect(state.events).toEqual(['picked-quit'])
    expect(state.ended).toBe(true)
    expect(state.endEvent).toBe('quit-end')
  })

  it('ignores advance on a choices node', () => {
    const state = startDialogue(branchScript, speakers)
    const next = advance(state)
    expect(next.currentNodeId).toBe(state.currentNodeId)
    expect(next.ended).toBe(false)
    expect(next.events).toEqual([])
    expect(next.line).toEqual(state.line)
  })

  it('ignores choose with an unknown id', () => {
    const state = startDialogue(branchScript, speakers)
    const next = choose(state, 'missing')
    expect(next.currentNodeId).toBe(state.currentNodeId)
    expect(next.ended).toBe(false)
    expect(next.events).toEqual([])
    expect(next.choices).toEqual(state.choices)
  })

  it('ignores advance and choose after the dialogue has ended', () => {
    let state = startDialogue(linearScript, speakers)
    state = advance(state)
    state = advance(state)
    expect(state.ended).toBe(true)
    expect(state.endEvent).toBe('done')

    const afterAdvance = advance(state)
    expect(afterAdvance.ended).toBe(true)
    expect(afterAdvance.endEvent).toBe('done')
    expect(afterAdvance.events).toEqual([])
    expect(afterAdvance.currentNodeId).toBe(state.currentNodeId)

    const afterChoose = choose(state, 'anything')
    expect(afterChoose.ended).toBe(true)
    expect(afterChoose.endEvent).toBe('done')
    expect(afterChoose.events).toEqual([])
    expect(afterChoose.currentNodeId).toBe(state.currentNodeId)
  })
})
