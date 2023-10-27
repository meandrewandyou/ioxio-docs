import { JSDOM } from "jsdom"
import { writeFileSync } from "fs"

const baseURL = "https://well-known-docs.sandbox.ioxio-dataspace.com"
const files = [
  "consent-configuration.html",
  "consent-request-token.html",
  "consent-token.html",
  "dataspace-configuration.html",
  "party-configuration.html",
]

async function loadFile(filename) {
  const sourceUrl = `${baseURL}/${filename}`
  const result = await fetch(sourceUrl)
  return await result.text()
}

async function processFile(srcHtml, dstPath) {
  const dom = new JSDOM(srcHtml)
  const body = dom.window.document.body

  // Unnecessary elements
  body.querySelector(".breadcrumbs").remove()
  body.querySelector("footer").remove()

  // Downgrade h1 -> h2
  const h1 = body.querySelector("h1")
  const h2 = dom.window.document.createElement("h2")
  h2.innerHTML = h1.innerHTML
  h1.replaceWith(h2)

  // A few minor corrections
  const links = body.querySelectorAll("a")
  for (let link of links) {
    const href = link.href
    if (href.startsWith("http:") || href.startsWith("https://")) {
      // External links should have target=_blank rel=noreferrer
      link.target = "_blank"
      link.rel = "noreferrer"
      console.log(`Set to open in new tab: ${href}`)
    } else if (href.endsWith(".html")) {
      // Local relative .html link is pointing to schema documentation
      // It should so point to `/schema/{schema}`, which matches the filename without .html extension
      const schema = href.replace(/\.html$/, "")
      const target = `/schemas/${schema}/`
      link.href = target
      console.log(`Rewriting ${href} -> ${target}`)
    }
  }

  writeFileSync(dstPath, body.innerHTML, { encoding: "utf-8", flag: "w" })
}

async function run() {
  for (let filename of files) {
    const dstPath = `static/assets/${filename}`
    const srcHtml = await loadFile(filename)
    await processFile(srcHtml, dstPath)
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
run().then(() => {})
