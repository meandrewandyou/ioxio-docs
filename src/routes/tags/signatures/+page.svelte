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

<SectionTitle>Example signed code</SectionTitle>
<p>
  The line feeds are added to make it easier to see what the code is like, but are not a part of the
  code. Having extra linefeeds breaks the code.
</p>

<Code lang={json}>
  {`
IT1:RRQ5 8/60V500GKOG8WA6CADOPCZQE..E6$CPQEGPCKI91/DXPE6$CSED -DUPCH$DV9EV3E $EQWEI93IE
C7WEALE4W5646D4FPX54%E5$CQX56%E:JC%JCPVC:P4WZCK-CM.CCA7H*6RW67W5VF6CA7XJC3UCAX57079460D
CZX61:6256V50PEHZRA9A81+NMXJ0C76BJSUC**B1.VDCMQCKU47AZM52UW1K21R0VB6R55F2CXB/94+SS KBY9
2RZMO313+P1-O44PFWFB3BYELI.BHAW%2V2*4-AEGB0GX628CCJS1OBAU0NH800JDD7UYPH+UNWL1KMH:UMAS4Q
K:R7$.36QVO8S5YA6SRW1LFA90H7.177ZM7QQ%HVZ 0VHLJQR%VLIPU/NJO68HZNA4PA32K9153Q8EW/%PEKBRB
NJO3ATK1WEW+P-PL.R0%MQJVTL68+FMLOFRAJ0IHR6W882.8B:EBEG24X74H9COJ:.1C89WFCL M+.C1XJ$Z3PM
5OM754GL22D7TVXV*JH/X1U66+CHCEMXI0P274GSM.6. LBDD
`}
</Code>

<p>
  Check out the <em>make_cose_code</em> function in <A
    href="https://github.com/ioxiocom/ioxio-tags/blob/main/api/app/tag.py">our demo application</A
  > for a full example.
</p>

<p>
  You can use our <A href="https://generator.tags.ioxio.dev">IOXIO Tag&trade; generator</A> and check
  it's source code to see how these work in practice.
</p>
