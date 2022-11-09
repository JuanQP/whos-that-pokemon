import { getImageSrc } from "@/utils";
import whosThatPokemonBackgroundUrl from '@assets/whos-that-pokemon.png';
import { context } from "@components/UI/AppLayout";
import { Card, createStyles, Image } from "@mantine/core";
import { useContext } from "react";
import { ProgressTimer } from "../UI/ProgressTimer";

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

export function PokemonCard({ gameStarted, pokemon, revealPokemon = false, timeToChoose }) {

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
        radius="none"
        color="green"
        start={!revealPokemon && gameStarted}
        time={timeToChoose}
      />
    </Card>
  )
}
