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
  beforeRotateIn: {
    transform: 'rotateY(-180deg)',
    transition: 'none',
    backfaceVisibility: 'hidden',
  },
  rotateIn: {
    transform: 'rotateY(0deg)',
    transition: 'transform 2s ease-in-out',
    backfaceVisibility: 'hidden',
  },
  beforeRotateOut: {
    transform: 'rotateY(0deg)',
    transition: 'none',
    backfaceVisibility: 'hidden',
  },
  rotateOut: {
    transform: 'rotateY(180deg)',
    transition: 'transform 2s ease-in-out',
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

  let image1Class, image2Class;
  if(isFetchingImage) {
    image1Class = showFirstImage ? classes.beforeRotateIn : classes.beforeRotateOut;
    image2Class = showFirstImage ? classes.beforeRotateOut : classes.beforeRotateIn;
  } else {
    image1Class = showFirstImage ? classes.rotateIn : classes.rotateOut;
    image2Class = showFirstImage ? classes.rotateOut : classes.rotateIn;
  }

  useEffect(() => {
    setShowFirstImage(previous => !previous);
  }, [pokemon]);

  return (
    <Card px={0} pb={0}>
      <div className={classes.div}>
        <div style={{ zIndex: showFirstImage ? 1 : 0}}>
          <Card.Section className={image1Class}>
            <Image
              src={showFirstImage ? pokemonImageSrc : previousImageSrc}
              height={192}
              fit="contain"
              alt=" "
              sx={classes.image}
            />
          </Card.Section>
        </div>
        <div style={{ position: 'absolute', zIndex: showFirstImage ? 0 : 1 }}>
          <Card.Section className={image2Class}>
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
