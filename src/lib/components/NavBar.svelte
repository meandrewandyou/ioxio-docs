<script lang="ts">
  import IoxioLogo from "$lib/images/ioxio-logo.svg?dataurl"
  import GitHubLogo from "$lib/images/github-icon.svg?dataurl"
  import Container from "$lib/components/Container.svelte"
  import HamburgerIcon from "$lib/images/hamburger-icon.svg"

  export let popover: any
</script>

<header>
  <Container>
    <div class="header">
      <div class="title">
        <button use:popover.button class="hamburger-button">
          <HamburgerIcon />
        </button>
        <img src={IoxioLogo} alt="IOXIO" />
        <div class="separator" />
        <a class="title-link" href="/">Documentation portal</a>
      </div>
      <a href="https://github.com/ioxiocom/ioxio-docs" rel="noopener noreferrer" target="_blank">
        <img src={GitHubLogo} alt="GitHub repository" />
      </a>
    </div>
  </Container>
</header>

<style lang="scss">
  @import "$styles/setup";

  header {
    background-color: $color-primary-dark-hover;
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
        height: $spacing-02;
      }
    }

    // github
    img {
      height: $spacing-03;
    }
  }
</style>
