import { schemas } from "$lib/components/schemas"

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
    name: "Dataspace",
    icon: "dataspace-icon",
    route: "dataspace",
    children: [{ name: "Guides", route: "guides" }],
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
