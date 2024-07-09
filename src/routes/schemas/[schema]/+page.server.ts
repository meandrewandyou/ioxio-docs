import { schemas } from "$lib/components/schemas"

export const prerender = true

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  return schemas.map((item) => {
    return { schema: item.route }
  })
}

/** @type {import('./$types').PageServerLoad} */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({ fetch, params, url, route }) {
  const src = `/assets/${params.schema}.html`
  const result = await fetch(src)

  return {
    htmlText: await result.text(),
    path: url.pathname,
    route: route.id,
  }
}
