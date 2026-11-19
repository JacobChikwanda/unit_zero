import { useEffect, useRef, useState } from 'react'
import {
  advance,
  choose,
  startDialogue,
  type DialogueState,
} from './dialogueEngine'
import type { DialogueScript, Speakers } from './dialogueTypes'
import './Dialogue.css'

export type DialogueProps = {
  script: DialogueScript
  speakers: Speakers
  onEvent: (event: string) => void
  onEnd: (event: string) => void
}

export function Dialogue({
  script,
  speakers,
  onEvent,
  onEnd,
}: DialogueProps) {
  const [state, setState] = useState<DialogueState>(() =>
    startDialogue(script, speakers),
  )
  const nextRef = useRef<HTMLButtonElement>(null)
  const firstChoiceRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (state.ended) return
    if (state.choices.length > 0) {
      firstChoiceRef.current?.focus()
    } else {
      nextRef.current?.focus()
    }
  }, [state.currentNodeId, state.choices.length, state.ended])

  function applyTransition(next: DialogueState) {
    for (const event of next.events) {
      onEvent(event)
    }
    if (next.ended && next.endEvent !== null) {
      onEnd(next.endEvent)
      return
    }
    setState(next)
  }

  function handleNext() {
    applyTransition(advance(state))
  }

  function handleChoice(choiceId: string) {
    applyTransition(choose(state, choiceId))
  }

  return (
    <section className="dialogue" aria-label="Dialogue">
      <div className="dialogue__text" aria-live="polite">
        <p className="dialogue__speaker">{state.line.speakerName}</p>
        <p className="dialogue__line">{state.line.text}</p>
      </div>
      {state.choices.length > 0 ? (
        <div className="dialogue__choices">
          {state.choices.map((choice, index) => (
            <button
              key={choice.id}
              ref={index === 0 ? firstChoiceRef : undefined}
              type="button"
              className="dialogue__choice"
              onClick={() => handleChoice(choice.id)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      ) : (
        !state.ended && (
          <button
            ref={nextRef}
            type="button"
            className="dialogue__next"
            onClick={handleNext}
          >
            Next
          </button>
        )
      )}
    </section>
  )
}
