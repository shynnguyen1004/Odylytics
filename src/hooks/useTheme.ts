import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'odylytics-theme'
const THEME_COLOR: Record<Theme, string> = { dark: '#0B0A0E', light: '#FAFAFB' }
const listeners = new Set<() => void>()

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/** Below the hero the page always switches to the light surface once the hero is scrolled away. */
function getSurface(): Theme {
  return getTheme() === 'light' || document.documentElement.dataset.surface === 'light' ? 'light' : 'dark'
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notify() {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[getSurface()])
  listeners.forEach((listener) => listener())
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  notify()
}

export function setPastHero(past: boolean) {
  const root = document.documentElement
  if (past === (root.dataset.surface === 'light')) return
  if (past) root.dataset.surface = 'light'
  else delete root.dataset.surface
  notify()
}

/** The visitor's chosen theme (drives the hero and the toggle); applied initially by the inline script in index.html. */
export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, (): Theme => 'dark')
}

/** The theme actually painted on the page outside the hero (light once the hero is scrolled past). */
export function useSurface() {
  return useSyncExternalStore(subscribe, getSurface, (): Theme => 'dark')
}
