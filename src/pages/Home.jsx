import { SECOND } from "@/utils";
import { GameModeModal } from "@components/Home/GameModeModal";
import { PokemonShowcaseCard } from "@components/Home/PokemonShowcaseCard";
import { Button, Card, Grid, Text } from "@mantine/core";
import { IconBrandGithub, IconInfoCircle, IconPokeball } from "@tabler/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const NEXT_IMAGE_DELAY = 10 * SECOND;

export function Home() {

  const [opened, setOpened] = useState(false);

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
        <PokemonShowcaseCard delay={NEXT_IMAGE_DELAY} />
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
