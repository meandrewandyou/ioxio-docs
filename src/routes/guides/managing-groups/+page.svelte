<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import A from "$lib/components/A.svelte"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"
  import GuideImage from "$lib/components/GuideImage.svelte"
  import type { PageData } from "./$types"

  export let data: PageData

  const images = data.images
</script>

<TableOfContents>
  <Title title={data.guide.title} />

  <Breadcrumbs path={data.path} />

  <SectionTitle title="Introduction" />
  <p>
    A group is needed both for data sources and for applications. You create a group in the
    developer portal. You have to input a unique name for the group and then input the party
    configuration domain where you hosted a party configuration you set up. In case you have an
    existing group without a party configuration you can find the group in your list of groups, edit
    it, add the party configuration domain and click the update button.
  </p>
  <GuideImage img={images.PAGE_FOR_CREATING_GROUPS} />
  <GuideImage img={images.EDITING_A_GROUP} />
  <SectionTitle title="Creating and hosting party configuration" />
  <p>
    <strong>1.</strong>
    Select a domain (it can also be a subdomain) on which you want to host your party configuration.
    <br />
    <strong>Note:</strong> You will need to be able to create a file at
    <em>/.well-known/dataspace/party-configuration.json</em>
    on that domain and it needs to be accessible over <em>https://</em> with a valid certificate.
  </p>
  <p>
    <strong>2.</strong>
    Create the <em>party-configuration.json</em> and host it on the desired domain. See
    <A href="/schemas/party-configuration/">party configuration schema</A>
    for more details.
  </p>
  <p>
    <strong>3.</strong>
    Ensure the <em>jwks_uri</em> points to some <em>https://</em> based domain and a location you
    can control. A suggestion is to point it to the <em>/.well-known/jwks.json</em> on the same
    domain as the party configuration.<br />Example from
    <A href="/schemas/party-configuration">https://docs.ioxio.dev/schemas/party-configuration</A>:
  </p>
  <Code lang={json}>
    {`
{
  "jwks_uri": "https://ioxio.com/.well-known/jwks.json"
}
`}
  </Code>
  <p>
    <strong>4.</strong>
    Create the content for the <em>jwks_uri</em> and host it in the location you specified in the
    party configuration. For this, you will need to generate an RSA public/private keypair. Ensure
    there is at least one key and that it has a <em>kid</em>, the <em>kty</em> is <em>RSA</em>, the
    <em>use</em>
    is set to <em>sig</em>, the <em>alg</em>
    is <em>RS256</em> and it has the <em>n</em> and <em>e</em> parameters. Here is an example of
    what it should look like from
    <A href="https://ioxio.com/.well-known/jwks.json">https://ioxio.com/.well-known/jwks.json</A>:
  </p>

  <Code lang={json}>
    {`
{
  "keys": [
    {
      "kid": "302feac8851574f3ef74ec1c62a7489f",
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "n": "wO_R-_1EUodohCn9mIf3lxH70IFDLIsSbSLg3rNbKJIexFlxE8X72_gFGwMoZJqbeNfEDcPI9UiSXM6H9z_bpfVF7jxtvvyCqSmy-R5miadGoiiYUZpRvK-nxyjOiXlobsaPOgXiC3tCwxZ4EfXznzu5WZm2ekSeIf9nj-NKuPNuUpfCLH6Jbfq7PzWq5BMnmjEwz_VXqqk58mkqgFwr_0BRh2I2i5ufHTixyUGV7u7NK1WkkeIF4VbQILpO0t5-yxO6by2r3A_pubjSUmy8F5FSqqWkxNOfv5svFLnbCTvFuXVonjMqs6MD4BFVjRRhSI9NDWfjTisy-EKNpmWtbM0WAqk2hwey-dE8Fd0B7FmR9GmWt8oR5-LN3QgoRa8_z-h0dYhSWi6vV7dBJxHtyFFVJSTHw3xwCpg6PdeuB8OxqlSuLxry5tMVGNv9humih_92tPbAOq3luAuUuVKmxEgZ-_bk3y9Gxo2YutFfTI8QcaBEyqiao040NIJiNJ0z0OiBodalGny-sHL51Y7iB_z8TYIs8aie_WDfpXRg5IP5UbZ3Onl84IIrH3RbsM2p889-qEpMRXJJY5pQVjur3LIlx2TQ3ir7nBqGYC_5JAeq0sDFonvFGGTfWA_e_QDLKth9Dz2-HPVCUqBsdyF2Es7Ot1ijBV9rVKiaGUtx67M",
      "e": "AQAB"
    }
  ]
}
    `}
  </Code>
</TableOfContents>
