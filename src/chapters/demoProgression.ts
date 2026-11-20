import type { EventEffectMap } from '../game/progression'

/** Demo-only event → effect map. Harmless story flag for persistence check. */
export const demoEventMap: EventEffectMap = {
  'demo-path-one-end': [
    { type: 'setStoryFlag', key: 'demo.progressed', value: true },
  ],
  'demo-path-two-end': [
    { type: 'setStoryFlag', key: 'demo.progressed', value: true },
  ],
}
