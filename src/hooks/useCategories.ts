import { useState, useEffect } from 'react'
import { fetchCategories, type Category } from '@/services/categories'

/**
 * Hook para gestionar la lista de categorías del juego
 * @returns {Object} Estado de categorías con loading y error
 * @example
 * const { categories, isLoading, error } = useCategories()
 */
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchCategories()
        setCategories(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  return { categories, isLoading, error }
}
