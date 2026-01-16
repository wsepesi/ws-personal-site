'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface FootnoteTooltipsProps {
  children: React.ReactNode
  beforeFootnotes?: React.ReactNode
}

interface TooltipState {
  visible: boolean
  content: string
  x: number
  y: number
  arrowOffset: number // How much the arrow needs to shift from center (in px)
}

export function FootnoteTooltips({ children, beforeFootnotes }: FootnoteTooltipsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const portalTargetRef = useRef<HTMLDivElement | null>(null)
  const [portalReady, setPortalReady] = useState(false)
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    content: '',
    x: 0,
    y: 0,
    arrowOffset: 0,
  })
  const activeRefHref = useRef<string | null>(null)

  const getFootnoteContent = useCallback((href: string, footnotesSection: Element): string => {
    const id = href.replace('#', '')
    const li = footnotesSection.querySelector(`#${id}`)
    if (!li) return ''

    const clone = li.cloneNode(true) as HTMLElement
    clone.querySelector('[data-footnote-backref]')?.remove()
    return clone.textContent?.trim() || ''
  }, [])

  const showTooltip = useCallback((ref: HTMLAnchorElement, container: HTMLElement) => {
    const footnotesSection = container.querySelector('[data-footnotes]')
    if (!footnotesSection) return

    const href = ref.getAttribute('href')
    if (!href) return

    const content = getFootnoteContent(href, footnotesSection)
    const rect = ref.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    // Calculate initial centered position
    const centerX = rect.left - containerRect.left + rect.width / 2
    const containerWidth = containerRect.width

    // Tooltip is max-w-xs = 320px, so half-width is 160px
    const tooltipHalfWidth = 160
    const padding = 8 // Small padding from edges

    let finalX = centerX
    let arrowOffset = 0

    // Check left overflow
    if (centerX - tooltipHalfWidth < padding) {
      finalX = tooltipHalfWidth + padding
      arrowOffset = centerX - finalX // Will be negative (arrow shifts left)
    }
    // Check right overflow
    else if (centerX + tooltipHalfWidth > containerWidth - padding) {
      finalX = containerWidth - tooltipHalfWidth - padding
      arrowOffset = centerX - finalX // Will be positive (arrow shifts right)
    }

    activeRefHref.current = href
    setTooltip({
      visible: true,
      content,
      x: finalX,
      y: rect.top - containerRect.top,
      arrowOffset,
    })
  }, [getFootnoteContent])

  const hideTooltip = useCallback(() => {
    activeRefHref.current = null
    setTooltip(prev => ({ ...prev, visible: false }))
  }, [])

  // Insert portal target before footnotes section
  useEffect(() => {
    const container = containerRef.current
    if (!container || !beforeFootnotes) return

    const footnotesSection = container.querySelector('[data-footnotes]')
    if (!footnotesSection) {
      // No footnotes section - append at the end of the container
      const target = document.createElement('div')
      container.appendChild(target)
      portalTargetRef.current = target
      setPortalReady(true)
      return () => {
        target.remove()
        portalTargetRef.current = null
        setPortalReady(false)
      }
    }

    // Insert target div before footnotes
    const target = document.createElement('div')
    footnotesSection.parentNode?.insertBefore(target, footnotesSection)
    portalTargetRef.current = target
    setPortalReady(true)

    return () => {
      target.remove()
      portalTargetRef.current = null
      setPortalReady(false)
    }
  }, [beforeFootnotes, children])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const refs = container.querySelectorAll<HTMLAnchorElement>('[data-footnote-ref]')
    const footnotesSection = container.querySelector('[data-footnotes]')

    if (!footnotesSection || refs.length === 0) return

    const handleMouseEnter = (e: Event) => {
      showTooltip(e.currentTarget as HTMLAnchorElement, container)
    }

    const handleMouseLeave = () => {
      hideTooltip()
    }

    const handleFocus = (e: Event) => {
      showTooltip(e.currentTarget as HTMLAnchorElement, container)
    }

    const handleBlur = () => {
      hideTooltip()
    }

    const handleTouchStart = (e: Event) => {
      const ref = e.currentTarget as HTMLAnchorElement
      const href = ref.getAttribute('href')

      if (tooltip.visible && activeRefHref.current === href) {
        // Second tap - allow navigation
        return
      }

      // First tap - show tooltip, prevent navigation
      e.preventDefault()
      showTooltip(ref, container)
    }

    refs.forEach(ref => {
      ref.addEventListener('mouseenter', handleMouseEnter)
      ref.addEventListener('mouseleave', handleMouseLeave)
      ref.addEventListener('focus', handleFocus)
      ref.addEventListener('blur', handleBlur)
      ref.addEventListener('touchstart', handleTouchStart, { passive: false })
    })

    const handleDocumentTouch = (e: TouchEvent) => {
      const target = e.target as Node
      const isFootnoteRef = Array.from(refs).some(ref => ref.contains(target))
      if (!isFootnoteRef) {
        hideTooltip()
      }
    }

    document.addEventListener('touchstart', handleDocumentTouch)

    return () => {
      refs.forEach(ref => {
        ref.removeEventListener('mouseenter', handleMouseEnter)
        ref.removeEventListener('mouseleave', handleMouseLeave)
        ref.removeEventListener('focus', handleFocus)
        ref.removeEventListener('blur', handleBlur)
        ref.removeEventListener('touchstart', handleTouchStart)
      })
      document.removeEventListener('touchstart', handleDocumentTouch)
    }
  }, [children, showTooltip, hideTooltip, tooltip.visible])

  return (
    <div ref={containerRef} className="relative">
      {children}
      {tooltip.visible && (
        <div
          role="tooltip"
          className="absolute z-50 max-w-xs px-3 py-2 text-sm bg-stone-800 text-white rounded-md shadow-lg pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, calc(-100% - 8px))',
          }}
        >
          {tooltip.content}
          <div
            className="absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-800"
            style={{
              left: `calc(50% + ${tooltip.arrowOffset}px)`,
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      )}
      {portalReady && portalTargetRef.current && beforeFootnotes && createPortal(
        beforeFootnotes,
        portalTargetRef.current
      )}
    </div>
  )
}
