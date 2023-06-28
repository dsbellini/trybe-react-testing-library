import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente Pokedex', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    // const favoritesPokemons = [pokemonList[0], pokemonList[1]];

    renderWithRouter(<App />);

    const pikaOnScreen = screen.getByText('Pikachu');
    const howManyPokesOnScreen = screen.getAllByText('Pikachu');
    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(howManyPokesOnScreen).toHaveLength(1);
    expect(pikaOnScreen).toBeInTheDocument();
    await userEvent.click(nextPokeBtn);
    expect(pikaOnScreen).toBeInTheDocument();
  });

  test('Mostra o primeiro poke ao clicar no ultimo poke da lista', async () => {
    renderWithRouter(<App />);

    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokeType = screen.getByTestId('pokemon-type');

    expect(pokeType).toHaveTextContent('Electric');
    await userEvent.click(nextPokeBtn);
    expect(pokeType).toHaveTextContent('Fire');
  });

  test('Teste se os botões de filtragem por tipo têm o nome correto', async () => {
    renderWithRouter(<App />);
    const pokeTypesBtn = screen.getAllByTestId('pokemon-type-button');
    const pokeOnScreen = screen.getByTestId('pokemon-name');

    const expectedTexts = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    pokeTypesBtn.forEach((button, index) => {
      expect(button).toHaveTextContent(expectedTexts[index]);
    });

    await userEvent.click(pokeTypesBtn[1]);

    expect(pokeOnScreen).toHaveTextContent('Charmander');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    const pokeTypesBtn = screen.getAllByTestId('pokemon-type-button');
    const pokeOnScreen = screen.getByTestId('pokemon-name');

    expect(allBtn).toHaveTextContent('All');

    await userEvent.click(pokeTypesBtn[1]);
    expect(pokeOnScreen).toHaveTextContent('Charmander');
    await userEvent.click(allBtn);
    expect(pokeOnScreen).toHaveTextContent('Pikachu');
  });
});
