import { useState } from 'react'
import type { KeyboardEvent, ChangeEvent } from 'react'
import { useGameStore } from '@/store/useGameStore'
import { GAME_CONFIG } from '@/config/game'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Plus, X } from 'lucide-react'

/**
 * Player input section - handles adding/removing players from the game
 */
export const PlayerInput = () => {
  const players = useGameStore((state) => state.players)
  const addPlayer = useGameStore((state) => state.addPlayer)
  const removePlayer = useGameStore((state) => state.removePlayer)

  const [playerInput, setPlayerInput] = useState('')
  const [playerInputError, setPlayerInputError] = useState('')

  const handlePlayerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= GAME_CONFIG.MAX_PLAYER_NAME_LENGTH) {
      setPlayerInput(value)
      setPlayerInputError('')
    }
  }

  const handleAddPlayer = () => {
    try {
      addPlayer(playerInput)
      setPlayerInput('')
      setPlayerInputError('')
    } catch (err) {
      setPlayerInputError((err as Error).message)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddPlayer()
    }
  }

  return (
    <Card className="mb-6 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Jugadores</CardTitle>
        <CardDescription>
          Mínimo {GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder={`Nombre (máx. ${GAME_CONFIG.MAX_PLAYER_NAME_LENGTH} caracteres)`}
              value={playerInput}
              onChange={handlePlayerInputChange}
              onKeyDown={handleKeyDown}
              maxLength={GAME_CONFIG.MAX_PLAYER_NAME_LENGTH}
              className={cn(
                'h-12 text-base',
                playerInputError && 'border-destructive focus-visible:ring-destructive'
              )}
              aria-label="Nombre del jugador"
              aria-describedby={playerInputError ? 'player-input-error' : undefined}
            />
            {playerInputError && (
              <p 
                id="player-input-error" 
                className="text-xs text-destructive mt-1.5" 
                role="alert"
              >
                {playerInputError}
              </p>
            )}
          </div>
          <Button
            onClick={handleAddPlayer}
            aria-label="Añadir jugador"
            size="icon"
            className="h-12 w-12 shrink-0"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {players.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {players.map((player) => (
              <Badge
                key={player}
                variant="secondary"
                className="text-sm py-2 px-3 pr-2 gap-1.5 bg-secondary/80"
              >
                <span>{player}</span>
                <button
                  onClick={() => removePlayer(player)}
                  className={cn(
                    'ml-1 p-1 rounded-full transition-colors',
                    'hover:bg-destructive/20 hover:text-destructive',
                    'focus:outline-none focus:ring-2 focus:ring-destructive/50'
                  )}
                  aria-label={`Eliminar a ${player}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-6">
            No hay jugadores agregados
          </p>
        )}

        {players.length > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            {players.length} jugador{players.length !== 1 ? 'es' : ''} agregado{players.length !== 1 ? 's' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
