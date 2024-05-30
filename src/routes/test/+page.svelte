<script>
  import Code from "$lib/Code.svelte"
  import Title from "$lib/Title.svelte"
  import Miro from "$lib/Miro.svelte"

  import typescript from "svelte-highlight/languages/typescript"
  import python from "svelte-highlight/languages/python"
  import json from "svelte-highlight/languages/json"
  import Breadcrumbs from "$lib/Breadcrumbs.svelte"

  /** @type {import('./$types').PageData} */
  export let data
</script>

<Breadcrumbs path={data.path} />

<Title>How to build applications</Title>
<p>This wonderful code fetches your data.</p>
<Code lang={typescript}>
  {`
import foo from "./foo";

function bar(arg: string): boolean {
  return foo(bar)
}
`}
</Code>
<Miro url="https://miro.com/app/board/uXjVMANjO8Y=/" />
<p>
  You can define data products like this in <em>src/draft/Weather/Current/Metric.py</em> in the definitions
  repository.
</p>
<Code lang={python} lineNumbers>
  {`
from definition_tooling.converter import CamelCaseModel, DataProductDefinition
from pydantic import Field


class CurrentWeatherMetricRequest(CamelCaseModel):
    lat: float = Field(
        ...,
        title="Latitude",
        description="The latitude coordinate of the desired location",
        ge=-90.0,
        le=90.0,
        example=60.192059,
    )
    lon: float = Field(
        ...,
        title="Longitude",
        description="The longitude coordinate of the desired location",
        ge=-180.0,
        le=180.0,
        example=24.945831,
    )


class CurrentWeatherMetricResponse(CamelCaseModel):
    humidity: float = Field(..., title="Current relative air humidity in %", example=72)
    pressure: float = Field(..., title="Current air pressure in hPa", example=1007)
    # ...


DEFINITION = DataProductDefinition(
    title="Current weather in a given location",
    description="Common data points about the current weather with metric units in a given location. Simplified for example use, and not following industry standards.",
    request=CurrentWeatherMetricRequest,
    response=CurrentWeatherMetricResponse,
)
}
`}
</Code>
<p>
  And then you can host this in <em>.well-known/product-passport/product-passport.json</em>:
</p>
<Code lang={json}>
  {`
{
  "jwks_uri": "https://example.com/.well-known/jwks.json",
  "logo_url": "https://example.com/favicon-32x32.png",
  "product_dataspace": "sandbox.ioxio-dataspace.com"
}
`}
</Code>

<style>
  /* Any custom styles you may want to add, scoped to this page */
</style>
