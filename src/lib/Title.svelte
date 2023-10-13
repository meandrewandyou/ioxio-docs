<script lang="ts">
  export let type: "main" | "large" = "main"

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
    <title>{titleText}</title>
    <meta property="og:title" content={titleText} />
  {/if}
</svelte:head>

{#if type === "main"}
  <h2 bind:this={container}>
    <slot />
  </h2>
{:else if type === "large"}
  <h3>
    <slot />
  </h3>
{/if}

<style lang="css">
</style>
