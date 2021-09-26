<script lang='ts'>
  import { Link, getLinks, setLinks } from '../util/config'

  let links: Link[] = []

  function onDelete(id) {
    links = links.filter(link => link.id !== id)
  }

  function onAdd() {
    const id = Math.random().toString(16).slice(2)
    links = [...links, { id, name: '', url: '' }]
  }

  async function onSave() {
    await setLinks(links)
  }

  async function asyncLoad() {
    links = await getLinks()
  }

  asyncLoad()
</script>

<main class="container">
  <h2>設定</h2>
  <form>
    {#each links as link}
      <div class="grid">
        <input type="text" placeholder="表示名" bind:value={link.name} required />
        <input type="text" placeholder="URL" bind:value={link.url} required />
        <a href="#" role="button" class="contrast" on:click={() => onDelete(link.id)}>削除</a>
      </div>
    {/each}
    <button class="secondary" on:click={onAdd}>追加</button>
    <button on:click={onSave}>保存</button>
  </form>
</main>

<style>
  .contrast {
      margin-bottom: 20px;
  }
</style>
