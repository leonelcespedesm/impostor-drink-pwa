import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GameState {
  // State
  players: string[]
  selectedCategories: string[]
  impostorCount: number
  impostorHint: boolean
  gameInProgress: boolean

  // Actions
  addPlayer: (playerName: string) => void
  removePlayer: (playerName: string) => void
  setCategories: (categories: string[]) => void
  setImpostorCount: (count: number) => void
  toggleHint: () => void
  startGame: () => void
  resetConfig: () => void
}

const initialState = {
  players: [],
  selectedCategories: [],
  impostorCount: 1,
  impostorHint: false,
  gameInProgress: false,
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,

      addPlayer: (playerName) =>
        set((state) => ({
          players: [...state.players, playerName],
        })),

      removePlayer: (playerName) =>
        set((state) => ({
          players: state.players.filter((player) => player !== playerName),
        })),

      setCategories: (categories) =>
        set(() => ({
          selectedCategories: categories,
        })),

      setImpostorCount: (count) =>
        set(() => ({
          impostorCount: count,
        })),

      toggleHint: () =>
        set((state) => ({
          impostorHint: !state.impostorHint,
        })),

      startGame: () =>
        set(() => ({
          gameInProgress: true,
        })),

      resetConfig: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    {
      name: 'impostor-game-storage',
    }
  )
)
