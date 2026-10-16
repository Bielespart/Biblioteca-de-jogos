import { useEffect, useMemo, useState } from 'react';
import type { Game, GameStatus } from './domain/game';
import { validateGameInput } from './domain/validation';
import { createGame, deleteGame, loadGames, saveGames, updateGame } from './storage/gameStorage';

type FormState = {
  name: string;
  platform: string;
  genre: string;
  developer: string;
  releaseDate: string;
  coverImage: string;
  status: GameStatus;
  rating: number;
  comment: string;
  favorite: boolean;
};

const emptyForm: FormState = {
  name: '',
  platform: '',
  genre: '',
  developer: '',
  releaseDate: '',
  coverImage: '',
  status: 'nao-iniciado',
  rating: 0,
  comment: '',
  favorite: false
};

const initialGames: Game[] = [
  {
    id: '1',
    name: 'Hades',
    platform: 'PC',
    genre: 'Action Roguelike',
    developer: 'Supergiant Games',
    releaseDate: '2020-09-17',
    coverImage:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    status: 'concluido',
    rating: 5,
    comment: 'Uma obra prima de ritmo e estilo.',
    favorite: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Celeste',
    platform: 'Switch',
    genre: 'Platformer',
    developer: 'Maddy Thorson',
    releaseDate: '2018-01-25',
    coverImage:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
    status: 'em-andamento',
    rating: 4,
    comment: 'Exige foco e recompensa com muita personalidade.',
    favorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const statusLabelMap: Record<GameStatus, string> = {
  'nao-iniciado': 'Não iniciado',
  'em-andamento': 'Em andamento',
  concluido: 'Concluído',
  abandonado: 'Abandonado'
};

const fieldLabelMap: Record<string, string> = {
  name: 'nome',
  platform: 'plataforma',
  genre: 'gênero',
  developer: 'desenvolvedora',
  rating: 'avaliação',
  coverImage: 'URL da capa'
};

function App() {
  const [games, setGames] = useState<Game[]>(() => {
    const savedGames = loadGames();
    return savedGames.length > 0 ? savedGames : initialGames;
  });

  const [form, setForm] = useState<FormState>(emptyForm);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    saveGames(games);
  }, [games]);

  const selectedGame = useMemo(
    () => games.find((game) => game.id === selectedId) ?? null,
    [games, selectedId]
  );

  const filteredGames = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return games;

    return games.filter((game) => game.name.toLowerCase().includes(normalized));
  }, [games, query]);

  const saveGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateGameInput(form);
    setFormErrors(validationErrors);

    if (validationErrors.length > 0) {
      return;
    }

    const timestamp = new Date().toISOString();

    if (selectedId) {
      const gameToUpdate = games.find((game) => game.id === selectedId);

      if (!gameToUpdate) {
        return;
      }

      const updatedGame: Game = {
        ...gameToUpdate,
        ...form,
        name: form.name.trim(),
        platform: form.platform.trim(),
        genre: form.genre.trim(),
        developer: form.developer.trim(),
        coverImage: form.coverImage.trim(),
        comment: form.comment.trim(),
        updatedAt: timestamp
      };

      setGames(updateGame(selectedId, updatedGame));
    } else {
      const newGame: Game = {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        platform: form.platform.trim(),
        genre: form.genre.trim(),
        developer: form.developer.trim(),
        releaseDate: form.releaseDate,
        coverImage: form.coverImage.trim(),
        status: form.status,
        rating: form.rating,
        comment: form.comment.trim(),
        favorite: form.favorite,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      setGames(createGame(newGame));
    }

    setForm(emptyForm);
    setSelectedId(null);
    setFormErrors([]);
  };

  const handleEdit = (game: Game) => {
    setSelectedId(game.id);
    setFormErrors([]);
    setForm({
      name: game.name,
      platform: game.platform,
      genre: game.genre,
      developer: game.developer,
      releaseDate: game.releaseDate,
      coverImage: game.coverImage,
      status: game.status,
      rating: game.rating,
      comment: game.comment,
      favorite: game.favorite
    });
  };

  const handleDelete = (id: string) => {
    setGames(deleteGame(id));

    if (selectedId === id) {
      setSelectedId(null);
      setForm(emptyForm);
    }

    setFormErrors([]);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setFormErrors([]);
  };

  const normalizedErrors = formErrors
    .map((error) => fieldLabelMap[error] ?? error)
    .join(', ');

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">BIBLIOTECA PESSOAL</p>
          <h1>GameShelf</h1>
        </div>
        <label className="search-wrap" htmlFor="search-games">
          <span>Buscar</span>
          <input
            id="search-games"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome..."
          />
        </label>
      </header>

      <main className="content-grid">
        <section className="library-panel">
          <div className="section-header">
            <h2>Minha biblioteca</h2>
            <span>{filteredGames.length} jogos</span>
          </div>

          {filteredGames.length === 0 ? (
            <div className="empty-state" role="status">
              <h3>Nenhum jogo cadastrado</h3>
              <p>Adicione seu primeiro título para começar a coleção.</p>
            </div>
          ) : (
            <div className="game-grid">
              {filteredGames.map((game) => (
                <article key={game.id} className="game-card">
                  <button
                    type="button"
                    className="card-cover"
                    onClick={() => setSelectedId(game.id)}
                    aria-label={`Abrir detalhes de ${game.name}`}
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(8, 8, 8, 0.12), rgba(8, 8, 8, 0.7)), url(${game.coverImage || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'})`
                    }}
                  >
                    <span className="favorite-badge">{game.favorite ? '★' : '☆'}</span>
                  </button>

                  <div className="card-body">
                    <div className="card-row">
                      <h3>{game.name}</h3>
                      <span className="status-pill">{statusLabelMap[game.status]}</span>
                    </div>
                    <p>{game.platform}</p>
                    <div className="card-actions">
                      <button type="button" onClick={() => handleEdit(game)}>
                        Editar
                      </button>
                      <button type="button" className="danger" onClick={() => handleDelete(game.id)}>
                        Excluir
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="side-panel">
          <div className="form-header">
            <h2>{selectedId ? 'Editar jogo' : 'Adicionar jogo'}</h2>
            {selectedId && (
              <button type="button" className="ghost-button" onClick={resetForm}>
                Novo jogo
              </button>
            )}
          </div>

          {formErrors.length > 0 && (
            <div className="form-alert" role="alert">
              Campos inválidos: {normalizedErrors}
            </div>
          )}

          <form onSubmit={saveGame} className="game-form">
            <label>
              Nome
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <div className="split-fields">
              <label>
                Plataforma
                <input value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} />
              </label>
              <label>
                Gênero
                <input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />
              </label>
            </div>
            <div className="split-fields">
              <label>
                Desenvolvedora
                <input value={form.developer} onChange={(e) => setForm({ ...form, developer: e.target.value })} />
              </label>
              <label>
                Lançamento
                <input type="date" value={form.releaseDate} onChange={(e) => setForm({ ...form, releaseDate: e.target.value })} />
              </label>
            </div>
            <label>
              URL da capa
              <input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} placeholder="https://..." />
            </label>
            <div className="split-fields">
              <label>
                Status
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as GameStatus })}>
                  <option value="nao-iniciado">Não iniciado</option>
                  <option value="em-andamento">Em andamento</option>
                  <option value="concluido">Concluído</option>
                  <option value="abandonado">Abandonado</option>
                </select>
              </label>
              <label>
                Avaliação
                <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={form.favorite}
                onChange={(e) => setForm({ ...form, favorite: e.target.checked })}
              />
              Favorito
            </label>

            <label>
              Comentário
              <textarea rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            </label>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {selectedId ? 'Salvar alterações' : 'Adicionar jogo'}
              </button>
              <button type="button" className="secondary-button" onClick={resetForm}>
                Limpar
              </button>
            </div>
          </form>

          {selectedGame && (
            <section className="detail-panel">
              <div className="detail-cover" style={{ backgroundImage: `url(${selectedGame.coverImage})` }} />
              <h3>{selectedGame.name}</h3>
              <p className="detail-meta">
                {selectedGame.platform} • {selectedGame.genre}
              </p>
              <ul>
                <li>Desenvolvedora: {selectedGame.developer}</li>
                <li>Status: {statusLabelMap[selectedGame.status]}</li>
                <li>Avaliação: {selectedGame.rating}/5</li>
                <li>Favorito: {selectedGame.favorite ? 'Sim' : 'Não'}</li>
              </ul>
              <p>{selectedGame.comment || 'Sem comentário registrado.'}</p>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
