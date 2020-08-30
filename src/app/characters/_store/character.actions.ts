import { createAction, props } from '@ngrx/store';

import { Movie, Character } from '@interfaces';

// Load First Characters
export const loadFirstsCharacters = createAction('[Characters] Load Firsts');
export const loadFirstsCharactersLoadSuccess = createAction(
  '[Characters] Load Firsts Success',
  props<{ payload: { characters: Character[] } }>()
);

// Load Character by ID and its Movies associated
export const loadCharacterAndMovies = createAction(
  '[Character] Load Character & Movies',
  props<{ payload: { id: string } }>()
);
export const loadCharacterAndMoviesSuccess = createAction(
  '[Character] Load Character & Movies Success',
  props<{ payload: { character: Character, movies: Movie[] } }>()
);

// Search Characters By Name
export const searchCharacters = createAction(
  '[Characters] Search Characters',
  props<{ payload: { search: string } }>()
);
export const searchCharactersLoadSuccess = createAction(
  '[Characters] Search Characters Success',
  props<{ payload: { characters: Character[] } }>()
);

