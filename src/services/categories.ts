export interface Category {
  id: string
  name: string
  emoji: string
}

/**
 * Simulates an API call to fetch categories
 * TODO: Replace with actual Supabase call using supabase-js
 */
export const fetchCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'Fiesta', emoji: '🎉' },
        { id: '2', name: 'Cine', emoji: '🎬' },
        { id: '3', name: 'Adultos', emoji: '🔞' },
        { id: '4', name: 'Deportes', emoji: '⚽' },
        { id: '5', name: 'Música', emoji: '🎵' },
      ])
    }, 500)
  })
}
