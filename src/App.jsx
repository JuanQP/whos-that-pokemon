import { Button, Card, Container, Grid, Image, Text, Title } from '@mantine/core';
import { useRef, useState } from 'react'
import './App.css'
import pokemons from './assets/pokemons.json';
import { pickOptions, pickRandomPokemon } from './utils';

const DELAY=2000;

function getImageSrc(pokemon) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [successCount, setSuccessCount] = useState(0);
  const timeout = useRef(null);

  function handleNextPokemonClick() {
    setIsPlaying(true);
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

    // Clear timeout and jump to next pokemon in DELAY seconds.
    clearTimeout(timeout.current)
    timeout.current = setTimeout(function() {
      handleNextPokemonClick();
    }, DELAY);
  }

  return (
    <Container size="sm" mt="sm">
      <Grid>
        <Grid.Col xs={12}>
          <Title>Who's that Pokémon?</Title>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Text>{successCount} wins</Text>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Button
            variant="filled"
            disabled={isPlaying}
            onClick={handleNextPokemonClick}
          >
            {isPlaying ? "Already playing!" : "Play"}
          </Button>
        </Grid.Col>
        {isPlaying && (
        <>
          <Grid.Col xs={0} md={3} />
          <Grid.Col xs={12} md={6}>
            <Card shadow="sm">
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
            <Grid.Col key={option.id} xs={12} md={6}>
              <Button
                fullWidth
                uppercase
                size="md"
                disabled={selected && option.id !== selected.id && option.id !== randomPokemon.id}
                variant={selected?.id === option.id || (selected && option.id === randomPokemon.id) ? 'filled' : 'outline'}
                color={selected && randomPokemon.id === option.id ? 'green' :
                  selected?.id === option.id ? 'red' : undefined
                }
                onClick={() => handlePokemonOptionClick(option)}
              >
                {option.name}
              </Button>
            </Grid.Col>
          ))}
        </>
        )}
      </Grid>
    </Container>
  )
}

export default App
