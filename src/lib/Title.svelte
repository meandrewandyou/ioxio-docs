<script lang="ts">
  let container
  let titleText = ""

  $: {
    if (container) {
      titleText = container.innerText
    }
  }
</script>

<svelte:head>
  {#if titleText}
    <title>{titleText} - IOXIO Docs</title>
    <meta property="og:title" content={titleText} />
  {/if}
</svelte:head>

<h1 bind:this={container}>
  <slot />
</h1>

<style lang="css">
</style>
