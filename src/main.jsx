import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './Home';
import { Game } from './Game';

const gameboyTheme = {
  white: '#C3CFA1',
  shadows: {
    sm: '6px 6px black',
  },
  fontFamily: 'PokemonGb-RAeo',
  colors: {
    green: Array(10).fill('#729E07'),
  },
  components: {
    Button: {
      styles: {
        root: {
          borderWidth: 3,
          boxShadow: '2px 2px black'
        }
      }
    }
  }
}

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={gameboyTheme}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
)
