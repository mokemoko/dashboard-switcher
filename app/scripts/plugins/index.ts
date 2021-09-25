export interface ExportableData {
  start_ms: number
  span_ms: number
}

export interface PluginConstructor {
  new()
  getData(): ExportableData
  generateURL(data: ExportableData): string
}
