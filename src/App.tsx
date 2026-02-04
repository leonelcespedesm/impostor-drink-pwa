import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <div>
          <Button>ANASHEEE</Button>
        </div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>IDOOOO Vite + React ANASHEEE</h1>
      
      {/* PWA Test Status */}
      <div style={{ margin: '20px', padding: '10px', border: '1px solid #444', borderRadius: '8px' }}>
        <h3>PWA Status</h3>
        <p>Si ves esta app sin barra de navegación del navegador (en modo "standalone"), es una PWA instalada.</p>
        <p>Prueba desconectar internet y recargar: si funciona, el Service Worker está activo.</p>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
