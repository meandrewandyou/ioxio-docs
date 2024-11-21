/** @type {import('./$types').PageServerLoad} */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import IMAGES from "../images.json"
import { GUIDES } from "../urls"

export async function load({ url, route }) {
  return {
    path: url.pathname,
    route: route.id,
    guide: GUIDES.BUILD_DATA_DEF,
    images: IMAGES.BUILD_DATA_DEF,
  }
}
