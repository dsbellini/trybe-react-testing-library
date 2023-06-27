import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa a barra de navegação e seu conteúdo (Home, About, Favorite Poke)', () => {
  renderWithRouter(<App />);
  const home = screen.getByRole('link', { name: /home/i });
  const about = screen.getByRole('link', { name: /about/i });
  const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemon).toBeInTheDocument();
});
