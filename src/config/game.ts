/**
 * Game configuration constants
 * Centralizes all magic numbers used in the game logic
 */
export const GAME_CONFIG = {
  /** Minimum number of players required to start a game */
  MIN_PLAYERS: 3,
  /** Maximum character length for a player's name */
  MAX_PLAYER_NAME_LENGTH: 30,
  /** Minimum number of categories that must be selected */
  MIN_CATEGORIES: 1,
  /** Minimum number of impostors allowed */
  MIN_IMPOSTORS: 1,
  /** Simulated API delay in milliseconds */
  API_DELAY_MS: 500,
} as const

export const ERROR_MESSAGES = {
  PLAYER_NAME_EMPTY: 'El nombre no puede estar vacío',
  PLAYER_NAME_TOO_LONG: 'El nombre excede el límite de caracteres',
  PLAYER_ALREADY_EXISTS: 'Este jugador ya existe',
  MIN_PLAYERS_NOT_MET: 'No hay suficientes jugadores',
  MIN_CATEGORIES_NOT_MET: 'Debes seleccionar al menos una categoría',
} as const
