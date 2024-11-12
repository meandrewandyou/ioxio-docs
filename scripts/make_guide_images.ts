import { GUIDES } from "../src/routes/guides/urls"
import CURRENT_IMAGES from "../src/routes/guides/images.json"

import * as fs from "fs"

// path -> name
const guidesMap: { [key: string]: string } = {}
Object.entries(GUIDES).forEach(([name, guide]) => {
  guidesMap[guide.href] = name
})

const imgMap: { [key: string]: string } = {}
Object.entries(CURRENT_IMAGES).forEach(([guideName, images]) => {
  Object.entries(images).forEach(([imgName, image]) => {
    imgMap[image.src] = imgName
  })
})

const GUIDES_IMG_DIR = "static/guides"

const dirs = fs.readdirSync(GUIDES_IMG_DIR)
const newImages = JSON.parse(JSON.stringify(CURRENT_IMAGES))
for (const dir of dirs) {
  const guideName = guidesMap[`/guides/${dir}`]
  if (!guideName) {
    throw Error(`No such guide in urls.ts: /guides/${dir}`)
  }

  newImages[guideName] = {}

  for (const img of fs.readdirSync(`${GUIDES_IMG_DIR}/${dir}`)) {
    const imgSrc = `/guides/${dir}/${img}`

    const imgName = imgMap[imgSrc]
    if (imgName) {
      newImages[guideName][imgName] = CURRENT_IMAGES[guideName][imgName]
    } else {
      const name = img.split(".")[0].toUpperCase()
      newImages[guideName][name] = {
        src: imgSrc,
        alt: "",
      }
    }
  }
}

fs.writeFileSync("src/routes/guides/images.json", JSON.stringify(newImages, null, 2) + "\n")
