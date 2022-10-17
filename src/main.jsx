import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        white: '#C3CFA1',
        shadows: {
          sm: '6px 6px black',
        },
        fontFamily: 'PokemonGb-RAeo',
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
)
