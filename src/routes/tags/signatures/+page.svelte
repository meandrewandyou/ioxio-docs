<script lang="ts">
  import SectionTitle from "$lib/SectionTitle.svelte"
  import Code from "$lib/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import A from "$lib/A.svelte"
  import Breadcrumbs from "$lib/Breadcrumbs.svelte"
</script>

<Breadcrumbs
  breadcrumbs={[
    {
      name: "Docs",
      link: "/",
    },
    {
      name: "IOXIO Tags™",
      link: "/tags/",
    },
    {
      name: "Signatures",
      link: "/tags/signatures/",
    },
  ]}
/>

<h1>IOXIO Tags&trade; signatures</h1>

<p>Technical details about the signatures used with IOXIO Tags&trade;.</p>

<SectionTitle>Header</SectionTitle>
<p>
  The signed codes start with an identifier to designate that they are an IOXIO Tags&trade; code,
  including a version number. Right now the header used is the characters <em>IT1:</em>.
</p>

<SectionTitle>Encoded signed data</SectionTitle>
<p>
  Following the header there is the signed data, encoded in <A
    href="https://datatracker.ietf.org/doc/rfc9285/">Base45</A
  >, used commonly in e.g. the EU COVID passports and other standards where QR codes need to be used
  to represent arbitrary binary data.
</p>

<p>
  The data is signed with <A href="https://cose-wg.github.io/cose-spec/">COSE</A> (CBOR Object Signing
  and Encryption), effectively a version of the JOSE system but for CBOR, and <A
    href="https://cbor.io">CBOR</A
  > itself is a more efficiently packed binary friendly format similar to JSON.
</p>

<p>
  By parsing the COSE signature without verifying it, you should be able to get the JWKS <em>kid</em
  >
  and <em>alg</em>
  from the COSE header, as well as the payload. You can use the <em>iss</em> from the payload to
  fetch the <a href="/tags/metadata/#product-passport.json">product-passport.json</a>, which points
  to the <a href="/tags/metadata/#jwks.json">jwks.json</a>. Once you load that file, you can use the
  other properties to determine the correct key to verify the signature with.
</p>

<p>
  Check out the <em>verify_code</em> function in <A
    href="https://github.com/ioxiocom/ioxio-tags/blob/main/api/app/tag.py">our demo application</A
  > for a full example.
</p>

<SectionTitle>Payload</SectionTitle>
<p>
  Once the COSE data is parsed, you will get the properties of the code, so the <em>iss</em>,
  <em>product</em>, and <em>id</em>, from it.
</p>

<p>
  The data is signed with <A href="https://cose-wg.github.io/cose-spec/">COSE</A> (CBOR Object Signing
  and Encryption), effectively a version of the JOSE system but for CBOR, and <A
    href="https://cbor.io">CBOR</A
  > itself is a more efficiently packed binary friendly format similar to JSON.
</p>

<SectionTitle>Parsing process</SectionTitle>

<ol>
  <li>Scan the QR code</li>
  <li>Verify the header - that the first 4 characters match exactly <em>IT1:</em></li>
  <li>Remove the header from the code</li>
  <li>Base45 decode the code</li>
  <li>
    Parse the <em>alg</em> and <em>kid</em> from the COSE header, as well as the COSE payload
    <strong>without verifying the signature</strong>
  </li>
  <li>
    Fetch <em>https://{"{"}payload.iss{"}"}/.well-known/product-passport.json</em>
    <a href="/tags/metadata/#product-passport.json">metadata</a>
  </li>
  <li>
    Fetch the <a href="/tags/metadata/#jwks.json">JWKS keys</a> from <em>{"{"}jwks_url{"}"}</em> in the
    product-passport.json
  </li>
  <li>Verify the COSE signature matches the key provided via JWKS</li>
  <li>
    Fetch <em
      >https://{"{"}payload.iss{"}"}/.well-known/product-passport/{"{"}payload.product{"}"}.json</em
    >
    for <a href="/tags/metadata/#%7Bproduct%7D.json">product metadata</a>
  </li>
  <li>
    Fetch <em
      >https://{"{"}product_dataspace{"}"}.well-known/dataspace/dataspace-configuration.json</em
    >
  </li>
  <li>
    Proceed to do what you wish with the <em>supported_dataproducts</em> from the
    <a href="/tags/metadata/#product-passport.json">{"{"}payload.product{"}"}.json</a>, including
    e.g. fetching the data products via the <em>product_gateway_url</em> from the
    <em>dataspace-configuration.json</em>
  </li>
</ol>

<p>
  Check out our Sandbox's <A
    href="https://sandbox.ioxio-dataspace.com/.well-known/dataspace/dataspace-configuration.json"
    >dataspace-configuration.json</A
  >
  to see what configuration is available for IOXIO dataspaces.
</p>

<SectionTitle>Example signed code</SectionTitle>
<p>
  The line feeds are added to make it easier to see what the code is like, but are not a part of the
  code. Having extra linefeeds breaks the code.
</p>

<Code lang={json}>
  {`
IT1:RRQ5 8/60V500GKOG8WA6E+5OPCZQEG/D5ECBPE ED0AFM2E6VCQ/EV9EV3E $E9WEB$CBECP9EY CPED$.
CKWEZED.2DV50 NF19W:5EKV52W0TFQJ01Y%8W+6%9IRE2SJ51VEU95K:AM+61XB2UJ+/81-I0Y3YXABQ9XJQST
CRB7G3Y%D868%$M0DE E30QNSFL64W/V473PWW0. VLK8BJO8VBTEHUDQS9HX3BCOMRFFDE560C.BHJP0000DP$
YPCBNQ2OPPA8XD/N5Z6LNVNEJM* CL8FH7PHRUDVVO5IDEQZ$SM1U-N8U$UZ0KQPBYOSEN4: P2/7+5NECC254I
C7BZCN.0J%BBEOMD645V2RG7+S0.5CCR2JTCCAVVOVN0OT-K63CSR14TARR%N/27AUQ9XNJMVO-0LV5DSJPH2/O
V6MMZ1FLLG17WGDYP51T8W/06:QV43FK7RPC$-1Q+PK%I
`}
</Code>

<p>Printed into a QR code one might look something like this:</p>

<img alt="example of a signed IOXIO Tag QR code" src="/ioxio-tag-example-signed.png" />

<p>
  Check out the <em>make_cose_code</em> function in <A
    href="https://github.com/ioxiocom/ioxio-tags/blob/main/api/app/tag.py">our demo application</A
  > for a full example.
</p>

<p>
  You can check out our <A href="https://generator.tags.ioxio.dev">IOXIO Tag&trade; generator</A> and
  as well as <A href="https://scanner.tags.ioxio.dev">IOXIO Tag&trade; scanner</A>, and their <A
    href="https://github.com/ioxiocom/ioxio-tags">source code</A
  > to see how these work in practice.
</p>

<style lang="scss">
  img {
    max-width: 32rem;
  }
</style>
