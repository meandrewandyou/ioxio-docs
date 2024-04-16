<script>
  import Title from "$lib/Title.svelte"
  import A from "$lib/A.svelte"
  import Breadcrumbs from "$lib/Breadcrumbs.svelte"

  /** @type {import('./$types').PageData} */
  export let data
</script>

<Title title={`IOXIO®️ Documentation portal`} />

<Breadcrumbs path={data.path} route={data.route} />

<p>
  Documentation for various <A href="https://ioxio.com">IOXIO®</A> technologies.
</p>

<div class="cards">
  <a href="/tags/">
    <div class="card">IOXIO Tags™</div>
  </a>
  <a href="/schemas/">
    <div class="card">Schemas for data objects</div>
  </a>
</div>

<style lang="scss">
  .cards {
    display: flex;
    flex-direction: row;
    margin: 4rem 0;

    align-items: stretch;
    gap: 3rem;
  }

  a {
    display: flex;
    flex-direction: column;
  }

  .card {
    flex-grow: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 8rem;
    border: 1px solid #0f2543;
    background: #cbd5e2;
    color: #000;
    border-radius: 8px;
    padding: 2.5rem;
  }
</style>
