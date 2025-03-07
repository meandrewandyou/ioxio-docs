<script lang="ts">
  import { schemas } from "$lib/components/schemas"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import A from "$lib/components/A.svelte"

  /** @type {import('./$types').PageData} */
  export let data
</script>

<Title title="Data schemas used in IOXIO Dataspaces" />

<Breadcrumbs path={data.path} />

<h1>Schemas</h1>

<p>Human readable schemas for various objects and files used in IOXIO Dataspaces.</p>

<ul>
  {#each schemas as schema}
    <li><A href={`/schemas/${schema.route}/`}>{schema.name}</A></li>
  {/each}
</ul>
