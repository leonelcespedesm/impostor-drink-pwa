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
- **Ubicación:** - Páginas -> `src/pages/`
  - Lógica reusable -> `src/hooks/`
  - Componentes UI -> `src/components/ui/`
  - Componentes de Proyecto -> `src/components/common/` o `src/components/features/`
- **Importaciones:** Usa siempre alias de ruta (Path Aliases) comenzando con `@/`.

## 4. TypeScript y Lógica
- **Tipado:** No uses `any`. Define interfaces para todo.
- **Componentes Funcionales:** Usa la sintaxis de `export const Nombre = () => { ... }`.
- **PWA:** Mantén la lógica del Service Worker separada en un hook `usePWA.ts`.

## 5. Consistencia Visual
- Todos los formularios deben usar el componente `<Form />` de Shadcn (basado en react-hook-form y zod).
- Los espaciados deben seguir la escala de Tailwind (usar `gap-4`, `p-6`, etc., evitando valores arbitrarios como `p-[17px]`).