import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Layout wrapper for pages - provides consistent spacing and centering
 * Mobile-first design with proper padding for touch devices
 */
export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <main
      className={cn(
        'flex flex-col items-center min-h-screen',
        'px-4 py-6 pb-24',
        'md:px-6 md:py-8',
        className
      )}
    >
      <div className="w-full max-w-2xl">
        {children}
      </div>
    </main>
  )
}
