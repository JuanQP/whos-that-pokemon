import { getImageSrc, pickOptions, pickRandomPokemon, SECOND } from './utils';
import pokemons from './assets/pokemons.json';
import backgroundImage from './assets/whosthatpokemon.png'
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Grid, Image, Progress, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { context } from './AppLayout';
import { OptionButton } from './components/OptionButton';

const TIME_TO_CHOOSE = 5 * SECOND;
const NEXT_POKEMON_DELAY = 3 * SECOND;
const TICK = SECOND;

const INITIAL_POKEMON = pickRandomPokemon(pokemons, false);
const INITIAL_OPTIONS = pickOptions(pokemons, INITIAL_POKEMON);
const TOTAL_ATTEMPTS = 10;

export function Game() {

  const [randomPokemon, setRandomPokemon] = useState(INITIAL_POKEMON);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [successCount, setSuccessCount] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(TOTAL_ATTEMPTS);
  const [timer, setTimer] = useState(0);
  const isUsingGameboyTheme = useContext(context);
  const timeout = useRef(null);

  useEffect(() => {
    // Clear timeout and jump to next pokemon in DELAY seconds.
    clearTimeout(timeout.current);
    timeout.current = setTimeout(function() {
      // If it has passed TIME_TO_CHOOSE miliseconds, selected option is null
      if(timer >= TIME_TO_CHOOSE) {
        handlePokemonOptionClick({ id: null });
      } else {
        setTimer(previous => previous + TICK);
      }
    }, TICK);

    return () => clearTimeout(timeout.current);
  }, [timer]);

  function handleNextPokemonClick() {
    setSelected(null);
    setTimer(0);
    const newRandomPokemon = pickRandomPokemon(pokemons, false);
    const newOptions = pickOptions(pokemons, newRandomPokemon);
    setRandomPokemon(newRandomPokemon);
    setOptions(newOptions);
  }

  function handlePokemonOptionClick(selectedPokemon) {
    if(selected) return;

    // Stop timer if Pokemon selected
    clearTimeout(timeout.current);

    if(selectedPokemon.id === randomPokemon.id) {
      setSuccessCount(previous => previous + 1);
    }
    setSelected(selectedPokemon);
    setRemainingAttempts(previous => previous - 1);

    // That was the last attempt. Game over.
    if(remainingAttempts === 1) {
      return;
    }

    // Next random pokemon in NEXT_POKEMON_DELAY miliseconds.
    timeout.current = setTimeout(function() {
      handleNextPokemonClick();
    }, NEXT_POKEMON_DELAY);
  }

  return (
    <Grid>
      <Grid.Col xs={0} md={3} />
      <Grid.Col xs={12} md={6}>
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
            value={selected ? 0 : (timer / TIME_TO_CHOOSE) * 100}
            color="green"
            sx={{
              '& [role=progressbar]': {
                transition: `width ${selected ? '0' : TICK}ms linear`,
              }
            }}
          />
        </Card>
      </Grid.Col>
      <Grid.Col xs={0} md={3} />
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
      {remainingAttempts === 0 && (
        <Grid.Col xs={12}>
          <Text>Game finished! You've guessed {successCount} pokemons</Text>
          <Button fullWidth component={Link} to="/">
            Return to home
          </Button>
        </Grid.Col>
      )}
    </Grid>
  )
}
