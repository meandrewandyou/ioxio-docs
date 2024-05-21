<script lang="ts">
  import HamburgerIcon from "$lib/images/hamburger-icon.svg"
  import CloseIcon from "$lib/images/close-icon.svg"

  export let popover: any
  export let showInTablet: boolean = false
  export let alignIconToRight: boolean = false
</script>

<button
  use:popover.button
  class="hamburger-button"
  class:tablet={showInTablet}
  class:align-right={alignIconToRight}
>
  {#if !$popover.expanded}
    <HamburgerIcon />
  {:else}
    <CloseIcon />
  {/if}
</button>

<style lang="scss">
  @import "$styles/setup";

  .hamburger-button {
    display: none;
    padding: 0;
    background-color: transparent;
    border: none;

    @include mobile() {
      display: block;
    }

    &.tablet {
      @include tablet() {
        display: block;
      }
    }

    &.align-right {
      margin-left: auto;
    }

    :global(svg) {
      width: 2rem;
      height: 2rem;
      padding: 0.375rem;
      border: 1px solid $color-primary-dark-hover;
      border-radius: 4px;
    }
  }
</style>
