import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders library title and allows adding a game', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText('GameShelf')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Nome'), 'Portal 2');
    await user.type(screen.getByLabelText('Plataforma'), 'PC');
    await user.type(screen.getByLabelText('Gênero'), 'Puzzle');
    await user.type(screen.getByLabelText('Desenvolvedora'), 'Valve');
    await user.type(screen.getByLabelText('URL da capa'), 'https://example.com/portal2.jpg');

    await user.click(screen.getByRole('button', { name: 'Adicionar jogo' }));

    expect(screen.getByText('Portal 2')).toBeInTheDocument();
  });
});
