import { Card, Grid, Text, Transition } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { GAME_MODES } from "../../utils";
import { ChosenPokemonImage } from "./ChosenPokemonImage";

export function NormalModeFinishedGame({ pickedOptions = [] }) {

  const { TOTAL_ATTEMPTS } = GAME_MODES.Normal;
  const [showOptions, setShowOptions] = useState(false);
  const successCount = pickedOptions.filter(o => o.isCorrectOption).length;
  const resultsMessage = successCount === TOTAL_ATTEMPTS ?
    `Great! You have guessed all the ${TOTAL_ATTEMPTS} pokemons!`
    : `Game finished! You correctly answered ${successCount} out of ${TOTAL_ATTEMPTS} pokemons`
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => setShowOptions(true));

    return () => clearTimeout(timer.current);
  }, []);

  return (
    <>
      <Grid.Col xs={12}>
        <Card>
          <Text>{resultsMessage}</Text>
          <Text>These are all the pokemons you had to guess in this game:</Text>
        </Card>
      </Grid.Col>
      <Grid.Col xs={12}>
        {/* Show pokemon images one next to each other */}
        <Grid justify="center">
          {pickedOptions.map((pickedOption, i) => (
            <Grid.Col
              key={`number${i}-id${pickedOption.id}`}
              span="content"
              sx={{ minWidth: '160px' }}
            >
              <Transition
                mounted={showOptions}
                transition="scale-x"
                duration={500}
                timingFunction="ease"
              >
                {(styles) => (
                  <Card
                    p={0}
                    style={{
                      ...styles,
                      transitionDelay: `${500 + i*300}ms`,
                      width: '160px'
                    }}
                  >
                    <ChosenPokemonImage pokemon={pickedOption} />
                  </Card>
                )}
              </Transition>
            </Grid.Col>
          ))}
        </Grid>
      </Grid.Col>
    </>
  )
}
