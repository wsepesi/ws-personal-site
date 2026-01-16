import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIsMobile = () => {
  if (typeof window === "undefined") return false
  return window.innerWidth < 640
}

export const lower = (str: string) => str.toLowerCase()
export const lowerAndTrimSpaces = (str: string) => lower(str).replace(/\s/g, '')