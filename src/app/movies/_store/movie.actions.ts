import { createAction, props } from '@ngrx/store';

import { Movie, Character } from '@interfaces';

// Load First Movies
export const loadFirstsMovies = createAction('[Movies] Load Firsts');
export const loadFirstsMoviesLoadSuccess = createAction(
  '[Movies] Load Firsts Success',
  props<{ payload: { movies: Movie[] } }>()
);

// Load Movie by ID and its Characters associated
export const loadMovieAndCharacters = createAction(
  '[Movie] Load Movie & Characters',
  props<{ payload: { id: string } }>()
);
export const loadMovieAndCharactersSuccess = createAction(
  '[Movie] Load Movie & Characters Success',
  props<{ payload: { movie: Movie, characters: Character[] } }>()
);
