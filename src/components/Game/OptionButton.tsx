import { context } from "@components/UI";
import { Button } from "@mantine/core";
import { useContext } from "react";

const gradients = [
  {from: 'blue', to: 'blue.3', deg: 45},
  {from: 'red', to: 'red.3', deg: 45},
  {from: 'green', to: 'green.3', deg: 45},
  {from: 'yellow', to: 'yellow.3', deg: 45},
];

interface Props {
  index: number;
  gameStarted: boolean;
  pokemonToGuess: Pokemon;
  selectedPokemon: Pokemon | null;
  pokemonOption: Pokemon;
  onClick: (option: Pokemon) => void;
}

export function OptionButton({
  index,
  gameStarted,
  pokemonToGuess,
  selectedPokemon,
  pokemonOption,
  onClick
}: Props) {

  const isUsingGameboyTheme = useContext(context);
  const isSelectedOption = pokemonOption.id === selectedPokemon?.id;
  const isCorrectOption = pokemonOption.id === pokemonToGuess.id;

  // styles
  const disabled = selectedPokemon && !isSelectedOption && !isCorrectOption || !gameStarted;
  const variant =
    isSelectedOption || (selectedPokemon && isCorrectOption) ? 'filled' :
      isUsingGameboyTheme ? undefined : 'gradient';
  const color =
    selectedPokemon && isCorrectOption ? 'green' :
      selectedPokemon && isSelectedOption ? 'red' : undefined;
  const gradient = !isUsingGameboyTheme ? gradients[index] : undefined;

  return (
    <Button
      fullWidth
      uppercase
      disabled={disabled}
      variant={variant}
      color={color}
      gradient={gradient}
      onClick={() => onClick(pokemonOption)}
    >
      {pokemonOption.name}
    </Button>
  )
}
