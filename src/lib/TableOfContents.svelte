<script lang="ts">
  import { onDestroy, onMount, setContext } from "svelte"
  import { createPopover } from "svelte-headlessui"
  import breakpointObserver from "$lib/breakpointObserver.js"
  import { tableOfContents } from "../routes/store"
  import Grid from "./components/Grid.svelte"
  import MenuButton from "./components/MenuButton.svelte"

  type Entry = {
    title: string
    level: number
    id: string
  }
  let entries: Entry[] = []

  const popover = createPopover({})
  const size = breakpointObserver()
  $: isSmallScreen = size.smallerThan("lg")
  setContext("TableOfContents", {
    addEntry: (entry: Entry) => {
      entries.push(entry)
      tableOfContents.set(entries)
    },
  })

  onMount(() => {
    tableOfContents.set(entries)
  })

  onDestroy(() => {
    tableOfContents.set([])
  })
</script>

<Grid class="main-grid" container>
  <Grid sm={$isSmallScreen ? 10 : 9}>
    <slot />
  </Grid>
  {#if !$isSmallScreen}
    <Grid sm={2} class="table-of-contents">
      <div class="content">
        <p>On this page</p>
        {#each $tableOfContents as entry}
          <a class="link" href={`#${entry.id}`}>{entry.title}</a>
        {/each}
      </div>
    </Grid>
  {/if}
  {#if $isSmallScreen}
    <Grid sm={2} class="table-of-contents">
      <MenuButton {popover} showInTablet={true} alignIconToRight={true} />
      {#if $popover.expanded}
        <div class="content mobile">
          <p>On this page</p>
          {#each $tableOfContents as entry}
            <a class="link" href={`#${entry.id}`}>{entry.title}</a>
          {/each}
        </div>
      {/if}
    </Grid>
  {/if}
</Grid>

<style lang="scss">
  @import "$styles/setup";
  :global(.table-of-contents) {
    color: $color-neutral-gray;
    padding-top: 1rem;

    .content {
      display: flex;
      flex-direction: column;
      position: -webkit-sticky;
      position: sticky;
      top: 1rem;
      max-height: 90vh;
      overflow-y: auto;
      padding-bottom: 0.5rem;

      @supports (scrollbar-color: auto) {
        padding-right: 3px;
        scrollbar-color: $color-primary-dark-hover $color-primary-highlight;
        scrollbar-width: thin;
      }

      @supports selector(::-webkit-scrollbar) {
        &::-webkit-scrollbar {
          background: $color-primary-highlight;
          width: 8px;
        }

        &::-webkit-scrollbar-thumb {
          background: $color-primary-dark-hover;
        }
      }

      p {
        margin-bottom: $spacing-03;
        margin-left: 0.5rem;
      }

      &.mobile {
        position: absolute;
        top: 4rem;
        right: 2rem;
        background: $color-primary-dark;
        border-radius: 5px;
        padding-right: 1rem;
      }
      .link {
        @include text-body-2();
        color: $color-neutral-gray;
        text-decoration: none;
        padding: 0.5rem 0 0.5rem 1rem;
        margin-left: 0.5rem;
        border-left: 2px solid $color-dark-green;
        transition: all 0.3s ease;

        &:hover {
          color: $color-success-main;
          border-left-color: $color-success-main;
        }
      }
    }
  }
</style>
