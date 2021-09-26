import type { ExportableData, PluginConstructor } from './'

const DefaultPlugin: PluginConstructor = class {
  type: string
  url: string

  constructor(url: string) {
    this.type = 'Default'
    this.url = url
  }

  static matchWithURL(url: string): boolean {
    return true
  }

  getData(): ExportableData {
    // 5分前から現在まで
    const diff = 5 * 60 * 1000
    return {
      start_ms: (new Date()).getTime() - diff,
      span_ms: diff,
    }
  }

  generateURL(data: ExportableData): string {
    return this.url
  }
}

export default DefaultPlugin
