export function isInternalLink(url: string, curretOrigin: string): boolean {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const linkOrigin = new URL(url).origin
    if (linkOrigin === curretOrigin) {
      return true
    }
    return false
  } else {
    return true
  }
}
