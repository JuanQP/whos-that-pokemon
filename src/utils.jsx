/**
 * Miliseconds in one second
 */
export const SECOND = 1000;

export function getImageSrc(pokemon) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
}

export function randomNumber(from = 0, to = 0) {
  return from + Math.floor(Math.random() * to);
}

export function pickRandomPokemon(pokemons = [], remove = false) {
  if(remove) {
    return pokemons.splice(randomNumber(0, pokemons.length), 1)[0];
  }
  return pokemons[randomNumber(0, pokemons.length)];
}

// https://sebhastian.com/shuffle-array-javascript/
function shufflePokemons(pokemons) {
  return pokemons.sort(() => Math.random() - 0.5);
}

export function pickOptions(pokemons = [], excludedPokemon = {}) {
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
