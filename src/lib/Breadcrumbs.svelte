<script lang="ts">
  import { schemas } from "$lib/schemas"

  type Breadcrumb = {
    name: string
    link: string
  }
  type Breadcrumbs = Breadcrumb[]

  export let path = "/"
  export let route = "/"

  const pathNormalized = path.replace(/\/$/, "")
  const routeNormalized = route.replace(/\/$/, "")

  const breadcrumbTree = {
    "": {
      name: "Docs",
      children: {
        test: {
          name: "Test...",
        },
        tags: {
          name: "IOXIO Tags™",
          children: {
            metadata: {
              name: "Metadata",
            },
            signatures: {
              name: "Signatures",
            },
          },
        },
        schemas: {
          name: "Schemas",
          children: {
            "[schema]": {
              name: function () {
                const routePart = pathNormalized.split("/").pop()
                const schema = schemas.find((item) => item.route === routePart)
                return schema.name
              },
            },
          },
        },
      },
    },
  }

  function partsToLink(parts: string[]): string {
    if (parts.length === 1 && parts[0] === "") {
      return "/"
    }

    return `${parts.join("/")}/`
  }

  function getBreadcrumbs(): Breadcrumb[] {
    const breadcrumbs = []
    const pathParts = pathNormalized.split("/")
    const routeParts = routeNormalized.split("/")

    let workingTree = breadcrumbTree
    for (let idx = 0; idx < pathParts.length; idx++) {
      let part = pathParts[idx]

      // Abort if something looks wrong
      if (workingTree[part] === undefined) {
        part = routeParts[idx]
        if (workingTree[part] === undefined) {
          console.log(`Couldn't find ${part} in tree`)
          return [
            {
              name: "Unknown",
              link: "/",
            },
          ]
        }
      }

      const node = workingTree[part]
      const name = typeof node.name === "function" ? node.name() : node.name
      const parts = pathParts.slice(0, idx + 1)

      breadcrumbs.push({
        name: name,
        link: partsToLink(parts),
      })

      workingTree = node.children
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()
</script>

<div class="breadcrumbs">
  {#each breadcrumbs as breadcrumb, i}
    <span class="breadcrumb"><a href={breadcrumb.link}>{breadcrumb.name}</a></span>
    <span class="sep">/</span>
  {/each}
</div>

<style lang="scss">
  .sep {
    margin: 0 0.5rem;
  }
</style>
