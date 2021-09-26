export const StorageKey = {
  config: 'config'
} as const

export type StorageKeyType = typeof StorageKey[keyof typeof StorageKey]

export async function get<T>(key: StorageKeyType): Promise<T> {
  const res = await browser.storage.sync.get(key)
  return res[key]
}

export async function set(key: StorageKeyType, value: any) {
  await browser.storage.sync.set({ [key]: value })
}
