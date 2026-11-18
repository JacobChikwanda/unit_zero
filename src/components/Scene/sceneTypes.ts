export type HotspotConfig = {
  id: string
  label: string
  left: number
  top: number
  width: number
  height: number
}

export type SceneConfig = {
  id: string
  backgroundSrc: string
  backgroundAlt: string
  width: number
  height: number
  hotspots: HotspotConfig[]
}

function isInPercentRange(value: number): boolean {
  return value >= 0 && value <= 100
}

export function validateSceneConfig(config: SceneConfig): string[] {
  const errors: string[] = []

  if (config.width <= 0) {
    errors.push('art width must be positive')
  }
  if (config.height <= 0) {
    errors.push('art height must be positive')
  }

  const seenIds = new Set<string>()
  for (const hotspot of config.hotspots) {
    if (seenIds.has(hotspot.id)) {
      errors.push(`duplicate hotspot id: ${hotspot.id}`)
    }
    seenIds.add(hotspot.id)

    const fields = [
      ['left', hotspot.left],
      ['top', hotspot.top],
      ['width', hotspot.width],
      ['height', hotspot.height],
    ] as const

    for (const [name, value] of fields) {
      if (!isInPercentRange(value)) {
        errors.push(
          `hotspot ${hotspot.id} ${name} must be between 0 and 100`,
        )
      }
    }

    if (hotspot.left + hotspot.width > 100) {
      errors.push(`hotspot ${hotspot.id} left + width exceeds 100`)
    }
    if (hotspot.top + hotspot.height > 100) {
      errors.push(`hotspot ${hotspot.id} top + height exceeds 100`)
    }
  }

  return errors
}
