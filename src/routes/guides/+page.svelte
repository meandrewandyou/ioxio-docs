<script lang="ts">
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import VideoGuideIcon from "$lib/images/video-guide-icon.svg?dataurl"
  import ArrowIcon from "$lib/images/link-arrow-icon.svg"
  import Grid from "$lib/components/Grid.svelte"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"
  import MailIcon from "$lib/images/mail-icon.svg"
  import SlackIcon from "$lib/images/slack-icon.svg"
  import Button from "$lib/components/Button.svelte"
  import { GUIDES } from "./urls"
  import type { PageData } from "./$types"

  const SLACK_URL = "https://slack.ioxio.com"
  const EMAIL_URL = "mailto:support@ioxio.com"

  const cards = Object.values(GUIDES)

  const secondaryCards = [
    {
      title: "Defining Data Products",
      href: "https://www.youtube.com/watch?v=yPzN04ICsbw",
      cardImageAlt: "QR code",
      target: "_blank",
      cardImage: VideoGuideIcon,
    },
    {
      title: "Productizing Data",
      href: "https://www.youtube.com/watch?v=f-f6P_-8zoQ",
      cardImageAlt: "QR code",
      target: "_blank",
      cardImage: VideoGuideIcon,
    },
  ]

  export let data: PageData
</script>

<div class="wrapper">
  <TableOfContents>
    <Title title={`IOXIO Dataspace™ guides`} />

    <Breadcrumbs path={data.path} />

    <SectionTitle
      title="Step-by-step instructions on how to use the IOXIO Dataspace to share data"
    />

    <div class="card-section">
      <Grid container>
        {#each cards as card}
          <Grid lg={4} sm={12} md={6}>
            <div class="card">
              <div class="card-left">
                <h2>{card.title}</h2>
                <a class="link" href={card.href}>Read more <ArrowIcon /></a>
              </div>
              <div class="card-right">
                <img class="card-icon" src={card.cardImage} alt={card.cardImageAlt} />
              </div>
            </div>
          </Grid>
        {/each}
      </Grid>
      <Grid container>
        <Grid lg={12} sm={12} md={12}>
          <SectionTitle title="Video guides" />
        </Grid>
        {#each secondaryCards as card}
          <Grid lg={4} sm={12} md={6}>
            <div class="card">
              <div class="card-left">
                <h2>{card.title}</h2>
                <a class="link" href={card.href} target={card.target}>Watch <ArrowIcon /></a>
              </div>
              <div class="card-right">
                <img class="card-icon" src={card.cardImage} alt={card.cardImageAlt} />
              </div>
            </div>
          </Grid>
        {/each}
      </Grid>
      <SectionTitle title="Contact us" />
      <p>
        If you can't find a solution to your problem here, we would love it if you contacted us so
        we can get you and other all the help you require!
      </p>
      <div class="contact-us-buttons">
        <Button icon={SlackIcon} url={SLACK_URL}>Slack</Button>
        <Button icon={MailIcon} monochromeIcon url={EMAIL_URL}>Email</Button>
      </div>
    </div>
  </TableOfContents>
</div>

<style lang="scss">
  @import "$styles/setup";

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: $spacing-03;

    @include tablet-and-below() {
      padding-top: $spacing-03;
    }
    .contact-us-buttons {
      display: flex;
      gap: $spacing-02;
    }
    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include mobile() {
        flex-direction: column;
        gap: $spacing-03;
      }

      .content {
        .text {
          font-size: $h1-font-size;
          font-weight: 600;
          line-height: 150%;
          margin-bottom: 1rem;
        }

        .subtext {
          font-size: $text-body-font-size;
          line-height: 150%;
          font-weight: 400;
        }
      }

      .hero-image {
        max-width: 42rem;
        margin: 0 0 0 auto;
        overflow: hidden;

        @include tablet() {
          max-width: 14rem;
        }
      }
    }

    .card-section {
      .card {
        padding: $spacing-02;
        display: flex;
        flex-direction: row;
        background: #192935;
        justify-content: space-between;
        border-radius: 10px;
        gap: $spacing-01;
        position: relative;
        isolation: isolate;
        min-height: 10rem;

        .card-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 70%;

          h2 {
            margin: 0;
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 150%;
            z-index: 99;
          }

          .link {
            display: flex;
            flex-direction: row;
            color: $color-success-main;
            font-weight: 600;
            line-height: 150%;
            text-decoration: none;
            align-items: center;
            gap: $spacing-01;
            z-index: 99;
            white-space: nowrap;
          }
        }

        .card-right {
          width: 30%;
          flex-shrink: 0;

          .card-icon {
            margin: 0;
            padding: 0;
            width: 6.125rem;
            height: 6.125rem;
          }
        }
      }
    }
  }
</style>
