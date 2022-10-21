import { Card, Grid, Text } from "@mantine/core";
import { GAME_MODES } from "../utils";
import { ChosenPokemonImage } from "./ChosenPokemonImage";

export function NormalModeFinishedGame({ pickedOptions = [] }) {

  const { TOTAL_ATTEMPTS } = GAME_MODES.Normal;
  const successCount = pickedOptions.filter(o => o.isCorrectOption).length;
  const resultsMessage = successCount === TOTAL_ATTEMPTS ?
    `Great! You have guessed all the ${TOTAL_ATTEMPTS} pokemons!`
    : `Game finished! You correctly answered ${successCount} out of ${TOTAL_ATTEMPTS} pokemons`

  return (
    <>
      <Grid.Col xs={12}>
        <Text>{resultsMessage}</Text>
      </Grid.Col>
      <Grid.Col xs={12}>
        <Text>These are all the pokemons you had to guess in this game:</Text>
      </Grid.Col>
      <Grid.Col xs={12}>
        {/* Show pokemon images one next to each other */}
        <Grid justify="center">
          {pickedOptions.map((pickedOption, i) => (
            <Grid.Col
              key={`number${i}-id${pickedOption.id}`}
              span="content"
            >
              <Card p={0} style={{ width: '160px' }}>
                <ChosenPokemonImage pokemon={pickedOption} />
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Grid.Col>
    </>
  )
}
