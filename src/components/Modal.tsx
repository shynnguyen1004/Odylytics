import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { CloseIcon } from './Icons'

type Props = {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
}

/** Native `<dialog>` modal: the browser handles inert background and Escape; we add scroll-lock and focus return. */
export function Modal({ open, onClose, labelledBy, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    dialog.showModal()

    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      previouslyFocused?.focus()
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal__panel">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
          <CloseIcon />
        </button>
        {children}
      </div>
    </dialog>
  )
}
