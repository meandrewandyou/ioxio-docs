import { schemas } from "$lib/components/schemas"
import { GUIDES } from "../../routes/guides/urls"

export type NavItem = {
  name: string
  route: string
  icon?: string
  children?: NavItem[]
}

export const navigation: NavItem[] = [
  {
    name: "Home",
    icon: "home-icon",
    route: "",
  },
  {
    name: "IOXIO Tags™",
    icon: "qr-code-icon",
    route: "tags",
    children: [
      { name: "Metadata", route: "metadata" },
      { name: "Signing", route: "signatures" },
    ],
  },
  {
    name: "Guides",
    icon: "guides-icon",
    route: "guides",
    children: Object.values(GUIDES).map((g) => ({
      name: g.title,
      route: g.href.split("/").pop()!,
    })),
  },

  {
    name: "Schemas",
    icon: "schemas-icon",
    route: "schemas",
    children: schemas.map((sch) => ({
      name: sch.name,
      route: sch.route,
    })),
  },
]
