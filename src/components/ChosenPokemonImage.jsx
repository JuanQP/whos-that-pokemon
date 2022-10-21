import { BackgroundImage, Box, Group, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { getImageSrc } from "../utils";

export function ChosenPokemonImage({ pokemon }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <BackgroundImage
        src={getImageSrc(pokemon)}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          width: '100%',
          height: 96,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      >
        {pokemon.isCorrectOption ? <IconCheck color="green" /> : <IconX color="red" /> }
      </BackgroundImage>
      <Text color="gray.7" size="xs">{pokemon.name}</Text>
    </Box>
  )
}
