import { Grid, Text } from "@mantine/core";
import { GAME_MODES } from "../utils";

export function PokemonMasterModeFinishedGame({ pickedOptions = [] }) {

  const { TOTAL_ATTEMPTS } = GAME_MODES.PokemonMaster;
  const successCount = pickedOptions.filter(o => o.isCorrectOption).length;
  const resultsMessage = successCount === TOTAL_ATTEMPTS ?
    `Amazing! You have guessed all the 151 pokemons! 🤯`
    : `Game finished! You correctly answered ${successCount} out of the 151 pokemons`

  return (
    <>
      <Grid.Col xs={12}>
        <Text>{resultsMessage}</Text>
      </Grid.Col>
    </>
  )
}
