<script lang="ts">
  export let icon
  export let href
  export let internal = false
</script>

<a class="icon-link" {href} target={!internal ? "_blank" : ""} rel="noreferrer">
  <span>
    <slot />
  </span>
  <svelte:component this={icon} />
</a>

<style lang="scss">
  @import "$styles/setup";

  .icon-link {
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
