import { GAME_MODES, getImageSrc, pickOptions, pickRandomPokemon, SECOND } from './utils';
import POKEMONS from './assets/pokemons.json';
import backgroundImage from './assets/whosthatpokemon.png'
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Grid, Image, Progress, Text } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { context } from './AppLayout';
import { OptionButton } from './components/OptionButton';

const TICK = SECOND / 2;

export function Game() {

  const { mode } = useParams();
  const gameMode = mode === 'pokemon-master' ? GAME_MODES.PokemonMaster : GAME_MODES.Normal;
  const pokemons = useRef([]);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [successCount, setSuccessCount] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(gameMode.TOTAL_ATTEMPTS);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pickedOptions, setPickedOptions] = useState([]);
  const isUsingGameboyTheme = useContext(context);
  const timeout = useRef(null);

  useEffect(() => {
    // Pick first pokemon
    pokemons.current = [...POKEMONS];
    const randomPokemon = pickRandomPokemon(pokemons.current, gameMode.REMOVE_POKEMONS);
    setRandomPokemon(randomPokemon);
    setOptions(pickOptions(POKEMONS, randomPokemon));
  }, []);

  useEffect(() => {
    // Clear timeout and jump to next pokemon in DELAY seconds.
    clearTimeout(timeout.current);
    timeout.current = setTimeout(function() {
      // If it has passed TIME_TO_CHOOSE miliseconds, selected option is null
      if(timer >= gameMode.TIME_TO_CHOOSE) {
        handlePokemonOptionClick({ id: null });
      } else {
        setTimer(previous => previous + TICK);
      }
    }, TICK);

    return () => clearTimeout(timeout.current);
  }, [timer]);

  function handleNextPokemonClick() {
    const newRandomPokemon = pickRandomPokemon(pokemons.current, gameMode.REMOVE_POKEMONS);
    const newOptions = pickOptions(POKEMONS, newRandomPokemon);
    setSelected(null);
    setRandomPokemon(newRandomPokemon);
    setOptions(newOptions);
    setTimer(0);
  }

  function handlePokemonOptionClick(selectedPokemon) {
    if(selected) return;

    // Stop timer if Pokemon selected
    clearTimeout(timeout.current);

    const isCorrectOption = selectedPokemon.id === randomPokemon.id;
    // Add this pokemon to the list of past guessings
    setPickedOptions([
      ...pickedOptions,
      { ...randomPokemon, isCorrectOption },
    ]);
    setSuccessCount(previous => isCorrectOption ? previous + 1 : previous);
    setSelected(selectedPokemon);
    setRemainingAttempts(previous => previous - 1);

    // Last attempt or game mode doesn't allow to fail: Game over.
    if(remainingAttempts === 1
      || (!isCorrectOption && gameMode.GAME_OVER_ON_FAIL)
      || pokemons.current.length === 0
    ) {
      setGameOver(true);
      return;
    }

    // Next random pokemon in NEXT_POKEMON_DELAY miliseconds.
    timeout.current = setTimeout(function() {
      handleNextPokemonClick();
    }, gameMode.NEXT_POKEMON_DELAY);
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
            value={selected ? 0 : (timer / gameMode.TIME_TO_CHOOSE) * 100}
            color="green"
            sx={{
              '& [role=progressbar]': {
                transition: `width ${selected ? '0' : TICK}ms linear`,
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
          <gameMode.GameOverMessage
            pickedOptions={pickedOptions}
            successCount={successCount}
          />
          <Button fullWidth component={Link} to="/">
            Return to home
          </Button>
        </>
      )}
    </Grid>
  )
}
