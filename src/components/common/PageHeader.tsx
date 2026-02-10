import { ThemeToggle } from '@/components/common/ThemeToggle'

interface PageHeaderProps {
  title: string
  subtitle?: string
  emoji?: string
  showThemeToggle?: boolean
}

/**
 * Header section for pages with title, optional subtitle, and theme toggle
 */
export const PageHeader = ({ 
  title, 
  subtitle, 
  emoji, 
  showThemeToggle = true 
}: PageHeaderProps) => {
  return (
    <header className="relative mb-8">
      {/* Theme toggle - fixed to top right */}
      {showThemeToggle && (
        <div className="absolute -top-2 right-0">
          <ThemeToggle />
        </div>
      )}
      
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          {title} {emoji && <span role="img" aria-hidden="true">{emoji}</span>}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}
