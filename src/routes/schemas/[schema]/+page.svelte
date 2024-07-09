<script lang="ts">
  // Render the HTML files from JSON Schemas
  import "$styles/schema_doc.scss"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import { schemas } from "$lib/components/schemas"
  import { afterUpdate } from "svelte"

  /** @type {import('./$types').PageData} */
  export let data

  afterUpdate(() => {
    if (typeof document === "undefined") {
      return
    }

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
          }
        }
      })
    }

    if (typeof document === "undefined" || typeof window === "undefined" || !window.anchorOnLoad) {
      return
    }

    window.anchorOnLoad()
  })

  const schemaRouteParts = data.path.replace(/\/$/, "").split("/")
  const schemaRoute = schemaRouteParts[schemaRouteParts.length - 1]
  const schema = schemas.find((i) => {
    return i.route === schemaRoute
  })
</script>

<Title title={`Schema for ${schema.name}`} />

<Breadcrumbs path={data.path} />

<article>
  {@html data.htmlText}
</article>

<style lang="scss">
  @use "$styles/mixins" as mixins;
  @use "$styles/variables" as vars;

  article {
    :global(.text-right) {
      text-align: right;
    }

    :global(.breadcrumbs) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }

    :global(.breadcrumbs svg) {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin: vars.$spacing-01;
    }

    :global(code) {
      // These styles are copied from _globals.scss em

      font-style: normal;
      font-family: Consolas, Menlo, "Deja Vu Sans Mono", "Bitstream Vera Sans Mono", monospace;
      white-space: pre-wrap;
      padding: 4px 8px;
      background-color: vars.$color-dark-green;
      border-radius: 2px;
      color: vars.$color-neutral-light;

      // When an em spans multiple lines, makes the next lines indented a bit to give them margin to the left edge of the background color
      // https://css-tricks.com/multi-line-padded-text/
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
    }

    :global(.btn.btn-primary) {
      color: #fff;
      border: 1px solid vars.$color-success-main;
      background: vars.$color-primary-dark;
      cursor: pointer;
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
      color: #24292e;
      margin-bottom: 2rem;
      max-width: 100%;
      overflow-x: auto;
      border-radius: 5px;
      border: 1px solid vars.$color-dark-cobalt;

      :global(pre) {
        margin: 0;
        background: vars.$color-code-background;
        color: vars.$color-code-color;
      }
    }

    :global(.badge) {
      display: inline-block;
      padding: 4px 8px;
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.5;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 5px;
    }

    :global(.badge-warning) {
      background-color: vars.$color-info-dark;
    }

    :global(.badge-secondary) {
      background-color: transparent;
      font-size: 18px;
      padding: 0;
      margin: 0 0 vars.$spacing-01 0;
      border: 0;
      color: white;
    }

    :global(.badge-dark) {
      background-color: vars.$color-secondary-main;
      color: white;
    }

    :global(.badge-info) {
      background-color: #3973b6;
      color: white;
    }

    :global(.badge-light) {
      background-color: vars.$color-dark-cobalt;
    }

    :global(.badge-light code) {
      background-color: vars.$color-dark-cobalt;
      padding: 0;
      color: vars.$color-success-main;
    }

    :global(.collapse:not(.show)) {
      display: none;
    }

    :global(.card) {
      border: 1px solid vars.$color-dark-cobalt;

      :global(h2) {
        margin: 0;
      }

      :global(.card-header) {
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
