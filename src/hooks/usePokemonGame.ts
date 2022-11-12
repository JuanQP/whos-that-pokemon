import { usePokemonRandomizer } from "@/hooks";
import { pickOptions } from "@/utils";
import { pokemons as POKEMONS } from '@assets/pokemons.json';
import { useEffect, useState } from "react";

interface Props {
  gameMode: GameMode;
  gameStarted: boolean;
}

export function usePokemonGame({ gameMode, gameStarted }: Props) {
  const { pokemon: pokemonToGuess, nextPokemon: nextRandomPokemon } = usePokemonRandomizer({
    pokemons: POKEMONS,
    deleteOnPick: gameMode.REMOVE_POKEMONS,
  });
  const [options, setOptions] = useState<Pokemon[]>([]);
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [guessings, setGuessings] = useState<PokemonGuessing[]>([]);

  useEffect(() => {
    if(!gameStarted) return;
    // A new pokemon has been randomly picked
    // Pick 4 random options, and reset previously selected pokemon
    const newOptions = pickOptions(POKEMONS, pokemonToGuess);
    setSelected(null);
    setOptions(newOptions);
  }, [pokemonToGuess, gameStarted]);

  function selectOption(option: Pokemon) {
    const isCorrectOption = option.id === pokemonToGuess.id;
    // Add the current pokemon to be guessed and store with it
    // if it was guessed
    const lastGuessing = {
      ...pokemonToGuess,
      isCorrectOption,
    };
    // Put this new attempt to guess in the list of past random pokemons
    const newGuessings = [
      ...guessings,
      lastGuessing,
    ];
    setGuessings(newGuessings);
    setSelected({...option});

    if(gameMode.isGameOver(newGuessings, isCorrectOption)) {
      setGameOver(true);
    }
  }

  return {
    pokemonToGuess,
    options,
    gameOver,
    guessings,
    selected,
    nextPokemon: nextRandomPokemon,
    selectOption,
  }
}
