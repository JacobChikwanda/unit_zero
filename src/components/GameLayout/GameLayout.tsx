import type { ReactNode } from 'react'
import './GameLayout.css'

type GameLayoutProps = {
  children: ReactNode
}

export function GameLayout({ children }: GameLayoutProps) {
  return <div className="game-layout">{children}</div>
}
