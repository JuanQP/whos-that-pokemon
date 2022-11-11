import gameboyBackgroundImageUrl from '@assets/pixel-pokeball-background.png';
import backgroundImageUrl from '@assets/pokeball-background.png';
import { MantineTheme, MantineThemeOverride, Tuple } from '@mantine/core';

const GB_GREEN_BACKGROUND = '#C3CFA1';

export const gameboyTheme: MantineThemeOverride = {
  globalStyles: () => ({
    body: {
      backgroundImage: `url('${gameboyBackgroundImageUrl}')`,
    }
  }),
  white: GB_GREEN_BACKGROUND,
  primaryColor: 'dark',
  shadows: {
    sm: '6px 6px black',
  },
  fontFamily: 'PokemonGb-RAeo',
  headings: {
    fontFamily: 'PokemonGb-RAeo',
  },
  colors: {
    green: Array<string>(10).fill('#729E07') as Tuple<string, 10>,
    gameboy: Array<string>(10).fill(GB_GREEN_BACKGROUND) as Tuple<string, 10>,
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
        size: 'lg',
        radius: 'xs',
        variant: 'white',
        sx: (theme: MantineTheme) => ({
          '&[data-disabled]': {
            color: theme.colors.gray[7],
            backgroundColor: theme.colors.gray[6],
          },
        }),
      },
      styles: {
        root: {
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'black',
          boxShadow: '2px 2px black',
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
          backgroundColor: GB_GREEN_BACKGROUND,
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
};

export const defaultTheme: MantineThemeOverride = {
  globalStyles: (theme: MantineTheme) => ({
    body: {
      backgroundColor: theme.colors.pikachu[0],
      backgroundImage: `url('${backgroundImageUrl}')`
    },
    h2: {
      textShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
    },
  }),
  colors: {
    pikachu: ['#f8d138'],
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
};
