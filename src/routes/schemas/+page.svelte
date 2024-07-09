<script lang="ts">
  import { schemas } from "$lib/components/schemas"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"

  /** @type {import('./$types').PageData} */
  export let data
</script>

<Title title="Data schemas used in IOXIO Dataspaces" />

<Breadcrumbs path={data.path} />

<h1>Schemas</h1>

<p>Human readable schemas for various objects and files used in IOXIO Dataspaces.</p>

<ul>
  {#each schemas as schema}
    <li><a href={`/schemas/${schema.route}/`}>{schema.name}</a></li>
  {/each}
</ul>
