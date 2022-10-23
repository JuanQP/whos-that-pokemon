import { NULL_POKEMON, pickRandomPokemon } from "@/utils";
import { useEffect, useRef, useState } from "react";

/**
 * Returns a random pokemon after each "delay" seconds.
 * @param {*} delay Delay in miliseconds
 * @param {*} pokemons The list of pokemons to get a random one from
 * @returns A random pokemon
 */
export function usePokemonRandomizer({
  delay,
  pokemons,
}) {

  const [pokemon, setPokemon] = useState(NULL_POKEMON);
  const [previousPokemon, setPreviousPokemon] = useState(NULL_POKEMON);
  const [isFetchingImage, setIsFetchingImage] = useState(true);
  const timeout = useRef(null);

  function nextPokemon() {
    if(pokemons.length === 0) return;

    const newRandomPokemon = pickRandomPokemon(pokemons, false);
    setPreviousPokemon(pokemon);
    setPokemon(newRandomPokemon);
    // Yes, I know this is a hack, but I'll fix it later...
    setTimeout(() => setIsFetchingImage(false), 100);
  }

  // First random pokemon pick
  useEffect(() => {
    nextPokemon();
  }, []);

  useEffect(() => {
    // Clear timeout and jump to next pokemon in "delay" miliseconds.
    clearTimeout(timeout.current)
    timeout.current = setTimeout(function() {
      setIsFetchingImage(true);
      // If it has passed "delay" miliseconds, fetch a new image
      nextPokemon();
    }, delay);

    return () => clearTimeout(timeout.current);
  }, [pokemon]);

  return { pokemon, previousPokemon, isFetchingImage };
}
