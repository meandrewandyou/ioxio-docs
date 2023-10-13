<script>
  let id = "temp-" + Math.random()
  let container

  $: if (container) {
    id = container.innerText.trim().replace(" ", "-").toLowerCase()
  }
</script>

<h2 {id}><a href={`#${id}`} bind:this={container}><slot /> <span class="marker">§</span></a></h2>

<style lang="scss">
  h2 {
    margin-top: 3rem;
  }

  .marker {
    visibility: hidden;
  }

  h2:hover {
    .marker {
      visibility: visible;
    }
  }
</style>
