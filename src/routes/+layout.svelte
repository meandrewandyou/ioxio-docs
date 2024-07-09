<script>
  import Layout from "$lib/components/Layout.svelte"

  import "@fontsource/poppins"

  import "$styles/_init.scss"
  import "svelte-highlight/styles/github.css"

  // Highlight.js (svelte-highlight) code block styling
  import githubDark from "svelte-highlight/styles/github-dark"
  import "svelte-highlight/styles/github-dark.css"
</script>

<!-- Customization for code blocks -->
<svelte:head>
  {@html githubDark}
</svelte:head>

<Layout>
  <slot />
</Layout>
