<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
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
    Being the owner of a group lets you manage other members (invite, remove, change the role).
    There are two different roles in a group:
  </p>
  <ul>
    <li><b>Member</b>: Can add/remove/edit applications and data sources.</li>
    <li>
      <b>Owner</b>: Can add/remove members and other owners and manage theirs roles, as well as do
      anything a member can. Owners are the only ones able to edit the GDPR contact or party
      configuration domain.
    </li>
  </ul>
  <SectionTitle title="To send the invite:" />
  <ol>
    <li>
      Navigate to the <b>My groups</b> page via sidebar.
      <GuideImage img={images.MY_GROUPS_LINK} />
    </li>
    <li>
      Click the <b>View</b> button against the group you’re owner of.
      <GuideImage img={images.VIEW_MY_GROUP} />
    </li>
    <li>
      At the bottom of the page you’ll see a list of current members of the group as well as the
      Invite and Leave buttons (if the Leave button is disabled – it’s because you can’t leave a
      group you’re the sole owner of). Click <b>Invite</b>.
      <GuideImage img={images.MEMBERS_SECTION} />
    </li>
    <li>
      On the dialog window enter the email of the user you want to invite and select the desired
      role. Click <b>Invite</b>.
      <GuideImage img={images.INVITE_DIALOG} />
    </li>
    <li>
      User will be notified by email and you will see the pending invitation in the list.
      <GuideImage img={images.PENDING_INVITATION} />
    </li>
    <li>
      Invited user will get notification like this in the developer portal and decide if to join or
      not.
      <GuideImage img={images.NEW_INVITATION} />
    </li>
    <li>
      If user accepts – you will see him in the list. If not – pending invitation will disappear.
      <GuideImage img={images.INVITATION_ACCEPTED} />
    </li>
  </ol>
  <SectionTitle title="To edit member's role  :" />
  <ol>
    <li>Click the pencil icon against the user whose role you want to change.</li>
    <li>
      Select new role. Click <b>Save</b>.
      <GuideImage img={images.EDIT_ROLE} />
    </li>
    <li>
      Now John is also an owner.
      <GuideImage img={images.NEW_ROLE} />
    </li>
  </ol>
</TableOfContents>
