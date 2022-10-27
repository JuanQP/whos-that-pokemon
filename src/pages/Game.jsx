import { GAME_MODES, NULL_POKEMON, pickOptions, pickRandomPokemon } from '@/utils';
import POKEMONS from '@assets/pokemons.json';
import { OptionButton } from '@components/Game/OptionButton';
import { PokemonCard } from '@components/Game/PokemonCard';
import { Button, Grid } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function Game() {

  const { mode } = useParams();
  const gameMode = mode === 'pokemon-master' ? GAME_MODES.PokemonMaster : GAME_MODES.Normal;
  const pokemons = useRef([]);
  const [pokemonToGuess, setPokemonToGuess] = useState(NULL_POKEMON);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(NULL_POKEMON);
  const [gameOver, setGameOver] = useState(false);
  const [pickedOptions, setPickedOptions] = useState([]);
  const timeout = useRef(null);

  // Initialize game
  useEffect(() => {
    // Copy list of pokémons
    pokemons.current = [...POKEMONS];
    // Pick first pokemon
    nextPokemon(pokemons.current);
  }, []);

  function nextPokemon(pokemons) {
    const newRandomPokemon = pickRandomPokemon(pokemons, gameMode.REMOVE_POKEMONS);
    const newOptions = pickOptions(POKEMONS, newRandomPokemon);

    setSelected(null);
    setPokemonToGuess({...newRandomPokemon});
    setOptions(newOptions);
  }

  useEffect(() => {
    if(!pokemonToGuess) return;

    // Clear timeout and set null choice if choice time expires.
    clearTimeout(timeout.current);
    timeout.current = setTimeout(function() {
      handlePokemonOptionClick(NULL_POKEMON);
    }, gameMode.TIME_TO_CHOOSE);

    return () => clearTimeout(timeout.current);
  }, [pokemonToGuess]); // Run this when a random pokemon is picked

  function handlePokemonOptionClick(selectedPokemon) {
    if(selected) return;

    // Stop timer if Pokemon selected
    clearTimeout(timeout.current);

    const isCorrectOption = selectedPokemon.id === pokemonToGuess.id;
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
    setSelected(selectedPokemon);

    if(gameMode.isGameOver(newPickedOptions, isCorrectOption)) {
      setGameOver(true);
      return;
    }

    // Next random pokemon in NEXT_POKEMON_DELAY miliseconds.
    timeout.current = setTimeout(function() {
      nextPokemon(pokemons.current);
    }, gameMode.NEXT_POKEMON_DELAY);
  }

  return (
    <Grid pb={60}>
      {!gameOver && (
        <>
          <Grid.Col xs={12}>
            <PokemonCard
              pokemon={pokemonToGuess}
              timeToChoose={gameMode.TIME_TO_CHOOSE}
              revealPokemon={!!selected}
            />
          </Grid.Col>
          {options.map((option, index) => (
            <Grid.Col key={option.id} xs={12} sm={6}>
              <OptionButton
                index={index}
                pokemonOption={option}
                pokemonToGuess={pokemonToGuess}
                selectedPokemon={selected}
                onClick={handlePokemonOptionClick}
              />
            </Grid.Col>
          ))}
        </>
      )}
      {gameOver && (
        <>
          <gameMode.GameOverMessage pickedOptions={pickedOptions} />
          <Button fullWidth component={Link} to="/">
            Return to home
          </Button>
        </>
      )}
    </Grid>
  )
}
