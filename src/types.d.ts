interface Pokemon {
  id: number | null;
  name: string;
  src?: string;
}

interface PokemonOption extends Pokemon {
  isCorrectOption: boolean;
}

interface GameMode {
  TIME_TO_CHOOSE: number;
  NEXT_POKEMON_DELAY: number;
  TOTAL_ATTEMPTS: number;
  GAME_OVER_ON_FAIL: boolean;
  REMOVE_POKEMONS: boolean;
  showListOnGameOver: boolean;
  GameOverMessage: React.FC<GameModeScreenProps>;
  isGameOver: (options: any, lastOptionWasCorrect: boolean) => boolean;
}

declare module "@assets/pokemons.json" {
  const pokemons: Pokemon[];
}
