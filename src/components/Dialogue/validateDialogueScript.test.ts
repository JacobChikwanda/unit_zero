import { describe, expect, it } from 'vitest'
import {
  demoDialogue,
  demoSpeakers,
} from '../../chapters/demoDialogue'
import type { DialogueScript, Speakers } from './dialogueTypes'
import { validateDialogueScript } from './dialogueTypes'

const speakers: Speakers = {
  a: 'Speaker A',
  b: 'Speaker B',
}

function linearScript(
  overrides: Partial<DialogueScript> = {},
): DialogueScript {
  return {
    id: 'linear',
    startNodeId: 'n1',
    nodes: {
      n1: { speaker: 'a', text: 'One', next: 'n2' },
      n2: { speaker: 'b', text: 'Two', end: { event: 'done' } },
    },
    ...overrides,
  }
}

describe('validateDialogueScript', () => {
  it('returns no errors for a valid linear script', () => {
    expect(validateDialogueScript(linearScript(), speakers)).toEqual([])
  })

  it('returns no errors for the demo fixture', () => {
    expect(validateDialogueScript(demoDialogue, demoSpeakers)).toEqual(
      [],
    )
  })

  it('errors when startNodeId is missing', () => {
    expect(
      validateDialogueScript(
        linearScript({ startNodeId: 'missing' }),
        speakers,
      ),
    ).toContain('startNodeId not found: missing')
  })

  it('errors when a node next is missing', () => {
    const script = linearScript({
      nodes: {
        n1: { speaker: 'a', text: 'One', next: 'gone' },
        n2: { speaker: 'b', text: 'Two', end: { event: 'done' } },
      },
    })
    expect(validateDialogueScript(script, speakers)).toContain(
      'next not found from node n1: gone',
    )
  })

  it('errors when a choice next is missing', () => {
    const script: DialogueScript = {
      id: 'choice-next',
      startNodeId: 'n1',
      nodes: {
        n1: {
          speaker: 'a',
          text: 'Pick',
          choices: [
            { id: 'c1', text: 'Go', next: 'gone' },
            { id: 'c2', text: 'Stop', end: { event: 'done' } },
          ],
        },
      },
    }
    expect(validateDialogueScript(script, speakers)).toContain(
      'next not found from choice c1 on node n1: gone',
    )
  })

  it('errors when a speaker is unknown', () => {
    const script = linearScript({
      nodes: {
        n1: { speaker: 'ghost', text: 'One', next: 'n2' },
        n2: { speaker: 'b', text: 'Two', end: { event: 'done' } },
      },
    })
    expect(validateDialogueScript(script, speakers)).toContain(
      'unknown speaker on node n1: ghost',
    )
  })

  it('errors when a node has none of next, choices, or end', () => {
    const script: DialogueScript = {
      id: 'none',
      startNodeId: 'n1',
      nodes: {
        n1: { speaker: 'a', text: 'Stuck' },
      },
    }
    expect(validateDialogueScript(script, speakers)).toContain(
      'node n1 must have exactly one of next, choices, or end',
    )
  })

  it('errors when a node has more than one of next, choices, or end', () => {
    const script: DialogueScript = {
      id: 'both',
      startNodeId: 'n1',
      nodes: {
        n1: {
          speaker: 'a',
          text: 'Both',
          next: 'n2',
          end: { event: 'done' },
        },
        n2: { speaker: 'b', text: 'Two', end: { event: 'done' } },
      },
    }
    expect(validateDialogueScript(script, speakers)).toContain(
      'node n1 must have exactly one of next, choices, or end',
    )
  })

  it('errors when choices is an empty array', () => {
    const script: DialogueScript = {
      id: 'empty-choices',
      startNodeId: 'n1',
      nodes: {
        n1: { speaker: 'a', text: 'None', choices: [] },
      },
    }
    expect(validateDialogueScript(script, speakers)).toContain(
      'node n1 choices must not be empty',
    )
  })

  it('errors when choice ids are duplicated within a node', () => {
    const script: DialogueScript = {
      id: 'dup-choice',
      startNodeId: 'n1',
      nodes: {
        n1: {
          speaker: 'a',
          text: 'Pick',
          choices: [
            { id: 'same', text: 'A', end: { event: 'a' } },
            { id: 'same', text: 'B', end: { event: 'b' } },
          ],
        },
      },
    }
    expect(validateDialogueScript(script, speakers)).toContain(
      'duplicate choice id on node n1: same',
    )
  })

  it('errors when a choice has neither next nor end', () => {
    const script: DialogueScript = {
      id: 'choice-none',
      startNodeId: 'n1',
      nodes: {
        n1: {
          speaker: 'a',
          text: 'Pick',
          choices: [
            { id: 'c1', text: 'Nope' },
            { id: 'c2', text: 'Stop', end: { event: 'done' } },
          ],
        },
      },
    }
    expect(validateDialogueScript(script, speakers)).toContain(
      'choice c1 on node n1 must have exactly one of next or end',
    )
  })

  it('errors when a choice has both next and end', () => {
    const script: DialogueScript = {
      id: 'choice-both',
      startNodeId: 'n1',
      nodes: {
        n1: {
          speaker: 'a',
          text: 'Pick',
          choices: [
            {
              id: 'c1',
              text: 'Both',
              next: 'n2',
              end: { event: 'done' },
            },
          ],
        },
        n2: { speaker: 'b', text: 'Two', end: { event: 'done' } },
      },
    }
    expect(validateDialogueScript(script, speakers)).toContain(
      'choice c1 on node n1 must have exactly one of next or end',
    )
  })

  it('errors when a node cannot reach an end', () => {
    const script: DialogueScript = {
      id: 'no-end',
      startNodeId: 'n1',
      nodes: {
        n1: { speaker: 'a', text: 'Loop', next: 'n2' },
        n2: { speaker: 'b', text: 'Back', next: 'n1' },
      },
    }
    const errors = validateDialogueScript(script, speakers)
    expect(errors).toContain('node cannot reach an end: n1')
    expect(errors).toContain('node cannot reach an end: n2')
  })

  it('allows a loop when an end remains reachable', () => {
    const script: DialogueScript = {
      id: 'loop-ok',
      startNodeId: 'n1',
      nodes: {
        n1: {
          speaker: 'a',
          text: 'Again?',
          choices: [
            { id: 'again', text: 'Again', next: 'n1' },
            { id: 'stop', text: 'Stop', end: { event: 'done' } },
          ],
        },
      },
    }
    expect(validateDialogueScript(script, speakers)).toEqual([])
  })

  it('errors when a node is unreachable from start', () => {
    const script: DialogueScript = {
      id: 'orphan',
      startNodeId: 'n1',
      nodes: {
        n1: { speaker: 'a', text: 'One', end: { event: 'done' } },
        orphan: { speaker: 'b', text: 'Lost', end: { event: 'x' } },
      },
    }
    expect(validateDialogueScript(script, speakers)).toContain(
      'node unreachable from start: orphan',
    )
  })

  it('treats a choice end as an end for reachability', () => {
    const script: DialogueScript = {
      id: 'choice-end-reach',
      startNodeId: 'n1',
      nodes: {
        n1: { speaker: 'a', text: 'One', next: 'n2' },
        n2: {
          speaker: 'b',
          text: 'Pick',
          choices: [{ id: 'stop', text: 'Stop', end: { event: 'done' } }],
        },
      },
    }
    expect(validateDialogueScript(script, speakers)).toEqual([])
  })
})
