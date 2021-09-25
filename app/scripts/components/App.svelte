<script lang='ts'>
  import { MessageKind } from '../util/constant'
  import type { ExportableData, PluginConstructor } from '../plugins'
  import DatadogPlugin from '../plugins/datadog'

  let message = '...'

  async function onClick(dest: string) {
    const [firstTab] = await browser.tabs.query({ currentWindow: true, active: true });
    const data: ExportableData = await browser.tabs.sendMessage(firstTab.id, { type: MessageKind.getData });

    // TODO: dynamic type from dest
    const Plugin: PluginConstructor = DatadogPlugin
    message = Plugin.generateURL(data)
  }
</script>

<aside>
  <nav>
    <ul>
      <li><a on:click={() => onClick('')}>Datadog</a></li>
      <li>{message}</li>
    </ul>
  </nav>
</aside>
