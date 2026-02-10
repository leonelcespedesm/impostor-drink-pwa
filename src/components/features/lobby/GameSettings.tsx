import { useGameStore } from '@/store/useGameStore'
import { GAME_CONFIG } from '@/config/game'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Minus, Plus } from 'lucide-react'

/**
 * Game settings - impostor count and hint toggle
 */
export const GameSettings = () => {
  const players = useGameStore((state) => state.players)
  const impostorCount = useGameStore((state) => state.impostorCount)
  const impostorHint = useGameStore((state) => state.impostorHint)
  const setImpostorCount = useGameStore((state) => state.setImpostorCount)
  const toggleHint = useGameStore((state) => state.toggleHint)

  const maxImpostors = Math.max(GAME_CONFIG.MIN_IMPOSTORS, players.length - 1)
  const canDecrease = impostorCount > GAME_CONFIG.MIN_IMPOSTORS
  const canIncrease = impostorCount < maxImpostors && players.length >= 2

  const handleImpostorCountChange = (delta: number) => {
    const newCount = impostorCount + delta
    if (newCount >= GAME_CONFIG.MIN_IMPOSTORS && newCount <= maxImpostors) {
      setImpostorCount(newCount)
    }
  }

  return (
    <Card className="mb-6 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Configuración</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Impostor Count */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Cantidad de Impostores</p>
            <p className="text-xs text-muted-foreground">
              Máximo: {maxImpostors}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleImpostorCountChange(-1)}
              disabled={!canDecrease}
              className="h-11 w-11"
              aria-label="Reducir cantidad de impostores"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span 
              className="text-2xl font-bold w-10 text-center tabular-nums"
              aria-live="polite"
              aria-atomic="true"
            >
              {impostorCount}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleImpostorCountChange(1)}
              disabled={!canIncrease}
              className="h-11 w-11"
              aria-label="Aumentar cantidad de impostores"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Impostor Hint Switch */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <label id="hint-label" className="text-sm font-medium cursor-pointer">
              Pista del Impostor
            </label>
            <p id="hint-description" className="text-xs text-muted-foreground">
              El impostor recibe una pista sobre la palabra
            </p>
          </div>
          <Switch 
            checked={impostorHint} 
            onCheckedChange={toggleHint}
            aria-labelledby="hint-label"
            aria-describedby="hint-description"
          />
        </div>
      </CardContent>
    </Card>
  )
}
