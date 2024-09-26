<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Code from "$lib/components/Code.svelte"
  import json from "svelte-highlight/languages/json"
  import python from "svelte-highlight/languages/python"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"

  /** @type {import('./$types').PageData} */
  export let data
</script>

<TableOfContents>
  <Title title={`Building a data definition for IOXIO Dataspace`} />

  <Breadcrumbs path={data.path} />

  <SectionTitle title="Intro to Data Definitions" />
  <p>
    Data definitions are the technical specifications for data products, which are the cornerstone
    of interoperable and trusted data exchange through a Dataspace. To put it simply, data products
    are a standardized set of data contents that can be used in various different business processes
    and use cases.
  </p>
  <p>
    A data product can for example describe the basic information of a company, transaction invoice
    or bill of lading (BoL) used in the logistics and financial processes in global trade. The data
    definition specifies what fields the data product contains, their meaning and type as well as
    limits and restrictions on them.
  </p>
  <p>
    This guide is mostly focused on the technical aspect of creating the definitions and will try to
    give some general advice on creating a good and reusable definition. Please however note that
    for the best results the data definitions should always be created together with business
    functions or experts in the particular field to ensure the definitions are generic, reusable in
    various use cases and work for various different organizations.
  </p>
  <SectionTitle title="Setup" />
  <h3>Install pre-requisites</h3>
  <p>
    You will need to install all the pre-requisites listed below (the names link directly to
    installation instructions):
  </p>
  <ul>
    <li><a href="https://git-scm.com/downloads" target="_blank">Git</a></li>
    <li><a href="https://www.python.org/downloads/" target="_blank">Python 3.9</a></li>
    <li><a href="https://pre-commit.com/#install" target="_blank">Pre-commit</a></li>
  </ul>
  <h3>Fork and clone the data definitions repository</h3>
  <p>
    Go to the <a href="https://github.com/ioxio-dataspace/sandbox-definitions/" target="_blank"
      >data definition repository on GitHub</a
    > and create your own fork of the repository and clone it. It's important that you make a fork as
    you don't have write access to the repository.
  </p>

  <p>
    Both of these steps are described in detail in the <a
      href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo"
      target="_blank">Fork a repo quickstart guide</a
    > in the GitHub documentation.
  </p>
  <h3>Set up pre-commit hooks</h3>
  <p>
    Open the repository you cloned in a terminal and run pre-commit install to set up the pre-commit
    hooks.
  </p>
  <img src="/create-definition-sc1.png" alt="Command prompt screenshot" />
  <p>If you get any error at this stage, ensure you've properly installed pre-commit and Python.</p>
  <p>
    The pre-commit hooks are used to perform some tasks at time you are committing your changes.
    They will for example generate an OpenAPI spec versions of the definitions based on the
    Python/pydantic ones, do some reformatting of the code and perform some validation.
  </p>
  <h3>Sync the repo</h3>
  <p>
    If you have cloned the repository earlier, ensure you sync the repo with the upstream and have
    the latest main checked out before you proceed to create the branch. If you just created the
    fork and cloned it (followed the steps above), you should have an up to date state already.
  </p>
  <p>
    If you need help with syncing the repo from the upstream, check the <a
      href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#configuring-git-to-sync-your-fork-with-the-upstream-repository"
      target="_blank">Configuring Git to sync your fork with the upstream repository</a
    > on GitHub.
  </p>

  <h3>Create a new branch</h3>
  <p>Create a new branch for your new definition, for example by running:</p>

  <Code lang={json}>
    {`
    git checkout -b adding-my-definition

`}
  </Code>

  <SectionTitle
    title="Creating a new definition
"
  />
  <p>
    This guide explains how to create a new definition using a python file (with models based on the <a
      href="https://docs.pydantic.dev/1.10/"
      target="_blank">pydantic library</a
    >). The content gets automatically converted into an OpenAPI spec file using the pre-commit
    hooks. This is fairly simple to do and understand even if you're not too familiar with Python or
    OpenAPI spec.
  </p>
  <h3>Decide what data to include in the definition</h3>
  <p>
    In this guide we're not giving any detailed information on what data to include in the
    definition or how to structure the data. Some basic principles to follow:
  </p>
  <ul>
    <li>The definition(s) should include the data you want to consume or provide.</li>
    <li>
      Try to make it generic, so it can be used by others, both others providing data or consuming
      data. In some cases it might be better to create multiple definitions rather than one that
      contains a lot of unrelated information that only apply to a particular use-case.
    </li>
    <li>Try to follow existing standards where possible (ISO etc).</li>
    <li>Use terminology and units that are commonly used in the field of application.</li>
    <li>
      Try to make sure the definition is consistent with other definitions if possible. For example
      prefer using same naming, units etc as similar data in other definitions.
    </li>
    <li>
      Prefer well structured and machine readable data that does not require any parsing. For
      example, don't define numeric data as a string with a unit (like "21 km"), rather as a numeric
      value and make sure to include the unit in the description of the field.
    </li>
  </ul>
  <h3>Data we want to define</h3>
  <p>For this guide, we are going to write a definition for some basic info for countries.</p>
  <p>
    Note that the data here has been picked to make the definition somewhat short and varied, not to
    be generic and necessary useful for real use cases.
  </p>
  <p>We have decided we want to include this data:</p>
  <ul>
    <li>Country code</li>
    <li>Name of the country</li>
    <li>Capital of the country, including the coordinates of it</li>
    <li>Official languages</li>
    <li>Area (in km^2)</li>
  </ul>
  <p>Expressed in JSON, here is example data for Finland:</p>
  <Code lang={json}>
    {`
{
    "code": "FI",
    "name": "Finland",
    "capital": {
        "name": "Helsinki",
        "lat": 60.170833,
        "lon": 24.9375,
    },
    "languages": ["fi", "sv"],
    "area": 338455
}

`}
  </Code>
  <p>and for Nauru:</p>
  <Code lang={json}>
    {`
{
   "code": "NR",
    "name": "Nauru",
    "capital": null,
    "languages": ["na", "en"],
    "area": 21
}

`}
  </Code>
  <p><i>(Data source: Wikipedia) </i></p>
  <p>
    In this simple example we have taken into account that there are countries that have no official
    capital, like Nauru, but we've ignored that there are countries that have multiple capitals. We
    could solve this by stating we're only interested in the legislative or administrative capital
    in these cases or defining the capitals as a list of cities and add properties about their kind.
  </p>
  <p>We want the data to be requested by the country code, like this:</p>
  <Code lang={json}>
    {`
{
   "code": "FI",

}

`}
  </Code>
  <h3>Where do we create the definition?</h3>
  <p>
    Let's have a look at the structure of the definitions repository. At the root of the repository
    there is:
  </p>
  <ul>
    <li>
      <b>src</b> - contains a folder hierarchy with <b>*.py</b> files; the original sources for each
      definition.
    </li>
    <li>
      <b>DataProducts</b>- contains the OpenAPI spec version of each definition in <b>*.json</b> files
      in an identical folder structure. These files are automatically generated by the pre-commit hooks
      before you commit.
    </li>
  </ul>
  <p>
    We'll use the <em>src/Company/BasicInfo_v1.0.py</em> as a base for our own definition. For the
    purpose of this guide we will store the new definition in
    <em>src/test/ioxio-dataspace-guides/Country/BasicInfo.py.</em>
  </p>
  <p>
    <b>Note:</b> The <b><i>test</i></b> subfolder is reserved for experimenting with definitions.
    Each user is expected to create a subfolder inside it, with the same name as their
    <b>GitHub username</b>
    and then create any desired hierarchy of definitions under that. So this guide assumes we'd have
    a user account called <b>ioxio-dataspace-guides</b> and thus store the definition in
    <b>test/ioxio-dataspace-guides</b>.
  </p>
  <h3>Initial setup of the definition file</h3>
  <p>To get a quick start we will copy most of the content from the BasicInfo for companies.</p>
  <p>
    Let's start by creating this simple initial version of the definition in <em
      >src/test/ioxio-dataspace-guides/Country/BasicInfo.py</em
    >:
  </p>
  <Code lang={python}>
    {`
from definition_tooling.converter import CamelCaseModel, DataProductDefinition
from pydantic import Field


class BasicCountryInfoRequest(CamelCaseModel):
    ...


class BasicCountryInfoResponse(CamelCaseModel):
    ...


DEFINITION = DataProductDefinition(
    version="0.0.1",
    title="Information about a country",
    description="Information about a country, such as name, capital, languages, area etc.",
    request=BasicCountryInfoRequest,
    response=BasicCountryInfoResponse,
)

`}
  </Code>
  <p>
    This acts as a great template for any new definition you want to make. Let's go through the
    details of this a bit.
  </p>
  <p>
    Lines 1-2 declare some imports. If you're unfamiliar with python, you don't really need to pay
    attention to these as long as you keep them there.
  </p>
  In the<em>BasicCountryInfoRequest</em> we'll define the input for the data source, and in the
  <em>BasicCountryInfoResponse</em>
  we'll define the output of the data source.

  <p>
    In the last section, we define the <b><i>DEFINITION</i></b>. The converter expects to find a
    variable with this name, that is an instance of the DataProductDefinition. In it we define a
    version number (for definitions in the <em>test/UserName/</em> space it needs to be of the form
    <em>0.0.x</em>), a title and description. We also specify that the
    <em>BasicCountryInfoRequest</em> class is the one defining the request (input) and BasicCountryInfoResponse
    the response (output).
  </p>
  <h3>Defining the request</h3>
  <p>At the simplest, we could define the request just like this:</p>
  <Code lang={python}>
    {`
class BasicCountryInfoRequest(CamelCaseModel):
    code: str

`}
  </Code>
  <p>
    We define that there's one attribute/field, called code that is a string (str). The definition
    is done using python's type annotations.
  </p>
  <p>
    However, this doesn't give any extra info about the parameter for anyone and doesn't impose any
    kind of validation on the length of it etc.
  </p>
  <p>
    Pydantic has a class called <em>Field</em>, that can be used to define limits, default values
    etc. It can be used like this:
  </p>
  <Code lang={python}>
    {`
class BasicCountryInfoRequest(CamelCaseModel):
    code: str = Field(...)

`}
  </Code>
  <p>
    The first argument to <b><i>Field()</i></b> is the default value of the field, which defaults to
    <b><i>None</i></b>
    in python (null in JSON). We don't want that, so we've set it to the special value ... (ellipsis),
    which tells pydantic that the field is
    <a href="https://docs.pydantic.dev/1.10/usage/models/#required-fields" target="_blank"
      >required</a
    >.
  </p>
  <p>The end result of the two above examples are identical.</p>
  <p>
    Let's now add a title, description and an example and min/max length to ensure it's a two letter
    code we get. This is done by simply adding some more keyword arguments to the <b
      ><i>Field()</i></b
    >, like this:
  </p>
  <Code lang={python}>
    {`
class BasicCountryInfoRequest(CamelCaseModel):
    code: str = Field(
        ...,
        title="Code",
        description="ISO 3166-1 alpha-2 code for the country",
        example="FI",
    )
`}
  </Code>
  <p>If we'd want, we could even add a regular expressions to check it's an uppercase string.</p>
  <p>
    For more details on these parameters refer to the <a
      href="https://docs.pydantic.dev/1.10/usage/schema/#field-customization"
      target="_blank">Field customization</a
    > section of the documentation for pydantic.
  </p>
  <h3>Defining the simple fields of the response</h3>
  <p>
    Similarly to how we defined the fields in the request we'll define the simple fields in the
    response.
  </p>
  <p>
    The definition for the <b><i>code</i></b> we can copy as-is from the request. The
    <b><i>name</i></b>
    we can define rather similarly; we don't need to set any minimum and maximum lengths for it. The
    <b><i>area</i></b> is also straight forward to define; we just need to specify it as a float.
  </p>
  <Code lang={python}>
    {`
class BasicCountryInfoResponse(CamelCaseModel):
    code: str = Field(
        ...,
        title="Code",
        description="ISO 3166-1 alpha-2 code for the country",
        example="FI",
        min_length=2,
        max_length=2,
    )
    name: str = Field(
        ...,
        title="Name",
        description="The name of the country",
        example="Finland",
    )
    area: float = Field(
        ...,
        title="Area",
        description="The area of the country in km^2",
        example=338455,
    )
`}
  </Code>
  <h3>Defining the languages field in the response</h3>
  <p>
    We wanted the official languages to be a list of strings. We'll need to import List for the type
    annotations, like this (at the top of the file):
  </p>
  <Code lang={python}>
    {`
    from typing import List

`}
  </Code>
  <p>
    Then we can define languages field using the type annotation languages: <b><i>List[str]</i></b>
    and again use the <b><i>Field()</i></b> to add a title, example etc.:
  </p>
  <Code lang={python}>
    {`
class BasicCountryInfoResponse(CamelCaseModel):
    ...
    languages: List[str] = Field(
        ...,
        title="Official languages",
        description="ISO 639-1 language codes for the official languages",
        example=["fi", "sv"],
        min_length=2,
        max_length=2,
    )
`}
  </Code>
  <p>
    However, like this there would be no restriction on the length of the strings in the list. We
    can fix that by using a <a
      href="https://docs.pydantic.dev/1.10/usage/types/#constrained-types"
      target="_blank">constrained type</a
    >, in this case the <b><i>constr</i></b>. We need to import it like this (at the top of the
    file):
  </p>
  <Code lang={python}>
    {`
from pydantic import constr

`}
  </Code>
  <p>
    Then we replace the <b><i>str</i></b> with <b><i>constr(min_length=2, max_length=2)</i></b>,
    like this:
  </p>
  <Code lang={python}>
    {`
class BasicCountryInfoResponse(CamelCaseModel):
    ...
    languages: List[constr(min_length=2, max_length=2)] = Field(
        ...,
        title="Official languages",
        description="ISO 639-1 language codes for the official languages",
        example=["fi", "sv"],
    )
`}
  </Code>
  <h3>Defining the capital in the response</h3>
  <p>We wanted the capital to contain a sub object in the JSON response, something like this:</p>
  <Code lang={python}>
    {`
    {
    "code": "FI",
    "name": "Finland",
    "capital": {
        "name": "Helsinki",
        "lat": 60.170833,
        "lon": 24.9375,
    },
    "languages": ["fi", "sv"],
    "area": 338455
}
`}
  </Code>
  <p>
    To do this, we'll use <a
      href="https://docs.pydantic.dev/1.10/usage/models/#recursive-models"
      target="_blank">Recursive Models</a
    > in pydantic.
  </p>
  <p>
    Let's start by defining this sub structure for the capital as a new <b><i>Capital class</i></b>.
    It looks like this, when we've filled in all titles, examples and limits:
  </p>
  <Code lang={python}>
    {`
   class Capital(CamelCaseModel):
    name: str = Field(
        ...,
        title="Name",
        description="The name of the capital of the Country",
        example="Helsinki",
    )
    lat: float = Field(
        ...,
        title="Latitude",
        description="The latitude coordinate of the Capital",
        ge=-90.0,
        le=90.0,
        example=60.170833,
    )
    lon: float = Field(
        ...,
        title="Longitude",
        description="The longitude coordinate of the Capital",
        ge=-180.0,
        le=180.0,
        example=24.9375,
    )
`}
  </Code>
  <p>
    The field definitions should be fairly similar to the earlier examples. We'll need to define
    this somewhere before our response class <em>(BasicCountryInfoResponse)</em> as we want to reference
    it inside it.
  </p>
  <p>
    We add the <b><i>capital</i></b> to the <b><i>BasicCountryInfoResponse</i></b>, but this time we
    annotate it as a <b><i>Capital</i></b>, rather than a <b><i>stc</i></b>, <b><i>float</i></b> or
    <b><i>List</i></b>, like this (see the last line):
  </p>
  <Code lang={python}>
    {`
   class BasicCountryInfoResponse(CamelCaseModel):
    code: str = Field(...)
    name: str = Field(...)
    area: float = Field(...)
    languages: List[str] = Field(...)
    capital: Capital
`}
  </Code>
  <p>
    However, right now, the capital would be a mandatory field in the response. But we wanted to
    also support countries that don't have a capital, like Nauru. Thus we need to modify this
    slightly. We'll need to import <b><i>Optional</i></b> from <b><i>typing</i></b>, so at the top
    we'll import both <b><i>List</i></b> and <b><i>Optional</i></b> from <b><i>typing</i></b>, like
    this:
  </p>
  <Code lang={python}>
    {`
     from typing import List, Optional

`}
  </Code>
  <p>Now we can change the type annotation to be <em>Optional[Capital]</em> like this:</p>
  <Code lang={python}>
    {`
class BasicCountryInfoResponse(CamelCaseModel):
    code: str = Field(...)
    name: str = Field(...)
    area: float = Field(...)
    languages: List[str] = Field(...)
    capital: Optional[Capital]
`}
  </Code>
  <p>This allows the JSON response to have the capital set to null.</p>
  <p>
    Further we want to add some more information about the capital, so we add a <b><i>Field()</i></b
    >. Note that this time, we set the default value to <b><i>None</i></b> (Python's variant of
    <b><i>null</i></b>) to mark it as optional, so it thus becomes:
  </p>
  <Code lang={python}>
    {`
class BasicCountryInfoResponse(CamelCaseModel):
    code: str = Field(...)
    name: str = Field(...)
    area: float = Field(...)
    languages: List[str] = Field(...)
    capital: Optional[Capital] = Field(
        None,
        title="Capital",
        description="The capital of the country, legislative if multiple",
    )
`}
  </Code>
  <h3>The final definition</h3>
  <p>
    If you've followed along the guide so far, the <em>Country/BasicInfo.py</em> file should now look
    like this in it's entirety:
  </p>
  <Code lang={python}>
    {`
from typing import List, Optional

from definition_tooling.converter import CamelCaseModel, DataProductDefinition
from pydantic import Field, constr


class BasicCountryInfoRequest(CamelCaseModel):
    code: str = Field(
        ...,
        title="Code",
        description="ISO 3166-1 alpha-2 code for the country",
        example="FI",
        min_length=2,
        max_length=2,
    )


class Capital(CamelCaseModel):
    name: str = Field(
        ...,
        title="Name",
        description="The name of the capital of the Country",
        example="Helsinki",
    )
    lat: float = Field(
        ...,
        title="Latitude",
        description="The latitude coordinate of the Capital",
        ge=-90.0,
        le=90.0,
        example=60.170833,
    )
    lon: float = Field(
        ...,
        title="Longitude",
        description="The longitude coordinate of the Capital",
        ge=-180.0,
        le=180.0,
        example=24.9375,
    )


class BasicCountryInfoResponse(CamelCaseModel):
    code: str = Field(
        ...,
        title="Code",
        description="ISO 3166-1 alpha-2 code for the country",
        example="FI",
        min_length=2,
        max_length=2,
    )
    name: str = Field(
        ...,
        title="Name",
        description="The name of the country",
        example="Finland",
    )
    area: float = Field(
        ...,
        title="Area",
        description="The area of the country in km^2",
        example=338455,
    )
    languages: List[constr(min_length=2, max_length=2)] = Field(
        ...,
        title="Official languages",
        description="ISO 639-1 language codes for the official languages",
        example=["fi", "sv"],
    )
    capital: Optional[Capital] = Field(
        None,
        title="Capital",
        description="The capital of the country, legislative if multiple",
    )


DEFINITION = DataProductDefinition(
    version="0.0.1",
    title="Information about a country",
    description="Information about a country, such as name, capital, languages, area etc.",
    request=BasicCountryInfoRequest,
    response=BasicCountryInfoResponse,
)

`}
  </Code>
</TableOfContents>

<style lang="scss">
  img {
    max-width: 32rem;
  }
</style>
