import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import pokemonList from '../data';

test('Testa se não tem nenhum poke favorito', () => {
  renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

  const noFavoritePokemon = screen.getByText(/no favorite pokémon found/i);
  expect(noFavoritePokemon).toBeInTheDocument();
});

test('Testa os pokes favoritos', async () => {
  const favoritesPokemons = [pokemonList[0], pokemonList[1]];

  renderWithRouter(<FavoritePokemon pokemonList={ favoritesPokemons } />);

  favoritesPokemons.forEach((pokemon) => {
    const pokemonName = screen.getByText(pokemon.name);
    expect(pokemonName).toBeInTheDocument();
  });
});
