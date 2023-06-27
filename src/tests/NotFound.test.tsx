import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testes do componente NotFound', () => {
  test('Testa se a página contém um heading h2 e o seu conteúdo', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se a página exibe a imagem correta', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveAttribute('src', imgSrc);
  });
});
