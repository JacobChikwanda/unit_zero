import { parsePlayerSave } from './parse'
import type { PlayerSave } from './types'

export interface SaveStore {
  load(): PlayerSave | null
  save(data: PlayerSave): boolean
  clear(): void
}

export interface LocalStorageSaveStoreOptions {
  key?: string
  getStorage?: () => Storage
}

const DEFAULT_KEY = 'unit-zero.player-save'

function defaultGetStorage(): Storage {
  return globalThis.localStorage
}

export function createLocalStorageSaveStore(
  options: LocalStorageSaveStoreOptions = {},
): SaveStore {
  const key = options.key ?? DEFAULT_KEY
  const getStorage = options.getStorage ?? defaultGetStorage

  return {
    load(): PlayerSave | null {
      try {
        const storage = getStorage()
        const raw = storage.getItem(key)
        if (raw === null) {
          return null
        }

        let parsed: unknown
        try {
          parsed = JSON.parse(raw)
        } catch {
          return null
        }

        return parsePlayerSave(parsed)
      } catch {
        return null
      }
    },

    save(data: PlayerSave): boolean {
      try {
        const storage = getStorage()
        storage.setItem(key, JSON.stringify(data))
        return true
      } catch {
        return false
      }
    },

    clear(): void {
      try {
        const storage = getStorage()
        storage.removeItem(key)
      } catch {
        // no-op
      }
    },
  }
}
