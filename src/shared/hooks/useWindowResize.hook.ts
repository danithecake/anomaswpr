import { useEffect } from 'react'

export function useWindowResize(callback: () => void): void {
  useEffect(() => {
    window.addEventListener('resize', callback)

    return () => window.removeEventListener('resize', callback)
  }, [callback])
}
