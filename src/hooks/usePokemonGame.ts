import { usePokemonRandomizer } from "@/hooks";
import { NULL_POKEMON, pickOptions } from "@/utils";
import { pokemons as POKEMONS } from '@assets/pokemons.json';
import { useEffect, useState } from "react";

interface Props {
  gameMode: GameMode;
}

export function usePokemonGame({ gameMode }: Props) {
  const {
    pokemon: pokemonToGuess,
    nextPokemon: nextRandomPokemon,
  } = usePokemonRandomizer({ pokemons: POKEMONS, deleteOnPick: gameMode.REMOVE_POKEMONS });
  const [options, setOptions] = useState<Pokemon[]>([]);
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [pickedOptions, setPickedOptions] = useState<PokemonOption[]>([]);

  useEffect(() => {
    if(pokemonToGuess.id === NULL_POKEMON.id) return;

    const newOptions = pickOptions(POKEMONS, pokemonToGuess);
    setSelected(null);
    setOptions(newOptions);
  }, [pokemonToGuess]);

  function selectOption(option: Pokemon) {
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
