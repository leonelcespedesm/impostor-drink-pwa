import type { Category } from '@/services/categories'

/**
 * Shared types for the game domain
 */

export interface GameState {
  players: string[]
  selectedCategories: string[]
  impostorCount: number
  impostorHint: boolean
  gameInProgress: boolean
}

export interface GameActions {
  addPlayer: (playerName: string) => void
  removePlayer: (playerName: string) => void
  setCategories: (categories: string[]) => void
  setImpostorCount: (count: number) => void
  toggleHint: () => void
  startGame: () => void
  resetConfig: () => void
}

export type GameStore = GameState & GameActions

export type { Category }
