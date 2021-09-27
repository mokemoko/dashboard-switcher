import type { ExportableData, Plugin } from './'
import { getQueryParams } from '../util/dom'

type QueryParamsKey = 'from_ts' | 'to_ts'

export default class DatadogPlugin implements Plugin {
  static type = 'Datadog'
  url: string

  constructor(url: string) {
    this.url = url
  }

  static matchWithURL(url: string): boolean {
    const regexp = new RegExp('^https://app.datadoghq.com/dashboard/[^/]+/')
    return !!url.match(regexp)
  }

  getData(): ExportableData {
    const params = getQueryParams<QueryParamsKey>()
    const [from_ts, to_ts] = [parseInt(params.from_ts), parseInt(params.to_ts)]
    return {
      start_ms: from_ts,
      span_ms: to_ts - from_ts,
    }
  }

  generateURL(data: ExportableData): string {
    const url = new URL(this.url)
    url.searchParams.set('from_ts', data.start_ms.toString())
    url.searchParams.set('to_ts', (data.start_ms + data.span_ms).toString())
    // デフォルトlive=trueでts含めてパラメータが上書きされてしまうため指定
    url.searchParams.set('live', 'false')
    return url.toString()
  }
}
