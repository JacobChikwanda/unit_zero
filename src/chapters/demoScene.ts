import type { SceneConfig } from '../components/Scene/sceneTypes'

/** Non-story demo scene: abstract regions only; art 320×180. */
export const demoScene: SceneConfig = {
  id: 'demo-scene',
  backgroundSrc: '/scenes/demo-scene.svg',
  backgroundAlt: 'Demo scene background',
  width: 320,
  height: 180,
  hotspots: [
    {
      id: 'region-a',
      label: 'Region A',
      left: (16 / 320) * 100,
      top: (16 / 180) * 100,
      width: (120 / 320) * 100,
      height: (68 / 180) * 100,
    },
    {
      id: 'region-b',
      label: 'Region B',
      left: (184 / 320) * 100,
      top: (16 / 180) * 100,
      width: (120 / 320) * 100,
      height: (68 / 180) * 100,
    },
  ],
}
