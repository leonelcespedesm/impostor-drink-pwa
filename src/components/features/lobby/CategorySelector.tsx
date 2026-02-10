import { useGameStore } from '@/store/useGameStore'
import { useCategories } from '@/hooks/useCategories'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

/**
 * Category selector - allows multi-selection of game categories
 */
export const CategorySelector = () => {
  const selectedCategories = useGameStore((state) => state.selectedCategories)
  const setCategories = useGameStore((state) => state.setCategories)
  const { categories, isLoading } = useCategories()

  const handleCategoryToggle = (categoryId: string) => {
    const isSelected = selectedCategories.includes(categoryId)
    if (isSelected) {
      setCategories(selectedCategories.filter((id) => id !== categoryId))
    } else {
      setCategories([...selectedCategories, categoryId])
    }
  }

  return (
    <Card className="mb-6 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Categorías</CardTitle>
        <CardDescription>Selecciona al menos una categoría</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id)
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-2',
                    'p-4 rounded-xl border-2 min-h-24',
                    'transition-all duration-200 touch-manipulation',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    isSelected
                      ? 'border-primary bg-primary/15 shadow-md'
                      : 'border-border bg-card hover:border-primary/40 hover:bg-accent/30'
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Categoría ${category.name}`}
                >
                  <span className="text-4xl" role="img" aria-hidden="true">
                    {category.emoji}
                  </span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        )}

        {selectedCategories.length > 0 && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            {selectedCategories.length} categoría{selectedCategories.length !== 1 ? 's' : ''} seleccionada{selectedCategories.length !== 1 ? 's' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
