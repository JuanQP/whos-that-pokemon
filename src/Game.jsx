import { getImageSrc, pickOptions, pickRandomPokemon } from './utils';
import pokemons from './assets/pokemons.json';
import backgroundImage from './assets/whosthatpokemon.png'
import { useContext, useRef, useState } from 'react';
import { Button, Card, Grid, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { context } from './AppLayout';
import { OptionButton } from './components/OptionButton';

const DELAY=2000;

const INITIAL_POKEMON = pickRandomPokemon(pokemons, false);
const INITIAL_OPTIONS = pickOptions(pokemons, INITIAL_POKEMON);
const TOTAL_ATTEMPTS = 10;

export function Game() {

  const [randomPokemon, setRandomPokemon] = useState(INITIAL_POKEMON);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [successCount, setSuccessCount] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(TOTAL_ATTEMPTS);
  const isUsingGameboyTheme = useContext(context);
  const timeout = useRef(null);

  function handleNextPokemonClick() {
    setSelected(null);
    const newRandomPokemon = pickRandomPokemon(pokemons, false);
    const newOptions = pickOptions(pokemons, newRandomPokemon);
    setRandomPokemon(newRandomPokemon);
    setOptions(newOptions);
  }

  function handlePokemonOptionClick(selectedPokemon) {
    if(selected) return;
    if(selectedPokemon.id === randomPokemon.id) {
      setSuccessCount(previous => previous + 1);
    }
    setSelected(selectedPokemon);
    setRemainingAttempts(previous => previous - 1);

    if(remainingAttempts === 1) {
      return;
    }

    // Clear timeout and jump to next pokemon in DELAY seconds.
    clearTimeout(timeout.current)
    timeout.current = setTimeout(function() {
      handleNextPokemonClick();
    }, DELAY);
  }

  return (
    <Grid>
      <Grid.Col xs={0} md={3} />
      <Grid.Col xs={12} md={6}>
        <Card withBorder>
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
