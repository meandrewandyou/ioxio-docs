<script lang="ts">
  import breakpointObserver from "$lib/components/breakpointObserver"
  import Grid from "$lib/components/Grid.svelte"

  export let title = ""

  const size = breakpointObserver()
  $: isSmallScreen = size.smallerThan("lg")
</script>

<svelte:head>
  <title>{title} - IOXIO Docs</title>
  <meta property="og:title" content={title} />
</svelte:head>

{#if $isSmallScreen}
  <Grid container>
    <Grid sm={11}>
      <h1>{title}</h1>
    </Grid>
  </Grid>
{:else}
  <h1>{title}</h1>
{/if}

<style lang="scss">
</style>
