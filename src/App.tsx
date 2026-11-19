import { useEffect, useState } from 'react'
import { demoDialogue, demoSpeakers } from './chapters/demoDialogue'
import { demoScene } from './chapters/demoScene'
import { Dialogue } from './components/Dialogue/Dialogue'
import { GameLayout } from './components/GameLayout/GameLayout'
import { Scene } from './components/Scene/Scene'
import { TitleScreen } from './components/TitleScreen/TitleScreen'
import { createLocalStorageSaveStore } from './game/save'
import { GAME_TITLE } from './gameTitle'
import './App.css'

type AppView = 'title' | 'scene'

const saveStore = createLocalStorageSaveStore()

function focusHotspot(hotspotId: string) {
  const hotspot = document.querySelector(
    `[data-hotspot-id="${hotspotId}"]`,
  )
  if (hotspot instanceof HTMLElement) {
    hotspot.focus()
  }
}

function App() {
  const [view, setView] = useState<AppView>('title')
  const [dialogueOpen, setDialogueOpen] = useState(false)
  const [dialogueHotspotId, setDialogueHotspotId] = useState<
    string | null
  >(null)
  const [, setLastEvent] = useState<string | null>(null)
  const canContinue = saveStore.load() !== null

  useEffect(() => {
    document.title = GAME_TITLE
  }, [])

  function goToScene() {
    setView('scene')
  }

  function handleHotspotActivate(hotspotId: string) {
    if (hotspotId === 'region-a') {
      setDialogueHotspotId(hotspotId)
      setDialogueOpen(true)
    }
  }

  function handleDialogueEvent(event: string) {
    setLastEvent(event)
  }

  function handleDialogueEnd(event: string) {
    setLastEvent(event)
    const returnHotspotId = dialogueHotspotId
    setDialogueOpen(false)
    setDialogueHotspotId(null)
    if (returnHotspotId) {
      requestAnimationFrame(() => {
        focusHotspot(returnHotspotId)
      })
    }
  }

  return (
    <GameLayout>
      {view === 'title' ? (
        <TitleScreen
          canContinue={canContinue}
          onStart={goToScene}
          onContinue={goToScene}
        />
      ) : (
        <div
          className={
            dialogueOpen
              ? 'scene-play scene-play--with-dialogue'
              : 'scene-play'
          }
        >
          <Scene
            config={demoScene}
            onHotspotActivate={handleHotspotActivate}
            inert={dialogueOpen}
          />
          {dialogueOpen ? (
            <Dialogue
              key={dialogueHotspotId ?? 'dialogue'}
              script={demoDialogue}
              speakers={demoSpeakers}
              onEvent={handleDialogueEvent}
              onEnd={handleDialogueEnd}
            />
          ) : null}
        </div>
      )}
    </GameLayout>
  )
}

export default App
