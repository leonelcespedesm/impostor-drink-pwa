import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GAME_CONFIG, ERROR_MESSAGES } from '@/config/game'
import type { GameStore } from '@/types/game'

const initialState = {
  players: [] as string[],
  selectedCategories: [] as string[],
  impostorCount: GAME_CONFIG.MIN_IMPOSTORS,
  impostorHint: false,
  gameInProgress: false,
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addPlayer: (playerName: string) => {
        const trimmed = playerName.trim()
        
        if (!trimmed) {
          throw new Error(ERROR_MESSAGES.PLAYER_NAME_EMPTY)
        }
        
        if (trimmed.length > GAME_CONFIG.MAX_PLAYER_NAME_LENGTH) {
          throw new Error(ERROR_MESSAGES.PLAYER_NAME_TOO_LONG)
        }

        const { players } = get()
        if (players.includes(trimmed)) {
          throw new Error(ERROR_MESSAGES.PLAYER_ALREADY_EXISTS)
        }

        set((state) => ({
          players: [...state.players, trimmed],
        }))
      },

      removePlayer: (playerName: string) =>
        set((state) => ({
          players: state.players.filter((player) => player !== playerName),
        })),

      setCategories: (categories: string[]) =>
        set(() => ({
          selectedCategories: categories,
        })),

      setImpostorCount: (count: number) =>
        set(() => ({
          impostorCount: count,
        })),

      toggleHint: () =>
        set((state) => ({
          impostorHint: !state.impostorHint,
        })),

      startGame: () => {
        const { players, selectedCategories } = get()
        
        if (players.length < GAME_CONFIG.MIN_PLAYERS) {
          throw new Error(ERROR_MESSAGES.MIN_PLAYERS_NOT_MET)
        }
        
        if (selectedCategories.length < GAME_CONFIG.MIN_CATEGORIES) {
          throw new Error(ERROR_MESSAGES.MIN_CATEGORIES_NOT_MET)
        }

        set(() => ({
          gameInProgress: true,
        }))
      },

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
