import { BackgroundImage, Box, createStyles, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { getImageSrc } from "@/utils";

const useStyles = createStyles(() => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    display: 'flex',
    justifyContent: 'end',
    width: '100%',
    height: 96,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain !important', // 😅
  },
}));

const CorrectOptionIcon = () => <IconCheck color="green" />;
const IncorrectOptionIcon = () => <IconX color="red" />;

export function ChosenPokemonImage({ pokemon, style }) {

  const { classes } = useStyles();

  return (
    <Box className={classes.box} style={style}>
      <BackgroundImage className={classes.image} src={getImageSrc(pokemon)}>
        {pokemon.isCorrectOption ? <CorrectOptionIcon /> : <IncorrectOptionIcon /> }
      </BackgroundImage>
      <Text color="gray.7" size="xs">{pokemon.name}</Text>
    </Box>
  )
}
