<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import bash from "svelte-highlight/languages/bash"
  import A from "$lib/components/A.svelte"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"
  import { GUIDES } from "../urls"
  import type { PageData } from "./$types"
  import GuideImage from "$lib/components/GuideImage.svelte"

  export let data: PageData

  const images = data.images

  function img(name: string): string {
    return `${data.path}${name}`
  }
</script>

<TableOfContents>
  <Title title={data.guide.title} />

  <Breadcrumbs path={data.path} />

  <div>
    <SectionTitle title="Introduction" />
    <p>
      Building an application for an IOXIO® Dataspace is not much different from building any other
      web-based or mobile application. IOXIO® Dataspace supports both building applications from
      scratch and upgrading existing applications to take advantage of features from a Dataspace. In
      fact, it mainly offers a way to extend the functionalities of applications compared to what we
      see today.
    </p>
    <SectionTitle title="Creating an application" />
    <p>
      Go to my applications submenu in the developer portal and click on the button to add an
      application. Fill in all the necessary fields, select a group and click the Create button.
      You'll have to pick one of the groups you must have created beforehand. The steps required for
      creating a group are detailed in the <A href={GUIDES.MANAGE_GROUP.href}
        >{GUIDES.MANAGE_GROUP.title}</A
      > guide.
    </p>
    <GuideImage img={images.CREATE_AN_APPLICATION_PAGE} />
    <h2>What features does the IOXIO® Dataspace bring to an application?</h2>
    <SectionTitle title="Data products" />
    <p>
      Data Products allows the application to access data in a standardized format, following a data
      product definition. Multiple different vendors can publish data sources complying with the
      same definition, making it easy to switch the provider of the data. Data sources are accessed
      through the product gateway, which validates the request and response data complies with the
      definition. Data sources can be accessed without any authentication, requiring authentication
      or by requiring consent.
    </p>
    <SectionTitle title="Authentication" />
    <p>
      The authentication provider of an IOXIO® Dataspace can be used for authenticating the users
      using the OpenID Connect code flow, thus simplifying the authentication process.
    </p>
    <p>
      Applications are however not required to implement any kind of authentication at all and can
      use their own authentication solutions as long as they only use data sources which do not
      require authorization or consent. Using the authentication provider can however save time
      compared to implementing an authentication solution from scratch, unify the user experience
      with other applications on the Dataspace and make it easier to later extend the functionality
      by using data sources that require authorization or consent.
    </p>
    <SectionTitle title="Consent" />
    <p>
      In case any of the data sources used by the app require a consent from the user, the app needs
      to use both the authentication provider for authentication and the consent portal for consents
      in order to be able to fetch the data product.
    </p>
    <h2>Using data products</h2>
    <SectionTitle title="Finding a data source definition" />
    <p>
      The first step to use a data product is to find out what data you need and which data source
      definition provides that data.
    </p>
    <p>
      There are multiple ways you can view the data source definitions to find the one you need.
    </p>
    <h3>Data definition viewer</h3>
    <p>
      The <A href="https://definitions.sandbox.ioxio-dataspace.com/">Data definition viewer</A>
      is targeted to less technical people and can be used to browse data sources definitions in a simplified
      and understandable way. This tool is targeted also for business and non-technical users familiarizing
      and using IOXIO® Dataspace services.
    </p>
    <GuideImage img={images.DEFINITION_VIEWER} />
    <p>
      The Select data product definition dropdown can be used to drill down different categories to
      find data sources by category, like Weather, under which you could find the current weather in
      metric units.
    </p>
    <GuideImage img={images.DEFINITION_VIEWER_DROPDOWN} />
    <p>
      The details view will show you what data is needed as input and what kind of data is included
      in the response.
    </p>
    <GuideImage img={images.DEFINITION_VIEWER_BROWSE} />

    <h3>GitHub repository</h3>
    <p>
      If you prefer to look at the raw OpenAPI Spec files or use some specific tool for inspecting
      them, you can go to the <A href="https://github.com/ioxio-dataspace/sandbox-definitions/"
        >GitHub repository for the sandbox-definitions</A
      >. The data source definitions are found in the <em>DataProducts</em> directory.
    </p>
    <h3>No matching definition?</h3>
    <p>
      If you don't find any data source definition providing the data you need, you can also consult
      the <A href={GUIDES.BUILD_DATA_DEF.href}>{GUIDES.BUILD_DATA_DEF.title}</A> guide to create your
      own definition. The definition alone is of little use unless someone also provides a data source
      for the data. The <A href={GUIDES.BUILD_DATA_SOURCE.href}>{GUIDES.BUILD_DATA_SOURCE.title}</A>
      guide explains how you or someone else could build a data source for the definition.
    </p>

    <SectionTitle title="Finding an available data source" />
    <p>
      Log in to the <A href="https://developer.sandbox.ioxio-dataspace.com/">developer portal</A> and
      navigate to the
      <A href="https://developer.sandbox.ioxio-dataspace.com/sources/available"
        >Available data sources</A
      > section and use the dropdown to list the available data sources for the desired definition.
    </p>
    <GuideImage img={images.DS_SEARCH} />

    <p>You will get a list of all different data sources providing that data.</p>
    <p>
      If there are no matching sources, you might want to consider building your own data source or
      request someone to build it, following the <A href={GUIDES.BUILD_DATA_SOURCE.href}
        >{GUIDES.BUILD_DATA_SOURCE.title}</A
      > guide.
    </p>

    <SectionTitle title="Requesting the data from a data source" />
    <p>
      If you press the OPEN button next to any of the found items in the developer portal, it will
      expand and conveniently show you the Request URL for the source:
    </p>
    <GuideImage img={images.DS_DETAILS} />
    <p>
      This shows the URL at which you can query the product gateway to get the data from this
      particular source. For the same definition, the only thing that will change depending on the
      source is the <em>?source=</em> query parameter. It's thus easy to later change the source to another
      that provides the same data.
    </p>
    <p>
      In order to request the data, you need to know what data to include in the request. The
      required data is best explained in the <A
        href="https://gateway.sandbox.ioxio-dataspace.com/docs#Data%20Products"
        >Product Gateway API Docs for Data Products</A
      >. In the section
      <A
        href="https://gateway.sandbox.ioxio-dataspace.com/docs#/Data%20Products/Weather_Current_Metric_v1_0_Weather_Current_Metric_v1_0_post"
        >Weather/Current/Metric_v1.0</A
      > you can see an example:
    </p>
    <GuideImage img={images.API_DOCS} />
    <p>
      The request to data products are always <em>POST</em> requests with the
      <em>Content-Type</em>
      set to <em>application/json</em>.
    </p>
    <p>
      The <em>Authorization</em> and <em>X-Consent-Token</em> headers can be either optional or required.
    </p>
    <p>
      If the <em>Authorization</em> header is required you will need to pass in the header with a
      value of the form <em>Bearer &lt;id_token&gt;</em>, where
      <em>&lt;id_token&gt;</em>
      is the ID Token the for the logged in user. In practice the header will be of the form
      <em>Bearer eyJ...</em>.
    </p>
    <p>
      If the <em>X-Consent-Token</em> is required, a Consent Token needs to be passed in the header.
      Note that the consent token is not prefixed with anything, the token is used as-is in this header.
    </p>
    <p>
      Later sections of this guide will explain how to authenticate the user to get an ID Token and
      how to use the Consent Portal to request the consent from a user to get a Consent Token.
    </p>
    <p>
      The body of the request would need to contain the data described in the definition. For
      example to query for the weather in Helsinki using the definition mentioned earlier you could
      use this data:
    </p>
    <Code lang={json}
      >{`
{
   "lat": 60.192059,
   "lon": 24.945831
}
    `}
    </Code>
    <p>
      The response would follow the description in the definition and could for example for Helsinki
      look like this:
    </p>
    <Code lang={json}
      >{`
{
   "humidity": 72,
   "pressure": 1007,
   "rain": true,
   "temp": 17.3,
   "windSpeed": 2.1,
   "windDirection": 220
}
    `}
    </Code>
    <p>
      In practice, you likely want to do data product requests through your own backend rather than
      in your frontend or on the client side. First of all CORS would make it hard to perform the
      request from the client side, especially in web based applications. In addition, you might
      want to do some pre- or post-processing to the request, like for example map a city or address
      to a coordinate (possibly using some other data product) or fetch some additional data. Or
      maybe just include some of the data in some other response. You might also in some cases want
      to cache some generic data that doesn't change frequently and doesn't depend on the user. You
      might also want to monitor your own use of different data sources and even be able to easily
      switch the source without rolling out an update of the frontend or mobile app.
    </p>
    <SectionTitle title="Authenticating users" />
    <p>
      There's a separate guide called <A href={GUIDES.USING_LOGIN_PROVIDER.href}
        >{GUIDES.USING_LOGIN_PROVIDER.title}</A
      > that goes into details on how you register your application and use the login portal for authentication
      to obtain the <em>id_token</em> for a user.
    </p>
    <SectionTitle title="Using consent" />
    <p>
      The <A href="https://miro.com/app/board/o9J_lC4tnfI=/">Consent protocol summary</A> explains the
      flow for requesting consent and outlines the overall design. This guide focuses on implementing
      the necessary parts of it in your application so you can request consent from the user, obtain
      a consent token and use it to fetch the data product.
    </p>
    <h3>Check if consent is required</h3>
    <p>
      The data source definition can indicate that the <em>X-Consent-Token</em> is required for a particular
      definition if it is always required. It's also possible to mark it as optional, in which case each
      data source can decide if it's required or not. If it's required and missing, the productizer will
      respond with the status code 403 to the request from the product gateway. The product gateway will
      use this information and respond to you with the status code 502 and a JSON body with the field
      status set to 403, which is your indication that consent is required.
    </p>
    <h3>Data Source Identifier</h3>
    <p>
      For the consent request, you will need the Data Source Identifier (DSI) for the data source.
      It's a Data Product Protocol link of the form
      <em>dpp://&lt;source&gt;@&lt;dataspace-domain&gt;/&lt;definition&gt;</em>.
    </p>
    <p>Let's see how to create it for this data source:</p>
    <GuideImage img={images.DS_DETAILS_SIG_RIGHTS} />
    <p>
      The source is <em>ioxio</em>, the dataspace-domain (the bare one for the Dataspace, not the
      one for the product gateway) is <em>sandbox.ioxio-dataspace.com</em>. And the definition is
      <em>NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0</em>. Using the pattern for
      the Data Source Identifier, it thus becomes
      <em
        >dpp://ioxio@sandbox.ioxio-dataspace.com/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0</em
      >.
    </p>
    <h3>Consent Request Token</h3>
    <p>For consent requests you need to have a consent request token. How do you get this:</p>
    <p>
      This is a JWT that you have to create and it needs to have the following extra information in
      the header (the <em>kid</em> needs to match one of the keys you published through the
      <A href="{GUIDES.MANAGE_GROUP.href}#creating-and-hosting-party-configuration"
        >party-configuration for the group of your application</A
      >
      and <em>v</em> must be
      <em>"0.2"</em>, for now the <em>alg</em> should be set to
      <em>"RS256"</em>). Below is an example of what should be contained in the header and body. The
      JWT should be signed with the key corresponding to the <em>kid</em> used in the header. You
      can check out
      <A href="/schemas/consent-request-token/">the consent request token page</A> to get details of
      each field.
    </p>
    <p>Header</p>
    <Code lang={json}
      >{`
{
    "v": "0.2",
    "kid": "2d149479-88a6-4141-ad4c-b14c92f430bc",
    "alg": "RS256"
}
    `}
    </Code>
    <p>Body</p>
    <Code lang={json}
      >{`
{
    "iss": "https://example.com",
    "sub": "debade8a-091d-42da-9b0c-e61f9471e2c3",
    "subiss": "https://login.sandbox.ioxio-dataspace.com",
    "acr": "fake-auth",
    "app": "bb8c7f74-0855-42e1-ba09-70bb27103ded",
    "appiss": "https://login.sandbox.ioxio-dataspace.com",
    "aud": "https://consent.sandbox.ioxio-dataspace.com",
    "exp": 1678492800,
    "iat": 1678406400
}
    `}
    </Code>
    <p>
      Here is an example of what a decoded Consent Request Token could look like when decoded at
      <A href="https://jwt.io">jwt.io</A>:
    </p>
    <GuideImage img={images.DECODED_CONSENT_REQUEST_TOKEN} />
    <h3>Request consent</h3>
    <p>
      In order to be able to request consent from the user you will need to first authenticate the
      user and obtain the <em>id_token</em> for the user. This is explained in the <A
        href={GUIDES.USING_LOGIN_PROVIDER.href}>{GUIDES.USING_LOGIN_PROVIDER.title}</A
      > guide. You will also need the Data Source Identifier and Consent Request Token both described
      above.
    </p>
    <p>
      The consent request is created by doing a <em>POST</em> request to the
      <em>/Consent/RequestConsents</em>
      endpoint on the Consent Portal, for example,
      <em>https://consent.sandbox.ioxio-dataspace.com/Consent/RequestConsents</em>. The
      <em>Content-Type</em>
      header has to be set to <em>application/json</em> and the
      <em>X-Consent-Request-Token</em> header should contain the consent request token. You can request
      multiple consents at a time.
    </p>
    <p>
      The JSON body of the request should be an array of consent requests with each having the
      <em>dataSource</em> field set to the Data Source Identifier and the required field set to
      either <em>true</em>
      or <em>false</em>. True means if consent is denied for it then consent will be denied for
      every other one while false means it's optional and denying it consent doesn't affect others.
      The body could thus look like this:
    </p>
    <Code lang={json}
      >{`
{
  "consentRequests": [
     {
        "dataSource": "dpp://ioxio@sandbox.ioxio-dataspace.com/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0",
        "required": true
     }
  ]
}
    `}
    </Code>
    <p>Expressed as a cURL command the whole request would look like this:</p>
    <Code lang={bash}
      >{`
curl --request POST \\
  --url 'https://consent.sandbox.ioxio-dataspace.com/Consent/RequestConsents' \\
  --header 'Content-Type: application/json' \\
  --header 'X-Consent-Request-Token: eyJhbG.......' \\
  --data '{
            "consentRequests": [
               {
                  "dataSource": "dpp://ioxio@sandbox.ioxio-dataspace.com/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0",
                  "required": true
               }
            ]
          }'
    `}
    </Code>
    <p>
      and the response would look similar to this if the user has already granted all the consents:
    </p>
    <Code lang={json}
      >{`
{
  "type": "allConsentsGranted"
}
    `}
    </Code>
    <p>If that is the case then you can skip to requesting the consent token section.</p>
    <p>It would look similar to this if the user has not yet granted the consent:</p>
    <Code lang={json}
      >{`
{
 "type": "requestUserConsent",
 "missingConsents": [{"dataSource":"dpp://ioxio@sandbox.ioxio-dataspace.com/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0","required":true}],
 "requestUrl": "https://consent.sandbox.ioxio-dataspace.com/request/86c0c7e6-4453-41c3-b20b-857ea41ea67b"
}
    `}
    </Code>
    <h3>Redirect the user to the consent portal</h3>
    <p>
      In order to request the consent you need to redirect the user to the <em>requestUrl</em>, but
      you should also add the query parameter <em>returnUrl</em> to indicate where the consent
      portal should redirect the user to after giving the consent (or declining it). Thus you would
      be redirecting the user to something similar to
      <em
        >https://consent.sandbox.ioxio-dataspace.com/request/86c0c7e6-4453-41c3-b20b-857ea41ea67b?returnUrl=https://my-app.example.com</em
      >
    </p>
    <p>The user will be displayed a prompt to log in:</p>
    <GuideImage img={images.THE_CONSENT_PORTAL} />
    <p>The consent can be granted after logging in:</p>
    <GuideImage img={images.CONSENT_PORTAL_AFTER_LOGGING_IN} />
    <p>
      The user will be redirected back to the return URL with an added <em>?status=fail</em>
      or <em>?status=success</em> query parameter, e.g. either to
      <em>https://my-app.example.com/?status=fail</em>
      or <em>https://my-app.example.com/?status=success</em>.
    </p>
    <h3>Request the consent token</h3>
    <p>
      When the user has returned you need to retrieve the consent token. This is done by sending a
      <em>POST</em> request to the <em>/Consent/GetToken</em>
      endpoint. The <em>Content-Type</em> header has to be set to <em>application/json</em> and the
      <em>X-Consent-Request-Token</em> header should contain the consent request token. The JSON
      body should be the <em>dataSource</em> field set to the Data Source Identifier i.e.
    </p>
    <Code lang={bash}
      >{`
curl --request POST \\
  --url 'https://consent.sandbox.ioxio-dataspace.com/Consent/GetToken' \\
  --header 'Content-Type: application/json' \\
  --header 'X-Consent-Request-Token: eyJhbGciOiJSUz.......' \\
  --data '{"dataSource": "dpp://ioxio@sandbox.ioxio-dataspace.com/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0"}'
    `}
    </Code>
    <p>This time the response would look similar to this:</p>
    <Code lang={json}
      >{`
{
  "type": "consentGranted",
  "consentToken": "eyJ..."
}
    `}
    </Code>
    <p>
      <strong>Note!</strong> The consent token has a somewhat short lifetime. However, using the same
      get token request it's possible to get a new token as long as the consent remains valid.
    </p>
    <p>The response will look like this if consent has not been granted or has been revoked:</p>
    <Code lang={json}
      >{`
{
  "type": "missingConsent"
}
    `}
    </Code>
    <p>In that case, you have to go back to requesting consent section.</p>
    <h3>Using the consent token</h3>
    <p>
      Once you've got the consent token for the user, you can do a request to the data source
      through the product gateway. Just remember to add the <em>Authorization</em> header with the
      <em>id_token</em>
      as a Bearer Token and the consent token in the
      <em>X-Consent-Token</em> header.
    </p>
    <p>Using cURL the request would look similar to this:</p>
    <Code lang={bash}
      >{`
curl --request POST \\
  --url 'https://gateway.sandbox.ioxio-dataspace.com/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights_v1.0?source=ioxio' \\
  --header 'Content-Type: application/json' \\
  --header 'Authorization: Bearer eyJ...' \\
  --header 'X-Consent-Token: eyJ...' \\
  --data '{"nationalIdentifier": "SWE: 5560125791"}'
    `}
    </Code>
  </div>
</TableOfContents>

<style lang="scss">
</style>
