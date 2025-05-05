<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import bash from "svelte-highlight/languages/bash"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"

  import type { PageData } from "./$types"
  import { GUIDES } from "../urls"
  import GuideImage from "$lib/components/GuideImage.svelte"
  import A from "$lib/components/A.svelte"

  export let data: PageData
  const images = data.images
</script>

<TableOfContents>
  <Title title={data.guide.title} />

  <Breadcrumbs path={data.path} />

  <SectionTitle title="Introduction" />
  <p>
    In this guide we will explain how to build a new data source so it can be queried through the
    product gateway using
    <A href="https://sandbox.ioxio-dataspace.com/">IOXIO Sandbox Dataspace</A>. These steps are the
    same on all IOXIO Dataspaces, while some might miss the particular data products mentioned here.
  </p>
  <SectionTitle title="Prerequisites" />
  <li>Data that you want to provide available in a database.</li>
  <li>A data product definition that matches the data you have available.</li>
  <li>
    Ability to host an API that responds to <em>POST</em> requests on the public internet over the https
    protocol.
  </li>
  <SectionTitle title="Choosing a data definition for your source" />
  <p>You can find the available <em>Data definitions</em> via menu.</p>
  <GuideImage compact img={images.DEFINITIONS} />
  <p>
    If there is no definition for the type of data you want to provide, you can create your own
    definition by following the <A href={GUIDES.BUILD_DATA_DEF.href}>
      {GUIDES.BUILD_DATA_DEF.title}
    </A> guide.
  </p>
  <SectionTitle title="What are we building?" />
  <p>
    We need to build an integration that provides an API matching one of the available definitions.
    We'll use <em>Meteorology/Weather_v0.1</em> as our reference example (view
    <A
      href="https://raw.githubusercontent.com/ioxio-dataspace/sandbox-definitions/refs/heads/main/DataProducts/Meteorology/Weather_v0.1.json"
      >OpenAPI Spec</A
    >,
    <A
      href="https://gateway.sandbox.ioxio-dataspace.com/docs#/Data%20Products/Meteorology_Weather_v0_1_Meteorology_Weather_v0_1_post"
    >
      SwaggerUI
    </A> or
    <A
      href="https://gateway.sandbox.ioxio-dataspace.com/redoc#tag/Data-Products/operation/Meteorology_Weather_v0_1_Meteorology_Weather_v0_1_post"
      >ReDoc</A
    >).
  </p>
  <p>
    In this case it means that an API which accepts a <em>POST</em> request at the path
    <em>/Meteorology/Weather_v0.1</em>
    needs to be created. It could for example be hosted at
    <em>https://data-source-guide-example.demos.ioxio.dev/Meteorology/Weather_v0.1</em>.
  </p>
  <p>This endpoint will expect a <em>POST</em> request with a JSON payload, like this:</p>
  <Code lang={json}>
    {`
{
  "lat": 60.192059,
  "lon": 24.945831,
  "when": "2019-10-12T07:20:50.52Z"
}
`}
  </Code>
  <p>It needs to respond with a JSON payload that could look like this:</p>
  <Code lang={json}>
    {`
{
  "temperature": 17.3,
  "humidity": 72,
  "pressure": 1007,
  "wind_speed": 2.1,
  "wind_direction": 220,
  "precipitation": 120,
  "visibility": 320
}
`}
  </Code>
  <p>
    You can build this using your own preferred tools, or have a look at our
    <A href="https://github.com/ioxio-dataspace/data-source-guide-example"
      >simple example implementation</A
    >.
  </p>
  <SectionTitle title="Deploy and host your API" />
  <p>
    Deploy and host your API yourself anywhere you prefer. Note that IOXIO doesn't offer API
    hosting. For the next steps, you'll need the base URL (i.e., the part before the data product
    path) where your API is accessible, for example:
    <em>https://data-source-guide-example.demos.ioxio.dev </em>.
  </p>
  <SectionTitle title="Register your data source in the Dataspace" />
  <p>Go to the dataspace and click on <em>My groups</em>.</p>
  <h3>Ensure you have a group</h3>
  <p>
    Go to the dataspace and click on <em>My groups</em>. If you don't have a group, you will need to
    create one. The name of the group should relate to yourself, your company, or the data source.
    Some dataspaces have moderated group creation. If the page has a notice saying so, and you are
    unable to create the group yourself, please follow the instructions visible in the page to get
    yourself a group. Note, that if your organization already has a group, you will need to ask your
    group's administrator to invite you to the existing group.
  </p>
  <h3>Add your data source</h3>
  <p>
    Use the menu to navigate to <em>My data sources</em>. Press the <em>+ Add</em> a data source
    button. In the <em>Data product</em> dropdown pick the definition that matches your API. Pick one
    of your groups in the dropdown for groups.
  </p>
  <p>
    If you want to publish multiple data sources for the same definition using the same group, you
    can add a variant name to distinguish them from each other. Most likely you don't want to use
    this for your first data source and thus want to leave the field empty. In the <em>Base URL</em>
    enter the base URL at which your deployment is available. The help text shows where the API endpoint
    is expected to be available. The Base URL will not be displayed to other users and is only used by
    the dataspace to connect to your integration. All other applications must connect through the dataspace.
  </p>
  <p>There's three options for the visibility:</p>
  <ul>
    <li>
      <b>Private</b> - The data source will be hidden from other users on the dataspace and
      protected by an additional <em>X-Preview-Token</em> header. Should be used when you want to test
      your own data source before making it available to others.
    </li>
    <li>
      <b>Unlisted</b> - The data source can be accessed by anyone who knows it exists, but will not be
      published in any listing of data sources on the dataspace.
    </li>
    <li>
      <b>Published</b> - The data source will be published on the dataspace for others to see.
    </li>
  </ul>
  <p>
    The access to the data source can be controlled by different options (all options might not be
    available on all dataspaces):
  </p>
  <ul>
    <li>
      <b>No access control</b> - The dataspace will allow anyone to request data from the data source.
    </li>
    <li>
      <b>Self-managed API keys</b> - <em>X-API-Key</em> header will be required to be present, but its
      contents will not be verified by the dataspace.
    </li>
    <li>
      <b>Dataspace verified API tokens</b> - The <em>X-API-Key</em> header will be required and
      verified by the dataspace. Once you save the data source with this setting you can manage
      which groups are allowed to access the data source. The members of the allowed groups will
      find the data source and instructions on generating valid API-tokens for this header in the
      <em>Access control keys</em>
      section of dataspace. The <A href={GUIDES.VERIFYING_API_TOKENS.href}>
        {GUIDES.VERIFYING_API_TOKENS.title}
      </A> guide explains how you can verify the tokens in your data source and know which group was
      requesting the data.
    </li>
  </ul>
  <p>
    For this tutorial, let's choose <em>Unlisted</em> for the visibility and
    <em>Dataspace verified API tokens</em> for access control. The filled in form would look like this:
  </p>
  <GuideImage img={images.CREATE_NEW_DS} />
  <p>Press the <em>Create</em> button to create the data source.</p>
  <p>
    As we selected <em>Dataspace verified API tokens</em>, after group is created you will see the
    <em>Allowed groups</em> section:
  </p>
  <GuideImage img={images.ALLOWED_GROUPS} />
  <p>
    Each group that wants to access data from this data source, including your group, needs to be in
    this list. Click <em>+ Add</em>, type in the name of the group, click <em>+ Add</em> again. Once
    the group appears in the list we're good to continue. The flow for adding other groups is the same.
  </p>
  <SectionTitle title="Test your data source" />
  <p>
    You should now be able to test your own data source by querying it through the product gateway.
    Below the <em>Source</em> field, you can also see the URL where you can make requests to the data
    source.
  </p>
  <GuideImage img={images.SOURCE} />
  <p>
    As our data source uses Dataspace verified API tokens, we'll need one before making a request.
    You can generate one on the <em>Access control keys</em> page.
    <GuideImage compact img={images.KEYS} />
  </p>
  <p>Find your data source in the list, click <em>View</em>.</p>
  <GuideImage img={images.SOURCE_ACCESS_CONTROL} />
  <p>
    Then you can generate an API token by clicking the <em>Generate API token</em> button or using the
    cURL example.
  </p>
  <GuideImage img={images.API_TOKEN} />
  <p>
    For example, you can use the <em>cURL</em> command-line tool to query it like this. Make sure to
    replace the URL, adjust the data to match your data source's expected payload, and include a
    recently generated token in the <em>X-API-KEY</em> header.
  </p>
  <p>
    Note: As long as your datasource remains published or unlisted, you will not need to use the
    <em>X-Preview-Token</em>
    header. If the access control mode is changed to private, the header should be added to the request
    (the value can be found on the data source <em>Edit</em> page).
  </p>
  <Code lang={bash}>
    {`
  curl -X POST "https://gateway.sandbox.ioxio-dataspace.com/Meteorology/Weather_v0.1?source=ioxio_dataspace_guides" \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: YOUR_KEY" \\
  -d '{"lat": 60.192059, "lon": 24.945831}'
`}
  </Code>
  <p>A successful response will look something like:</p>
  <Code lang={json}>
    {`
  {
  "temperature":-4.5,
  "humidity":56,
  "pressure":994,
  "windSpeed":7.4,
  "windDirection":33,
  "precipitation":0.9,
  "visibility":45130
}
`}
  </Code>

  <p>
    In case you make a request that causes an unexpected response to be generated by your
    integration, like a 404 Not found message, the product gateway will respond with a 502 to
    indicate there was an error in the integration:
  </p>
  <p>
    Note: if the data source response has errors, it gets logged into the errors section on the data
    source edit page after a short while:
  </p>
  <GuideImage img={images.ERRORS} />
  <SectionTitle title="Publish the data source" />
  <p>
    When you've verified the data source works as intended you can publish the data source by
    selecting it in the list of your data sources, pressing the <em>Edit</em> button and switching
    the visibility to <em>Published</em> and press the <em>Save</em> button. When it's published, it
    will be listed to all users in the <em>Available data sources</em> section.
  </p>
</TableOfContents>
