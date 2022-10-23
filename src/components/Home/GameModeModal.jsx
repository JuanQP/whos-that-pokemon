import { Button, Modal, Stack, Text } from "@mantine/core";
import { IconPokeball } from "@tabler/icons";
import { Link } from "react-router-dom";

export function GameModeModal({ opened, onClose }) {
  return (
    <Modal
      title="Select game mode"
      opened={opened}
      size="md"
      withCloseButton={false}
      onClose={onClose}
    >
      <Stack sx={{width: '100%'}}>
        <Button
          size="md"
          component={Link}
          to="/play/normal"
          leftIcon={<IconPokeball />}
          variant="gradient"
          gradient={{
            from: 'blue',
            to: 'teal',
          }}
        >
          Normal
        </Button>
        <Text color="gray.7" size="sm">
          Try to guess 10 Pokémons
        </Text>
        <Button
          size="md"
          component={Link}
          to="/play/pokemon-master"
          leftIcon={<IconPokeball />}
          variant="gradient"
          gradient={{
            from: 'blue',
            to: 'red',
          }}
        >
          Pokémon master
        </Button>
        <Text color="gray.7" size="sm">
          Try to guess all the 151 Pokémons!
        </Text>
      </Stack>
    </Modal>
  );
}
