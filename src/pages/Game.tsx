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
  const { GameOverMessage } = gameMode;
  const { done: gameStarted, remainingTime } = useTimer(() => {}, TIME_BEFORE_START);
  const {
    pokemonToGuess,
    options,
    gameOver,
    guessings,
    selected,
    nextPokemon,
    selectOption,
  } = usePokemonGame({ gameMode, gameStarted });
  const timeout = useRef<number>();

  useEffect(() => {
    return () => window.clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    if(gameOver || !gameStarted) return;
    // Now the user is playing
    // Set null choice after TIME_TO_CHOOSE miliseconds
    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      handleOptionClick({ ...NULL_POKEMON });
    }, gameMode.TIME_TO_CHOOSE);
  }, [pokemonToGuess, gameOver, gameStarted]);

  function handleOptionClick(selectedPokemon: Pokemon) {
    // Stop timer when a Pokemon is selected
    clearTimeout(timeout.current);
    selectOption({ ...selectedPokemon });
    // Next pokemon in NEXT_POKEMON_DELAY miliseconds...
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
                onClick={handleOptionClick}
              />
            </Grid.Col>
          ))}
        </>
      )}
      {gameOver && gameStarted && (
        <>
          <GameOverMessage guessings={guessings} />
          <Button fullWidth component={Link} to="/">
            Return to home
          </Button>
        </>
      )}
    </Grid>
  )
}
