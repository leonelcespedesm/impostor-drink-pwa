import { useGameStore } from '@/store/useGameStore'
import { GAME_CONFIG } from '@/config/game'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Play } from 'lucide-react'

/**
 * Start game button with validation feedback
 */
export const StartGameButton = () => {
  const players = useGameStore((state) => state.players)
  const selectedCategories = useGameStore((state) => state.selectedCategories)
  const startGame = useGameStore((state) => state.startGame)

  const playersNeeded = Math.max(0, GAME_CONFIG.MIN_PLAYERS - players.length)
  const hasEnoughPlayers = players.length >= GAME_CONFIG.MIN_PLAYERS
  const hasCategories = selectedCategories.length >= GAME_CONFIG.MIN_CATEGORIES
  const canStartGame = hasEnoughPlayers && hasCategories

  const handleStartGame = () => {
    try {
      startGame()
    } catch (err) {
      console.error((err as Error).message)
    }
  }

  const getButtonText = () => {
    if (!hasEnoughPlayers && !hasCategories) {
      return `Faltan ${playersNeeded} jugador${playersNeeded !== 1 ? 'es' : ''} y categorías`
    }
    if (!hasEnoughPlayers) {
      return `Faltan ${playersNeeded} jugador${playersNeeded !== 1 ? 'es' : ''}`
    }
    if (!hasCategories) {
      return 'Selecciona al menos 1 categoría'
    }
    return 'Iniciar Partida'
  }

  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <Button
          size="lg"
          className="w-full text-lg h-14 gap-2"
          disabled={!canStartGame}
          onClick={handleStartGame}
        >
          {canStartGame && <Play className="h-5 w-5" />}
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  )
}
