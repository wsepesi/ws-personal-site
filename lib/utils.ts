import { type ClassValue, clsx } from "clsx"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIsMobile = () => {
  if (typeof window === "undefined") return false
  return window.innerWidth < 640
}

const useIsMobile = (px_width: number) => {
  const [width, setWidth] = useState<number>(0)
  const [isMobile, setIsMobile] = useState(false)
  function handleWindowSizeChange() {
      setWidth(window.innerWidth)
  }

  useEffect(() => {
      setWidth(window.innerWidth)
      setIsMobile(width <= 768)
      window.addEventListener('resize', handleWindowSizeChange)
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange)
      }
  }, [width]);

  useEffect(() => {
      setIsMobile(width <= px_width)
  }, [px_width, width])

  if(isMobile === null) {
      return false
  }

  return isMobile
}

export const lower = (str: string) => str.toLowerCase()
export const lowerAndTrimSpaces = (str: string) => lower(str).replace(/\s/g, '')

export default useIsMobile