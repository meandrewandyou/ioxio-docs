<script lang="ts">
  import { schemas } from "$lib/schemas"
  import Breadcrumbs from "$lib/Breadcrumbs.svelte"
  import Title from "$lib/Title.svelte"

  /** @type {import('./$types').PageData} */
  export let data
</script>

<Title title="Data schemas used in IOXIO Dataspaces" />

<Breadcrumbs path={data.path} route={data.route} />

<h1>Schemas</h1>

<p>Human readable schemas for various objects and files used in IOXIO Dataspaces.</p>

<ul>
  {#each schemas as schema}
    <li><a href={`/schemas/${schema.route}/`}>{schema.name}</a></li>
  {/each}
</ul>
