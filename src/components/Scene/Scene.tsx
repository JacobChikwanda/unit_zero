import type { SceneConfig } from './sceneTypes'
import './Scene.css'

export type SceneProps = {
  config: SceneConfig
  onHotspotActivate: (hotspotId: string) => void
  inert?: boolean
}

export function Scene({
  config,
  onHotspotActivate,
  inert = false,
}: SceneProps) {
  return (
    <section className="scene" aria-label="Scene">
      <div
        className="scene__frame"
        style={{ aspectRatio: `${config.width} / ${config.height}` }}
        {...(inert ? { inert: true } : {})}
      >
        <img
          className="scene__background"
          src={config.backgroundSrc}
          alt={config.backgroundAlt}
          width={config.width}
          height={config.height}
          draggable={false}
        />
        {config.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            className="scene__hotspot"
            data-hotspot-id={hotspot.id}
            aria-label={hotspot.label}
            style={{
              left: `${hotspot.left}%`,
              top: `${hotspot.top}%`,
              width: `${hotspot.width}%`,
              height: `${hotspot.height}%`,
            }}
            onClick={() => onHotspotActivate(hotspot.id)}
          >
            {hotspot.label}
          </button>
        ))}
      </div>
    </section>
  )
}
