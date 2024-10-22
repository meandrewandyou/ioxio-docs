/** @type {import('./$types').PageServerLoad} */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({ url, route }) {
  return {
    path: url.pathname,
    route: route.id,
  }
}
