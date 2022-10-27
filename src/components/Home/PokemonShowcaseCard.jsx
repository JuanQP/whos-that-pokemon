import { usePokemonRandomizer } from "@/hooks/usePokemonRandomizer";
import { getImageSrc } from "@/utils";
import pokemons from '@assets/pokemons.json';
import { Card, createStyles, Image, Progress, Text } from "@mantine/core";
import { useEffect, useState } from "react";

const useStyles = createStyles(() => ({
  div: {
    minHeight: 192,
    display: 'flex',
    justifyContent: 'center',
  },
  rotateIn1: {
    transform: 'rotateY(0deg)',
    transition: 'transform 1.5s ease-in-out',
    backfaceVisibility: 'hidden',
  },
  rotateOut1: {
    transform: 'rotateY(180deg)',
    transition: 'transform 1.5s ease-in-out',
    backfaceVisibility: 'hidden',
  },
  rotateIn2: {
    transform: 'rotateY(0deg)',
    transition: 'transform 1.5s ease-in-out',
    backfaceVisibility: 'hidden',
  },
  rotateOut2: {
    transform: 'rotateY(-180deg)',
    transition: 'transform 1.5s ease-in-out',
    backfaceVisibility: 'hidden',
  },
  image: {
    filter: 'drop-shadow(2px 2px 2px #000A)',
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
          <Card.Section className={
            showFirstImage ? classes.rotateIn1 : classes.rotateOut1
          }>
            <Image
              src={showFirstImage ? pokemonImageSrc : previousImageSrc}
              height={192}
              fit="contain"
              alt=" "
              sx={classes.image}
            />
          </Card.Section>
        </div>
        <div style={{ position: 'absolute' }}>
          <Card.Section className={
            !showFirstImage ? classes.rotateIn2 : classes.rotateOut2
          }>
            <Image
              src={!showFirstImage ? pokemonImageSrc : previousImageSrc}
              height={192}
              fit="contain"
              alt=" "
              className={classes.image}
            />
          </Card.Section>
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
