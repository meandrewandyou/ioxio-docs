<script lang="ts">
  import Schema from "$lib/components/Schema.svelte"
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import A from "$lib/components/A.svelte"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"

  /** @type {import('./$types').PageData} */
  export let data

  const productPassportSchema = [
    {
      type: "string",
      property: "jwks_uri",
      description: "HTTPS URL pointing to a valid JWKS .json file",
      example: "https://ioxio.com/.well-known/jwks.json",
    },
    {
      type: "string",
      property: "logo_url",
      description: "HTTPS URL pointing to an image of the logo associated with the issuer",
      example: "https://ioxio.com/favicon-32x32.png",
    },
    {
      type: "string",
      property: "product_dataspace",
      description: "The base domain of the dataspace the issuer supports",
      example: "sandbox.ioxio-dataspace.com",
    },
  ]

  const productSchema = [
    {
      type: "object",
      property: "names",
      description: "Map of locale to display name for the product",
      example: '{"en_US": "Battery 100Wh Super Turbo"}',
    },
    {
      type: "string",
      property: "image_url",
      description: "HTTPS URL pointing to an image of the product",
      example: "https://ioxio.com/favicon-32x32.png",
    },
    {
      type: "list",
      property: "supported_dataproducts",
      description: "List of data products supported by the issuer",
      example: "[{supported dataproduct}, ...]",
    },
  ]

  const supportedProductSchema = [
    {
      type: "string",
      property: "path",
      description: "Path of the data product",
      example: "DigitalProductPassport/Battery/ProductDataSheet_v1.0",
    },
    {
      type: "string",
      property: "source",
      description:
        "Identifier of the source on the dataspace that the issuer's data is available from. You can check the source names from the available sources -list on the developer portal of the dataspace.",
      example: "ioxio",
    },
  ]

  const jwksSchema = [
    {
      type: "list",
      property: "keys",
      description: "List of keys",
      example: "[{key object}, {key object}]",
    },
  ]

  const keySchema = [
    {
      type: "string",
      property: "alg",
      description: "Algorithm",
      example: "RS256",
    },
    {
      type: "string",
      property: "kid",
      description: "Key ID",
      example: "01",
    },
    {
      type: "string",
      property: "kty",
      description: "Key type",
      example: "RSA",
    },
    {
      type: "string",
      property: "n",
      description: "Cryptographical data",
      example: "yicAxwnv<snip>uq0Q",
    },
    {
      type: "string",
      property: "e",
      description: "Exponent for the cryptographical data",
      example: "AQAB",
    },
  ]
</script>

<TableOfContents>
  <Title title={`IOXIO Tags™️ metadata`} />

  <Breadcrumbs path={data.path} />

  <h1>Technical details about the metadata files for IOXIO Tags™</h1>

  <SectionTitle title="product-passport.json" />
  <p>
    The <em>/.well-known/product-passport.json</em> file hosted at the issuer domain includes the common
    information about the issuer. This includes location of signature public keys hosted with JWKS, the
    URL to a logo, and the base URL of the dataspace used to host the supported data products.
  </p>

  <h3>Schema</h3>
  <Schema schema={productPassportSchema} />

  <h3>Example product-passport.json</h3>
  <Code lang={json}>
    {`
{
  "jwks_uri": "https://tags.ioxio.dev/.well-known/jwks.json",
  "logo_url": "https://ioxio.com/favicon-32x32.png",
  "product_dataspace": "sandbox.ioxio-dataspace.com"
}
`}
  </Code>
  You can also check out <A href="https://tags.ioxio.dev/.well-known/product-passport.json"
    >https://tags.ioxio.dev/.well-known/product-passport.json</A
  >

  <SectionTitle title="{'{'}product{'}'}.json" />
  <p>
    E.g. if the QR code has the <em>product</em> set to the value <em>battery-100wh-super-turbo</em>
    this is expected to be found at
    <em>/.well-known/product-passport/products/battery-100wh-super-turbo.json</em>, and contains the
    important data about that specific type of product.
  </p>

  <h3>Schema</h3>
  <Schema schema={productSchema} />
  <p>Supported data products:</p>
  <Schema schema={supportedProductSchema} />

  <h3>Example battery-100wh-super-turbo.json</h3>
  <Code lang={json}>
    {`
{
  "names": {
    "en_US": "Really good battery"
  },
  "image_url": "https://ioxio-showroom.com/img/modular-power-pack.png",
  "supported_dataproducts": [
    {
      "path": "DigitalProductPassport/Battery/ProductDataSheet_v1.0",
      "source": "ioxio"
    }
  ]
}
`}
  </Code>

  <SectionTitle title="jwks.json" />
  <p>
    Typically hosted at <em>/.well-known/jwks.json</em>, and includes the JWKS keys.
  </p>

  <h3>Schema</h3>
  <Schema schema={jwksSchema} />
  <p>Keys:</p>
  <Schema schema={keySchema} />

  <h3>Example jwks.json</h3>
  <Code lang={json}>
    {`
{
  "keys": [
    {
      "alg": "RS256",
      "kid": "01",
      "kty": "RSA",
      "n": "yicAxwnv46tR82buQHN2b2dDLOmZ0iJYR6GPwNOShlCdN-N5N6spvAbe3UNb6ymN8AtW5o9_6Rm6gpungvlnDtjyZfPnNzAryjR8Z1Jvb33spr7zcLWG8TzL1l5r5b2zMnWXaDOZffAxa3SWZ14ZufAAA97fW3oBJXYr4H0zB8aFNuPDtYw4puN4s3M1vQH6OPgXDkSNYBv5ZbxlKasPXdFf_fXA9u4p9JMmtNS3fL7RibMqbrf4jCkATwVqA_Ui9vlgudZeHqW0tpzuXT3FVyVN-eFQwq6Hk3vY8iqRD9Skbpol9vHQLKY8px5tZZTxVtNcLhTKzNToMWQMykuq0Q",
      "e": "AQAB"
    }
  ]
}
`}
  </Code>

  You can use our <A href="https://github.com/ioxiocom/ioxio-tags/blob/main/api/make_jwks.py"
    >Python script</A
  > to convert RSA keys generated with
  <em>openssl genrsa -out key.pem 2048; openssl rsa -in key.pem -pubout -out key.pub</em>
  to <em>jwks.json</em> format.
</TableOfContents>
