import { Button, Card, Grid, Image, Modal, Progress, Stack, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getImageSrc, pickRandomPokemon, SECOND } from "./utils";
import pokemons from './assets/pokemons.json';
import { IconBrandGithub, IconInfoCircle, IconPokeball, } from "@tabler/icons";

const NEXT_IMAGE_DELAY = 10 * SECOND;
const TICK = SECOND;
const INITIAL_POKEMON = pickRandomPokemon(pokemons, false);

export function Home() {

  const [randomPokemon, setRandomPokemon] = useState(INITIAL_POKEMON);
  const [timer, setTimer] = useState(0);
  const [opened, setOpened] = useState(false);
  const timeout = useRef(null);
  const pokemonImageSrc = getImageSrc(randomPokemon);

  useEffect(() => {
    // Clear timeout and jump to next pokemon in NEXT_IMAGE_DELAY miliseconds.
    clearTimeout(timeout.current)
    timeout.current = setTimeout(function() {
      // If it has passed NEXT_IMAGE_DELAY miliseconds, fetch a new image
      if(timer >= NEXT_IMAGE_DELAY) {
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
            // color="green"
            sx={{
              '& [role=progressbar]': {
                transition: `width ${TICK}ms linear`,
              }
            }}
          />
        </Card>
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
      <Modal
        title="Game mode"
        opened={opened}
        size="md"
        withCloseButton={false}
        onClose={() => setOpened(false)}
      >
        <Stack sx={{width: '100%'}}>
          <Button size="md" component={Link} to="/play/normal">
            Normal
          </Button>
          <Text color="gray.7" size="sm">
            Try to guess 10 Pokémons
          </Text>
          <Button size="md" component={Link} to="/play/pokemon-master">
            Pokémon master
          </Button>
          <Text color="gray.7" size="sm">
            Try to guess all the 151 Pokémons
          </Text>
        </Stack>
      </Modal>
    </Grid>
  )
}
