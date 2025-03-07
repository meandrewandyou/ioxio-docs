export function isInternalLink(url: string): boolean {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return false
  } else {
    return true
  }
}
