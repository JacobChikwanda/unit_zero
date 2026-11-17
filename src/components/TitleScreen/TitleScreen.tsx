import { GAME_TITLE } from '../../gameTitle'
import './TitleScreen.css'

const TITLE_LINE = 'Ndola. Apex runs the city now.'

export type TitleScreenProps = {
  canContinue: boolean
  onStart: () => void
  onContinue: () => void
}

export function TitleScreen({
  canContinue,
  onStart,
  onContinue,
}: TitleScreenProps) {
  return (
    <section className="title-screen" aria-labelledby="game-title">
      <h1 id="game-title" className="title-screen__name">
        {GAME_TITLE}
      </h1>
      <p className="title-screen__line">{TITLE_LINE}</p>
      <div className="title-screen__actions">
        <button type="button" className="title-screen__button" onClick={onStart}>
          Start
        </button>
        {canContinue ? (
          <button
            type="button"
            className="title-screen__button"
            onClick={onContinue}
          >
            Continue
          </button>
        ) : null}
      </div>
    </section>
  )
}
