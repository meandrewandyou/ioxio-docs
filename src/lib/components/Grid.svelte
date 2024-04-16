<!-- Hide the 3rd party implementation of the Grid -->

<script lang="ts">
  import LayoutGrid, { Cell } from "@smui/layout-grid"

  let className = ""
  export let container = false
  export let sm: number | undefined = undefined
  export let md: number | undefined = sm
  export let lg: number | undefined = md

  export { className as class }
</script>

{#if container}
  <LayoutGrid class={className} {...$$restProps} on:click>
    <slot />
  </LayoutGrid>
{:else}
  <Cell
    class={className}
    spanDevices={{ desktop: lg, tablet: md, phone: sm }}
    {...$$restProps}
    on:click
  >
    <slot />
  </Cell>
{/if}

<style lang="scss">
  @import "$styles/setup";

  :global(.mdc-layout-grid__cell--span-0-phone) {
    @include mobile() {
      display: none;
    }
  }
  :global(.mdc-layout-grid__cell--span-0-tablet) {
    @include tablet() {
      display: none;
    }
  }
  :global(.mdc-layout-grid__cell--span-0-desktop) {
    @include desktop() {
      display: none;
    }
  }
</style>
