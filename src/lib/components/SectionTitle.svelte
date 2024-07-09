<script lang="ts">
  import { getContext, onMount } from "svelte"

  let id: string
  export let level = 1
  export let title: string

  $: if (title) {
    id = title.trim().replaceAll(" ", "-").toLowerCase()
  }
  const context = getContext("TableOfContents")
  onMount(() => {
    if (context) {
      if (title && id) {
        context.addEntry({
          title: title,
          level: level,
          id: id,
        })
      }
    }
  })
</script>

<h2 {id}><a href={`#${id}`}> {title} <span class="marker">§</span></a></h2>

<style lang="scss">
  @use "$styles/variables" as vars;

  h2 {
    a {
      font-size: vars.$h2-font-size;
      font-weight: vars.$h2-font-weight;
      line-height: vars.$h2-line-height;
      color: vars.$color-neutral-light;
    }
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
