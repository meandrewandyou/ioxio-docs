<script lang="ts">
  import QRCodeIcon from "$lib/images/qr-code-icon.svg"
  import GuidesIcon from "$lib/images/guides-icon.svg"

  import SchemasIcon from "$lib/images/schemas-icon.svg"
  import HomeIcon from "$lib/images/home-icon.svg"
  import { page } from "$app/stores"
  import { spring } from "svelte/motion"
  import { navigation, type NavItem } from "$lib/components/navigation"

  const MENU_SMALL = 4.5
  const MENU_WIDE = 12

  export let mobile = false

  const width = spring(mobile ? MENU_WIDE : MENU_SMALL)

  function isSelected(section: NavItem, currentPath: string) {
    if (section.route === "" && currentPath === "/") {
      return true
    } else if (section.route !== "" && currentPath.startsWith(`/${section.route}`)) {
      return true
    }
    return false
  }

  function getIcon(name?: string) {
    switch (name) {
      case "home":
        return HomeIcon
      case "qr-code-icon":
        return QRCodeIcon
      case "schemas-icon":
        return SchemasIcon
      case "dataspace-icon":
        return GuidesIcon
      default:
        return HomeIcon
    }
  }

  // needs for a correct transition
  let textHidden = true

  function expandMenu() {
    width.set(MENU_WIDE)
    textHidden = false
  }

  function collapseMenu() {
    width.set(MENU_SMALL)
    textHidden = true
  }
</script>

<nav
  class="sidebar"
  class:mobile-only={mobile}
  style={mobile ? "" : `width: ${$width}rem`}
  on:mouseover={() => !mobile && expandMenu()}
  on:mouseout={() => !mobile && collapseMenu()}
  on:blur={undefined}
  on:focus={undefined}
>
  <div class="sticky-wrapper">
    {#each navigation as section}
      <a
        href={`/${section.route}`}
        class="menu-item"
        class:selected={isSelected(section, $page.url.pathname)}
      >
        <div class="icon-wrapper">
          <svelte:component this={getIcon(section.icon)} />
        </div>
        <div class="name">{!textHidden || mobile ? section.name : ""}</div>
      </a>
    {/each}
  </div>
</nav>

<style lang="scss">
  @import "$styles/setup.scss";

  nav {
    height: 100%;
    background-color: $color-primary-highlight;
    border-right: 1px solid $color-primary-dark-hover;
    border-left: 1px solid $color-primary-dark-hover;
    padding-top: 1rem;
    z-index: 1;

    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;

    .sticky-wrapper {
      position: sticky;
      top: $spacing-02;
    }

    .menu-item {
      border-radius: 5px;
      margin: $spacing-01 0 $spacing-01 $spacing-02;
      display: flex;
      align-items: center;
      gap: $spacing-02;
      color: $color-neutral-light;
      text-decoration: none;

      &.selected {
        .icon-wrapper {
          background-color: $color-success-main;
          border-radius: 5px;
        }

        :global(svg path) {
          fill: white;
        }
      }

      .icon-wrapper {
        flex-shrink: 0;
        padding: $spacing-01;

        :global(svg) {
          width: $spacing-03;
          height: $spacing-03;
          flex-shrink: 0;
        }
      }

      .name {
        opacity: 0;
        transition: opacity 500ms ease 0s;
      }

      &:hover:not(.selected) {
        .name {
          color: $color-success-main;
        }

        :global(svg path) {
          fill: $color-success-main;
        }
      }
    }

    &:hover,
    &.mobile-only {
      .menu-item.selected {
        background-color: $color-success-main;
        margin-right: $spacing-01;
      }

      .name {
        opacity: 1;
      }
    }

    &.mobile-only {
      width: auto;
      overflow: auto;
      white-space: break-spaces;
      position: relative;
      height: 100vh;

      .menu-item {
        gap: 0;
      }
    }
  }
</style>
