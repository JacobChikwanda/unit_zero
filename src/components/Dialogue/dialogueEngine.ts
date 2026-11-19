import type {
  DialogueScript,
  Speakers,
} from './dialogueTypes'

export type DialogueLine = {
  speakerId: string
  speakerName: string
  text: string
}

export type DialogueChoiceOffer = {
  id: string
  text: string
}

export type DialogueState = {
  script: DialogueScript
  speakers: Speakers
  currentNodeId: string
  line: DialogueLine
  choices: DialogueChoiceOffer[]
  ended: boolean
  events: string[]
  endEvent: string | null
}

function presentNode(
  script: DialogueScript,
  speakers: Speakers,
  nodeId: string,
  events: string[] = [],
  ended = false,
  endEvent: string | null = null,
): DialogueState {
  const node = script.nodes[nodeId]!
  return {
    script,
    speakers,
    currentNodeId: nodeId,
    line: {
      speakerId: node.speaker,
      speakerName: speakers[node.speaker]!,
      text: node.text,
    },
    choices:
      node.choices?.map((choice) => ({
        id: choice.id,
        text: choice.text,
      })) ?? [],
    ended,
    events,
    endEvent,
  }
}

function unchangedNoEvents(state: DialogueState): DialogueState {
  return {
    ...state,
    events: [],
  }
}

export function startDialogue(
  script: DialogueScript,
  speakers: Speakers,
): DialogueState {
  return presentNode(script, speakers, script.startNodeId)
}

export function advance(state: DialogueState): DialogueState {
  if (state.ended) {
    return unchangedNoEvents(state)
  }

  const node = state.script.nodes[state.currentNodeId]!

  if (node.choices !== undefined) {
    return unchangedNoEvents(state)
  }

  if (node.next !== undefined) {
    return presentNode(state.script, state.speakers, node.next)
  }

  if (node.end !== undefined) {
    return presentNode(
      state.script,
      state.speakers,
      state.currentNodeId,
      [],
      true,
      node.end.event,
    )
  }

  return unchangedNoEvents(state)
}

export function choose(
  state: DialogueState,
  choiceId: string,
): DialogueState {
  if (state.ended) {
    return unchangedNoEvents(state)
  }

  const node = state.script.nodes[state.currentNodeId]!
  if (node.choices === undefined) {
    return unchangedNoEvents(state)
  }

  const choice = node.choices.find((entry) => entry.id === choiceId)
  if (!choice) {
    return unchangedNoEvents(state)
  }

  const events = choice.event !== undefined ? [choice.event] : []

  if (choice.next !== undefined) {
    return presentNode(
      state.script,
      state.speakers,
      choice.next,
      events,
    )
  }

  if (choice.end !== undefined) {
    return presentNode(
      state.script,
      state.speakers,
      state.currentNodeId,
      events,
      true,
      choice.end.event,
    )
  }

  return unchangedNoEvents(state)
}
