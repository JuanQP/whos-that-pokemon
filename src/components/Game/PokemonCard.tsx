import { getImageSrc } from "@/helpers";
import whosThatPokemonBackgroundUrl from '@assets/whos-that-pokemon.png';
import { context } from "@components/UI";
import { ProgressTimer } from "@components/UI/ProgressTimer";
import { Card, createStyles, Image } from "@mantine/core";
import { useContext } from "react";

const useStyles = createStyles(() => ({
  waiting: {
    filter: 'brightness(0)'
  },
  show: {
    filter: 'brightness(1)',
    transition: 'filter 0.5s ease-in-out',
  },
  card: {
    backgroundImage: `url(${whosThatPokemonBackgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

interface Props {
  gameStarted: boolean;
  pokemon: Pokemon;
  revealPokemon: boolean;
  timeToChoose: number;
}

export function PokemonCard({ gameStarted, pokemon, revealPokemon, timeToChoose }: Props) {

  const  { classes } = useStyles();
  const isUsingGameboyTheme = useContext(context);

  if(!gameStarted) return null;

  return (
    <Card withBorder pb={0} px={0}>
      <Card.Section
        className={ !isUsingGameboyTheme ? classes.card : undefined }
      >
        <Image
          className={revealPokemon ? classes.show : classes.waiting}
          src={getImageSrc(pokemon)}
          alt="Pokemon"
          ml={isUsingGameboyTheme ? "25%" : "5%"}
          fit="contain"
          imageProps={{
            style: { width: '50%' }
          }}
        />
      </Card.Section>
      <ProgressTimer
        radius={0}
        start={!revealPokemon && gameStarted}
        time={timeToChoose}
      />
    </Card>
  )
}
