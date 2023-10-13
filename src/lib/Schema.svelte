<script lang="ts">
  export let schema: any
</script>

<div class="schema">
  {#each schema as item}
    <div class={"item" + (item.type === "object" ? " object" : "")}>
      <div class="key">
        <em>{item.property}</em> <span class="item-type">{item.type}</span>
      </div>
      <div class="description">{item.description}</div>
      <div class="example" title={item.example}>(?)</div>
    </div>
  {/each}
</div>

<style lang="scss">
  .schema {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    .item {
      display: flex;
      flex-direction: row;
      gap: 1rem;

      .key {
        flex-shrink: 0;
      }

      .item-type {
        font-size: 0.75rem;
      }

      .description {
        flex-grow: 1;
      }

      .example {
        flex-shrink: 0;
      }
    }
  }
</style>
