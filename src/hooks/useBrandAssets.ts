import { BRAND } from '../data/content'
import { useSurface, useTheme } from './useTheme'

const SOLUTIONS_DIR = '/assets/solutions/'

/**
 * Logo variants that stay legible on the background behind them. The hero always
 * follows the chosen theme; everything else follows the scroll-driven page surface.
 */
export function useBrandAssets(scope: 'page' | 'hero' = 'page') {
  const theme = useTheme()
  const surface = useSurface()
  const light = (scope === 'hero' ? theme : surface) === 'light'
  return {
    wordmark: light ? BRAND.wordmark : BRAND.wordmarkDark,
    symbol: light ? BRAND.symbol : BRAND.symbolDark,
    /** Dark-mode solution logos mirror the light set by filename under /assets/solutions/dark/. */
    solutionLogo: (path: string) =>
      light || !path.startsWith(SOLUTIONS_DIR) ? path : path.replace(SOLUTIONS_DIR, `${SOLUTIONS_DIR}dark/`),
  }
}
