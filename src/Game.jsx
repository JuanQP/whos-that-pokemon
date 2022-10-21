import { GAME_MODES, getImageSrc, pickOptions, pickRandomPokemon } from './utils';
import POKEMONS from './assets/pokemons.json';
import backgroundImage from './assets/whosthatpokemon.png'
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Grid, Image, Progress, Text } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { context } from './AppLayout';
import { OptionButton } from './components/OptionButton';

const NULL_CHOICE = {
  id: null,
  name: "No option",
  src: null,
};

export function Game() {

  const { mode } = useParams();
  const gameMode = mode === 'pokemon-master' ? GAME_MODES.PokemonMaster : GAME_MODES.Normal;
  const pokemons = useRef([]);
  const [randomPokemon, setRandomPokemon] = useState(NULL_CHOICE);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [pickedOptions, setPickedOptions] = useState([]);
  const isUsingGameboyTheme = useContext(context);
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
    setRandomPokemon(newRandomPokemon);
    setOptions(newOptions);
  }

  useEffect(() => {
    if(!randomPokemon) return;

    // Clear timeout and set null choice if choice time expires.
    clearTimeout(timeout.current);
    timeout.current = setTimeout(function() {
      handlePokemonOptionClick(NULL_CHOICE);
    }, gameMode.TIME_TO_CHOOSE);

    return () => clearTimeout(timeout.current);
  }, [randomPokemon]); // Run this when a random pokemon is picked

  function handlePokemonOptionClick(selectedPokemon) {
    if(selected) return;

    // Stop timer if Pokemon selected
    clearTimeout(timeout.current);

    const isCorrectOption = selectedPokemon.id === randomPokemon.id;
    // Add this pokemon to the list of past choices
    const newPickedOptions = [
      ...pickedOptions,
      { ...randomPokemon, isCorrectOption },
    ]
    setPickedOptions(newPickedOptions);
    setSelected(selectedPokemon);

    // Last attempt or game mode doesn't allow to fail: Game over.
    if(newPickedOptions.length === gameMode.TOTAL_ATTEMPTS
      || (!isCorrectOption && gameMode.GAME_OVER_ON_FAIL)
    ) {
      setGameOver(true);
      return;
    }

    // Next random pokemon in NEXT_POKEMON_DELAY miliseconds.
    timeout.current = setTimeout(function() {
      handleNextPokemonClick();
    }, gameMode.NEXT_POKEMON_DELAY);
  }

  function handleNextPokemonClick() {
    nextPokemon(pokemons.current);
  }

  if(randomPokemon === null) {
    return <Text>Loading...</Text>;
  }

  return (
    <Grid pb={60}>
      <Grid.Col xs={0} sm={3} />
      <Grid.Col xs={12} sm={6} >
        <Card withBorder pb={0} px={0}>
          <Card.Section
            sx={ !isUsingGameboyTheme ? {
            backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : undefined }
          >
            <Image
              className={selected ? 'image-selected-option' : 'image-waiting-option'}
              src={getImageSrc(randomPokemon)}
              alt="Pokemon"
              height={192}
              ml={isUsingGameboyTheme ? undefined : "xs"}
              width={isUsingGameboyTheme ? undefined : 192}
              fit="contain"
            />
          </Card.Section>
          <Progress
            radius="none"
            value={selected ? 0 : 100}
            color="green"
            sx={{
              '& [role=progressbar]': {
                transition: `width ${selected ? '0' : gameMode.TIME_TO_CHOOSE}ms linear`,
              }
            }}
          />
        </Card>
      </Grid.Col>
      <Grid.Col xs={0} sm={3} />
      {options.map((option, index) => (
        <Grid.Col key={option.id} xs={12} sm={6}>
          <OptionButton
            index={index}
            pokemonOption={option}
            randomPokemon={randomPokemon}
            selectedPokemon={selected}
            onClick={handlePokemonOptionClick}
          />
        </Grid.Col>
      ))}
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
