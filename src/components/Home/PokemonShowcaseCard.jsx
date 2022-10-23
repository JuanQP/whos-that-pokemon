import { Card, createStyles, Image, Progress, Text, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import { getImageSrc } from "@/utils";
import { usePokemonRandomizer } from "@/hooks/usePokemonRandomizer";
import pokemons from '@assets/pokemons.json';

const useStyles = createStyles(() => ({
  div: {
    minHeight: 192,
    display: 'flex',
    justifyContent: 'center',
  }
}));

export function PokemonShowcaseCard({ delay }) {

  const { classes } = useStyles();
  const { pokemon, previousPokemon, isFetchingImage } = usePokemonRandomizer({
    delay,
    pokemons,
  });
  const [showFirstImage, setShowFirstImage] = useState(true);
  const pokemonImageSrc = getImageSrc(pokemon);
  const previousImageSrc = getImageSrc(previousPokemon);

  useEffect(() => {
    setShowFirstImage(previous => !previous);
  }, [pokemon]);

  return (
    <Card px={0} pb={0}>
      <div className={classes.div}>
        <div>
          <Transition
            mounted={showFirstImage}
            transition="fade"
            duration={1000}
            timingFunction="linear"
          >
            {(styles) => (
              <Card.Section style={styles}>
                <Image
                  src={showFirstImage ? pokemonImageSrc : previousImageSrc}
                  height={192}
                  fit="contain"
                  alt=" "
                  sx={{ filter: 'drop-shadow(2px 2px 2px #000A)' }}
                />
              </Card.Section>
            )}
          </Transition>
        </div>

        <div style={{position: 'absolute',}}>
          <Transition
            mounted={!showFirstImage}
            transition="fade"
            duration={1000}
            timingFunction="linear"
          >
            {(styles) => (
              <Card.Section style={styles}>
                <Image
                  src={!showFirstImage ? pokemonImageSrc : previousImageSrc}
                  height={192}
                  fit="contain"
                  alt=" "
                  sx={{ filter: 'drop-shadow(2px 2px 2px #000A)' }}
                />
              </Card.Section>
            )}
          </Transition>
        </div>
      </div>
      <Text align="center" transform="capitalize">
        {pokemon.name}
      </Text>
      <Progress
        radius="none"
        value={isFetchingImage ? 0 : 100}
        sx={{
          '& [role=progressbar]': {
            transition: `width ${isFetchingImage ? '0' : delay}ms linear`,
          }
        }}
      />
    </Card>
  )
}
