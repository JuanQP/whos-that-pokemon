import { NULL_POKEMON, pickRandomPokemon } from "@/utils";
import { useRef, useState } from "react";

interface Props {
  pokemons: Pokemon[];
  deleteOnPick: boolean;
}

/**
 * Returns a random pokemon after each "delay" seconds.
 * @param {*} delay Delay in miliseconds
 * @param {*} pokemons The list of pokemons to get a random one from
 * @returns A random pokemon
 */
export function usePokemonRandomizer({ pokemons, deleteOnPick = false }: Props) {
  const [pokemon, setPokemon] = useState(NULL_POKEMON);
  const remainingPokemons = useRef([...pokemons]);

  function nextPokemon() {
    if(remainingPokemons.current.length === 0) return NULL_POKEMON;

    const newRandomPokemon = pickRandomPokemon(remainingPokemons.current, deleteOnPick);
    setPokemon({ ...newRandomPokemon });
  }

  return { pokemon, nextPokemon };
}
