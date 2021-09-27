import { getPluginFromURL } from './plugins'
import { MessageKey } from './util/constant'

const plugin = getPluginFromURL(location.href)

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  let res: any

  switch (message.key) {
    case MessageKey.getData:
      console.log(plugin)
      res = plugin.getData()
      break
  }

  console.log(res)
  return Promise.resolve(res)
})
