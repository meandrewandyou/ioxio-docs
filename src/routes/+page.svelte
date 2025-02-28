<script xmlns="http://www.w3.org/1999/html">
  import A from "$lib/components/A.svelte"
  import FrontpageHeroImage from "$lib/images/frontpage-hero-image.svg?dataurl"
  import DataSchemasIcon from "$lib/images/card-schemas-icon.svg?dataurl"
  import DataspaceIcon from "$lib/images/dataspace-card-icon.svg?dataurl"
  import QRCodeIcon from "$lib/images/card-qr-code-icon.svg?dataurl"
  import ArrowIcon from "$lib/images/link-arrow-icon.svg"
  import Grid from "$lib/components/Grid.svelte"

  const cards = [
    {
      title: "IOXIO Dataspace™ overview",
      href: "/dataspace/",
      cardImageAlt: "Data schemas",
      img: DataspaceIcon,
    },
    {
      title: "IOXIO Tags™",
      href: "/tags/",
      cardImageAlt: "QR code",
      img: QRCodeIcon,
    },
    {
      title: "Schemas for data objects",
      href: "/schemas/",
      cardImageAlt: "Data schemas",
      img: DataSchemasIcon,
    },
  ]
</script>

<div class="wrapper">
  <div class="top-section">
    <div class="content">
      <h1 class="text">Welcome to IOXIO® Documentation portal</h1>
      <div class="subtext">
        <p>Documentation for various IOXIO® technologies.</p>
        <p>
          Visit <A href="https://ioxio.com">ioxio.com</A> to learn more about IOXIO®
        </p>
      </div>
    </div>
    <img class="hero-image" src={FrontpageHeroImage} alt="Frontpage hero" />
  </div>
  <div class="bottom-section">
    <Grid container>
      {#each cards as card}
        <Grid lg={4} sm={12} md={6}>
          <div class="card">
            <div class="card-left">
              <h2>{card.title}</h2>
              <A className="link" href={card.href}>Read more <ArrowIcon /></A>
            </div>
            <div class="card-right">
              <img class="card-icon" src={card.img} alt={card.cardImageAlt} />
            </div>
          </div>
        </Grid>
      {/each}
    </Grid>
  </div>
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

    .bottom-section {
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

          h2 {
            margin: 0;
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 150%;
            z-index: 99;
          }

          :global(.link) {
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
          width: 5rem;
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
