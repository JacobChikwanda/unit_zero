import { describe, expect, it } from 'vitest'
import { createDefaultPlayerSave } from './defaults'
import { createLocalStorageSaveStore } from './save-store'

function createMemoryStorage(initial: Record<string, string> = {}): Storage {
  const map = new Map<string, string>(Object.entries(initial))

  return {
    get length() {
      return map.size
    },
    clear() {
      map.clear()
    },
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null
    },
    key(index: number) {
      return [...map.keys()][index] ?? null
    },
    removeItem(key: string) {
      map.delete(key)
    },
    setItem(key: string, value: string) {
      map.set(key, value)
    },
  }
}

describe('createLocalStorageSaveStore', () => {
  const key = 'unit-zero.player-save'

  it('returns null when the key is missing', () => {
    const store = createLocalStorageSaveStore({
      getStorage: () => createMemoryStorage(),
    })

    expect(store.load()).toBeNull()
  })

  it('returns null for corrupt JSON and leaves the key in place', () => {
    const storage = createMemoryStorage({ [key]: '{not-json' })
    const store = createLocalStorageSaveStore({ getStorage: () => storage })

    expect(store.load()).toBeNull()
    expect(storage.getItem(key)).toBe('{not-json')
  })

  it('returns null for an invalid payload and leaves the key in place', () => {
    const raw = JSON.stringify({ schemaVersion: 99 })
    const storage = createMemoryStorage({ [key]: raw })
    const store = createLocalStorageSaveStore({ getStorage: () => storage })

    expect(store.load()).toBeNull()
    expect(storage.getItem(key)).toBe(raw)
  })

  it('round-trips a valid save', () => {
    const storage = createMemoryStorage()
    const store = createLocalStorageSaveStore({ getStorage: () => storage })
    const save = createDefaultPlayerSave()

    expect(store.save(save)).toBe(true)
    expect(store.load()).toEqual(save)
  })

  it('returns false when setItem throws', () => {
    const storage = createMemoryStorage()
    storage.setItem = () => {
      throw new Error('quota')
    }
    const store = createLocalStorageSaveStore({ getStorage: () => storage })

    expect(store.save(createDefaultPlayerSave())).toBe(false)
  })

  it('clears a saved key', () => {
    const storage = createMemoryStorage()
    const store = createLocalStorageSaveStore({ getStorage: () => storage })
    store.save(createDefaultPlayerSave())

    store.clear()
    expect(storage.getItem(key)).toBeNull()
  })

  it('does not throw when Storage methods throw', () => {
    const storage = createMemoryStorage({ [key]: 'x' })
    storage.getItem = () => {
      throw new Error('denied')
    }
    storage.removeItem = () => {
      throw new Error('denied')
    }
    const store = createLocalStorageSaveStore({ getStorage: () => storage })

    expect(store.load()).toBeNull()
    expect(() => store.clear()).not.toThrow()
  })

  it('returns null / false / no-ops when the storage getter throws', () => {
    const store = createLocalStorageSaveStore({
      getStorage: () => {
        throw new Error('localStorage blocked')
      },
    })

    expect(store.load()).toBeNull()
    expect(store.save(createDefaultPlayerSave())).toBe(false)
    expect(() => store.clear()).not.toThrow()
  })
})
