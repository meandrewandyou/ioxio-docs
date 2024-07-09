import { onMount } from "svelte"
import { derived, writable } from "svelte/store"

// these should match the values in src/styles/_variables.scss
export const breakpoints = Object.freeze({
  sm: 0,
  md: 576,
  lg: 992,
})

export function breakpointObserver() {
  const store = writable(undefined)

  onMount(() => {
    const match = {
      sm: window.matchMedia(`(max-width: ${breakpoints.md}px)`),
      md: window.matchMedia(
        `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg}px)`
      ),
      lg: window.matchMedia(`(min-width: ${breakpoints.lg}px)`),
    }
    const matchers = Object.entries(match)
    const sizeByMedia = Object.fromEntries(
      matchers.map(([size, queryList]) => [queryList.media, size])
    )

    // @ts-ignore
    const size = matchers.find(([size, queryList]) => queryList.matches)[0]
    // @ts-ignore
    store.set(size)

    // @ts-ignore
    function handleChange({ matches, media }) {
      const size = sizeByMedia[media]
      // @ts-ignore
      if (matches) store.set(size)
    }

    matchers.forEach(([size, queryList]) => queryList.addEventListener("change", handleChange))

    return () => {
      matchers.forEach(([size, queryList]) => queryList.removeEventListener("change", handleChange))
    }
  })

  return {
    subscribe: store.subscribe,

    smallerThan: (size: string) => {
      checkSizeValid(size)
      // @ts-ignore
      return derived(store, ($size) => breakpoints[$size] < breakpoints[size])
    },
    largerThan: (size: string) => {
      checkSizeValid(size)
      // @ts-ignore
      return derived(store, ($size) => breakpoints[$size] > breakpoints[size])
    },
  }
}

function checkSizeValid(size: string) {
  // @ts-ignore
  if (!(size in breakpoints)) throw new Error(`"${size}" is not a valid breakpoint size.`)
}

export default breakpointObserver
