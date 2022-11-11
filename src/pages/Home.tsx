import { usePokemonRandomizer } from "@/hooks";
import { SECOND } from "@/utils";
import { pokemons as POKEMONS } from '@assets/pokemons.json';
import { GameModeModal } from "@components/Home/GameModeModal";
import { PokemonShowcaseCard } from "@components/Home/PokemonShowcaseCard";
import { Button, Card, Grid, Text } from "@mantine/core";
import { IconBrandGithub, IconInfoCircle, IconPokeball } from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const NEXT_IMAGE_DELAY = 10 * SECOND;

export function Home() {

  const [modalOpened, setOpenedModal] = useState(false);
  const { pokemon, nextPokemon } = usePokemonRandomizer({
    pokemons: POKEMONS,
    deleteOnPick: false,
  });

  useEffect(() => {
    nextPokemon();
    const interval = setInterval(nextPokemon, NEXT_IMAGE_DELAY);
    return () => clearInterval(interval);
  }, []);

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
        <PokemonShowcaseCard pokemon={pokemon} delay={NEXT_IMAGE_DELAY} />
      </Grid.Col>
      <Grid.Col xs={12}>
        <Button
          fullWidth
          leftIcon={<IconPokeball />}
          onClick={() => setOpenedModal(true)}
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
      <GameModeModal opened={modalOpened} onClose={() => setOpenedModal(false)} />
    </Grid>
  )
}
