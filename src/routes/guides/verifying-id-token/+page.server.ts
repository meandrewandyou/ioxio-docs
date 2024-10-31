/** @type {import('./$types').PageServerLoad} */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GUIDES } from "../urls"
import IMAGES from "../images.json"

export async function load({ url, route }) {
  return {
    path: url.pathname,
    route: route.id,
    guide: GUIDES.VERIFY_ID_TOKEN,
    images: IMAGES.VERIFY_ID_TOKEN,
  }
}
