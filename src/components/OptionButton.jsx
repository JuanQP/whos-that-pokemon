import { Button } from "@mantine/core";
import { useContext } from "react";
import { context } from "../AppLayout";

const gradients = [
  {from: 'blue', to: 'blue.3'},
  {from: 'red', to: 'red.3'},
  {from: 'green', to: 'green.3'},
  {from: 'yellow', to: 'yellow.3'},
];

export function OptionButton({ index, randomPokemon, selectedPokemon, pokemonOption, onClick }) {

  const isUsingGameboyTheme = useContext(context);
  const isSelectedOption = pokemonOption.id === selectedPokemon?.id;
  const isCorrectOption = pokemonOption.id === randomPokemon.id;

  // styles
  const disabled = selectedPokemon && !isSelectedOption && !isCorrectOption;
  const variant =
    isSelectedOption || (selectedPokemon && isCorrectOption) ? 'filled' :
      isUsingGameboyTheme ? undefined : 'gradient';
  const color =
    selectedPokemon && isCorrectOption ? 'green' :
      isSelectedOption ? 'red' :
        isUsingGameboyTheme ? undefined : gradients[index];

  return (
    <Button
      fullWidth
      uppercase
      disabled={disabled}
      variant={variant}
      color={color}
      gradient={color}
      onClick={() => onClick(pokemonOption)}
    >
      {pokemonOption.name}
    </Button>
  )
}
