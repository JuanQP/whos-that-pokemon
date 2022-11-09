import { getImageSrc, NULL_POKEMON } from "@/utils";
import { Card, createStyles, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { ProgressTimer } from "../UI/ProgressTimer";

const useStyles = createStyles(() => ({
  div: {
    minHeight: 192,
    display: 'flex',
    justifyContent: 'center',
  },
  beforeRotateIn: {
    transform: 'rotateY(-180deg) scale(0)',
    transition: 'none',
    transformOrigin: 'center center 48px',
    backfaceVisibility: 'hidden',
  },
  rotateIn: {
    transform: 'rotateY(0deg) scale(1)',
    transition: 'transform 2s ease-in-out',
    transformOrigin: 'center center 48px',
    backfaceVisibility: 'hidden',
  },
  beforeRotateOut: {
    transform: 'rotateY(0deg) scale(1)',
    transformOrigin: 'center center 48px',
    transition: 'none',
    backfaceVisibility: 'visible',
  },
  rotateOut: {
    transform: 'rotateY(180deg) scale(0)',
    transformOrigin: 'center center 48px',
    transition: 'transform 2s ease-in-out',
    backfaceVisibility: 'visible',
  },
  image: {
    filter: 'drop-shadow(2px 2px 2px #000A)',
  }
}));

export function PokemonShowcaseCard({ pokemon, delay }) {

  const { classes } = useStyles();
  const [showFirstImage, setShowFirstImage] = useState(true);
  const [currentPokemon, setCurrentPokemon] = useState(NULL_POKEMON);
  const [previousPokemon, setPreviousPokemon] = useState(NULL_POKEMON);
  const [isChanging, setIsChanging] = useState(false);
  const pokemonImageSrc = getImageSrc(currentPokemon);
  const previousImageSrc = getImageSrc(previousPokemon);

  let image1Class, image2Class;
  if(isChanging) {
    image1Class = showFirstImage ? classes.beforeRotateIn : classes.beforeRotateOut;
    image2Class = showFirstImage ? classes.beforeRotateOut : classes.beforeRotateIn;
  } else {
    image1Class = showFirstImage ? classes.rotateIn : classes.rotateOut;
    image2Class = showFirstImage ? classes.rotateOut : classes.rotateIn;
  }

  useEffect(() => {
    // Because pokemon is changing, the current
    // pokemon will be the previous pokemon
    setPreviousPokemon({ ...currentPokemon });
    setCurrentPokemon({ ...pokemon });
    setShowFirstImage(previous => !previous);

    setIsChanging(true);
    const interval = setTimeout(() => {
      setIsChanging(false);
    }, 50);

    return () => clearTimeout(interval);
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
        {currentPokemon.name}
      </Text>
      <ProgressTimer
        radius="none"
        value={isChanging ? 0 : 100}
        start={!isChanging}
        time={delay}
      />
    </Card>
  )
}