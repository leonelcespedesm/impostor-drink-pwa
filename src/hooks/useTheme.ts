import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

/**
 * Hook para gestionar el tema de la aplicación (dark/light mode)
 * Persiste la preferencia en localStorage
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored) return stored
      // Default to dark for party app vibe
      return 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, setTheme, toggleTheme }
}
