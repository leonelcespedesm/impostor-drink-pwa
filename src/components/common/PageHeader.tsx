interface PageHeaderProps {
  title: string
  subtitle?: string
  emoji?: string
}

/**
 * Header section for pages with title and optional subtitle
 */
export const PageHeader = ({ title, subtitle, emoji }: PageHeaderProps) => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {title} {emoji && <span role="img" aria-hidden="true">{emoji}</span>}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base">
          {subtitle}
        </p>
      )}
    </header>
  )
}
