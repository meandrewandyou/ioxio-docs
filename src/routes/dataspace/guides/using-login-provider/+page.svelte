<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import A from "$lib/components/A.svelte"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"
  /** @type {import('./$types').PageData} */
  export let data
</script>

<TableOfContents>
  <Title title={`Building a data definition for IOXIO Dataspace`} />

  <Breadcrumbs path={data.path} />

  <h1>Intro to Data Definitions</h1>

  <SectionTitle title="Header" />
  <p>
    Data definitions are the technical specifications for data products, which are the cornerstone
    of interoperable and trusted data exchange through a Dataspace. To put it simply, data products
    are a standardized set of data contents that can be used in various different business processes
    and use cases. A data product can for example describe the basic information of a company,
    transaction invoice or bill of lading (BoL) used in the logistics and financial processes in
    global trade. The data definition specifies what fields the data product contains, their meaning
    and type as well as limits and restrictions on them. This guide is mostly focused on the
    technical aspect of creating the definitions and will try to give some general advice on
    creating a good and reusable definition. Please however note that for the best results the data
    definitions should always be created together with business functions or experts in the
    particular field to ensure the definitions are generic, reusable in various use cases and work
    for various different organizations.
  </p>
</TableOfContents>

<style lang="scss">
</style>
