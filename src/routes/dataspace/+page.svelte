<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"
  import GuideImage from "$lib/components/GuideImage.svelte"
  import A from "$lib/components/A.svelte"
  import IconLink from "$lib/components/IconLink.svelte"
  import ArrowIcon from "$lib/images/link-arrow-icon.svg"

  import type { PageData } from "./$types"
  import breakpointObserver from "$lib/components/breakpointObserver"

  /** @type {import('./$types').PageData} */
  export let data: PageData

  const images = data.images
  const size = breakpointObserver()
  $: isSmallScreen = size.smallerThan("lg")
</script>

<TableOfContents>
  <Title title={`IOXIO Dataspace™ overview`} />

  <Breadcrumbs path={data.path} />

  <GuideImage fullWidth img={images.HERO} />

  <SectionTitle title="Built on the internet best practices" />

  <p>
    The trust mechanisms on the IOXIO Dataspace™ architecture are built on a decentralized model
    based on internet best practices currently in widespread use. There's no hocus pocus, no new
    cryptography invented, you only need to use open standards and architecture mixed with industry
    standards with comprehensive ecosystems of implementations and tools.
  </p>
  <p>
    All the parties host their own public keys using
    <A href="https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-set-properties">
      JSON Web Key Sets
    </A>, which then are used for verifying tokens and messages, as well as encryption, whenever it
    is needed. Trust in JWKS is brought by the existing mechanisms on the internet,
    <A href="https://www.cloudflare.com/en-gb/dns/dnssec/how-dnssec-works/">DNSSEC</A>,
    <A href="https://www.websecurity.digicert.com/security-topics/what-is-ssl-tls-https">
      SSL certificates
    </A>
    (incl.
    <A href="https://www.rapidsslonline.com/ssl/ev-ssl-certificate-requirements/">
      Extended Validation
    </A>), and so on.
  </p>
  <p>
    <A href="https://jwt.io/introduction/">JSON Web Tokens</A>,
    <A href="https://datatracker.ietf.org/doc/draft-ietf-httpbis-message-signatures/">
      IETF HTTP Message Signatures
    </A>
    and
    <A href="https://www.rfc-editor.org/rfc/rfc7515">JSON Web Signatures</A>, as well as
    <A href="https://dzone.com/articles/using-json-web-encryption-jwe">JSON Web Encryption</A>
    provide a solid set of tools for providing trust on multiple layers, including
    <A href="https://ioxio.com/guides/verify-id-token-in-a-data-source">verifying authentication</A>
    or consent tokens, to ensuring data hasn't been tampered with, or confidentiality.
  </p>
  <p>
    You can also read more about our
    <A href="https://miro.com/app/board/o9J_lwLttFI=/">trust architecture</A>.
  </p>
  <GuideImage fullWidth img={images.INTERNET_PRACTICIES} />

  <SectionTitle title="Standardized data makes products" />

  <p>
    When we agree on standard sizes of toast and toasters, selling a competing toaster becomes a lot
    easier. Similarly we believe that standardizing data products and the ways of transferring them
    will make it possible to get data moving, and when multiple vendors are providing their own data
    in standard formats we will empower a new modern data economy, unleashing new kinds of practical
    applications.
  </p>
  <p>
    The data vendors and application developers alike can collaborate in the work for defining data
    products on the Dataspace in the <A
      href="https://github.com/ioxio-dataspace/definitions-template"
    >
      Definitions repository
    </A>, and the results are published on the Dataspace so everyone can easily follow the agreed
    standards. You will find the currently available data definitions on the
    <A href="https://definitions.sandbox.ioxio-dataspace.com/">Definitions Viewer</A>, and technical
    details in the
    <A href="https://docs.sandbox.ioxio-dataspace.com/gateway#tag/Data-Products">API Docs</A>.
  </p>
  <p>
    Explore our
    <A href="/guides/building-a-data-definition/">data definition guide</A>
    or the
    <A href="https://www.youtube.com/watch?v=f-f6P_-8zoQ">Youtube video tutorial</A> for productizing
    data.
  </p>

  <GuideImage fullWidth img={images.STANDARTIZED_DATA} />

  <SectionTitle title="Great tools for application developers" />

  <p>
    Application developers on the IOXIO Dataspaces get many tools at their disposal, ranging from
    easy tools to find and analyze the available Data Products, to technical API documentation, as
    well as example code.
  </p>
  <p>
    The application integration can be simplified to just a couple of steps. You start off by
    finding the data sources you want to use on the dataspace on the
    <A href="https://developer.sandbox.ioxio-dataspace.com/sources/available">Developer Portal</A>,
    you can then check the
    <A href="https://definitions.sandbox.ioxio-dataspace.com/">Definitions Viewer</A> and
    <A href="https://docs.sandbox.ioxio-dataspace.com/gateway#tag/Data-Products">API Docs</A> for details
    on how to use them. Then, you just need to follow the Data Product definition and <A
      href="https://docs.ioxio.dev/guides/building-an-application/#requesting-the-data-from-a-data-source"
    >
      request the data product
    </A> from your selected source, the Developer Portal will tell you the API endpoint.
  </p>
  <p>
    The IOXIO Dataspace™ architecture does not force any specific technology choices, deployment
    models, etc. onto application developers. You know how your applications should be built, and we
    step out of your way and provide the capabilities to easily bring data into them.
  </p>
  <p>
    Explore our <A href="https://miro.com/app/board/uXjVO7Utac8=/">application developer guides</A>
    and open source
    <A href="https://github.com/ioxio-dataspace/example-app">example application</A> for more information.
  </p>

  <GuideImage fullWidth img={images.DATASPACE_STRUCTURE} />

  <SectionTitle title="Bringing data available is a breeze" />

  <p>
    Making your data available has never been easier. Data vendors can participate in the common
    work to define the data models with other data vendors and application developers, or they can
    choose to just use the existing Data Definitions and bring their valuable data to others.
  </p>
  <p>
    The data source integration can be simplified to just a couple of steps. You start off by
    finding the data definition you want to provide data on the dataspace in the
    <A href="https://definitions.sandbox.ioxio-dataspace.com/">Definitions Viewer</A>, you can then
    check <A href="https://docs.sandbox.ioxio-dataspace.com/gateway#tag/Data-Products">API Docs</A> and
    the
    <A href="https://github.com/ioxio-dataspace/sandbox-definitions/tree/main/DataProducts">
      OpenAPI Specs
    </A> for details on how to use them. Once your productizer is complete, you register it on the
    <A href="https://developer.sandbox.ioxio-dataspace.com/sources">Developer Portal</A>, test it,
    and publish it.
  </p>
  <p>
    The IOXIO Dataspace™ architecture does not force any specific technology choices, deployment
    models, etc. onto data vendors. You know best how to build your HTTP JSON APIs according to the
    data product spec, and we don't want to step on your toes.
  </p>
  <p>
    Explore our <A href="https://miro.com/app/board/uXjVO7VckHk=/">data integrator guides</A> and open
    source <A href="https://github.com/ioxio-dataspace/example-productizer">example productizer</A> for
    more information.
  </p>

  <GuideImage fullWidth img={images.DATA_FLOW} />

  <SectionTitle title="Configuration and documentation" />

  <p>
    Our Dataspaces are built on the assumption that there will be multiple dataspaces, and we want
    to make it as easy as possible for you to start using a dataspace. There's little need for
    hard-coded magic, as we provide many public configuration files for the services, starting from
    our <A href="/schemas/dataspace-configuration/">Dataspace configuration file</A> which tells your
    applications how to talk to the Dataspace and where to discover the various services in it.
  </p>
  <p>
    All the parties on the Dataspace, including us, the application developers, and data vendors,
    publish their own <A href="/schemas/party-configuration/">Party configuration file</A>, which
    documents things like where their public keys can be found. The data you share on our Dataspaces
    is configured via the
    <A href="https://github.com/ioxio-dataspace/sandbox-definitions">Data Product Definitions</A>.
  </p>
  <p>
    All of the information you need is easily available on our
    <A href="https://developer.sandbox.ioxio-dataspace.com/">Developer Portal</A>, but if you ever
    have issues or questions, our <A href="https://slack.ioxio.com/">IOXIO® Community Slack</A> is there
    for you.
  </p>
  <GuideImage fullWidth img={images.CONF_AND_DOCS} />

  <SectionTitle title="Code examples" />

  <div class="examples-wrapper {$isSmallScreen ? 'sm' : ''}">
    <div class="example-card">
      <h2>Example productizer</h2>
      <p>
        Data productization in short means adapting current data sources into a standardized format,
        so it can be shared via a dataspace.
      </p>
      <p>
        We have created an
        <A href="https://github.com/ioxio-dataspace/example-productizer">example productizer</A>,
        which you can use as bases for productizing your own data.
      </p>
      <p>
        You can check the source from GitHub, and to help you create your own productizer, you can
        go and check out our guide on
        <A href="https://docs.ioxio.dev/guides/building-a-data-source/">
          how to build a data source
        </A>.
      </p>
      <div class="example-links">
        <IconLink href="https://github.com/ioxio-dataspace/example-productizer" icon={ArrowIcon}>
          Check the source
        </IconLink>
        <IconLink href="/guides/building-a-data-source/" icon={ArrowIcon}>Check the guide</IconLink>
      </div>
    </div>
    <div class="example-card">
      <h2>Example application</h2>
      <p>
        A Dataspace allows you to register applications to use the data available from it. By
        creating an application on top of a Dataspace, we provide you with the ability to use our
        Data products in your application.
      </p>
      <p>
        We have created an <A href="https://github.com/ioxio-dataspace/example-app">
          example application
        </A> for you to check out, as well as a step-by-step guide on how to create your own application
        using a Dataspace to get content.
      </p>
      <div class="example-links">
        <IconLink href="https://github.com/ioxio-dataspace/example-app" icon={ArrowIcon}>
          Check the source
        </IconLink>
        <IconLink href="/guides/building-an-application/" icon={ArrowIcon}>
          Check the guide
        </IconLink>
      </div>
    </div>
  </div>
</TableOfContents>

<style lang="scss">
  @import "$styles/setup";

  .examples-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2.25rem;

    &.sm {
      flex-direction: column;
    }

    .example-card {
      text-align: left;
      border: 1px solid $color-dark-green;
      border-radius: 1rem;
      padding: $spacing-03 $spacing-02;
      display: flex;
      flex-direction: column;
      gap: $spacing-02;
      width: 100%;
      :global(h2) {
        margin: 0;
      }
      :global(p) {
        margin: 0;
      }
      .example-links {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: $spacing-02;
      }
    }
  }
</style>
