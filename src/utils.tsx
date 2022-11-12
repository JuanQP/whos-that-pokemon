import transparentImage from "@assets/transparent.png";
import { NormalModeFinishedGame } from "@components/Game/NormalModeFinishedGame";
import { PokemonMasterModeFinishedGame } from "@components/Game/PokemonMasterModeFinishedGame";

/**
 * Miliseconds in one second
 */
export const SECOND = 1000;

export const NULL_POKEMON: Pokemon = {
  id: null,
  name: "No option",
  src: transparentImage,
};

type GameModes = {
  [key: string]: GameMode;
}

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

export function getImageSrc(pokemon: Pokemon) {
  if(pokemon.id === null) {
    return pokemon.src ?? '';
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
}

export function randomNumber(from = 0, to = 0) {
  return from + Math.floor(Math.random() * to);
}

export function pickRandomPokemon(pokemons: Pokemon[], remove: boolean) {
  if(remove) {
    return pokemons.splice(randomNumber(0, pokemons.length), 1)[0];
  }
  return pokemons[randomNumber(0, pokemons.length)];
}

// https://sebhastian.com/shuffle-array-javascript/
function shufflePokemons(pokemons: Pokemon[]) {
  return pokemons.sort(() => Math.random() - 0.5);
}

export function pickOptions(pokemons: Pokemon[], excludedPokemon: Pokemon) {
  const pokemonsExceptOne = pokemons.filter(pokemon => pokemon.id !== excludedPokemon.id);
  const pokemon1 = pickRandomPokemon(pokemonsExceptOne, true);
  const pokemon2 = pickRandomPokemon(pokemonsExceptOne, true);
  const pokemon3 = pickRandomPokemon(pokemonsExceptOne, true);
  const shuffledPokemons = shufflePokemons([
    excludedPokemon,
    pokemon1,
    pokemon2,
    pokemon3,
  ]);
  return shuffledPokemons;
}