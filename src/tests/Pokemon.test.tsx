import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemonList from '../data';
import App from '../App';

describe('Testes do componente Pokemon', () => {
  test('O NOME, TIPO, PESO e IMAGEM do Pokémon deve ser mostrado de forma correta na tela', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img');

    expect(pokeName).toHaveTextContent('Pikachu');
    expect(pokeType).toHaveTextContent('Electric');

    const { averageWeight, name, image } = pokemonList[0];
    const { value, measurementUnit } = averageWeight;

    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImg).toHaveAttribute('alt', `${name} sprite`);
    expect(pokeImg).toHaveAttribute('src', `${image}`);
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', () => {
    renderWithRouter(<App />);

    const { id } = pokemonList[0];
    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });

    expect(pokeDetailsLink).toBeInTheDocument();
    expect(pokeDetailsLink).toHaveAttribute('href', `/pokemon/${id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    renderWithRouter(<App />);

    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });
    const { name } = pokemonList[0];

    await userEvent.click(pokeDetailsLink);

    const favoritedCheckBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

    await userEvent.click(favoritedCheckBox);

    const favoritedImg = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoritedImg).toHaveAttribute('src', '/star-icon.svg');
    expect(favoritedImg).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
