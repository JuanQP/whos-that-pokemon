import { ActionIcon, Affix, Container, Title } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { Home } from './Home';
import { Game } from './Game';
import { createContext, useState } from 'react';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { IconDeviceGamepad, IconDeviceTvOld } from '@tabler/icons';
import { About } from './About';
import { Helmet } from 'react-helmet-async';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play/:mode",
    element: <Game />,
  },
  {
    path: "/about",
    element: <About />,
  },
], {
  basename: '/',
});

const gameboyTheme = {
  globalStyles: () => ({
    body: {
      backgroundImage: 'unset',
    }
  }),
  white: '#C3CFA1',
  primaryColor: 'dark',
  shadows: {
    sm: '6px 6px black',
  },
  fontFamily: 'PokemonGb-RAeo',
  headings: {
    fontFamily: 'PokemonGb-RAeo',
  },
  colors: {
    green: Array(10).fill('#729E07'),
  },
  components: {
    Title: {
      defaultProps: {
        size: 'h5',
      },
    },
    Card: {
      defaultProps: {
        sx: {
          borderStyle: 'double',
          borderWidth: '8px',
          borderColor: 'black',
        }
      }
    },
    Button: {
      defaultProps: {
        uppercase: true,
        variant: 'outline',
        size: 'lg',
        radius: 'xs',
        sx: (theme) => ({
          '&[data-disabled]': {
            color: theme.colors.gray[7],
            backgroundColor: theme.colors.gray[6],
          },
        }),
      },
      styles: {
        root: {
          borderWidth: 3,
          boxShadow: '2px 2px black'
        }
      }
    },
    ActionIcon: {
      defaultProps: {
        variant: 'outline',
        size: 'xl',
        radius: 'xs',
        color: 'dark',
        style: {
          backgroundColor: '#C3CFA1',
        }
      },
      styles: {
        root: {
          borderWidth: 3,
          boxShadow: '2px 2px black',
        }
      }
    },
  }
}

const defaultTheme = {
  globalStyles: (theme) => ({
    body: {
      backgroundColor: theme.colors.pikachu[0],
    },
    h2: {
      textShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
    },
  }),
  colors: {
    pikachu: Array(10).fill('#f8d138'),
  },
  components: {
    ActionIcon: {
      defaultProps: {
        variant: 'gradient',
        size: 'xl',
        gradient: {from: 'teal', to: 'blue'},
      },
    },
    Button: {
      defaultProps: {
        size: 'lg',
      }
    },
    Card: {
      defaultProps: {
        shadow: 'md',
      }
    },
  }
}

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
