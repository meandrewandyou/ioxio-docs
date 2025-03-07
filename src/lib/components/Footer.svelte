<script>
  import Container from "$lib/components/Container.svelte"
  import Grid from "$lib/components/Grid.svelte"
  import Button from "$lib/components/Button.svelte"

  import IOXIOLogo from "$lib/images/ioxio-logo.svg?dataurl"
  import MailIcon from "$lib/images/mail-icon.svg"
  import SlackIcon from "$lib/images/slack-icon.svg"
  import ArrowIcon from "$lib/images/link-arrow-icon.svg"
  import GitHubLogo from "$lib/images/github-icon.svg?dataurl"
  import IconLink from "$lib/components/IconLink.svelte"
  import A from "./A.svelte"

  const SLACK_URL = "https://slack.ioxio.com"
  const EMAIL_URL = "mailto:support@ioxio.com"
</script>

<footer>
  <div class="top-section-wrapper">
    <Container>
      <Grid container class="footer-container">
        <Grid sm={0} lg={1} />
        <Grid sm={12} md={6}>
          <div class="try-out-section">
            <h3>Try out our technologies for free on</h3>
            <IconLink href="https://sandbox.ioxio-dataspace.com" icon={ArrowIcon}>
              IOXIO Dataspace™ Sandbox
            </IconLink>
          </div>
        </Grid>
        <Grid sm={0} lg={5} />
      </Grid>
    </Container>
  </div>

  <div class="bottom-section-wrapper">
    <Container>
      <Grid container>
        <Grid sm={0} lg={1} />
        <Grid sm={12} md={9} lg={8}>
          <div class="contact-us-wrapper">
            <h3>Contact us by using the available support options</h3>
            <div class="contact-us-buttons">
              <Button icon={SlackIcon} url={SLACK_URL}>Slack</Button>
              <Button icon={MailIcon} monochromeIcon url={EMAIL_URL}>Email</Button>
            </div>
          </div>
        </Grid>
        <Grid sm={12} md={3} lg={2} class="ioxio-logo-grid-item">
          <img class="ioxio-logo" src={IOXIOLogo} alt="IOXIO" />
        </Grid>
        <Grid sm={0} lg={1} />
      </Grid>
      <Grid container>
        <Grid sm={0} lg={1} />
        <Grid sm={12} lg={11}>
          <A className="github-link" href="https://github.com/ioxiocom/ioxio-docs">
            <img src={GitHubLogo} alt="GitHub repository" />
            <div>Contribute to these docs</div>
          </A>
        </Grid>
      </Grid>
      <Grid container>
        <Grid sm={0} lg={1} />
        <Grid sm={12} md={8} lg={6}>
          <div class="body-2">
            IOXIO® is a registered trademark of IOXIO Oy. IOXIO Dataspace™ and IOXIO Tags™ are
            trademarks of IOXIO Oy.
          </div>
        </Grid>
        <Grid sm={12} md={4}>
          <div class="copyright-text body-2">Copyright © IOXIO® 2024</div>
        </Grid>
        <Grid sm={0} lg={1} />
      </Grid>
    </Container>
  </div>
</footer>

<style lang="scss">
  @import "$styles/setup";

  footer {
    color: $color-secondary-light;
  }

  .top-section-wrapper {
    background: $gradient-gray-dark-blue;

    .try-out-section {
      padding: $spacing-03 0;
      display: flex;
      flex-direction: column;
      gap: $spacing-02;
    }
  }

  .bottom-section-wrapper {
    background-color: $color-primary-dark;
    padding: $spacing-03 0 $spacing-01 0;

    .contact-us-wrapper {
      display: flex;
      flex-direction: column;
      gap: $spacing-02;
      margin-bottom: $spacing-03;

      .contact-us-buttons {
        display: flex;
        gap: $spacing-02;
      }
    }

    .ioxio-logo {
      max-width: 8rem;
      margin: 0 0 0 auto;
      @include mobile() {
        margin: 0 auto 0 0;
      }
    }

    .copyright-text {
      text-align: right;

      @include mobile() {
        text-align: left;
      }
    }

    .body-2 {
      @include text-body-2();
    }
  }

  :global(footer .ioxio-logo-grid-item) {
    @include mobile() {
      order: -1;
    }
  }

  :global(.footer-container) {
    background-image: url("/footer-right-image.svg");
    background-position-x: right;
    background-repeat: no-repeat;

    @include mobile() {
      background-position-x: 10rem;
    }
  }

  .bottom-section-wrapper :global(.github-link) {
    display: flex;
    align-items: center;
    gap: $spacing-01;
    margin-bottom: $spacing-02;
    color: $color-neutral-light;
    text-decoration: none;
    font-size: 0.75rem;
    width: max-content;

    :global(img) {
      width: 1rem;
      height: 1rem;
    }
    &:hover {
      text-decoration: underline;
    }
  }
</style>
