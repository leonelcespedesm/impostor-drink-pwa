import { useState, useEffect } from 'react'
import type { KeyboardEvent, ChangeEvent } from 'react'
import { useGameStore } from '@/store/useGameStore'
import { fetchCategories, type Category } from '@/services/categories'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Plus, X, Minus } from 'lucide-react'

export const Home = () => {
  const {
    players,
    selectedCategories,
    impostorCount,
    impostorHint,
    gameInProgress,
    addPlayer,
    removePlayer,
    setCategories,
    setImpostorCount,
    toggleHint,
    startGame,
    resetConfig,
  } = useGameStore()

  const [playerInput, setPlayerInput] = useState('')
  const [categories, setLoadedCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [playerInputError, setPlayerInputError] = useState('')

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true)
      const data = await fetchCategories()
      setLoadedCategories(data)
      setIsLoadingCategories(false)
    }
    loadCategories()
  }, [])

  const handlePlayerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 30) {
      setPlayerInput(value)
      setPlayerInputError('')
    }
  }

  const handleAddPlayer = () => {
    const trimmedName = playerInput.trim()
    
    if (!trimmedName) {
      setPlayerInputError('El nombre no puede estar vacío')
      return
    }

    if (players.includes(trimmedName)) {
      setPlayerInputError('Este jugador ya existe')
      return
    }

    addPlayer(trimmedName)
    setPlayerInput('')
    setPlayerInputError('')
  }

  const handlePlayerInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddPlayer()
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    const isSelected = selectedCategories.includes(categoryId)
    if (isSelected) {
      setCategories(selectedCategories.filter((id) => id !== categoryId))
    } else {
      setCategories([...selectedCategories, categoryId])
    }
  }

  const handleImpostorCountChange = (delta: number) => {
    const newCount = impostorCount + delta
    if (newCount >= 1 && newCount <= players.length - 1) {
      setImpostorCount(newCount)
    }
  }

  const canStartGame = players.length >= 3 && selectedCategories.length > 0

  // Game in progress view
  if (gameInProgress) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Partida en Curso</CardTitle>
            <CardDescription>Hay una partida activa</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button size="lg" className="w-full">
              Continuar Partida
            </Button>
            <Button size="lg" variant="destructive" className="w-full" onClick={resetConfig}>
              Resetear y Volver al Lobby
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Configuration view
  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-6 gap-6 pb-24">
      <div className="w-full max-w-2xl mt-8">
        <h1 className="text-4xl font-bold text-center mb-2">Impostor Drink 🍺</h1>
        <p className="text-center text-muted-foreground mb-8">
          Configura tu partida y encuentra al impostor
        </p>

        {/* Players Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Jugadores</CardTitle>
            <CardDescription>Mínimo 3 jugadores para comenzar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Nombre del jugador (máx. 30 chars)"
                  value={playerInput}
                  onChange={handlePlayerInputChange}
                  onKeyDown={handlePlayerInputKeyDown}
                  maxLength={30}
                  className={cn(playerInputError && 'border-destructive')}
                />
                {playerInputError && (
                  <p className="text-xs text-destructive mt-1">{playerInputError}</p>
                )}
              </div>
              <Button
                onClick={handleAddPlayer}
                size="icon"
                className="shrink-0 h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {players.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {players.map((player) => (
                  <Badge
                    key={player}
                    variant="secondary"
                    className="text-sm py-2 px-3 pr-2 gap-2"
                  >
                    {player}
                    <button
                      onClick={() => removePlayer(player)}
                      className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                      aria-label={`Eliminar ${player}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {players.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay jugadores agregados
              </p>
            )}
          </CardContent>
        </Card>

        {/* Categories Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
            <CardDescription>Selecciona al menos una categoría</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingCategories ? (
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg" />
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
                        'flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all touch-manipulation min-h-[80px]',
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card hover:border-primary/50'
                      )}
                    >
                      <span className="text-3xl">{category.emoji}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Config Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configuración Rápida</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Impostor Count */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Cantidad de Impostores</p>
                <p className="text-xs text-muted-foreground">
                  Máximo: {Math.max(1, players.length - 1)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleImpostorCountChange(-1)}
                  disabled={impostorCount <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-bold w-8 text-center">{impostorCount}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleImpostorCountChange(1)}
                  disabled={impostorCount >= players.length - 1 || players.length < 2}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Impostor Hint Switch */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Pista del Impostor</p>
                <p className="text-xs text-muted-foreground">
                  El impostor recibe una pista sobre la palabra
                </p>
              </div>
              <Switch checked={impostorHint} onCheckedChange={toggleHint} />
            </div>
          </CardContent>
        </Card>

        {/* Start Game Button */}
        <Card>
          <CardFooter className="pt-6">
            <Button
              size="lg"
              className="w-full text-lg h-14"
              disabled={!canStartGame}
              onClick={startGame}
            >
              {!canStartGame
                ? `Necesitas ${3 - players.length} jugador(es) más y al menos 1 categoría`
                : 'Iniciar Partida'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
