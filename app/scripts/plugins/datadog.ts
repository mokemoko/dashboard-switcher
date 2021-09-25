import type { ExportableData, PluginConstructor } from './'
import { getQueryParams } from '../util/dom'

type QueryParamsKey = 'from_ts' | 'to_ts'

const DatadogPlugin: PluginConstructor = class {
  static getData(): ExportableData {
    const params = getQueryParams<QueryParamsKey>()
    const [from_ts, to_ts] = [parseInt(params.from_ts), parseInt(params.to_ts)]
    return {
      start_ms: from_ts,
      span_ms: to_ts - from_ts,
    }
  }

  static generateURL(data: ExportableData): string {
    const baseURL = ''
    const paramStr = new URLSearchParams({
      from_ts: data.start_ms.toString(),
      to_ts: (data.start_ms + data.span_ms).toString(),
    }).toString()
    return `${baseURL}?${paramStr}`
  }
}

export default DatadogPlugin
