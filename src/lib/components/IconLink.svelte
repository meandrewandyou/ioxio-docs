<script lang="ts">
  import A from "./A.svelte"
  export let icon
  export let href
</script>

<A className="icon-link" {href}>
  <span>
    <slot />
  </span>
  <svelte:component this={icon} />
</A>

<style lang="scss">
  @import "$styles/setup";

  :global(.icon-link) {
    display: flex;
    width: max-content;
    color: $color-success-main;
    font-weight: 600;
    line-height: 150%;
    text-decoration: none;
    align-items: center;
    gap: $spacing-01;

    span {
      flex-shrink: 0;
    }
  }
</style>
