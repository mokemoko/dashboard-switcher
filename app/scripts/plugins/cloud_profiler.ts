import type { ExportableData, Plugin } from './'

export default class CloudProfilerPlugin implements Plugin {
  static type = 'CloudProfiler'
  url: string
  re: RegExp

  constructor(url: string) {
    this.url = url
    this.re = /;timespan=([^;?]+);end=([^;?]+)/
  }

  static matchWithURL(url: string): boolean {
    const regexp = new RegExp('^https://console.cloud.google.com/profiler')
    return !!url.match(regexp)
  }

  getData(): ExportableData {
    // FIXME:
    const [, timespan, end] = location.href.match(this.re) || []
    console.log(timespan, end)
    return {
      start_ms: 0,
      span_ms: 0,
    }
  }

  generateURL(data: ExportableData): string {
    // FIXME:
    const [timespan, end] = ['', '']
    return this.url.replace(this.re, `;timespan=${timespan};end=${end}`)
  }
}
