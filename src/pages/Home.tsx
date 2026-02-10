import { useGameStore } from '@/store/useGameStore'
import { PageContainer } from '@/components/common/PageContainer'
import { PageHeader } from '@/components/common/PageHeader'
import {
  PlayerInput,
  CategorySelector,
  GameSettings,
  StartGameButton,
  GameInProgress,
} from '@/components/features/lobby'

/**
 * Home page - Game lobby for configuring and starting a new game
 */
export const Home = () => {
  const gameInProgress = useGameStore((state) => state.gameInProgress)

  if (gameInProgress) {
    return <GameInProgress />
  }

  return (
    <PageContainer>
      <PageHeader
        title="Impostor Drink"
        subtitle="Configura tu partida y encuentra al impostor"
        emoji="🍺"
      />
      <PlayerInput />
      <CategorySelector />
      <GameSettings />
      <StartGameButton />
    </PageContainer>
  )
}
