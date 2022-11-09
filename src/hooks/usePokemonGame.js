import { NULL_POKEMON, pickOptions } from "@/utils";
import POKEMONS from '@assets/pokemons.json';
import { useEffect, useState } from "react";
import { usePokemonRandomizer } from "./usePokemonRandomizer";

export function usePokemonGame({ gameMode }) {
  const {
    pokemon: pokemonToGuess,
    nextPokemon: nextRandomPokemon,
  } = usePokemonRandomizer({ pokemons: POKEMONS, deleteOnPick: gameMode.REMOVE_POKEMONS });
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [pickedOptions, setPickedOptions] = useState([]);

  useEffect(() => {
    if(pokemonToGuess.id === NULL_POKEMON.id) return;

    const newOptions = pickOptions(POKEMONS, pokemonToGuess);
    setSelected(null);
    setOptions(newOptions);
  }, [pokemonToGuess]);

  function selectOption(option) {
    const isCorrectOption = option.id === pokemonToGuess.id;
    const lastSelectedOption = {
      ...pokemonToGuess,
      isCorrectOption,
    };
    // Add this pokemon to the list of past choices
    const newPickedOptions = [
      ...pickedOptions,
      lastSelectedOption,
    ];
    setPickedOptions(newPickedOptions);
    setSelected({...option});

    if(gameMode.isGameOver(newPickedOptions, isCorrectOption)) {
      setGameOver(true);
    }
  }

  return {
    pokemonToGuess,
    options,
    gameOver,
    pickedOptions,
    selected,
    nextPokemon: nextRandomPokemon,
    selectOption,
  }
}
