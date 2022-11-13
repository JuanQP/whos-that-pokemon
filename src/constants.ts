import transparentImage from "@assets/transparent.png";
import { NormalModeFinishedGame } from "@components/Game/NormalModeFinishedGame";
import { PokemonMasterModeFinishedGame } from "@components/Game/PokemonMasterModeFinishedGame";

export const SECOND = 1000;
export const TOTAL_OPTIONS = 4;
export const TIME_BEFORE_START = 5;

export const NULL_POKEMON: Pokemon = {
  id: null,
  name: "No option",
  src: transparentImage,
};

export const GAME_MODES: GameModes = {
  Normal: {
    TIME_TO_CHOOSE: 5 * SECOND,
    NEXT_POKEMON_DELAY: 3 * SECOND,
    TOTAL_ATTEMPTS: 10,
    GAME_OVER_ON_FAIL: false,
    REMOVE_POKEMONS: false,
    showListOnGameOver: true,
    GameOverMessage: NormalModeFinishedGame,
    isGameOver: function (pickedOptions, lastOptionWasCorrect) {
      return pickedOptions.length === this.TOTAL_ATTEMPTS;
    }
  },
  PokemonMaster: {
    TIME_TO_CHOOSE: 5 * SECOND,
    NEXT_POKEMON_DELAY: 2 * SECOND,
    TOTAL_ATTEMPTS: 151,
    GAME_OVER_ON_FAIL: true,
    REMOVE_POKEMONS: true,
    showListOnGameOver: false,
    GameOverMessage: PokemonMasterModeFinishedGame,
    isGameOver: function (pickedOptions, lastOptionWasCorrect) {
      return pickedOptions.length === this.TOTAL_ATTEMPTS || !lastOptionWasCorrect;
    }
  },
}
