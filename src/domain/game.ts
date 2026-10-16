export type GameStatus = 'nao-iniciado' | 'em-andamento' | 'concluido' | 'abandonado';

export type Game = {
  id: string;
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
  createdAt: string;
  updatedAt: string;
};

export type GameFormInput = {
  name: string;
  platform: string;
  genre: string;
  developer: string;
  releaseDate?: string;
  coverImage?: string;
  status?: GameStatus;
  rating?: number;
  comment?: string;
  favorite?: boolean;
};
