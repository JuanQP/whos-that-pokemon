import { Button, Grid, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export function Home() {

  return (
    <Grid>
      <Grid.Col xs={12}>
        <Text>
          Press PLAY to begin!
        </Text>
      </Grid.Col>
      <Grid.Col xs={12}>
        <Button fullWidth component={Link} to="/play">
          Play
        </Button>
      </Grid.Col>
    </Grid>
  )
}
