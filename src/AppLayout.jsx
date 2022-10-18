import { ActionIcon, Affix, Container, Title } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { Home } from './Home';
import { Game } from './Game';
import { createContext, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { IconDeviceGamepad, IconDeviceTvOld } from '@tabler/icons';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play",
    element: <Game />,
  },
]);

const gameboyTheme = {
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
      },
      styles: {
        root: {
          borderWidth: 3,
          boxShadow: '2px 2px black',
        }
      }
    }
  }
}

const defaultTheme = {
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
    Title: {
      defaultProps: {
        size: 'h2',
      },
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
      <Container size="sm" pt="sm" sx={{height: '100vh'}}>
        <Title mb="xs">
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
