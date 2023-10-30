<script>
  import A from "$lib/A.svelte"
  import Header from "$lib/Header.svelte"

  import "@fontsource/poppins"

  import "./styles.css"
  import "svelte-highlight/styles/github.css"
  import Breadcrumbs from "$lib/Breadcrumbs.svelte"
</script>

<div class="app">
  <div class="content">
    <Header />

    <main>
      <slot />
    </main>

    <footer>
      <p>
        Try out our technologies for free on the <A href="https://sandbox.ioxio-dataspace.com"
          >IOXIO Dataspace&trade; sandbox</A
        > and the <A href="https://testbed.fi">Finnish data economy testbed</A>.
      </p>
      <p>Visit <A href="https://ioxio.com">ioxio.com</A> to learn more about IOXIO&reg;</p>
    </footer>
  </div>
</div>

<style lang="scss">
  $targetOpacity: 0.85;

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background-image: url("/background.jpg");
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 64rem;
    padding: 1rem;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    background: rgba(233, 240, 250, $targetOpacity);
  }

  @media (min-width: 45rem) {
    .content {
      padding: 1rem 4rem;
    }

    .content:before {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      left: -4rem;
      pointer-events: none;
      background-image: linear-gradient(
        to right,
        rgba(233, 240, 250, 0),
        rgba(233, 240, 250, $targetOpacity)
      );
      height: 100%;
      width: 4rem;
    }

    .content:after {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      right: -4rem;
      pointer-events: none;
      background-image: linear-gradient(
        to left,
        rgba(233, 240, 250, 0),
        rgba(233, 240, 250, $targetOpacity)
      );
      height: 100%;
      width: 4rem;
    }
  }

  main {
    flex-grow: 1;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;

    p {
      margin: 0.25rem 0;
    }
  }

  footer :global(a) {
    font-weight: bold;
  }
</style>
