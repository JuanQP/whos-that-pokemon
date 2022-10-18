import { Button, Grid, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import AppLayout from "./AppLayout";

export function Home() {

  return (
    <AppLayout>
      <Grid>
        <Grid.Col xs={12}>
          <Text size="h4">
            Press PLAY to begin!
          </Text>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Button
            fullWidth
            uppercase
            size="lg"
            variant="outline"
            color="dark"
            component={Link}
            to="/play"
          >
            Play
          </Button>
        </Grid.Col>
      </Grid>
    </AppLayout>
  )
}
