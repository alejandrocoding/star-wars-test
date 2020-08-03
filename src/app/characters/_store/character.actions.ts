import { createAction, props } from '@ngrx/store';

import { Movie, Character } from '@interfaces';

// Load Character by ID and its Movies associated
export const loadCharacterAndMovies = createAction(
  '[Character] Load Character & Movies',
  props<{ payload: { id: string } }>()
);
export const loadCharacterAndMoviesSuccess = createAction(
  '[Character] Load Character & Movies Success',
  props<{ payload: { character: Character, movies: Movie[] } }>()
);
