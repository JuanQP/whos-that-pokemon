import { pickRandomPokemon, randomNumber } from "@/helpers";
import { useRef, useState } from "react";

interface Props {
  pokemons: Pokemon[];
  deleteOnPick: boolean;
}

export function usePokemonRandomizer({ pokemons, deleteOnPick }: Props) {
  const [pokemon, setPokemon] = useState(pokemons[randomNumber(0, 151)]);
  const remainingPokemons = useRef([...pokemons]);

  function nextPokemon() {
    const noRemainingPokemons = remainingPokemons.current.length === 0;
    if(noRemainingPokemons) return;

    const newRandomPokemon = pickRandomPokemon(remainingPokemons.current, deleteOnPick);
    setPokemon({ ...newRandomPokemon });
    return newRandomPokemon
  }

  return { pokemon, nextPokemon };
}
