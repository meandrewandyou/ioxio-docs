export function isInternalLink(url: string, curretOrigin: string): boolean {
  if (!url.startsWith("http")) {
    return true
  } else {
    const linkOrigin = new URL(url).origin
    if (linkOrigin === curretOrigin) {
      return true
    }
    return false
  }
}
