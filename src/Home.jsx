import { Button, Card, Grid, Image, Progress, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getImageSrc, pickRandomPokemon } from "./utils";
import pokemons from './assets/pokemons.json';
import { IconBrandGithub, IconInfoCircle, IconPokeball, } from "@tabler/icons";

const DELAY = 10000;
const TICK = 1000;
const INITIAL_POKEMON = pickRandomPokemon(pokemons, false);

export function Home() {

  const [randomPokemon, setRandomPokemon] = useState(INITIAL_POKEMON);
  const [timer, setTimer] = useState(DELAY); // Force fetch image on start
  const timeout = useRef(null);
  const pokemonImageSrc = getImageSrc(randomPokemon);

  useEffect(() => {
    // Clear timeout and jump to next pokemon in DELAY seconds.
    clearTimeout(timeout.current)
    timeout.current = setTimeout(function() {
      // If it has passed DELAY seconds, fetch a new image
      if(timer >= DELAY) {
        const randomPokemon = pickRandomPokemon(pokemons, false);
        setRandomPokemon(randomPokemon);
        setTimer(0);
      } else {
        setTimer(previous => previous + TICK);
      }
    }, TICK);

    return () => clearTimeout(timeout.current);
  }, [timer]);

  return (
    <Grid>
      <Grid.Col xs={12}>
        <Text>
          How many Pokémons do you know? Let's find out!
        </Text>
        <Text>
          Press PLAY to begin!
        </Text>
      </Grid.Col>
      <Grid.Col xs={12}>
        <Card px={0} pb={0}>
          <Card.Section>
            <Image
              src={pokemonImageSrc}
              height={192}
              fit="contain"
              alt="Random pokémon"
            />
          </Card.Section>
          <Text align="center" transform="capitalize">
            {randomPokemon.name}
          </Text>
          <Progress
            radius="none"
            value={timer / 100}
            color="green"
            sx={{
              '& [role=progressbar]': {
                transition: `width ${TICK}ms linear`,
              }
            }}
          />
        </Card>
      </Grid.Col>
      <Grid.Col xs={12}>
        <Button leftIcon={<IconPokeball />} fullWidth component={Link} to="/play">
          Play
        </Button>
      </Grid.Col>
      <Grid.Col xs={12} sm={6}>
        <Button leftIcon={<IconInfoCircle />} fullWidth component={Link} to="/about">
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
    </Grid>
  )
}
