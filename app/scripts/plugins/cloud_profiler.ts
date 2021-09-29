import type { ExportableData, Plugin } from './'
import dayjs from 'dayjs';

/* MEMO:
   ex) https://console.cloud.google.com/profiler;timespan=1h;end=2021-09-28T15:24:48.634Z/[SERVICE]/cpu?project=[PROJECT]
 */

const SPAN_CANDIDATE: [number, string][] = [
  [10 * 60 * 1000, '10m'],
  [30 * 60 * 1000, '30m'],
  [1  * 60 * 60 * 1000, '1h'],
  [4  * 60 * 60 * 1000, '4h'],
  [12 * 60 * 60 * 1000, '12h'],
  [1  * 24 * 60 * 60 * 1000, '1d'],
  [3  * 24 * 60 * 60 * 1000, '3d'],
  [7  * 24 * 60 * 60 * 1000, '7d'],
  [30 * 24 * 60 * 60 * 1000, '30d'],
]

export default class CloudProfilerPlugin implements Plugin {
  static type = 'CloudProfiler'
  url: string
  re: RegExp = /;timespan=([^;?/]+);end=([^;?/]+)/

  constructor(url: string) {
    this.url = url
  }

  static matchWithURL(url: string): boolean {
    const regexp = new RegExp('^https://console.cloud.google.com/profiler')
    return !!url.match(regexp)
  }

  getData(): ExportableData {
    const [, timespan, end] = location.href.match(this.re) || []
    const end_ms = dayjs(end).valueOf()
    const [span_ms] = SPAN_CANDIDATE.find(c => c[1] === timespan) || []
    return {
      start_ms: end_ms - span_ms,
      span_ms,
    }
  }

  generateURL(data: ExportableData): string {
    const [, timespan] = SPAN_CANDIDATE.find(c => c[0] >= data.span_ms) || []
    const end = dayjs(data.start_ms + data.span_ms).toISOString()
    return this.url.replace(this.re, `;timespan=${timespan};end=${end}`)
  }
}
