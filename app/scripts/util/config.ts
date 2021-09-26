import { get, set, StorageKey } from './storage'

export interface Link {
  id: string
  name: string
  url: string
}

export interface Config {
  links: Link[]
}

export async function getLinks(): Promise<Link[]> {
  const config = await get<Config>(StorageKey.config)
  return config?.links || []
}

export async function setLinks(links: Link[]) {
  const config = (await get<Config>(StorageKey.config)) || { links: [] }
  config.links = links
  await set(StorageKey.config, Object.assign(config))
}
