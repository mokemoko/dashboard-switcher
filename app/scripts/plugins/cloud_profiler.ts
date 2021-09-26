import type { ExportableData, PluginConstructor } from './'

const CloudProfilerPlugin: PluginConstructor = class {
  type: string
  url: string

  constructor(url: string) {
    this.type = 'CloudProfiler'
    this.url = url
  }

  static matchWithURL(url: string): boolean {
    const regexp = new RegExp('^https://console.cloud.google.com/profiler')
    return !!url.match(regexp)
  }

  getData(): ExportableData {
    // FIXME:
    return {
      start_ms: 0,
      span_ms: 0,
    }
  }

  generateURL(data: ExportableData): string {
    // FIXME:
    const [timespan, end, project] = ['', '', '']
    return `https://console.cloud.google.com/profiler;timespan=${timespan};end=${end}?project=${project}`
  }
}

export default CloudProfilerPlugin
