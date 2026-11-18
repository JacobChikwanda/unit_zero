import { describe, expect, it } from 'vitest'
import { demoScene } from '../../chapters/demoScene'
import type { SceneConfig } from './sceneTypes'
import { validateSceneConfig } from './sceneTypes'

function baseConfig(
  overrides: Partial<SceneConfig> = {},
): SceneConfig {
  return {
    id: 'test-scene',
    backgroundSrc: '/scenes/demo-scene.svg',
    backgroundAlt: 'Test scene background',
    width: 320,
    height: 180,
    hotspots: [],
    ...overrides,
  }
}

describe('validateSceneConfig', () => {
  it('returns no errors for a valid config with empty hotspots', () => {
    expect(validateSceneConfig(baseConfig())).toEqual([])
  })

  it('returns no errors for the demo fixture', () => {
    expect(validateSceneConfig(demoScene)).toEqual([])
  })

  it('errors when art width is not positive', () => {
    expect(validateSceneConfig(baseConfig({ width: 0 }))).toContain(
      'art width must be positive',
    )
    expect(validateSceneConfig(baseConfig({ width: -1 }))).toContain(
      'art width must be positive',
    )
  })

  it('errors when art height is not positive', () => {
    expect(validateSceneConfig(baseConfig({ height: 0 }))).toContain(
      'art height must be positive',
    )
    expect(validateSceneConfig(baseConfig({ height: -5 }))).toContain(
      'art height must be positive',
    )
  })

  it('errors on duplicate hotspot ids', () => {
    const config = baseConfig({
      hotspots: [
        {
          id: 'same',
          label: 'One',
          left: 0,
          top: 0,
          width: 10,
          height: 10,
        },
        {
          id: 'same',
          label: 'Two',
          left: 20,
          top: 20,
          width: 10,
          height: 10,
        },
      ],
    })

    expect(validateSceneConfig(config)).toContain('duplicate hotspot id: same')
  })

  it('errors when a hotspot number is outside 0–100', () => {
    const config = baseConfig({
      hotspots: [
        {
          id: 'out',
          label: 'Out',
          left: -1,
          top: 0,
          width: 10,
          height: 10,
        },
      ],
    })

    expect(validateSceneConfig(config)).toContain(
      'hotspot out left must be between 0 and 100',
    )
  })

  it('errors when left + width exceeds 100', () => {
    const config = baseConfig({
      hotspots: [
        {
          id: 'wide',
          label: 'Wide',
          left: 80,
          top: 0,
          width: 30,
          height: 10,
        },
      ],
    })

    expect(validateSceneConfig(config)).toContain(
      'hotspot wide left + width exceeds 100',
    )
  })

  it('errors when top + height exceeds 100', () => {
    const config = baseConfig({
      hotspots: [
        {
          id: 'tall',
          label: 'Tall',
          left: 0,
          top: 80,
          width: 10,
          height: 30,
        },
      ],
    })

    expect(validateSceneConfig(config)).toContain(
      'hotspot tall top + height exceeds 100',
    )
  })
})
