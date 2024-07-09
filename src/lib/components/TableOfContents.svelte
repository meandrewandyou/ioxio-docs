<script lang="ts">
  import { onDestroy, onMount, setContext } from "svelte"
  import { createPopover } from "svelte-headlessui"
  import breakpointObserver from "$lib/components/breakpointObserver.js"
  import { tableOfContents } from "../../routes/store"
  import Grid from "./Grid.svelte"
  import MenuButton from "./MenuButton.svelte"

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
  {#if $isSmallScreen}
    <div class="table-of-contents small">
      <MenuButton {popover} showInTablet={true} alignIconToRight={true} />
      {#if $popover.expanded}
        <div class="content tablet-and-below">
          <p>On this page</p>
          {#each $tableOfContents as entry}
            <a class="link" href={`#${entry.id}`}>{entry.title}</a>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
  <!-- Dunno why but the grid defaults to md=9 unless we override it here for tablet size too .. -->
  <Grid sm={$isSmallScreen ? 12 : 9} md={$isSmallScreen ? 12 : 9}>
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
</Grid>

<style lang="scss">
  @use "$styles/mixins" as mixins;
  @use "$styles/variables" as vars;

  :global(.table-of-contents) {
    color: vars.$color-neutral-gray;
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
        scrollbar-color: vars.$color-primary-dark-hover vars.$color-primary-highlight;
        scrollbar-width: thin;
      }

      @supports selector(::-webkit-scrollbar) {
        &::-webkit-scrollbar {
          background: vars.$color-primary-highlight;
          width: 8px;
        }

        &::-webkit-scrollbar-thumb {
          background: vars.$color-primary-dark-hover;
        }
      }

      p {
        margin-bottom: vars.$spacing-03;
        margin-left: 0.5rem;
      }

      &.tablet-and-below {
        position: absolute;
        top: 4rem;
        right: 2rem;
        background: vars.$color-primary-dark-hover;
        border-radius: 5px;
        padding-right: 1rem;
        width: 16rem;
      }

      .link {
        @include mixins.text-body-2();
        color: vars.$color-neutral-gray;
        text-decoration: none;
        padding: 0.5rem 0 0.5rem 1rem;
        margin-left: 0.5rem;
        border-left: 2px solid vars.$color-dark-green;
        transition: all 0.3s ease;

        &:hover {
          color: vars.$color-success-main;
          border-left-color: vars.$color-success-main;
        }
      }
    }
  }

  :global(.table-of-contents.small) {
    position: absolute;
    right: vars.$spacing-02;
    top: vars.$spacing-03;
  }
</style>
