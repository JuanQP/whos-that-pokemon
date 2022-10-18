import { Container, Title } from '@mantine/core';
import './App.css';

function AppLayout({ children }) {

  return (
    <Container size="sm" pt="sm" sx={{height: '100vh'}}>
      <Title mb="xs" size="h4" sx={{fontFamily: 'PokemonGb-RAeo'}}>
        Who's that Pokémon?
      </Title>
      { children }
    </Container>
  );
}

export default AppLayout
