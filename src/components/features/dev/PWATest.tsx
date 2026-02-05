import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { usePWA } from '@/hooks/usePWA'

export const PWATest = () => {
  const { offline, needsRefresh, reloadPWA } = usePWA()

  return (
    <Card className="max-w-md w-full border-border">
      <CardHeader>
        <CardTitle className="text-xl font-bold">PWA Status</CardTitle>
        <CardDescription>Panel de control para probar funcionalidad PWA</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${offline ? 'bg-destructive' : 'bg-green-500'}`} />
          <span className="text-sm font-medium">
            {offline ? 'Modo Offline (Sin Conexión)' : 'En Línea'}
          </span>
        </div>

        <div className="p-4 rounded-lg bg-secondary/50 text-sm">
          <p className="mb-2"><strong>Prueba de instalación:</strong></p>
          <p>Si no ves la barra de navegación del navegador, estás en modo <code>standalone</code>.</p>
        </div>

        {needsRefresh && (
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm">
            Hay una nueva versión disponible.
          </div>
        )}
      </CardContent>

      <CardFooter>
        {needsRefresh && (
          <Button onClick={reloadPWA} className="w-full">
            Actualizar Aplicación
          </Button>
        )}
        {!needsRefresh && (
          <p className="text-xs text-muted-foreground w-full text-center">
            Aplicación actualizada
          </p>
        )}
      </CardFooter>
    </Card>
  )
}
