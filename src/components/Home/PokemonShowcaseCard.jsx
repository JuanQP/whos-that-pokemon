import { Card, createStyles, Image, Progress, Text, Transition } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { getImageSrc, NULL_POKEMON } from "../../utils";

const useStyles = createStyles(() => ({
  div: {
    minHeight: 192,
    display: 'flex',
    justifyContent: 'center',
  }
}));

export function PokemonShowcaseCard({ delay, isFetchingImage, pokemon }) {

  const { classes } = useStyles();
  const [showFirstImage, setShowFirstImage] = useState(true);
  const [previousPokemon, setPreviousPokemon] = useState(NULL_POKEMON);
  const pokemonImageSrc = getImageSrc(pokemon);
  const previousImageSrc = useRef(getImageSrc(previousPokemon));

  useEffect(() => {
    previousImageSrc.current = getImageSrc(previousPokemon);
    setShowFirstImage(previous => !previous);
    setPreviousPokemon(pokemon);
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
                  src={showFirstImage ? pokemonImageSrc : previousImageSrc.current}
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
              <Card.Section
                style={{
                  ...styles,
                }}
              >
                <Image
                  src={!showFirstImage ? pokemonImageSrc : previousImageSrc.current}
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
