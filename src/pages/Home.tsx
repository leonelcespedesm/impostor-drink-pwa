import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button'
import { PWATest } from '@/components/features/dev/PWATest'

export const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-8 text-center">
      <div className="flex gap-4">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="h-24 w-24 hover:drop-shadow-[0_0_2em_#646cffaa] transition duration-300" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="h-24 w-24 hover:drop-shadow-[0_0_2em_#61dafbaa] transition duration-300 motion-safe:animate-[spin_20s_linear_infinite]" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight">Vite + React</h1>
      
      <div className="flex flex-col gap-4">
         <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/pages/Home.tsx</code> and save to test HMR
        </p>
      </div>

      <PWATest />

      <p className="text-muted-foreground text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
