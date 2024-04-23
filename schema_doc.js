function flashElement(t) {
  let myElement
  ;(myElement = document.getElementById(t)),
    myElement.classList.add("jsfh-animated-property"),
    setTimeout(function () {
      myElement.classList.remove("jsfh-animated-property")
    }, 1e3)
}

function setAnchor(t) {
  history.pushState({}, "", t)
}

function anchorOnLoad() {
  let t = window.location.hash.split("?")[0].split("&")[0]
  "#" === t[0] && (t = t.substr(1)), t.length > 0 && anchorLink(t)
}

function anchorLink(t) {
  // Intentionally empty
}
