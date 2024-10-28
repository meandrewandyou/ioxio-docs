<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"
  import type { PageData } from "../../../../.svelte-kit/types/src/routes/guides/verifying-id-token/$types"
  import A from "$lib/components/A.svelte"
  import GuideImage from "$lib/components/GuideImage.svelte"

  /** @type {import('./$types').PageData} */
  export let data: PageData

  const images = data.images
</script>

<TableOfContents>
  <Title title={`Verify id_token in a data source`} />

  <Breadcrumbs path={data.path} />

  <SectionTitle title="Introduction" />
  <p>
    In the Dataspace ecosystem the data sources or productizers might want to verify the identity of
    a user making the request, for example to ensure they are authorized to access the data or for
    logging purposes.
  </p>
  <p>
    When the user logs in to an application on the Dataspace, the application receives an <em
      >id_token</em
    >
    for the user. The application can use this as a Bearer Token when communicating with the product
    gateway by adding an <em>Authorization</em> HTTP header with a value of the form
    <em>Bearer &lt;id_token&gt;</em>. The <em>Authorization</em> header is forwarded by the product gateway
    to the data source or productizer.
  </p>
  <p>
    The <em>id_token</em> is a <A href="https://datatracker.ietf.org/doc/html/rfc7519">
      JSON Web Token (JWT)</A
    >
    that can be decoded and verified. This guide will explain in more detail the process of extracting,
    decoding and verifying it.
  </p>
  <SectionTitle title="Verifying the id_token in the productizer" />
  <h3>Get the Authorization header</h3>
  <p>
    The productizer or data source needs to first extract the <em>id_token</em> from the
    <em>Authorization</em> HTTP header of the request. Please note that the header is in many data source
    definitions optional, so take that in mind when parsing it.
  </p>
  <h3>Extracting the id_token from the header</h3>
  <p>
    The value of the header should be of the form <em>Bearer &lt;token&gt;</em>, where
    <em>&lt;token&gt;</em> is the actual <em>id_token</em>.
  </p>
  <p>
    You can split the header at the space character or the right string index and verify the scheme
    is <em>Bearer</em> and followed by a space character. <A
      href="https://datatracker.ietf.org/doc/html/rfc6750#section-2.1">RFC 6750 section 2.1</A
    > states the scheme is <em>Bearer</em>, but some frameworks in practice do a case insensitive
    match to improve compatibility with some client libraries that don't fully comply with the
    standard.
  </p>
  <p>
    Some frameworks also have built in support for extracting the Bearer Token. For example <A
      href="https://fastapi.tiangolo.com/">FastAPI</A
    >, where the usage is actually best illustrated in the <A
      href="https://github.com/tiangolo/fastapi/blob/0.71.0/tests/test_security_http_bearer.py#L7-L12"
    >
      HTTPBearer test cases</A
    >. However you would likely want to adapt that slightly to make it an optional dependency for
    easier reuse.
  </p>
  <h3>Reading the id_token</h3>
  <p>
    The <em>id_token</em> is a <A href="https://datatracker.ietf.org/doc/html/rfc7519"
      >JSON Web Token (JWT)</A
    >.
  </p>
  <p>
    If you are unfamiliar with JWTs you might want to check out the <A
      href="https://jwt.io/introduction">JSON Web Token Introduction.</A
    >
    The same site has a really good tool for decoding JWTs directly in the web browser at
    <A href="https://jwt.io">jwt.io,</A>
    as well as a fairly good list of different
    <A href="https://jwt.io/libraries">JWT libraries</A> for different programming languages.
  </p>
  <p>
    You most likely want to use one of the libraries for your programming language rather than try
    to implement it according to the <A href="https://datatracker.ietf.org/doc/html/rfc7519"
      >RFC 7519</A
    >.
  </p>
  <p>
    Let's have a look at a valid example token from one of the applications on the IOXIO Sandbox
    Dataspace and how to verify it.
  </p>
  <p>Let's examine this token:</p>
  <Code lang={json}>
    {`
  eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjNjNzk1NmM5YzM2NjFjMGZkYmMwNmQ2NDYzYWIyYTA5In0.eyJzdWIiOiJaR1Z0YjBCMFpYTjBaWEl1YVc5NGFXOHVZMjl0IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5zYW5kYm94LmlveGlvLWRhdGFzcGFjZS5jb20iLCJpYXQiOjE2NjE0MTc5MjcsImV4cCI6MTY2MTUwNDMyNywiYXVkIjoiODNkNTUxMjYtZTYxNy00M2RjLWEyZmYtNDNmYmViODQ4Y2QxIiwibm9uY2UiOiIyY2U5M2VlNi00ZTFjLTQxNDYtOGRiOC1jMzdmZjg4YWI4YjkiLCJlbWFpbCI6ImRlbW9AdGVzdGVyLmlveGlvLmNvbSIsImFjciI6ImZha2UtYXV0aCJ9.G7A-Jeks4Yfe2PeKts4odXBZ1IvFHtBgjFVU07RnkirsQLQ5ShESWJf7ZOu1IqluhxKlot8ZsQeGgn8lBxr4-CiOoDKJuXQB83wOrGlsnBqo_bAreXNCaDKN69V9X055fCrm20t6m3Sgh9pSBqukvaGh2Ln61l_o1CmZBK2_ETqon1R5-aJMjSRliAStKYQG9yDEolLAIhXqflPq90Yw8TbXE0-FD68lj6AJLEmQO0rPCMxM9Ph3Ja3lqI5hT0kVIZD-Q0xld4FLX4LfbE8qbM_yV8TuSXi1w3vvTy4dDjQTqCihcvsFi-qZR-TDb33mR6y50YASKciGmoxbMy3P-AO4biD2RBi63Pt36MZ-NmAU1PqzLISWNouvnLx4ly_HGqSnzrFlsCD7A_DK4T9dy_5LRTQjNL6O9Re2n8HDFsTt42FmeaD6MO57L-kCGgrOi8khbjjaZV87WoWRV5UYy85zbCF_Qi45i-U0aS9XS_qyVN36QOGJ08pcVmC1DqNBMQZtUs19BuuqfeKDzLJj_5azZkbBY5vxaPr6J7Pj4rwozL6XQDwlHe_FZRRcHVHMPgYLV6XOYtiQuvE5jPXXFAUG2dGwxB1-UyJkVwNvcKrtM-eNaiFFeVIDc9T5Q-6vBXxdwSYPvwobt1XVj2rj1au465Tb7_KR4BS7xmDha8E

`}
  </Code>
  <p>
    Please note that tokens are security sensitive and should not be passed into untrustworthy tools
    or shared with other people in general. The token used here is for a demo application where
    anyone can log in with a fake username and no password, so anyone could have acquired this
    token.
  </p>
  <p>
    At the time you are reading this guide the token will unfortunately have expired, so some of the
    verifications we will perform here won't work. However you can log in to the <A
      href="https://mycompany.demos.ioxio.com/my-company/">MyCompany Demo App</A
    > and extract your own <em>id_token</em> from a cookie with that name once you've logged in.
  </p>
  <p>This is what the content of the token will look like:</p>
  <GuideImage img={images.VIEW_JWT_TOKEN} />
  <p>
    Many JWT libraries also allow you to read the JWT without verifying it. In case your library for
    some reason does not do that, you can actually note that the token consists of three sections
    separated by a dot, like <em>AAA.BBB.CCC</em>. The first section (<em>AAA</em>) is the header,
    the second one (<em>BBB</em>) is the body and the last one (<em>CCC</em>) is the signature. The
    first two are actually just Base64 encoded JSON strings that can be easily decoded and read.
  </p>
  <SectionTitle title="Fetch the public key" />
  <p>
    The JWTs used on the Dataspace are signed with a private key and the public key is made publicly
    available following the OpenID Connect specification. In order to verify the token we need to
    get hold of the public key.
  </p>
  <p>The steps to find the key consists of:</p>
  <ol>
    <li>Find the JWKS URI from the OpenID Connect Configuration</li>
    <li>Find the right key from the JWKS URI</li>
  </ol>
  <p>
    We will explain the process in detail, but it's definitely worth checking what kind of support
    the JWT library you use have for this or if there's some other library that can be used for this
    purpose, as this might vary a lot.
  </p>
  <p>
    In Python for example the <A
      href="https://pyjwt.readthedocs.io/en/stable/usage.html#retrieve-rsa-signing-keys-from-a-jwks-endpoint"
      >PyJWT library</A
    >
    has a <em>PyJWKClient</em> that can fetch the key if you already know the JWKS URI, but it does
    not support asynchronous execution. There's however a separate library called
    <A href="https://pypi.org/project/pyjwt-key-fetcher/">pyjwt-key-fetcher</A> that supports async and
    has built in caching and other features.
  </p>
  <h3>Find the JWKS URI</h3>
  <p>
    The first step to find the key is to check the issuer of the token, which is found in <em
      >iss</em
    > field in the body.
  </p>
  <p>
    Please note that you should check that the <em>iss</em> is one you want to trust. In a typical
    IOXIO Dataspace this would always be the address of the login portal of the Dataspace. In some
    cases the Dataspace might use a limited set of different issuers, which should be listed and
    available to developers of the Dataspace. Querying openid-configurations and JWKs from arbitrary
    issuers and addresses should be avoided. The <A
      href="https://pypi.org/project/pyjwt-key-fetcher/">pyjwt-key-fetcher</A
    > for example has the option to limit the fetching.
  </p>
  <p>
    In this example the <em>iss</em> (Issuer) is <em>https://login.sandbox.ioxio-dataspace.com</em>,
    which is the login portal of the IOXIO Sandbox Dataspace. The OpenID Connect configuration
    should be found on the sub-path <em>/.well-known/openid-configuration</em>
    relative to the <em>iss</em>. Thus in this case the the OpenID configuration can be fetched from
    <A href="https://login.sandbox.ioxio-dataspace.com/.well-known/openid-configuration"
      >https://login.sandbox.ioxio-dataspace.com/.well-known/openid-configuration</A
    >. At the time of writing this it returned this JSON content (formatted for readability):
  </p>
  <Code lang={json}>
    {`
{
  "issuer": "https://login.sandbox.ioxio-dataspace.com",
  "authorization_endpoint": "https://login.sandbox.ioxio-dataspace.com/start-login",
  "token_endpoint": "https://login.sandbox.ioxio-dataspace.com/api/oauth/token",
  "jwks_uri": "https://login.sandbox.ioxio-dataspace.com/api/oauth/jwks",
  "userinfo_endpoint": "https://login.sandbox.ioxio-dataspace.com/api/oauth/userinfo",
  "end_session_endpoint": "https://login.sandbox.ioxio-dataspace.com/end-session",
  "response_types_supported": [
    "code"
  ],
  "subject_types_supported": [
    "public"
  ],
  "id_token_signing_alg_values_supported": [
    "RS256"
  ]
}

`}
  </Code>
  <p>The <em>jwks_uri</em> specify where we can find the keys of this authentication provider.</p>
  <h3>Find the key</h3>
  <p>
    At the time of writing this, the <em>jwks_uri</em>
    <A href="https://login.sandbox.ioxio-dataspace.com/api/oauth/jwks"
      >https://login.sandbox.ioxio-dataspace.com/api/oauth/jwks</A
    >
    returned this JSON content (formatted for readability):
  </p>
  <Code lang={json}>
    {`
    {
  "keys": [
    {
      "kid": "3c7956c9c3661c0fdbc06d6463ab2a09",
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "n": "zrDVwF4jpj-UAfdgXs8d0JIZriaZXEIgkWcPYEhOLZ--tBf9PXtbfXnCGj0q6dvPTLeh-Nzhh1oFggN1DCHTUPlT5Xzug2PIkHrFcbZGtULG0-zjZp4SekiHiH6wrYNAZPX99_jdSUj3IRIQLRUrNSihj6PkfVTV_us-WUQpyXHR1FfQo7Te_I4PqbeO4SCHYxik513_O44pU6J7ula8D-HBbrpZKIzV-PMoUA_jPsZVQkDyyJYbtDenp_hPSozMb7IXhJOg3oWSyNwhQBWFm3kXJa_9__EYlqiPQXXZqcvpWS0ortKc70jUHTEueehjsZEiPEiklvfLvPIxV4rxfXCEZadmscmm3pslPN8I3hEo1MeqnL6grKCrUCEIRiHRVXXytO6TJA6yL_ZmjlQ3Fozc8EFMn1EW515ERAkQs1HJWeRqe7WpytMgIPANA_fOWGOGVeB098gdZpm8oFDjwSb_EhQS0wVAxvJoxDXRbAW3C2sDDVuxd7CWu6hcc_ImCtGn_GIMZGjHY8gD20rxDIbC3TavEmQzBbN6eQj9cnUXKh9cilstTUucK-VxJtB7Gl8MJavOljcb-IsDKuePAA7cc7-mE7yru2xtKn5Fiqphqt9DcNbRQ95AiF35W_Wfqr0-ifLRpR5vWBvRTLvCxklFNt9HGxWCmKS9TDhY56U",
      "e": "AQAB"
    }
  ]
}
    `}
  </Code>
  <p>
    Under <em>keys</em> there's a list of keys, each of which have a <em>kid</em> (Key ID) and
    <em>alg</em>
    (Algorithm). If we look back at the decoded header of the JWT, we will notice that it also has a
    <em>kid</em>
    and <em>alg</em>. Finding the right key object in the list of <em>keys</em> consists of finding
    a key with matching <em>kid</em> and
    <em>alg</em> as well as validating that the <em>use</em> is set to <em>sig</em> which indicates
    signing. The login portal on the IOXIO Dataspaces will in practice always use a unique
    <em>kid</em>
    for each <em>alg</em>, similar to most other OpenID Connect providers and only hand out tokens
    signed with a key meant for signing (<em>"use": "sig"</em>). When a key used by a login portal
    on an IOXIO Dataspace expires (after key rotation) it's dropped from the list. In other words on
    the IOXIO Dataspaces using login portals, it's enough to just match the <em>kid</em> to find the
    right key.
  </p>
  <h3>Caching</h3>
  <p>
    Please note that for performance reasons you should use some level of caching. The address of
    the <em>jwks_uri</em> is for example not likely to change in practice. The keys are neither rotated
    frequently, so they could be cached for some time, but it's still important they get refreshed once
    in a while.
  </p>
  <h3>Verifying the token signature</h3>
  <p>
    Once you've found the matching key (unless your library does that for you), you will need to
    consult the documentation of your particular JWT library on how to use it to verify the token.
    This varies a bit by library. In some case you might even need to convert the key to some other
    format accepted by the library. Covering all these possibilities is however not possible in this
    guide, but that information can hopefully be found from other sources using the most popular
    search engines.
  </p>
  <h3>Verifying the fields</h3>
  <p>
    After verifying the signature, you should do some basic verification of some of the fields. Many
    libraries by default verify the <em>iat</em> (Issued At) and <em>exp</em> (Expiration Time), but
    some do not automatically do it. In that case you should verify that <em>iat</em> &le; current
    time &le; <em>exp</em>. You might also want to check the <em>iss</em> (Issuer) matches what you expect,
    but this would be good to check already before fetching the keys.
  </p>
  <h3>Using the token</h3>
  <p>
    Once you've verified the token signature using the key and checked it's still valid and was
    issued by a trustworthy issuer you can safely trust the data in it. The field of primary
    interest is the <em>sub</em> (Subject) which is who the user is. The <em>aud</em> (Audience) might
    be of interest if you want to know through which Application on the Dataspace the user was authenticated
    when doing the request.
  </p>
</TableOfContents>
