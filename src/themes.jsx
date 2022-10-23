import backgroundImageUrl from './assets/pokeball-background.png';
import gameboyBackgroundImageUrl from './assets/pixel-pokeball-background.png';

const GB_GREEN_BACKGROUND = '#C3CFA1';

export const gameboyTheme = {
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
    green: Array(10).fill('#729E07'),
    gameboy: Array(10).fill(GB_GREEN_BACKGROUND),
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
        sx: (theme) => ({
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

export const defaultTheme = {
  globalStyles: (theme) => ({
    body: {
      backgroundColor: theme.colors.pikachu[0],
      backgroundImage: `url('${backgroundImageUrl}')`
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
};
