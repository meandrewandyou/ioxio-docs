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

<style lang="scss">
  @use "$styles/variables" as vars;
  @use "$styles/mixins" as mixins;

  a,
  a:visited {
    @include mixins.text-body();
    color: vars.$color-success-main;
    text-decoration: none;

    &:hover {
      color: vars.$color-success-main;
      text-decoration: underline;
    }
  }
</style>
