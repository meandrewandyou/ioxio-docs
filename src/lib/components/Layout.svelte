<script lang="ts">
  import { createPopover } from "svelte-headlessui"
  import { fade } from "svelte/transition"
  import { page } from "$app/stores"

  import Container from "$lib/components/Container.svelte"
  import Footer from "$lib/components/Footer.svelte"
  import Grid from "$lib/components/Grid.svelte"
  import NavBar from "$lib/components/NavBar.svelte"
  import breakpointObserver from "$lib/breakpointObserver.js"
  import Sidebar from "$lib/components/Sidebar.svelte"
  import { navigation } from "$lib/navigation"

  const popover = createPopover({})
  const size = breakpointObserver()

  $: isSmallScreen = size.smallerThan("md")
  $: indexPage = $page.url.pathname === "/"

  // close the mobile menu after navigating to another page
  let currentPage = $page.url
  $: if ($page.url != currentPage) {
    popover.close()
    currentPage = $page.url
  }

  let subNavigation: { href: string; name: string }[] = []
  let currentSectionName = ""
  $: for (let section of navigation) {
    if ($page.url.pathname === "/") {
      subNavigation = []
      break
    }
    if (section.route !== "" && $page.url.pathname.startsWith(`/${section.route}`)) {
      currentSectionName = section.name
      subNavigation = (section.children || []).map((child) => ({
        href: `/${section.route}/${child.route}`,
        name: child.name,
      }))
    }
  }
</script>

<section>
  <NavBar {popover} />
  <div class="main-container">
    {#if !$isSmallScreen}
      <Sidebar />
    {/if}
    {#if !indexPage}
      <div class="left-nav-wrapper">
        <div class="left-nav">
          <div class="section-title">{currentSectionName}</div>
          {#each subNavigation as navItem}
            <a href={navItem.href}>{navItem.name}</a>
          {/each}
        </div>
      </div>
    {/if}
    <Container class="main-container">
      <!-- needs to stay there for better keyboard navigation on mobile -->
      {#if $isSmallScreen && $popover.expanded}
        <div class="mobile-sidebar-wrapper" use:popover.panel transition:fade={{ duration: 100 }}>
          <Grid container>
            <Grid sm={5}>
              <Sidebar mobile />
            </Grid>
            <Grid sm={7}>
              <div class="mobile-sub-navigation">
                {#each subNavigation as navItem}
                  <a href={navItem.href}>{navItem.name}</a>
                {/each}
              </div>
            </Grid>
          </Grid>
        </div>
      {/if}
      <Grid container class="main-grid">
        {#if indexPage}
          <Grid sm={0} md={2} />
          <Grid sm={12} md={10} class="content-grid">
            <slot />
          </Grid>
        {:else}
          <Grid sm={12} class="content-grid">
            <slot />
          </Grid>
        {/if}
      </Grid>
    </Container>
  </div>
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
    display: flex;
    flex-grow: 1;
    background-color: $color-primary-dark;
    position: relative;
  }

  :global(.main-grid, .main-grid .mdc-layout-grid__inner) {
    height: 100%;
  }

  :global(.left-nav-wrapper) {
    position: relative;
    width: 25rem;

    @include mobile() {
      display: none;
    }

    .left-nav {
      margin-left: 5.25rem;
      display: flex;
      flex-direction: column;
      gap: $spacing-01;
      padding-top: $spacing-02;
      position: sticky;
      top: 0;

      .section-title {
        font-weight: 600;
      }

      a {
        color: $color-neutral-gray;
        text-decoration: none;

        &:hover {
          color: $color-success-main;
        }
      }
    }
  }

  :global(.main-container .content-grid) {
    margin-bottom: $spacing-05;
  }

  :global(.main-container .mdc-layout-grid) {
    width: 100%;
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

    .mobile-sub-navigation {
      margin: $spacing-04 0 0 $spacing-02;
      display: flex;
      flex-direction: column;
      gap: $spacing-01;

      a {
        color: $color-neutral-gray;
        text-decoration: none;

        &:hover {
          color: $color-success-main;
        }
      }
    }
  }
</style>
