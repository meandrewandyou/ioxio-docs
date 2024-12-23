<script lang="ts">
  export let img: { src: string; alt: string }
  export let fullWidth = false
</script>

<img class={fullWidth ? "full-width" : ""} src={img.src} alt={img.alt} />

<style lang="scss">
  img {
    max-width: 50rem;
    &.full-width {
      width: 100%;
      max-width: none;
    }
  }
</style>
