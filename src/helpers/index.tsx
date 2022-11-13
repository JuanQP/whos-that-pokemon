import { TOTAL_OPTIONS } from "@/constants";

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
  const randomIndex = randomNumber(0, pokemons.length);
  if(remove) {
    return pokemons.splice(randomIndex, 1)[0];
  }
  return pokemons[randomIndex];
}

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shufflePokemons(pokemons: Pokemon[]) {
  const shuffledPokemons = [...pokemons];
  for (let i = shuffledPokemons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffledPokemons[i], shuffledPokemons[j]] = [shuffledPokemons[j], shuffledPokemons[i]];
  }
  return shuffledPokemons;
}

export function pickOptions(pokemons: Pokemon[], correctPokemon: Pokemon) {
  const pokemonsExceptOne = pokemons.filter(pokemon => pokemon.id !== correctPokemon.id);
  const wrongAnswers = shufflePokemons(pokemonsExceptOne).slice(0, TOTAL_OPTIONS - 1);
  const shuffledPokemons = shufflePokemons([
    correctPokemon,
    ...wrongAnswers,
  ]);
  return shuffledPokemons;
}
