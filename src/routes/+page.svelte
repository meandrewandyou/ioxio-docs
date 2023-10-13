<script>
  import Breadcrumbs from "$lib/Breadcrumbs.svelte"
  import Title from "$lib/Title.svelte"
</script>

<Breadcrumbs
  breadcrumbs={[
    {
      name: "Docs",
      link: "/",
    },
  ]}
/>

<Title>Documentation portal</Title>
<p>
  Documentation for various <a href="https://ioxio.com">IOXIO&reg;</a> technologies.
</p>

<div class="cards">
  <a href="/tags/">
    <div class="card">IOXIO Tags&trade;</div>
  </a>
</div>

<style lang="scss">
  .cards {
    display: flex;
    flex-direction: row;
    margin: 4rem 0;
  }

  .card {
    width: 8rem;
    border: 1px solid #0f2543;
    background: #cbd5e2;
    color: #000;
    border-radius: 8px;
    padding: 2.5rem;
    text-align: center;
  }
</style>
