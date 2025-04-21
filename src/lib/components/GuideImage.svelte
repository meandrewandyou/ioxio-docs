<script lang="ts">
  export let img: { src: string; alt: string }
  let className = ""
  export let fullWidth: boolean = false
  export let compact: boolean = false

  if (fullWidth) {
    className += "full-width "
  }
  if (compact) {
    className += "compact"
  }
</script>

<img class={className} src={img.src} alt={img.alt} />

<style lang="scss">
  img {
    max-width: 50rem;
    &.compact {
      max-width: 35rem;
    }
    &.full-width {
      width: 100%;
      max-width: none;
    }
  }
</style>
