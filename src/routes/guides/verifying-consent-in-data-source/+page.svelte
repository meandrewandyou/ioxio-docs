<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"
  import { GUIDES } from "../urls"
  import type { PageData } from "./$types"
  import GuideImage from "$lib/components/GuideImage.svelte"
  import A from "$lib/components/A.svelte"

  export let data: PageData
  const images = data.images
</script>

<TableOfContents>
  <Title title={`Verify consent in a data source on IOXIO Dataspace`} />

  <Breadcrumbs path={data.path} />

  <SectionTitle title="Introduction" />
  <p>
    An application registered on the dataspace can request consents from a user to access the data
    from data sources which require user consent. If the user grants the consent the application can
    request a consent token and include it in the <em>X-Consent-Token</em> header when making the request
    to the product gateway. The product gateway will forward the header to the productizer. This guide
    explains how the productizer should verify the token if it wants to ensure the user has given their
    consent.
  </p>
  <p>
    The <A href="/schemas/consent-token/">consent token</A>
    is a
    <A href="https://datatracker.ietf.org/doc/html/rfc7519">JSON Web Token (JWT)</A>
    that can be decoded and verified. This guide will explain in more detail the process of extracting,
    decoding and verifying it.
  </p>
  <p>
    For more details on how to request a consent and obtaining a consent token, check out the <A
      href="{GUIDES.BUILD_APP.href}#using-consent">Using Consent</A
    > section of the <A href={GUIDES.BUILD_APP.href}>{GUIDES.BUILD_APP.href}</A> guide.
  </p>
  <SectionTitle title="Verifying the consent token in the productizer" />
  <h3>Get the X-Consent-Token header</h3>
  <p>
    The productizer or data source needs to first extract the consent token from the <em
      >X-Consent-Token</em
    >
    HTTP header of the request. Please note that the header is in many data source definitions optional,
    so take that into account.
  </p>
  <h3>Reading the consent token</h3>
  <p>
    The <A href="/schemas/consent-token/">consent token</A>
    is a
    <A href="https://datatracker.ietf.org/doc/html/rfc7519">JSON Web Token (JWT)</A>.
  </p>
  <p>
    If you are unfamiliar with JWTs you might want to check out the <A
      href="https://jwt.io/introduction">JSON Web Token Introduction</A
    >. The same site has a really good tool for decoding JWTs directly in the web browser at
    <A href="https://jwt.io">jwt.io</A>, as well as a fairly good list of different
    <A href="https://jwt.io/libraries">JWT libraries</A> for different programming languages.
  </p>
  <p>
    You most likely want to use one of the libraries for your programming language rather than try
    to implement it according to the <A href="https://datatracker.ietf.org/doc/html/rfc7519">
      RFC 7519</A
    >.
  </p>
  <p>
    Let's have a look at a valid example token from one of the applications on the IOXIO Sandbox
    Dataspace and how to verify it.
  </p>
  <p>Let's examine this token:</p>
  <Code lang={json}>
    {`
eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vY29uc2VudC5zYW5kYm94LmlveGlvLWRhdGFzcGFjZS5jb20vLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiZTE4Nzg1YTdlMTBlMWJkOGI4M2YzN2JkNGJlMmMwZTciLCJ0aWQiOiIxNjQwOGI2Yy0wNjdjLTQ1OWQtYWZlYi1lNWQ3NTI4MTE1Y2UiLCJ0eXAiOiJKV1QiLCJ2IjoiMC4yIn0.eyJzdWIiOiJaR1Z0YjBCMFpYTjBaWEl1YVc5NGFXOHVZMjl0IiwiaXNzIjoiaHR0cHM6Ly9jb25zZW50LnNhbmRib3guaW94aW8tZGF0YXNwYWNlLmNvbSIsImlhdCI6MTcwNDcxMDE3MSwiZXhwIjoxNzA0NzEzNzcxLCJkc2kiOiJkcHA6Ly9pb3hpb0BzYW5kYm94LmlveGlvLWRhdGFzcGFjZS5jb20vTlNHL0FnZW50L0xlZ2FsRW50aXR5L05vbkxpc3RlZENvbXBhbnkvU2lnbmF0b3J5UmlnaHRzX3YxLjAiLCJhcHAiOiI4M2Q1NTEyNi1lNjE3LTQzZGMtYTJmZi00M2ZiZWI4NDhjZDEiLCJhcHBpc3MiOiJodHRwczovL2xvZ2luLnNhbmRib3guaW94aW8tZGF0YXNwYWNlLmNvbSIsInN1YmlzcyI6Imh0dHBzOi8vbG9naW4uc2FuZGJveC5pb3hpby1kYXRhc3BhY2UuY29tIiwiYWNyIjoiZmFrZS1hdXRoIn0.FhYxFiOt4pZFvJpoiXwr6Crt7Nko7OBIh_b8tyIX6YodHoZHsBIXug5WG5J1OEakTMZcaFgINswL98tNm-E7VELQa722x3KW8xI2VpFf05Zd2s4vwByzpWztj_J0eUviL8Xowu8kmzkbF44IzH1J4FGP6ZwAGRzD6hnIzlObeieefba4aJLkcmQL9cguHDV6A07R4IuOgQTdIUGjYIkmPYuV1s81KpsJ4SQkXzeFQBHWvB50Fi1-GZe0B5CZuX0TSa7jshm12C8bMM1AA52cjdVyZMhx9vyYSpBeQ6BcBG41kBapNtwW5svDlzk_-EmPoWB57f_B-Py9Nhipb3FL6b3ElBLxs1tWyaWW2bMBBdlbGmWabW8w6KlL336RSzix-JdikmywJH3xkzNBQiqs9Uk-5om7RrCKiOkd4Em7NFh7s418aRd8g7n4G6FkXzrWn3jcPCQDTIUrTYRv4uUyJ4NHT6qvfogh21Et_q3E9VfVKFlQ8bZn3Fl7N2HtQ8C3RImkjDq21k0Kz5wBqA6eZDq9HqGejhYE_TyST_EAlExw43VPjAYw0elE_i6OrphzdPE63BtF1ieSbP-O-RcN2PuNiHyGjeFh5PWYOOmyhn7goVrC42j1DEjd0jYTVRmqXKWthZOC3BLQ5zkKJsX1psLeiGUIf6YztP4mcpDitMY

`}
  </Code>
  <p>
    At the time you are reading this guide the token will, unfortunately, have expired, so some of
    the verifications we will perform here won't work. If you need a valid token, you can follow the
    steps in the <A href="{GUIDES.BUILD_APP.href}#using-consent">Using Consent</A> section of the <A
      href={GUIDES.BUILD_APP.href}>{GUIDES.BUILD_APP.title}</A
    > guide to set up your own application and request a consent token following the cURL examples in
    that guide. If you're familiar with developer tools in your browser you can also go to the <A
      href="https://mycompany.demos.ioxio.com/my-company/company/0522908-2/board"
    >
      board page of one of the companies in the MyCompany Demo App</A
    > and extract the consent token from the Local Storage of your browser.
  </p>
  <p>This is what the content of the above token looks like:</p>
  <GuideImage img={images.DECODED_CONSENT_TOKEN} />
  <p>
    Many JWT libraries also allow you to read the JWT without verifying it. In case your library for
    some reason does not do that, you can actually note that the token consists of three sections
    separated by a dot, like <em>AAA.BBB.CCC</em>. The first section (<em>AAA</em>) is the header,
    the second one (<em>BBB</em>) the body and the last one (<em>CCC</em>) the signature. The first
    two are actually just Base64 encoded JSON strings that can be easily decoded and read, without
    verifying the signature.
  </p>
  <SectionTitle title="Find the JWKS URI" />
  <p>
    The first step to find the key is to check the issuer of the token, which is found in the <em
      >iss</em
    > field in the body.
  </p>
  <p>
    Please note that you should check that the <em>iss</em> is one you want to trust. In a typical IOXIO
    dataspace this would always be the address of the consent provider of the dataspace.
  </p>
  <p>
    In this example the <em>iss</em> (Issuer) is
    <em>https://consent.sandbox.ioxio-dataspace.com</em>, which is the consent provider of the
    sandbox dataspace. The consent provider has a <A href="/schemas/consent-configuration/"
      >consent configuration</A
    > in a well-known path (inspired by the OpenID Connect configuration). The configuration for a consent
    provider can be found in the path <em>/.well-known/dataspace/consent-configuration.json</em>
    relative to the <em>iss</em>. Thus in this case the consent provider configuration can be
    fetched from
    <A
      href="https://consent.sandbox.ioxio-dataspace.com/.well-known/dataspace/consent-configuration.json"
      >https://consent.sandbox.ioxio-dataspace.com/.well-known/dataspace/consent-configuration.json</A
    >. At the time of writing this it returned this JSON content (formatted for readability):
  </p>
  <p style="color: red">TODO: Copy the rest of the guide!!!</p>
</TableOfContents>
