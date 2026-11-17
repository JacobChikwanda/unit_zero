import { useEffect, useState } from 'react'
import { GameLayout } from './components/GameLayout/GameLayout'
import { Scene } from './components/Scene/Scene'
import { TitleScreen } from './components/TitleScreen/TitleScreen'
import { createLocalStorageSaveStore } from './game/save'
import { GAME_TITLE } from './gameTitle'

type AppView = 'title' | 'scene'

const saveStore = createLocalStorageSaveStore()

function App() {
  const [view, setView] = useState<AppView>('title')
  const canContinue = saveStore.load() !== null

  useEffect(() => {
    document.title = GAME_TITLE
  }, [])

  function goToScene() {
    setView('scene')
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
        <Scene />
      )}
    </GameLayout>
  )
}

export default App
