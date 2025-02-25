export function isInternalLink(url: string, currentOrigin: string): boolean {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const linkOrigin = new URL(url).origin
    return linkOrigin === currentOrigin
  } else {
    return true
  }
}
