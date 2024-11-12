import IMAGES from "../images.json"
import { GUIDES } from "../urls"

export async function load({ url, route }) {
  return {
    path: url.pathname,
    route: route.id,
    guide: GUIDES.MANAGE_GROUP_MEMBERS,
    images: IMAGES.MANAGE_GROUP_MEMBERS,
  }
}
