import type { ExportableData, Plugin } from './'
import { getQueryParams } from '../util/dom'

/* MEMO:
   ex) https://console.cloud.google.com/traces/list?project=[PROJECT]&pageState=("traceIntervalPicker":("groupValue":"PT6H","customValue":null))&start=1632832346778&end=1632833884049
   現在日時基準で相対期間指定されている場合は `pageState.traceIntervalPicker.groupValue` を参照
   固定時間指定されている場合は `start` `end` を参照
 */

type QueryParamsKey = 'pageState' | 'start' | 'end'

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

  getData(): ExportableData {
    // TODO: pageStateの判定は未実装
    const { pageState, start, end } = getQueryParams<QueryParamsKey>()
    const [start_ms, end_ms] = [parseInt(start), parseInt(end)]
    return {
      start_ms,
      span_ms: end_ms - start_ms,
    }
  }

  generateURL(data: ExportableData): string {
    const url = new URL(this.url)
    url.searchParams.set('start', data.start_ms.toString())
    url.searchParams.set('end', (data.start_ms + data.span_ms).toString())
    return url.toString()
  }
}
