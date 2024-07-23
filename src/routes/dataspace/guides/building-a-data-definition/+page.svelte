<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import python from "svelte-highlight/languages/python"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"

  /** @type {import('./$types').PageData} */
  export let data
</script>

<TableOfContents>
  <Title title={`Building a data definition for IOXIO Dataspace`} />

  <Breadcrumbs path={data.path} />

  <SectionTitle title="Intro to Data Definitions" />
  <p>
    Data definitions are the technical specifications for data products, which are the cornerstone
    of interoperable and trusted data exchange through a Dataspace. To put it simply, data products
    are a standardized set of data contents that can be used in various different business processes
    and use cases.
  </p>
  <p>
    A data product can for example describe the basic information of a company, transaction invoice
    or bill of lading (BoL) used in the logistics and financial processes in global trade. The data
    definition specifies what fields the data product contains, their meaning and type as well as
    limits and restrictions on them.
  </p>
  <p>
    This guide is mostly focused on the technical aspect of creating the definitions and will try to
    give some general advice on creating a good and reusable definition. Please however note that
    for the best results the data definitions should always be created together with business
    functions or experts in the particular field to ensure the definitions are generic, reusable in
    various use cases and work for various different organizations.
  </p>
  <SectionTitle title="Setup" />
  <h3>Install pre-requisites</h3>
  <p>
    You will need to install all the pre-requisites listed below (the names link directly to
    installation instructions):
  </p>
  <ul>
    <li><a href="https://git-scm.com/downloads" target="_blank">Git</a></li>
    <li><a href="https://www.python.org/downloads/" target="_blank">Python 3.9</a></li>
    <li><a href="https://pre-commit.com/#install" target="_blank">Pre-commit</a></li>
  </ul>
  <h3>Fork and clone the data definitions repository</h3>
  <p>
    Go to the <a href="https://github.com/ioxio-dataspace/sandbox-definitions/" target="_blank"
      >data definition repository on GitHub</a
    > and create your own fork of the repository and clone it. It's important that you make a fork as
    you don't have write access to the repository.
  </p>

  <p>
    Both of these steps are described in detail in the <a
      href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo"
      target="_blank">Fork a repo quickstart guide</a
    > in the GitHub documentation.
  </p>
  <h3>Set up pre-commit hooks</h3>
  <p>
    Open the repository you cloned in a terminal and run pre-commit install to set up the pre-commit
    hooks.
  </p>
  <img src="/create-definition-sc1.png" alt="Command prompt screenshot" />
  <p>If you get any error at this stage, ensure you've properly installed pre-commit and Python.</p>
  <p>
    The pre-commit hooks are used to perform some tasks at time you are committing your changes.
    They will for example generate an OpenAPI spec versions of the definitions based on the
    Python/pydantic ones, do some reformatting of the code and perform some validation.
  </p>
  <h3>Sync the repo</h3>
  <p>
    If you have cloned the repository earlier, ensure you sync the repo with the upstream and have
    the latest main checked out before you proceed to create the branch. If you just created the
    fork and cloned it (followed the steps above), you should have an up to date state already.
  </p>
  <p>
    If you need help with syncing the repo from the upstream, check the <a
      href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#configuring-git-to-sync-your-fork-with-the-upstream-repository"
      target="_blank">Configuring Git to sync your fork with the upstream repository</a
    > on GitHub.
  </p>

  <h3>Create a new branch</h3>
  <p>Create a new branch for your new definition, for example by running:</p>

  <Code lang={json}>
    {`
    git checkout -b adding-my-definition

`}
  </Code>

  <SectionTitle
    title="Creating a new definition
"
  />
  <p>
    This guide explains how to create a new definition using a python file (with models based on the <a
      href="https://docs.pydantic.dev/1.10/"
      target="_blank">pydantic library</a
    >). The content gets automatically converted into an OpenAPI spec file using the pre-commit
    hooks. This is fairly simple to do and understand even if you're not too familiar with Python or
    OpenAPI spec.
  </p>
  <h3>Decide what data to include in the definition</h3>
  <p>
    In this guide we're not giving any detailed information on what data to include in the
    definition or how to structure the data. Some basic principles to follow:
  </p>
  <ul>
    <li>The definition(s) should include the data you want to consume or provide.</li>
    <li>
      Try to make it generic, so it can be used by others, both others providing data or consuming
      data. In some cases it might be better to create multiple definitions rather than one that
      contains a lot of unrelated information that only apply to a particular use-case.
    </li>
    <li>Try to follow existing standards where possible (ISO etc).</li>
    <li>Use terminology and units that are commonly used in the field of application.</li>
    <li>
      Try to make sure the definition is consistent with other definitions if possible. For example
      prefer using same naming, units etc as similar data in other definitions.
    </li>
    <li>
      Prefer well structured and machine readable data that does not require any parsing. For
      example, don't define numeric data as a string with a unit (like "21 km"), rather as a numeric
      value and make sure to include the unit in the description of the field.
    </li>
  </ul>
  <h3>Data we want to define</h3>
  <p>For this guide, we are going to write a definition for some basic info for countries.</p>
  <p>
    Note that the data here has been picked to make the definition somewhat short and varied, not to
    be generic and necessary useful for real use cases.
  </p>
  <p>We have decided we want to include this data:</p>
  <ul>
    <li>Country code</li>
    <li>Name of the country</li>
    <li>Capital of the country, including the coordinates of it</li>
    <li>Official languages</li>
    <li>Area (in km^2)</li>
  </ul>
  <p>Expressed in JSON, here is example data for Finland:</p>
  <Code lang={json}>
    {`
{
    "code": "FI",
    "name": "Finland",
    "capital": {
        "name": "Helsinki",
        "lat": 60.170833,
        "lon": 24.9375,
    },
    "languages": ["fi", "sv"],
    "area": 338455
}

`}
  </Code>
  <p>and for Nauru:</p>
  <Code lang={json}>
    {`
{
   "code": "NR",
    "name": "Nauru",
    "capital": null,
    "languages": ["na", "en"],
    "area": 21
}

`}
  </Code>
  <p><i>(Data source: Wikipedia) </i></p>
</TableOfContents>

<style lang="scss">
  img {
    max-width: 32rem;
  }
</style>
