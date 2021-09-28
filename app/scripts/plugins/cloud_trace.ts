import type { ExportableData, Plugin } from './'

export default class CloudTracePlugin implements Plugin {
  static type = 'CloudTrace'
  url: string

  constructor(url: string) {
    this.url = url
  }

  static matchWithURL(url: string): boolean {
    const regexp = new RegExp('^https://console.cloud.google.com/traces')
    return !!url.match(regexp)
  }

  // https://console.cloud.google.com/traces/list?referrer=search&project=[PROJECT]&pageState=(%22traceIntervalPicker%22:(%22groupValue%22:%22PT6H%22,%22customValue%22:null))&start=1632832346778&end=1632833884049
  getData(): ExportableData {
    // FIXME:
    return {
      start_ms: 0,
      span_ms: 0,
    }
  }

  generateURL(data: ExportableData): string {
    // FIXME:
    return this.url
  }
}
