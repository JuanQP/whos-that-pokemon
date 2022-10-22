import { GAME_MODES, getImageSrc, pickOptions, pickRandomPokemon } from './utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, createStyles, Grid, Image, Progress } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { context } from './AppLayout';
import { OptionButton } from './components/OptionButton';
import POKEMONS from './assets/pokemons.json';
import whosThatPokemonBackgroundUrl from './assets/whos-that-pokemon.png';

const NULL_CHOICE = {
  id: null,
  name: "No option",
  src: null,
};

const useStyles = createStyles(() => ({
  waiting: {
    filter: 'brightness(0)'
  },
  show: {
    filter: 'brightness(1)',
    transition: 'filter 0.5s ease-in-out',
  },
  card: {
    backgroundImage: `url(${whosThatPokemonBackgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export function Game() {

  const { mode } = useParams();
  const  { classes } = useStyles();
  const gameMode = mode === 'pokemon-master' ? GAME_MODES.PokemonMaster : GAME_MODES.Normal;
  const pokemons = useRef([]);
  const [randomPokemon, setRandomPokemon] = useState(NULL_CHOICE);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(NULL_CHOICE);
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

  return (
    <Grid pb={60}>
      {!gameOver && (
        <>
          <Grid.Col xs={12}>
            <Card withBorder pb={0} px={0}>
              <Card.Section
                className={ !isUsingGameboyTheme ? classes.card : undefined }
              >
                <Image
                  className={selected ? classes.show : classes.waiting}
                  src={getImageSrc(randomPokemon)}
                  alt="Pokemon"
                  ml={isUsingGameboyTheme ? "25%" : "5%"}
                  fit="contain"
                  imageProps={{
                    style: { width: '50%' }
                  }}
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
