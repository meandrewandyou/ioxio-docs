<script lang="ts">
  import { Highlight, LineNumbers } from "svelte-highlight"
  import type { LanguageType } from "svelte-highlight/languages"

  // https://svhe.onrender.com/languages
  export let lang: LanguageType<string>

  export let lineNumbers = false

  // Temporary container where the "slot" will be rendered
  let codeContainer

  // Code to be highlighted, captured from the "slot"
  let code = ""

  $: {
    code = codeContainer ? codeContainer.innerHTML.trim() : ""
  }
</script>

<article>
  <div aria-hidden="true" bind:this={codeContainer} class="code">
    <slot />
  </div>

  {#if code}
    {#if lineNumbers}
      <Highlight style="nightOwl" language={lang} {code} let:highlighted>
        <LineNumbers {highlighted} wrapLines />
      </Highlight>
    {:else}
      <Highlight language={lang} {code} />
    {/if}
  {/if}
</article>

<style lang="scss">
  @use "$styles/variables" as vars;

  div.code {
    display: none;
  }

  article {
    max-width: 100%;
    margin: vars.$spacing-02 0 vars.$spacing-02 0;
  }
</style>
