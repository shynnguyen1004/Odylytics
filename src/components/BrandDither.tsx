import { useEffect, useState } from 'react'
import { BRAND } from '../data/content'
import { useTheme } from '../hooks/useTheme'
import DitherVeil from './DitherVeil'

const SIZE = 1024
const INSET = 0.16 // breathing room around the symbol

/**
 * The Odylytics symbol run through ReactBits' DitherVeil. The SVG is composited
 * onto a solid theme-coloured backdrop first: the shader reads transparent
 * pixels as black, which would invert the effect on the light theme.
 */
export function BrandDither() {
  const theme = useTheme()
  const dark = theme === 'dark'
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const image = new Image()
    image.src = dark ? BRAND.symbolDark : BRAND.symbol
    image.onload = () => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = SIZE
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = dark ? '#0B0A0E' : '#FAFAFB'
      ctx.fillRect(0, 0, SIZE, SIZE)
      const inset = SIZE * INSET
      // Centre the symbol inside the inset box, preserving its aspect ratio.
      const box = SIZE - inset * 2
      const scale = Math.min(box / image.naturalWidth, box / image.naturalHeight)
      const w = image.naturalWidth * scale
      const h = image.naturalHeight * scale
      ctx.drawImage(image, (SIZE - w) / 2, (SIZE - h) / 2, w, h)
      setSrc(canvas.toDataURL('image/png'))
    }
    return () => {
      cancelled = true
    }
  }, [dark])

  if (!src) return <div className="hero__veil" aria-hidden="true" />

  return (
    <div className="hero__veil" aria-hidden="true">
      <DitherVeil
        key={src}
        src={src}
        fit="contain"
        pattern="floyd"
        pixelSize={2.5}
        levels={2}
        palette="duotone"
        // Ink paints the image's dark pixels and paper its light ones: the white symbol
        // on the dark backdrop vs the black symbol on the light backdrop swap roles.
        inkColor={dark ? '#0B0A0E' : '#4C0072'}
        paperColor={dark ? '#ECDEFF' : '#FAFAFB'}
        rimColor={dark ? '#FF8C00' : '#944F00'}
        rim={0.1}
        revealRadius={190}
        softness={0.6}
        linger={1}
        wander
        clickBurst
      />
    </div>
  )
}
