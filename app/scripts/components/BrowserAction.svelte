<script lang='ts'>
  import { MessageKey } from '../util/constant'
  import { ExportableData, getPluginFromURL } from '../plugins'
  import { Link, getLinks } from '../util/config'

  let links: Link[] = []

  async function onClick(dest: string) {
    const [firstTab] = await browser.tabs.query({ currentWindow: true, active: true });
    const data: ExportableData = await browser.tabs.sendMessage(firstTab.id, { key: MessageKey.getData });

    const plugin = getPluginFromURL(dest)
    const url = plugin.generateURL(data)

    window.open(url)
  }

  async function asyncLoad() {
    links = await getLinks()
  }

  asyncLoad()
</script>

<main class="container">
  <aside>
    <nav>
      <ul>
        {#each links as link}
          <li><a href='#/' on:click={() => onClick(link.url)}>{link.name}</a></li>
        {/each}
      </ul>
    </nav>
    <button on:click={() => window.open('./options.html')}>設定</button>
  </aside>
</main>

<style>
  .container {
    width: 200px;
    padding: 10px;
  }
  button {
    padding: 5px;
    margin: 0;
  }
</style>
