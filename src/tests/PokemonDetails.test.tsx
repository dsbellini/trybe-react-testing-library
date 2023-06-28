import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testes do PokemonDetails', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
    renderWithRouter(<App />);
    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });

    await userEvent.click(pokeDetailsLink);

    const { name, summary } = pokemonList[0];
    const heading = screen.getByRole('heading', { name: `${name} Details` });
    const summaryScreen = screen.getByRole('heading', { name: /summary/i });
    const paragraph = screen.getByText(summary);

    expect(heading).toBeInTheDocument();
    expect(summaryScreen).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
    renderWithRouter(<App />);
    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });
    const { name, foundAt } = pokemonList[0];

    await userEvent.click(pokeDetailsLink);

    const heading = screen.getByText(`Game Locations of ${name}`);
    expect(heading).toBeInTheDocument();

    const pokeMap = screen.getAllByAltText(`${name} location`);
    expect(pokeMap[0]).toBeInTheDocument();
    expect(pokeMap[0]).toHaveAttribute('src', foundAt[0].map);
    expect(pokeMap[0]).toHaveAttribute('alt', `${name} location`);

    const pokeMapName = screen.getByText(foundAt[0].location);
    expect(pokeMapName).toBeInTheDocument();
  });
  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    renderWithRouter(<App />);
    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });
    const { name } = pokemonList[0];

    await userEvent.click(pokeDetailsLink);

    const favoritedCheckBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoritedCheckBox).toBeInTheDocument();

    await userEvent.click(favoritedCheckBox);
    const favoritedImage = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favoritedImage).toBeInTheDocument();
    await userEvent.click(favoritedCheckBox);
    expect(favoritedImage).not.toBeInTheDocument();
  });
});
