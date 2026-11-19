import type {
  DialogueScript,
  Speakers,
} from '../components/Dialogue/dialogueTypes'

/** Non-story demo speakers: abstract labels only. */
export const demoSpeakers: Speakers = {
  a: 'Speaker A',
  b: 'Speaker B',
}

/** Non-story demo script: one branch, one mid-choice event. */
export const demoDialogue: DialogueScript = {
  id: 'demo-dialogue',
  startNodeId: 'start',
  nodes: {
    start: {
      speaker: 'a',
      text: 'This is a demo line.',
      next: 'branch',
    },
    branch: {
      speaker: 'b',
      text: 'Choose a path.',
      choices: [
        {
          id: 'path-one',
          text: 'Path one',
          next: 'end-one',
          event: 'demo-path-one',
        },
        {
          id: 'path-two',
          text: 'Path two',
          end: { event: 'demo-path-two-end' },
        },
      ],
    },
    'end-one': {
      speaker: 'a',
      text: 'Path one ends here.',
      end: { event: 'demo-path-one-end' },
    },
  },
}
