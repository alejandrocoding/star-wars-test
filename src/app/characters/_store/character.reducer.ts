import { createReducer, on, Action } from '@ngrx/store';

import { CharacterState } from './character.state';
import { loadCharacterAndMovies, loadCharacterAndMoviesSuccess } from './character.actions';

export const initialState: CharacterState = {
  loading: false,
  currentCharacter: null,
};

const reducer = createReducer(
  initialState,
  on(loadCharacterAndMovies, (state) => ({
    ...state,
    loading: true,
    currentCharacter: null,
  })),
  on(loadCharacterAndMoviesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    currentCharacter: {
      character: payload.character,
      movies: payload.movies,
    },
  }))
);

export function charactersReducer(state: CharacterState, action: Action): CharacterState {
  return reducer(state, action);
}
