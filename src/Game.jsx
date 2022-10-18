import { pickOptions, pickRandomPokemon } from './utils';
import pokemons from './assets/pokemons.json';
import { useRef, useState } from 'react';
import { Button, Card, Grid, Image, Text } from '@mantine/core';
import AppLayout from './AppLayout';
import { Link } from 'react-router-dom';

const DELAY=2000;

function getImageSrc(pokemon) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
}

const INITIAL_POKEMON = pickRandomPokemon(pokemons, false);
const INITIAL_OPTIONS = pickOptions(pokemons, INITIAL_POKEMON);
const TOTAL_ATTEMPTS = 10;

export function Game() {

  const [randomPokemon, setRandomPokemon] = useState(INITIAL_POKEMON);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [successCount, setSuccessCount] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(TOTAL_ATTEMPTS);
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
    <AppLayout>

      <Grid>
        <Grid.Col xs={12} sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
          <Text align='center'>{successCount} wins</Text>
        </Grid.Col>
        <Grid.Col xs={0} md={3} />
        <Grid.Col xs={12} md={6}>
          <Card shadow="sm" withBorder>
            <Card.Section>
              <Image
                className={selected ? 'image-selected-option' : 'image-waiting-option'}
                src={getImageSrc(randomPokemon)}
                alt="Pokemon"
                height={192}
                fit="contain"
              />
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col xs={0} md={3} />
        {options.map(option => (
          <Grid.Col key={option.id} xs={12} sm={6}>
            <Button
              fullWidth
              uppercase
              size="lg"
              radius="xs"
              disabled={selected && option.id !== selected.id && option.id !== randomPokemon.id}
              variant={selected?.id === option.id || (selected && option.id === randomPokemon.id) ? 'filled' : 'outline'}
              color={selected && randomPokemon.id === option.id ? 'green' :
                selected?.id === option.id ? 'red' : 'dark'
              }
              onClick={() => handlePokemonOptionClick(option)}
            >
              {option.name}
            </Button>
          </Grid.Col>
        ))}
        {remainingAttempts === 0 && (
          <Grid.Col xs={12}>
            <Text>Game finished!</Text>
            <Button
              fullWidth
              uppercase
              size='md'
              radius='xs'
              color="dark"
              variant='outline'
              component={Link}
              to="/"
            >
              Return to home
            </Button>
          </Grid.Col>
        )}
      </Grid>
    </AppLayout>
  )
}
