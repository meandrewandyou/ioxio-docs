<script lang="ts">
  type Breadcrumb = {
    name: string
    link: string
  }
  type Breadcrumbs = Breadcrumb[]
  export let breadcrumbs: Breadcrumbs = []
</script>

<div class="breadcrumbs">
  {#each breadcrumbs as breadcrumb, i}
    <span class="breadcrumb"><a href={breadcrumb.link}>{breadcrumb.name}</a></span>
    <span class="sep">/</span>
  {/each}
</div>

<style lang="scss">
  .sep {
    margin: 0 0.5rem;
  }
</style>
