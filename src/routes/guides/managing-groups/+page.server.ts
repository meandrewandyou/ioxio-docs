/** @type {import('./$types').PageServerLoad} */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import IMAGES from "../images.json"

export async function load({ url, route }) {
  return {
    path: url.pathname,
    route: route.id,
    images: IMAGES.MANAGE_GROUP,
  }
}
