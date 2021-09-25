export async function get (key: string) {
  const res = await browser.storage.sync.get(key)
  return res[key]
}

export async function set (key: string, value: any) {
  await browser.storage.sync.set({ [key]: value })
}
