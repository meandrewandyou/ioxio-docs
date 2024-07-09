<script lang="ts">
  import MenuButton from "./MenuButton.svelte"
  import IoxioLogo from "$lib/images/ioxio-logo.svg?dataurl"

  export let popover: any
</script>

<header>
  <div class="header">
    <div class="title">
      <MenuButton {popover} />
      <img src={IoxioLogo} alt="IOXIO" />
      <div class="separator" />
      <a class="title-link" href="/">Documentation portal</a>
    </div>
  </div>
</header>

<style lang="scss">
  @import "$styles/setup";

  header {
    background-color: $color-primary-highlight;
    padding: 0 $spacing-03;
  }

  .header {
    padding: $spacing-02 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color-neutral-light;

    .title {
      display: flex;
      gap: 14px;
      align-items: center;

      .hamburger-button {
        display: none;
        padding: 0;
        background-color: transparent;
        border: none;

        @include mobile() {
          display: block;
        }

        :global(svg) {
          width: 1.25rem;
          height: 1.25rem;
        }
      }

      .separator {
        height: 22px;
        width: 1px;
        background-color: $color-neutral-light;
      }

      .title-link {
        color: $color-secondary-light;
        text-decoration: none;
        cursor: pointer;
      }

      // ioxio logo
      img {
        width: 4rem;
        height: $spacing-02;
      }
    }
  }
</style>
