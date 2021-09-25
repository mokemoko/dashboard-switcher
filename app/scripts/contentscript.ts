import DatadogPlugin from './plugins/datadog'
import type { PluginConstructor } from './plugins'
import { MessageKind } from './util/constant'

// TODO: dynamic type
const Plugin: PluginConstructor = DatadogPlugin

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  let res: any

  switch (message.type) {
    case MessageKind.getData:
      res = Plugin.getData()
      break
  }

  console.log(res)
  return Promise.resolve(res)
})
