<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"

  import type { PageData } from "./$types"
  import GuideImage from "$lib/components/GuideImage.svelte"
  import A from "$lib/components/A.svelte"
  import bash from "svelte-highlight/languages/bash"
  import { GUIDES } from "../urls"

  export let data: PageData
  const images = data.images
</script>

<TableOfContents>
  <Title title={data.guide.title} />

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
    The <A href="https://well-known-docs.sandbox.ioxio-dataspace.com/consent-token.html"
      >consent token</A
    >
    is a
    <A href="https://datatracker.ietf.org/doc/html/rfc7519">JSON Web Token (JWT)</A>
    that can be decoded and verified. This guide will explain in more detail the process of extracting,
    decoding and verifying it.
  </p>
  <p>
    For more details on how to request a consent and obtaining a consent token, check out the Using
    Consent section of the How to build an application guide.
  </p>
  <SectionTitle title="Verifying the consent token in the productizer" />
  <h3>Get the X-Consent-Token header</h3>
  <p>
    The productizer or data source needs to first extract the consent token from the X-Consent-Token
    HTTP header of the request. Please note that the header is in many data source definitions
    optional, so take that into account.
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
    <A href="https://jwtio">jwt.io</A>, as well as a fairly good list of different
    <A href="https://jwt.io/libraries">JWT libraries</A> for different programming languages.
  </p>
  <p>
    You most likely want to use one of the libraries for your programming language rather than try
    to implement it according to the<A href="https://datatracker.ietf.org/doc/html/rfc7519"
      >RFC 7519.</A
    >
  </p>
  <p>
    Let's have a look at a valid example token from one of the applications on the sandbox Dataspace
    and how to verify it.
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
    steps in the Using consent section of the How to build and application guide to set up your own
    application and request a consent token following the cURL examples in that guide. If you're
    familiar with developer tools in your browser you can also go to the <A
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
    separated by a dot, like AAA.BBB.CCC. The first section is the header, the second one the body
    and the last one the signature. The first two are actually just Base64 encoded JSON strings that
    can be easily decoded and read, without verifying the signature.
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
    In this example the iss (Issuer) is https://consent.sandbox.ioxio-dataspace.com, which is the
    consent provider of the sandbox dataspace. The consent provider has a consent configuration in a
    well-known path (inspired by the OpenID Connect configuration). The configuration for a consent
    provider can be found in the path /.well-known/dataspace/consent-configuration.json relative to
    the iss. Thus in this case the consent provider configuration can be fetched from
    https://consent.sandbox.ioxio-dataspace.com/.well-known/dataspace/consent-configuration.json. At
    the time of writing this it returned this JSON content (formatted for readability):
  </p>
  <Code lang={json}
    >{`
{
  "issuer": "https://consent.sandbox.ioxio-dataspace.com",
  "jwks_uri": "https://consent.sandbox.ioxio-dataspace.com/.well-known/jwks.json",
  "consent_request_uri": "https://consent.sandbox.ioxio-dataspace.com/Consent/RequestConsents"
}
  `}</Code
  >
  <p>The jwks_uri specify where we can find the keys of this consent provider.</p>
  <p>
    For convenience the JWT token also contains the jku (JSON Web Key Set URL) header with the same
    value. This is what for example jwt.io uses to fetch the key to verify the signature of the
    token.
  </p>

  <p>
    Please note that you should validate the iss or jku match what you expect to find on the
    dataspace you are working on before fetching keys to ensure they are indeed keys that should be
    trusted on the particular dataspace.
  </p>

  <SectionTitle title="Find the key" />
  <p>
    At the time of writing this, the jwks_uri <A
      href="https://consent.sandbox.ioxio-dataspace.com/.well-known/jwks.json"
      >https://consent.sandbox.ioxio-dataspace.com/.well-known/jwks.json</A
    >
    returned this JSON content (formatted for readability):
  </p>
  <Code lang={json}
    >{`
{
  "keys": [
    {
      "kid": "e18785a7e10e1bd8b83f37bd4be2c0e7",
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "n": "0FqQHSRgUzu9WwyUnl4FiXADIDptF82eUn1IeOFWt-ZHVzzddsZjT_F7YOZsgVyF9QRc1ROqqnvEs7J90fBQG8nMAml1R56lZdruqqyQ8kAQjqplhi4CAU6NZrzBWybCkZVq6PSvgtHJWSMCcU-09g24Q3GLWvW-gqAh4sZMjf1l45MASjgaYYozaZv1HgeG-dmFOsngafNQue8DGt97UxdqtP3rsjqdKaXR9iPIxcgJNhAQrqTorCiKp_CXUatsHgFD6ANxfgu6iSmBPbgmGi6AhPuAalWTi5BcSWEgawnq_kYopnHH7ymgVjV-6eNmdpyHZ-qaK2k-YB1ydvbdZfbmjl-ybN7YZ5QlXuOnLNHE4eqA1Z5yk0M4eL8smDpH4Mh6dataXxZxp5QkBV9iS7WPHLvWwiOQrOjL0REQ0bSz5d6nfQdjp0wVWQZH0GPQUOwVfqXcMODZAdG1X8d6VhgjG3oTYgDyovCWoG1CJEokLMXrSa-o0Hw_TVgYFbPhwDsxl7KvJDD6cid1sWiYY67isuWWHG7q_QLoG1gTVXIE5ycVzSqVED_bOzxKmorrj4G-XoDyx36mK1O5ROVktJ6dZ7nLJGsWRTzPjXWXMG639snzIClG9momA1fpc6f2vyQsjY-9Gel2toxeQite0hTmUn9-vfWi3mnqFlr-ZaU",
      "e": "AQAB"
    }
  ]
}
  `}</Code
  >

  <p>
    Use the key entry with a
    <em>kid</em> (Key ID) and <em>alg</em> (Algorithm) matching the values in the consent token and
    has the use set to <em>sig</em> (signing). You can read more about JWKS in <A
      href="https://datatracker.ietf.org/doc/html/rfc7517">RFC 7517: JSON Web Key (JWK)</A
    >.
  </p>
  <p>
    Some JWT libraries, like
    <A href="https://pyjwt.readthedocs.io/">PyJWT</A> has built in support for <A
      href="https://pyjwt.readthedocs.io/en/stable/usage.html#retrieve-rsa-signing-keys-from-a-jwks-endpoint"
      >retrieving the keys from a JWKS endpoint</A
    >, thus it's worth checking if the library you are using has support for that before
    implementing it yourself.
  </p>
  <SectionTitle title="Caching" />
  <p>
    Please note that for performance reasons you should use some level of caching. The address of
    the jwks_uri is for example not likely to change in practice. The keys are neither rotated
    frequently, so they could be cached for some time, but it's still important they get refreshed
    once in a while.
  </p>
  <SectionTitle title="Verifying token signature" />
  <p>
    Once you've found the matching key (unless your library does that for you), you will need to
    consult the documentation of your particular JWT library on how to use it to verify the token.
    This varies a bit by library. In some case you might even need to convert the key to some other
    format accepted by the library. Covering all these possibilities is however not possible in this
    guide, but that information can hopefully be found from other sources using the most popular
    search engines.
  </p>
  <SectionTitle title="Verifying the fields" />
  <p>
    After verifying the signature, you should do some basic verification of some of the typical
    fields. Many libraries by default verify the <em>iat</em> (Issued At) and <em>exp</em>
    (Expiration Time), but some do not automatically do it. In that case you should verify that
    <em>iat</em>
    &lt;= current time &lt;= <em>exp</em>. You might also want to check the <em>iss</em>
    (Issuer) matches what you expect (the consent provider of the dataspace), but this would be good
    to check already before fetching the keys.
  </p>
  <p>
    Also verify the <em>dsi</em> field. It contains a Data Product Protocol link of the form
    <em>dpp://&lt;source&gt;@&lt;dataspace-domain&gt;/&lt;definition&gt;</em>, which means you will
    have to parse it and check it against the data source you are implementing. For example
    <em
      >dpp://ioxio@sandbox.ioxio-dataspace.com/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0</em
    >
    would match a data source with the group <em>ioxio</em> for the
    <em>NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0</em>
    definition on the <em>sandbox.ioxio-dataspace.com</em> dataspace. Ensure all of these match with
    the data source you want to provide.
  </p>
  <p>
    You should verify the
    <em>sub</em> (the subject from the id_token that granted the consent) and <em>subiss</em> (the
    issuer of the id_token that was used to give the consent, typically the login portal) as well as
    the <em>acr</em> (authentication context class reference), to ensure which user actually gave the
    consent.
  </p>
  <p>
    If your data source also requires authorization, you should also <A
      href={GUIDES.VERIFY_ID_TOKEN.href}>{GUIDES.VERIFY_ID_TOKEN.title}</A
    >. Check the
    <em>sub</em> of both tokens match and ensure the <em>app</em> in the consent token matches the
    <em>aud</em>
    of the id_token and the <em>subiss</em> in the consent token matches the <em>iss</em> in the id_token.
  </p>

  <SectionTitle title="Using the token" />
  <p>
    Once you've done all the verifications you know which user (<em>sub</em>+<em>subiss</em>+<em
      >acr</em
    >) gave the consent to request the data through which application (<em>app</em>+<em>appiss</em>)
    and to which data source (<em>dsi</em>). Verify these match with what you want to provide and
    what the user has permission to request and return the requested data.
  </p>
  <SectionTitle title="Verifying consent through API" />
  <p>
    The consent portal also provides an API endpoint for verifying the consent token if you don't
    want to fetch the keys yourself. The endpoint is located at the path
    <em>/Consent/Verify</em> of the consent portal, so for example on the sandbox dataspace the URL
    is <em>https://consent.sandbox.ioxio-dataspace.com/Consent/Verify</em>. It's expecting a
    <em>POST</em>
    request with the <em>Authorization: Bearer &lt;token&gt;</em> and the
    <em>X-Consent-Token &lt;consent token&gt;</em>
    headers. The body is expected to be in JSON format (Content-Type: application/json) and contain a
    body of the form:
  </p>
  <Code lang={json}>{'{"dataSource": "dpp://<source>@<dataspace-domain>/<definition>"}'}</Code>
  <p>
    Make sure you replace the source with the name of your own data source (group + optional tag
    separated by a colon), specify the dataspace domain and the definition your datasource is using.
    Here is what the request would look like as a cURL command with the respective tokens shortened
    down for readability:
  </p>
  <Code lang={bash}
    >{`
curl --request POST \\
  --url 'https://consent.sandbox.ioxio-dataspace.com/Consent/Verify' \\
  --header 'Content-Type: application/json' \\
  --header 'Authorization: Bearer eyJ...' \\
  --header 'X-Consent-Token: eyJ...' \\
  --data '{
            "dataSource": "dpp://ioxio@sandbox.ioxio-dataspace.com/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0"
          }'
  `}</Code
  >
  <p>
    You will get back a response indicating if the tokens passed the verification or not, in case of
    a success:
  </p>
  <Code lang={json}
    >{`
{"verified": true}
  `}</Code
  >
  <p>And in case of failure:</p>
  <Code lang={json}
    >{`
{"verified": false}
  `}</Code
  >
  <p>
    If you want to know who the user is (in case the data you return is depending on the user, which
    is quite common) you will need to decode the consent token to extract the user details (<em
      >sub+subiss+acr</em
    >) from it. But since the tokens have already been verified you can decode them without any
    verification.
  </p>
</TableOfContents>
