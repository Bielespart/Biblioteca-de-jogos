import type { Game } from '../domain/game';

const STORAGE_KEY = 'game-library-v1';

export function loadGames(): Game[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveGames(games: Game[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

export function createGame(game: Game): Game[] {
  const current = loadGames();
  const next = [game, ...current];
  saveGames(next);
  return next;
}

export function updateGame(id: string, updatedGame: Game): Game[] {
  const current = loadGames();
  const next = current.map((game) => (game.id === id ? updatedGame : game));
  saveGames(next);
  return next;
}

export function deleteGame(id: string): Game[] {
  const current = loadGames();
  const next = current.filter((game) => game.id !== id);
  saveGames(next);
  return next;
}
