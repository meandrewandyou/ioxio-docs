<script lang="ts">
  export let url: string
  const parts = url.split("?")[0].replace(/\/$/, "").split("/")
  const board = parts[parts.length - 1]
</script>

<iframe
  title="Miro board"
  width="100%"
  height="432"
  src={`https://miro.com/app/live-embed/${board}/`}
  frameborder="0"
  scrolling="no"
  allow="fullscreen; clipboard-read; clipboard-write"
  allowfullscreen
/>
