import { usePokemonGame, useTimer } from '@/hooks';
import { GAME_MODES, NULL_POKEMON } from '@/utils';
import { OptionButton } from '@components/Game/OptionButton';
import { PokemonCard } from '@components/Game/PokemonCard';
import { Button, Card, Grid, Text } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

const mockOptions: Pokemon[] = [
  {id: 1, name: "Option A"},
  {id: 2, name: "Option B"},
  {id: 3, name: "Option C"},
  {id: 4, name: "Option D"},
];

const TIME_BEFORE_START = 5;

export function Game() {

  const { mode } = useParams();
  const gameMode = mode === 'pokemon-master' ? GAME_MODES.PokemonMaster : GAME_MODES.Normal;
  const { done: gameStarted, remainingTime } = useTimer({ seconds: TIME_BEFORE_START });
  const {
    pokemonToGuess,
    options,
    gameOver,
    pickedOptions,
    selected,
    nextPokemon,
    selectOption,
  } = usePokemonGame({ gameMode });
  const timeout = useRef<number>();

  useEffect(() => {
    if(gameStarted) {
      nextPokemon();
    }
  }, [gameStarted]);

  useEffect(() => {
    if(pokemonToGuess.id === NULL_POKEMON.id || gameOver) return;
    // Reset timer and set null choice if choice time expires.
    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      handlePokemonOptionClick({ ...NULL_POKEMON });
    }, gameMode.TIME_TO_CHOOSE);

    return () => clearTimeout(timeout.current);
  }, [pokemonToGuess]); // Run this when a random pokemon is picked

  function handlePokemonOptionClick(selectedPokemon: Pokemon) {
    selectOption(selectedPokemon);
    // Stop timer if Pokemon selected
    clearTimeout(timeout.current);
    // Next pokemon in NEXT_POKEMON_DELAY miliseconds.
    timeout.current = window.setTimeout(nextPokemon, gameMode.NEXT_POKEMON_DELAY);
  }

  return (
    <Grid pb={60}>
      {!gameStarted && (
        <Grid.Col xs={12}>
          <Card>
            <Text align="center">
              The game will start in
            </Text>
            <Text color="teal" size={72} align="center">
              {remainingTime}
            </Text>
          </Card>
        </Grid.Col>
      )}
      {!gameOver && (
        <>
          <Grid.Col xs={12}>
            <PokemonCard
              gameStarted={gameStarted}
              pokemon={pokemonToGuess}
              timeToChoose={gameMode.TIME_TO_CHOOSE}
              revealPokemon={!!selected}
            />
          </Grid.Col>
          {(gameStarted ? options : mockOptions).map((option, index) => (
            <Grid.Col key={option.id} xs={12} sm={6}>
              <OptionButton
                index={index}
                gameStarted={gameStarted}
                pokemonOption={option}
                pokemonToGuess={pokemonToGuess}
                selectedPokemon={selected}
                onClick={handlePokemonOptionClick}
              />
            </Grid.Col>
          ))}
        </>
      )}
      {gameOver && gameStarted && (
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
