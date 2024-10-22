<script lang="ts">
  export let img: { src: string; alt: string }
</script>

<img src={img.src} alt={img.alt} />

<style lang="scss">
  img {
    max-width: 50rem;
  }
</style>
