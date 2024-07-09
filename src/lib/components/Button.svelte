<script lang="ts">
  export let icon: any = undefined
  export let url: string | undefined = undefined

  // whether to change icon color for hover and active states
  export let monochromeIcon = false
</script>

{#if url}
  <a
    class="button"
    class:monochrome={monochromeIcon}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {#if icon}
      <span><slot /></span>
      <svelte:component this={icon} />
    {:else}
      <slot />
    {/if}
  </a>
{:else}
  <button class="button" class:monochrome={monochromeIcon}>
    {#if icon}
      <span><slot /></span>
      <svelte:component this={icon} />
    {:else}
      <slot />
    {/if}
  </button>
{/if}

<style lang="scss">
  @import "$styles/setup";

  .button {
    padding: $spacing-01 $spacing-02;
    color: $color-secondary-light;
    background: transparent;
    border: 1px solid $color-success-main;
    border-radius: 4px;
    font-size: 12px;
    line-height: 150%;
    font-weight: 600;
    display: flex;
    gap: $spacing-01;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      color: $color-neutral-light;
      border-color: $color-neutral-light;
    }

    &:active {
      color: $color-success-main;
      border-color: $color-success-main;
    }

    :global(svg) {
      width: 1.25rem;
      height: 1.25rem;
    }

    &.monochrome {
      :global(svg path) {
        fill: $color-secondary-light;
      }
    }

    &.monochrome:hover {
      :global(svg path) {
        fill: $color-neutral-light;
      }
    }

    &.monochrome:active {
      :global(svg path) {
        fill: $color-success-main;
      }
    }
  }
</style>
