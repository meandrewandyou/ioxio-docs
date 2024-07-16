<script>
  import SectionTitle from "$lib/components/SectionTitle.svelte"
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
  import Title from "$lib/components/Title.svelte"
  import Miro from "$lib/components/Miro.svelte"
  import TableOfContents from "$lib/components/TableOfContents.svelte"
  import Grid from "$lib/components/Grid.svelte"
  import QRCodeIcon from "$lib/images/card-qr-code-icon.svg?dataurl"
  import ArrowIcon from "$lib/images/link-arrow-icon.svg"

  /** @type {import('./$types').PageData} */
  export let data
  const cards = [
    {
      title: "Guides",
      href: "guides/",
      alt: "QR code",
      img: QRCodeIcon,
    },
  ]
</script>

<TableOfContents>
  <Title title={`IOXIO Dataspace®`} />

  <Breadcrumbs path={data.path} />

  <SectionTitle title="Get your data moving!" />
  <p>
    In here you will be able to find all the necessary information to be able to use IOXIO
    Dataspaces. If you can’t find some particular answers, please don’t hesitate to join our
    community slack, or send as an email to ask!
  </p>
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
              <img class="card-icon" src={card.img} alt={card.alt} />
            </div>
          </div>
        </Grid>
      {/each}
    </Grid>
  </div></TableOfContents
>

<style lang="scss">
  @import "$styles/setup";

  img {
    max-width: 32rem;
  }

  img.small {
    max-width: 24rem;
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
</style>
