import DatadogPlugin from './datadog'
import DefaultPlugin from './default'

export interface ExportableData {
  start_ms: number
  span_ms: number
}

export interface PluginConstructor {
  new(url: string): Plugin
  matchWithURL(url: string): boolean
}

export interface Plugin {
  type: string
  url: string
  getData(): ExportableData
  generateURL(data: ExportableData): string
}

const plugins = [ DatadogPlugin, DefaultPlugin ]

export function getPluginFromURL(url: string): Plugin {
  const P = plugins.find(P => P.matchWithURL(url))
  return new P(url)
}
