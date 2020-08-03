import { Movie, Character } from '@interfaces';

export interface MovieState {
  loading: boolean;
  movies: Movie[];
  currentMovie: {
    movie: Movie;
    characters: Character[];
  };
}
