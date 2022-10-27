import { getImageSrc } from "@/utils";
import whosThatPokemonBackgroundUrl from '@assets/whos-that-pokemon.png';
import { context } from "@components/UI/AppLayout";
import { Card, createStyles, Image, Progress } from "@mantine/core";
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

export function PokemonCard({ pokemon, revealPokemon = false, timeToChoose }) {

  const  { classes } = useStyles();
  const isUsingGameboyTheme = useContext(context);

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
      <Progress
        radius="none"
        value={revealPokemon ? 0 : 100}
        color="green"
        sx={{
          '& [role=progressbar]': {
            transition: `width ${revealPokemon ? '0' : timeToChoose}ms linear`,
          }
        }}
      />
    </Card>
  )
}
