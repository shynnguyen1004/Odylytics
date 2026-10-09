import { BRAND } from '../data/content'
import { useTheme } from './useTheme'

const SOLUTIONS_DIR = '/assets/solutions/'

/** Logo variants that stay legible on the current theme background. */
export function useBrandAssets() {
  const light = useTheme() === 'light'
  return {
    wordmark: light ? BRAND.wordmark : BRAND.wordmarkDark,
    symbol: light ? BRAND.symbol : BRAND.symbolDark,
    /** Dark-mode solution logos mirror the light set by filename under /assets/solutions/dark/. */
    solutionLogo: (path: string) =>
      light || !path.startsWith(SOLUTIONS_DIR) ? path : path.replace(SOLUTIONS_DIR, `${SOLUTIONS_DIR}dark/`),
  }
}
