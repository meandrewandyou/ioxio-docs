# IOXIO Docs

Documentation for various IOXIO projects. Hosted at https://docs.ioxio.dev

## Editing / developing

You will need

- Node 18.x or 20.x
- PNPM 8.x

```shell
pre-commit install
```

```shell
pnpm run dev
```

Make sure you test `build` as well, as not all things work in SvelteKit static generator.

```shell
pnpm run build
```

And you can test it e.g. with

```shell
cd build
python -m http.server
```

## Adding a new guide

To add a new guide, please follow these steps:

1. Create a page in [src/routes/guides](./src/routes/guides)
2. Add information about this route into [./src/routes/guides/urls.ts](./src/routes/guides/urls.ts)
3. If you need images, put them into `./static/guides/<guide_name>`, and after adding an image make
   sure to run:
   ```shell
    pnpm make-guide-images
   ```
   The command above will modify [images.json](./src/routes/guides/images.json). Make sure to use
   variables for images `src` attribute, not write it by hand. Also you need to enter `alt` values
   in the JSON file after it's updated.

### Writing guides

There are several points to take into consideration when writing guides.

1. Wrap entire guide content into `TableOfContents` component. Each `SectionTitle` will become a
   section in page's Table of Contents.
2. Refer to other guides via `GUIDES` object imported from
   [./src/routes/guides/urls.ts](./src/routes/guides/urls.ts). It prevents from accidental typos and
   synchronizes namings.
3. Use `GuideImage` component for images in a guide. After importing
   [images.json](./src/routes/guides/images.json) you can find all the images associated with your
   guide, it prevents from typos and wrong URLs.
