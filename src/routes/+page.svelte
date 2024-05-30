<script xmlns="http://www.w3.org/1999/html">
  import A from "$lib/A.svelte"
  import FrontpageHeroImage from "$lib/images/frontpage-hero-image.svg?dataurl"
  import DataSchemasIcon from "$lib/images/card-schemas-icon.svg?dataurl"
  import QRCodeIcon from "$lib/images/card-qr-code-icon.svg?dataurl"
  import ArrowIcon from "$lib/images/link-arrow-icon.svg"
  import Grid from "$lib/components/Grid.svelte"

  const cards = [
    {
      title: "IOXIO Tags™",
      href: "/tags/",
      alt: "QR code",
      img: QRCodeIcon,
    },
    {
      title: "Schemas for data objects",
      href: "/schemas/",
      alt: "Data schemas",
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
            <h2>{card.title}</h2>
            <img class="card-icon" src={card.img} alt={card.alt} />
            <a class="link" href={card.href}
              ><span>Read more </span>
              <ArrowIcon />
            </a>
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

        @include tablet() {
          max-width: 14rem;
        }
      }
    }

    .bottom-section {
      .card {
        padding: $spacing-02;
        display: flex;
        flex-direction: column;
        background: #192935;
        justify-content: space-between;
        border-radius: 10px;
        gap: $spacing-01;
        position: relative;
        height: 10rem;
        isolation: isolate;

        .link {
          display: flex;
          flex-direction: row;
          width: max-content;
          color: $color-success-main;
          font-weight: 600;
          line-height: 150%;
          text-decoration: none;
          align-items: center;
          gap: $spacing-01;
          z-index: 99;
        }

        h2 {
          font-size: $h2-font-size;
          font-weight: 600;
          line-height: 150%;
          z-index: 99;
        }

        .card-icon {
          position: absolute;
          width: 6.125rem;
          height: 6.125rem;
          right: $spacing-02;
          bottom: $spacing-02;
        }
      }
    }
  }
</style>
