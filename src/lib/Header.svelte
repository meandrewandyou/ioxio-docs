<script>
  import github from "$lib/images/github.svg"
</script>

<header>
  <h2><a href="/">IOXIO<span class="reg">&reg;</span> Documentation portal</a></h2>
  <div class="corner">
    <a href="https://github.com/ioxiocom/ioxio-docs">
      <img src={github} alt="GitHub" />
    </a>
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .reg {
      font-weight: 400;
    }

    a {
      color: black;
    }
  }

  .corner {
    width: 3em;
    height: 3em;
  }

  .corner a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .corner img {
    width: 2em;
    height: 2em;
    object-fit: contain;
  }
</style>
