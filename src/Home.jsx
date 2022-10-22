import { Button, Card, Grid, Image, Modal, Progress, Stack, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getImageSrc, NULL_CHOICE, pickRandomPokemon, SECOND } from "./utils";
import pokemons from './assets/pokemons.json';
import { IconBrandGithub, IconInfoCircle, IconPokeball, } from "@tabler/icons";

const NEXT_IMAGE_DELAY = 10 * SECOND;

export function Home() {

  const [randomPokemon, setRandomPokemon] = useState(NULL_CHOICE);
  const [opened, setOpened] = useState(false);
  const [fetchingImage, setFetchingImage] = useState(true);
  const timeout = useRef(null);
  const pokemonImageSrc = getImageSrc(randomPokemon);

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
            value={fetchingImage ? 0 : 100}
            sx={{
              '& [role=progressbar]': {
                transition: `width ${fetchingImage ? '0' : NEXT_IMAGE_DELAY}ms linear`,
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
