<script lang="ts">
  import { isInternalLink } from "$lib/utils"

  export let href: string
  export let className: string | undefined = undefined
</script>

<a
  class={className}
  {href}
  target={isInternalLink(href) ? null : "_blank"}
  rel={isInternalLink(href) ? null : "noreferrer"}
>
  <slot />
</a>
