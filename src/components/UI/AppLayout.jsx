import { ActionIcon, Affix, Container, MantineProvider, Title } from '@mantine/core';
import { IconDeviceGamepad, IconDeviceTvOld } from '@tabler/icons';
import { createContext, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import './App.css';
import router from '@/routes';
import { defaultTheme, gameboyTheme } from '@/themes';

export const context = createContext(true);

function AppLayout() {

  const [isUsingGameboyTheme, setIsUsingGameboyTheme] = useState(false);

  function handleToggleTheme() {
    setIsUsingGameboyTheme(previous => !previous);
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={ isUsingGameboyTheme ? gameboyTheme : defaultTheme }
    >
      <Helmet>
        <meta
          name="theme-color"
          content={isUsingGameboyTheme ? gameboyTheme.white : defaultTheme.colors.pikachu[0]}
        />
      </Helmet>
      <Container size="sm" pt="sm" sx={{height: '100vh'}}>
        <Title order={2} mb="xs">
          Who's that Pokémon?
        </Title>
        <context.Provider value={isUsingGameboyTheme}>
          <RouterProvider router={router} />
        </context.Provider>
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon onClick={handleToggleTheme}>
            {isUsingGameboyTheme ? <IconDeviceTvOld /> : <IconDeviceGamepad />}
          </ActionIcon>
        </Affix>
      </Container>
    </MantineProvider>
  );
}

export default AppLayout
