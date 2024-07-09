<script lang="ts">
  let className = ""
  export { className as class }
</script>

<div class={`container ${className}`}>
  <slot />
</div>

<style lang="scss">
  @import "$styles/setup";

  .container {
    width: 100%;
    max-width: $container-width;
    padding: 0 $spacing-03;
    margin: 0 auto;

    @include tablet-and-below() {
      padding: 0 $spacing-02;
    }
  }
</style>
