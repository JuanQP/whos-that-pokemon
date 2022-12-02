import { GAME_MODES, NULL_POKEMON, TIME_BEFORE_START } from '@/constants';
import { pickOptions } from '@/helpers';
import { usePokemonRandomizer, useTimer } from '@/hooks';
import { pokemons as POKEMONS } from '@assets/pokemons.json';
import { OptionButton } from '@components/Game/OptionButton';
import { PokemonCard } from '@components/Game/PokemonCard';
import { Button, Card, Grid, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const mockOptions: Pokemon[] = [
  {id: 1, name: "Option A"},
  {id: 2, name: "Option B"},
  {id: 3, name: "Option C"},
  {id: 4, name: "Option D"},
];

export function Game() {

  const { mode } = useParams();
  const gameMode = mode === 'pokemon-master' ? GAME_MODES.PokemonMaster : GAME_MODES.Normal;
  const { GameOverMessage } = gameMode;
  const { done: gameStarted, remainingTime } = useTimer(startGame, TIME_BEFORE_START);
  const { pokemon: pokemonToGuess, nextPokemon: nextRandomPokemon } = usePokemonRandomizer({
    pokemons: POKEMONS,
    deleteOnPick: gameMode.REMOVE_POKEMONS,
  });
  const [options, setOptions] = useState<Pokemon[]>([]);
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [guessings, setGuessings] = useState<PokemonGuessing[]>([]);
  const timeout = useRef<number>();

  useEffect(() => {
    return () => window.clearTimeout(timeout.current);
  }, []);

  function startGame() {
    nextPokemon()
  }

  function handleOptionClick(selectedPokemon: Pokemon) {
    // Stop timer when a Pokemon is selected
    clearTimeout(timeout.current);

    const isCorrectOption = selectedPokemon.id === pokemonToGuess.id;
    const lastGuessing = {
      ...pokemonToGuess,
      isCorrectOption,
    };
    // Put this new attempt to guess in the list of past guessed pokemons
    const newGuessings = [
      ...guessings,
      lastGuessing,
    ];
    setGuessings(newGuessings);
    setSelected({ ...selectedPokemon })

    if(gameMode.isGameOver(newGuessings, isCorrectOption)) {
      setGameOver(true);
      return;
    }

    // Next pokemon in NEXT_POKEMON_DELAY miliseconds...
    timeout.current = window.setTimeout(nextPokemon, gameMode.NEXT_POKEMON_DELAY);
  }

  function nextPokemon() {
    // Pick new options and select a random pokemon
    const newRandomPokemon = nextRandomPokemon()
    if(!newRandomPokemon) throw new Error("No more pokemons in pokemons list");
    const newOptions = pickOptions(POKEMONS, newRandomPokemon);
    setSelected(null);
    setOptions(newOptions);

    console.log(newRandomPokemon)
    console.log(newOptions)

    // Set null choice if user doesn't select a pokemon after TIME_TO_CHOOSE miliseconds
    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      handleOptionClick({ ...NULL_POKEMON });
    }, gameMode.TIME_TO_CHOOSE);
  }

  return (
    <Grid pb={60}>
      {gameStarted ? null : (
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
      {gameOver ? null : (
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
