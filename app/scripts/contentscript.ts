import { getPluginFromURL } from './plugins'
import { MessageKey } from './util/constant'

const plugin = getPluginFromURL(location.href)
console.log(`current page plugin : ${plugin.type}`)

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  let res: any

  switch (message.key) {
    case MessageKey.getData:
      res = plugin?.getData()
      break
  }

  console.log(res)
  return Promise.resolve(res)
})
