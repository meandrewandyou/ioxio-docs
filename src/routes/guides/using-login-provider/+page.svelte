<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import A from "$lib/components/A.svelte"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"
  import type { PageData } from "./$types"
  import GuideImage from "$lib/components/GuideImage.svelte"

  export let data: PageData

  const images = data.images
</script>

<TableOfContents>
  <Title title={`How to use dataspace login in an application`} />

  <Breadcrumbs path={data.path} />

  <div>
    <SectionTitle title="Introduction" />
    <p>
      The login portals on the IOXIO Dataspaces are used to provide a unified way for users to log
      in to various different applications created by different vendors on the same Dataspace. The
      authentication is additionally used in the consent portal to grant consents and together with
      that in the product gateway and data sources or productizers to verify both authorization and
      consent when needed. This guide will focus on how you can use the login portal to authenticate
      your users.
    </p>
    <SectionTitle title="Technical details" />
    <p>
      The login portal is acting as both an <A href="https://openid.net/connect/">OpenID Connect</A>
      identity providers (IDP) towards applications published on the Dataspace and as a relying party
      (RP) towards one or more 3rd party IDPs that might vary depending on the Dataspace. In essence
      it's acting a middle man for all the authentication on the Dataspace.
    </p>
    <p>
      This means applications built for an IOXIO Dataspace in the typical case only need to
      integrate with the login portal, and not the underlying authentication providers. This also
      means the login portal can be extended with support for other authentication schemes while
      still allowing the applications on the Dataspace to use the same OpenID Connect
      authentication.
    </p>
    <SectionTitle title="Using the login portal for authentication" />
    <p>
      The login portal uses OpenID Connect with the code flow. You will need to decide how you are
      going to implement the OpenID Connect code flow for your application; you can either use some
      ready-made library or implement it yourself.
    </p>
    <p>
      For a really simple example of how the code flow authentication can be built, you can have a
      look at the codebase for the <A
        href="https://github.com/ioxio-dataspace/mycompany-consent-demo"
        >My Company Consent demo application</A
      >. It's lacking a lot of cleanup related things, but should be enough to show how you could
      build it.
    </p>
    <SectionTitle title="OpenID Configurations" />
    <p>
      The login portal supports the OpenID Connect Discovery, thus most relevant configurations for
      OpenID Connect clients can be found at the path <em>/.well-known/openid-configuration</em>,
      for example on the sandbox at the address <A
        href="https://login.sandbox.ioxio-dataspace.com/.well-known/openid-configuration"
        >https://login.sandbox.ioxio-dataspace.com/.well-known/openid-configuration</A
      >.
    </p>
    <p>The content looks like this:</p>
    <Code lang={json}
      >{`
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

    <p>
      Many OpenID Connect/OAuth 2 clients require some of these endpoints directly instead of
      parsing them from the configuration using the discovery mechanisms.
    </p>
    <SectionTitle title="Register your application in the developer portal" />
    <p>
      You will need to register your application through the developer portal to get a Client ID and
      Client Secret.
    </p>
    <p>
      1. Login in to the <A href="https://developer.sandbox.ioxio-dataspace.com/"
        >Developer portal</A
      >.
    </p>
    <p>2. Go to the <em>My applications</em> page in the menu.</p>
    <GuideImage img={images.MY_APPLICATIONS_PAGE} />
    <p>3. Press the <em>+ Add an application</em> button.</p>
    <p>4. Fill in the necessary details for your application:</p>
    <GuideImage img={images.CREATE_AN_APPLICATION_PAGE} />
    <p>
      Pick a name for your own application and fill it in the <em>Application name</em> field.<br
      />Add one or more
      <em>Redirect URIs</em> for your application, as well as <em>Logout redirect URIs</em>. These
      are the addresses the user is allowed to be redirected to when being returned to your
      application.
    </p>
    <p>5. Create the application by pressing the <em>Create</em> button.</p>
    <p>6. Your application is now created.</p>
    <GuideImage img={images.THE_CREATED_APPLICATION} />
    <p>
      As part of creating it, a <em>Client ID</em> was generated, as well as two
      <em>Client secrets</em>
      (so you can use one and rotate the other one). You will need the Client ID and either one of the
      two Client secrets when setting up your application. The buttons next to the client secrets allows
      you to show them, copy them and replace them. In case you need to edit any of the URIs or the name
      of the app you can change them and press the <em>Save</em> button.
    </p>
    <SectionTitle title="Other configurations" />
    <h3>Scopes</h3>
    <p>At the moment the only supported <em>scope</em> is <em>openid</em> and it is required.</p>
    <h3>ACR Values</h3>
    <p>
      The <em>acr_values</em> is required and used to indicate which underlying authentication
      method the login portal will use for the authentication. For applications registered on the
      IOXIO Sandbox Dataspace, the value <em>fake-auth</em> is the only supported one and will use a
      fake authentication where the user can fill in any username that will be postfixed with a faked
      domain to form a fake-email address and no password. Please consult your Dataspace specific details
      for which values are supported in your Dataspace if you're creating an application for another
      Dataspace.
    </p>
    <h3>ID Token Hint</h3>
    <p>
      When logging out the user the application must include the <em>id_token_hint</em> when
      redirecting the user to the <em>end_session_endpoint</em>.
    </p>
  </div>
</TableOfContents>

<style lang="scss">
</style>
