<script lang="ts">
  // Render the HTML files from JSON Schemas
  import "$lib/schema_doc.css"
  import { onMount } from "svelte"
  import Breadcrumbs from "$lib/Breadcrumbs.svelte"
  import Title from "$lib/Title.svelte"
  import { schemas } from "$lib/schemas"

  /** @type {import('./$types').PageData} */
  export let data

  onMount(() => {
    if (typeof document === "undefined" || typeof window === "undefined" || !window.anchorOnLoad) {
      return
    }

    window.anchorOnLoad()

    const toggles = document.querySelectorAll("[data-toggle]")
    for (let toggleSource: HTMLElement of toggles) {
      const target = toggleSource.dataset.target

      toggleSource.addEventListener("click", function (evt) {
        evt.preventDefault()

        const matches = document.querySelectorAll(target)
        for (let match: HTMLElement of matches) {
          if (match.classList.contains("show")) {
            match.classList.remove("show")
          } else {
            match.classList.add("show")

            // Scroll the contents into view
            match.scrollIntoView({
              behavior: "instant",
              block: "end",
              inline: "nearest",
            })
          }
        }
      })
    }
  })

  const schemaRouteParts = data.path.replace(/\/$/, "").split("/")
  const schemaRoute = schemaRouteParts[schemaRouteParts.length - 1]
  const schema = schemas.find((i) => {
    return i.route === schemaRoute
  })
</script>

<Title>Schema for {schema.name}</Title>

<Breadcrumbs path={data.path} route={data.route} />

<article>
  {@html data.htmlText}
</article>

<style lang="scss">
  article {
    :global(.text-right) {
      text-align: right;
    }

    :global(.btn.btn-primary) {
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
      display: inline-block;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
    }

    :global(.examples) {
      padding: 1rem;
      color: #24292e;
      background: #fff;
      margin-bottom: 2rem;
      max-width: 100%;
      overflow-x: auto;
      border-radius: 5px;
      border: 1px solid #ccc;

      :global(pre) {
        background: #fff;
        margin: 0;
      }
    }

    :global(.badge) {
      display: inline-block;
      padding: 0.25em 0.4em;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25rem;
    }

    :global(.badge-warning) {
      background-color: #eec05f;
    }

    :global(.badge-secondary) {
      background-color: #575757;
      color: white;
    }

    :global(.badge-dark) {
      background-color: #363636;
      color: white;
    }

    :global(.badge-info) {
      background-color: #0072d0;
      color: white;
    }

    :global(.badge-light) {
      background-color: #dcdcdc;
    }

    :global(code) {
      color: #e83e8c;
    }

    :global(.collapse:not(.show)) {
      display: none;
    }

    :global(.card) {
      $border: 1px solid darken(#e9ecef, 5%);
      border: $border;
      background: lighten(#e9ecef, 5%);

      :global(h2) {
        margin: 0;
      }

      :global(.card-header) {
        border-bottom: $border;
        background: lighten(#e9ecef, 3%);

        :global(button) {
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          padding: 1rem;
        }
      }

      :global(.property-definition-div) {
        padding: 1rem;
      }
    }
  }
</style>
