import DatadogPlugin from './datadog'
import DefaultPlugin from './default'
import CloudProfilerPlugin from './cloud_profiler'

export interface ExportableData {
  start_ms: number
  span_ms: number
}

export interface PluginConstructor {
  type: string

  new(url: string): Plugin
  matchWithURL(url: string): boolean
}

export interface Plugin {
  getData(): ExportableData
  generateURL(data: ExportableData): string
}

const plugins: PluginConstructor[] = [
  DatadogPlugin,
  CloudProfilerPlugin,
  DefaultPlugin
]

export function getPluginFromURL(url: string): Plugin {
  const P = plugins.find(P => P.matchWithURL(url))
  console.log(`match plugin : ${P.type}`)
  return new P(url)
}
