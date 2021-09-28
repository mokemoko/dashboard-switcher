import { getPluginFromURL } from './plugins'
import { MessageKey } from './util/constant'

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  const plugin = getPluginFromURL(location.href)
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
