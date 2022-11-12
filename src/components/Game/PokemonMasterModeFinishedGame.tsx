import { GAME_MODES } from "@/utils";
import { Card, Grid, Text } from "@mantine/core";

export function PokemonMasterModeFinishedGame({ guessings = [] }: GameModeScreenProps) {

  const { TOTAL_ATTEMPTS } = GAME_MODES.PokemonMaster;
  const successCount = guessings.filter(o => o.isCorrectOption).length;
  const resultsMessage = successCount === TOTAL_ATTEMPTS ?
    `Amazing! You have guessed all the 151 pokemons! 🤯`
    : `Game finished! You correctly answered ${successCount} out of the 151 pokemons`

  return (
    <>
      <Grid.Col xs={12}>
        <Card>
          <Text>{resultsMessage}</Text>
        </Card>
      </Grid.Col>
    </>
  )
}
