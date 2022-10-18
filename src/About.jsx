import { Anchor, Card, Grid, SimpleGrid, Stack, Text, Title } from "@mantine/core";

export function About() {
  return (
    <Grid>
      <Grid.Col xs={12}>
        <Card>
          <Title size="h4">
            What is this?
          </Title>
          <Text>
            This is a webpage-game made just for fun and learning purposes. Pokémon and Pokémon character names are trademarks of Nintendo.
          </Text>
        </Card>
      </Grid.Col>
      <Grid.Col xs={12}>
        <Card>
          <Title size="h4">
            How was this made?
          </Title>
          <Text>
            The information I used in this game comes from the amazing webpage of <Anchor underline href="https://pokeapi.co" target="_blank">PokeAPI</Anchor> ❤️. I just grabbed the first 151 pokemons data and stored it in this project so it is not necessary to constantly use their API.
          </Text>
          <SimpleGrid
            mt="sm"
            cols={3}
            breakpoints={[
              { maxWidth: 'xs', cols: 1},
            ]}
          >
            <Anchor align="center" underline href="https://reactjs.org/" target="_blank">
              React
            </Anchor>
            <Anchor align="center" underline href="https://vitejs.dev" target="_blank">
              Vite
            </Anchor>
            <Anchor align="center" underline href="https://mantine.dev" target="_blank">
              Mantine
            </Anchor>
          </SimpleGrid>
          <Stack>

          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col xs={12}>
        <Card>
          <Title size="h4">
            Can I see the code?
          </Title>
          <Text>
            Sure! If you want to see the code and the used stack technology here, you can <Anchor underline href="https://github.com/JuanQP/whos-that-pokemon" target="_blank">visit the GitHub repo</Anchor>.
          </Text>
        </Card>
      </Grid.Col>
    </Grid>
  )
}
