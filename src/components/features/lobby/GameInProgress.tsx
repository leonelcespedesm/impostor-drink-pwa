import { useGameStore } from '@/store/useGameStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageContainer } from '@/components/common/PageContainer'
import { Play, RotateCcw } from 'lucide-react'

/**
 * View shown when a game is already in progress
 */
export const GameInProgress = () => {
  const resetConfig = useGameStore((state) => state.resetConfig)

  return (
    <PageContainer className="justify-center">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="text-5xl mb-4" role="img" aria-label="Juego en progreso">
            🎮
          </div>
          <CardTitle className="text-2xl">Partida en Curso</CardTitle>
          <CardDescription className="text-base">
            Tienes una partida activa guardada
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-4">
          <Button size="lg" className="w-full h-14 text-lg gap-2">
            <Play className="h-5 w-5" />
            Continuar Partida
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full h-12 gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" 
            onClick={resetConfig}
          >
            <RotateCcw className="h-4 w-4" />
            Nueva Partida
          </Button>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
