import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Testa a página About e seu conteúdo', () => {
  renderWithRouter(<About />);
  const aboutPoke = screen.getByRole('heading', { name: /about pokédex/i });
  const firstParagraph = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
  const secondParagraph = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
  const img = screen.getByRole('img', { name: /pokédex/i });
  const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(aboutPoke).toBeInTheDocument();
  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
  expect(img).toHaveAttribute('src', imgSrc);
});
