# Estándares de Desarrollo Frontend: React + TS + Shadcn + Tailwind

Eres un experto en desarrollo frontend. Tus respuestas deben seguir estrictamente estas reglas de estilo y arquitectura para mantener la coherencia en el proyecto.

## 1. Estándar de Estilado (Tailwind CSS)

- **Variables Semánticas:** Nunca uses colores fijos (ej. `text-blue-500`). Usa siempre variables semánticas de Shadcn/Tailwind (ej. `text-primary`, `bg-background`, `border-input`).
- **Utilidad `cn()`:** Usa siempre la función `cn()` ubicada en `@/lib/utils` para combinar clases de Tailwind, especialmente cuando hay lógica condicional.
- **Orden de Clases:** Prioriza el orden: Layout (display, pos), Box Model (margin, padding), Typography, Visuals (colors, shadows).

## 2. Componentización y Shadcn/UI

- **Modularización:** Los componentes base de Shadcn residen en `components/ui`. No los modifiques a menos que sea una personalización global.
- **Composición:** Crea componentes de "negocio" en `components/features/` abstrayendo los componentes de `ui`.
- **Propiedades:** Siempre tipa las props extendiendo de los tipos nativos de React (ej. `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`).

## 3. Arquitectura de Archivos

- **Ubicación:**
  - Páginas -> `src/pages/`
  - Lógica reusable -> `src/hooks/`
  - Componentes UI -> `src/components/ui/`
  - Componentes de Proyecto -> `src/components/common/` o `src/components/features/`
  - Configuración -> `src/config/`
  - Tipos compartidos -> `src/types/`
- **Importaciones:** Usa siempre alias de ruta (Path Aliases) comenzando con `@/`.
- **Organización por Features (Escalabilidad):** Cuando el proyecto crezca (más de 15 componentes), organiza por features:
  ```
  src/
  ├── components/
  │   ├── ui/              # Shadcn (no tocar)
  │   ├── common/          # Componentes globales reutilizables
  │   └── features/        # Componentes agrupados por funcionalidad
  │       ├── game/
  │       │   ├── PlayerList.tsx
  │       │   ├── CategorySelector.tsx
  │       │   └── GameConfig.tsx
  │       └── lobby/
  ├── hooks/
  │   ├── usePWA.ts
  │   └── useCategories.ts
  ├── store/
  │   ├── useGameStore.ts
  │   └── slices/          # Si el store se divide
  ├── config/              # Constantes y configuración
  │   └── game.ts
  └── types/               # Tipos compartidos
      └── game.ts
  ```

## 4. TypeScript y Lógica

- **Tipado:** No uses `any`. Define interfaces para todo.
- **Componentes Funcionales:** Usa la sintaxis de `export const Nombre = () => { ... }`.
- **PWA:** Mantén la lógica del Service Worker separada en un hook `usePWA.ts`.

## 5. Consistencia Visual

- Todos los formularios deben usar el componente `<Form />` de Shadcn (basado en react-hook-form y zod).
- Los espaciados deben seguir la escala de Tailwind (usar `gap-4`, `p-6`, etc., evitando valores arbitrarios como `p-[17px]`).

## 6. Gestión de Estado con Zustand

### Store Design

- **Validaciones en el Store:** Todas las validaciones de negocio deben estar en las acciones del store, no en los componentes. Las acciones deben lanzar errores (`throw new Error()`) cuando los datos son inválidos.

  ```typescript
  // ✅ CORRECTO
  addPlayer: (playerName) => {
    const trimmed = playerName.trim();
    if (!trimmed) throw new Error("El nombre no puede estar vacío");

    set((state) => {
      if (state.players.includes(trimmed)) {
        throw new Error("Este jugador ya existe");
      }
      return { players: [...state.players, trimmed] };
    });
  };

  // ❌ INCORRECTO - Validación en el componente
  const handleAdd = () => {
    if (!input.trim()) return; // Validación perdida si usas addPlayer() en otro lugar
    addPlayer(input);
  };
  ```

- **Limitar Acciones:** Si el store tiene más de 10-12 acciones, considera:

  1. Agrupar acciones relacionadas en un setter genérico (`updateConfig(partial)`)
  2. Dividir el store en slices (`useGameStore`, `usePlayerStore`, etc.)

- **Inmutabilidad:** Siempre crea nuevos objetos/arrays. Nunca modifiques el estado directamente.

  ```typescript
  // ✅ CORRECTO
  set((state) => ({ players: [...state.players, newPlayer] }));

  // ❌ INCORRECTO
  set((state) => {
    state.players.push(newPlayer); // Muta el estado
    return state;
  });
  ```

### Estado Local vs Global

- **Estado Local (useState):** Usa para datos efímeros de UI (inputs, modales, errores temporales).
- **Estado Global (Zustand):** Usa para datos que:
  1. Se comparten entre múltiples componentes
  2. Deben persistir entre navegación
  3. Tienen lógica de negocio compleja

## 7. Constantes y Configuración

- **Números Mágicos:** Nunca uses valores literales en lógica de negocio. Crea constantes en `src/config/`.

  ```typescript
  // ✅ CORRECTO - src/config/game.ts
  export const GAME_CONFIG = {
    MIN_PLAYERS: 3,
    MAX_PLAYER_NAME_LENGTH: 30,
    MIN_CATEGORIES: 1,
    MIN_IMPOSTORS: 1,
  } as const;

  // Uso:
  import { GAME_CONFIG } from "@/config/game";
  const isValid = players.length >= GAME_CONFIG.MIN_PLAYERS;

  // ❌ INCORRECTO
  const isValid = players.length >= 3; // ¿Por qué 3? ¿Dónde más se usa?
  ```

## 8. Hooks Personalizados

- **Extracción de Lógica:** Si un `useEffect` hace fetching de datos o tiene lógica compleja, extráelo a un hook personalizado en `src/hooks/`.

  ```typescript
  // ✅ CORRECTO - src/hooks/useCategories.ts
  export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      fetchCategories()
        .then(setCategories)
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false))
    }, [])

    return { categories, isLoading, error }
  }

  // ❌ INCORRECTO - Lógica de fetching en el componente
  const Home = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
      fetch('/api/categories').then(...)
    }, [])
  }
  ```

- **Naming:** Los hooks deben empezar con `use` (ej. `usePWA`, `useCategories`, `useGameLogic`).

## 9. Manejo de Errores

- **Error Boundaries:** Envuelve la aplicación en un `<ErrorBoundary>` para capturar errores de React.
- **Try-Catch en Acciones:** Cuando uses acciones del store que puedan fallar, maneja los errores en el componente:
  ```typescript
  const handleSubmit = () => {
    try {
      addPlayer(input);
      setInput("");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  };
  ```
- **Logging:** En producción, considera usar un servicio de error tracking (ej. Sentry) para errores críticos.

## 10. Performance y Optimización

- **Evita Re-renders:** Usa selectores en Zustand para suscribirte solo a lo necesario:

  ```typescript
  // ✅ CORRECTO - Solo re-renderiza cuando cambian los players
  const players = useGameStore((state) => state.players);

  // ❌ INCORRECTO - Re-renderiza en cada cambio del store
  const { players, categories, impostorCount } = useGameStore();
  ```

- **React.memo:** Usa `memo()` en componentes que reciben props complejas y no cambian frecuentemente.

  ```typescript
  import { memo } from "react";

  export const PlayerCard = memo(({ player, onRemove }: PlayerCardProps) => {
    return (
      <Card>
        <CardContent>{player}</CardContent>
      </Card>
    );
  });
  ```

- **useCallback y useMemo:** Usa cuando pases funciones como props a componentes memorizados o cuando el cálculo sea costoso.

## 11. Comentarios y Documentación

- **JSDoc para Hooks y Utilidades:**

  ```typescript
  /**
   * Hook para gestionar la lista de categorías del juego
   * @returns {Object} Estado de categorías con loading y error
   * @example
   * const { categories, isLoading } = useCategories()
   */
  export const useCategories = () => { ... }
  ```

- **Evita Comentarios Obvios:** El código debe ser auto-explicativo. Comenta solo lógica compleja o decisiones arquitectónicas.

  ```typescript
  // ❌ INCORRECTO
  // Incrementa el contador en 1
  setCount(count + 1)

  // ✅ CORRECTO
  // Aplicamos throttling para evitar spam de clicks en el botón de pago
  const handlePayment = useCallback(throttle(() => { ... }, 2000), [])
  ```

## 12. Accesibilidad (a11y)

- **Semántica HTML:** Usa elementos semánticos (`<nav>`, `<main>`, `<article>`) en lugar de `<div>` genéricos.
- **ARIA Labels:** Agrega `aria-label` a botones sin texto y `aria-describedby` para descripciones adicionales.
- **Keyboard Navigation:** Asegúrate de que todos los elementos interactivos sean accesibles con teclado (`Tab`, `Enter`, `Escape`).
- **Contraste:** Verifica que los colores cumplan con WCAG AA (mínimo contraste 4.5:1).

## 13. Testing (Buenas Prácticas)

- **Unit Tests:** Usa Vitest para probar hooks y utilidades puras.
- **Component Tests:** Usa React Testing Library para probar componentes de forma aislada.
- **Evita Snapshots:** Prioriza tests que verifiquen comportamiento sobre estructura (los snapshots se rompen fácilmente).
- **Naming:** Sigue el patrón `describe('ComponentName', () => { it('should ...', () => {}) })`

## 14. Lineas de codigo
- **Longitud Máxima:** Mantén las líneas de código por debajo de 100 caracteres para mejorar la legibilidad.
- **Funciones Pequeñas:** Divide funciones largas en funciones más pequeñas y reutilizables.
- **Cantidad de lineas por archivo:** Mantén los archivos por debajo de 350 líneas. Si un archivo crece demasiado, considera dividirlo en componentes o módulos más pequeños.
---

## Checklist antes de hacer Commit

- [ ] ¿Usé variables semánticas de Tailwind en lugar de colores fijos?
- [ ] ¿Las validaciones están en el store, no en el componente?
- [ ] ¿Extraje constantes de configuración en `src/config/`?
- [ ] ¿Los hooks personalizados tienen el prefijo `use`?
- [ ] ¿Manejé errores con try-catch en las acciones del store?
- [ ] ¿El tipado TypeScript está completo (sin `any`)?
- [ ] ¿El código es accesible (ARIA, semántica, teclado)?
- [ ] ¿Las importaciones usan alias `@/`?
