import { Button, Card, Grid, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NULL_POKEMON, pickRandomPokemon, SECOND } from "./utils";
import pokemons from './assets/pokemons.json';
import { IconBrandGithub, IconInfoCircle, IconPokeball, } from "@tabler/icons";
import { PokemonShowcaseCard } from "./components/Home/PokemonShowcaseCard";
import { GameModeModal } from "./components/Home/GameModeModal";

const NEXT_IMAGE_DELAY = 10 * SECOND;

export function Home() {

  const [randomPokemon, setRandomPokemon] = useState(NULL_POKEMON);
  const [opened, setOpened] = useState(false);
  const [fetchingImage, setFetchingImage] = useState(true);
  const timeout = useRef(null);

  useEffect(() => {
    nextPokemon();
  }, []);

  function nextPokemon() {
    const newRandomPokemon = pickRandomPokemon(pokemons, false);
    setRandomPokemon(newRandomPokemon);
    // Yes, I know this is a hack, but I'll fix it later...
    setTimeout(() => setFetchingImage(false), 100);
  }

  useEffect(() => {
    // Clear timeout and jump to next pokemon in NEXT_IMAGE_DELAY miliseconds.
    clearTimeout(timeout.current)
    timeout.current = setTimeout(function() {
      setFetchingImage(true);
      // If it has passed NEXT_IMAGE_DELAY miliseconds, fetch a new image
      nextPokemon();
    }, NEXT_IMAGE_DELAY);

    return () => clearTimeout(timeout.current);
  }, [randomPokemon]);

  return (
    <Grid>
      <Grid.Col xs={12}>
        <Card>
          <Text>
            How many Pokémons do you know? Let's find out!
          </Text>
          <Text
            weight="bold"
            variant="gradient"
            gradient={{ from: 'red', to: 'blue' }}
          >
            Press PLAY to begin!
          </Text>
        </Card>
      </Grid.Col>
      <Grid.Col xs={12}>
        <PokemonShowcaseCard
          delay={NEXT_IMAGE_DELAY}
          isFetchingImage={fetchingImage}
          pokemon={randomPokemon}
        />
      </Grid.Col>
      <Grid.Col xs={12}>
        <Button
          fullWidth
          leftIcon={<IconPokeball />}
          onClick={() => setOpened(true)}
        >
          Play
        </Button>
      </Grid.Col>
      <Grid.Col xs={12} sm={6}>
        <Button fullWidth leftIcon={<IconInfoCircle />} component={Link} to="/about">
          About
        </Button>
      </Grid.Col>
      <Grid.Col xs={12} sm={6}>
        <Button
          fullWidth
          component={'a'}
          href="https://github.com/JuanQP/whos-that-pokemon"
          target="_blank"
          leftIcon={<IconBrandGithub />}
        >
          GitHub
        </Button>
      </Grid.Col>
      <GameModeModal opened={opened} onClose={() => setOpened(false)} />
    </Grid>
  )
}
