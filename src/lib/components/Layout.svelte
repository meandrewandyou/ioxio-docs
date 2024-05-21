<script lang="ts">
  import { createPopover } from "svelte-headlessui"
  import { fade } from "svelte/transition"

  import Container from "$lib/components/Container.svelte"
  import Footer from "$lib/components/Footer.svelte"
  import Grid from "$lib/components/Grid.svelte"
  import NavBar from "$lib/components/NavBar.svelte"
  import breakpointObserver from "$lib/breakpointObserver.js"
  import Sidebar from "$lib/components/Sidebar.svelte"
  import { page } from "$app/stores"

  const popover = createPopover({})
  const size = breakpointObserver()
  $: isSmallScreen = size.smallerThan("md")
</script>

<section>
  <NavBar {popover} />
  <Container class="main-container">
    {#if !$isSmallScreen}
      <Sidebar />
    {/if}
    <!-- needs to stay there for better keyboard navigation on mobile -->
    {#if $isSmallScreen && $popover.expanded}
      <div class="mobile-sidebar-wrapper" use:popover.panel transition:fade={{ duration: 100 }}>
        <Grid container>
          <Grid sm={5}>
            <Sidebar mobile />
          </Grid>
          <Grid sm={7} />
        </Grid>
      </div>
    {/if}
    <Grid container class="main-grid">
      {#if $page.url.pathname !== "/"}
        {#if !$isSmallScreen}
          <Grid sm={0} md={3} class="left-nav-wrapper">
            <div class="left-nav" />
          </Grid>
        {/if}
        <Grid sm={12} md={9} class="content-grid">
          <slot />
        </Grid>
      {:else}
        {#if !$isSmallScreen}
          <Grid sm={0} md={2} lg={1} class="left-nav-wrapper">
            <div class="left-nav" />
          </Grid>
        {/if}
        <Grid sm={12} md={10} lg={11} class="content-grid">
          <slot />
        </Grid>
      {/if}
    </Grid>
  </Container>
  <Footer />
</section>

<style lang="scss">
  @import "$styles/setup";

  section {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    position: relative;
    background-color: $color-primary-dark;
  }

  :global(.main-container) {
    flex-grow: 1;
    background-color: $color-primary-dark;
    position: relative;
  }

  :global(.main-grid, .main-grid .mdc-layout-grid__inner) {
    height: 100%;
  }

  :global(.left-nav-wrapper) {
    position: relative;

    @include mobile() {
      display: none;
    }
  }

  .left-nav {
    margin-left: 72px;
  }

  :global(.main-container .content-grid) {
    margin-bottom: $spacing-05;
  }

  .mobile-sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: $color-primary-highlight;

    :global(.grid-full-height) {
      height: 100%;

      :global(.mdc-layout-grid__inner) {
        height: 100%;
        grid-gap: 0;
      }
    }

    :global(.mobile-sidebar-right-column) {
      background: rgba(16, 24, 40, 0.88);

      :global(svg) {
        cursor: pointer;
        margin: $spacing-02;
        width: $spacing-03;
        height: $spacing-03;

        :global(path) {
          fill: $color-neutral-light;
        }
      }
    }
  }
</style>
