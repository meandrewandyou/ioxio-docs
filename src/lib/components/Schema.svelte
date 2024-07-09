<script lang="ts">
  import HelpOutlineIcon from "$lib/images/help-outline-icon.svg"
  export let schema: any
</script>

<div class="schema">
  {#each schema as item}
    <div class={"item" + (item.type === "object" ? " object" : "")}>
      <div class="key">
        <em>{item.property}</em>
        <span class="item-type">{item.type}</span>
      </div>
      <div class="description">{item.description}</div>
      <div class="example" title={item.example}>
        <HelpOutlineIcon />
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use "$styles/variables" as vars;
  @use "$styles/mixins" as mixins;

  .schema {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    .item {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;

      .key {
        flex-shrink: 0;

        .item-type {
          margin-left: vars.$spacing-01;
        }

        @include mixins.tablet-and-below() {
          display: flex;
          flex-direction: column;
          gap: vars.$spacing-01;

          .item-type {
            margin: 0;
          }
        }
      }

      .description {
        flex-grow: 1;
      }

      .example {
        flex-shrink: 0;
        height: 20px;
        width: 20px;
      }
    }
  }
</style>
