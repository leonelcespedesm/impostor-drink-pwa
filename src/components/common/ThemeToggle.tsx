import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

/**
 * Theme toggle button - switches between dark and light mode
 */
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="h-10 w-10 rounded-full"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-primary" />
      )}
    </Button>
  )
}
