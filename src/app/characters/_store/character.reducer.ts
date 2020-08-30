import { createReducer, on, Action } from '@ngrx/store';

import { CharacterState } from './character.state';
import { loadFirstsCharacters, loadFirstsCharactersLoadSuccess } from './character.actions';
import { loadCharacterAndMovies, loadCharacterAndMoviesSuccess } from './character.actions';
import { searchCharacters, searchCharactersLoadSuccess } from './character.actions';

export const initialState: CharacterState = {
  loading: false,
  characters: [],
  currentCharacter: null,
};

const reducer = createReducer(
  initialState,
  on(loadFirstsCharacters, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadFirstsCharactersLoadSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    characters: payload.characters,
  })),
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
  })),
  on(searchCharacters, (state) => ({
    ...state,
    loading: true,
  })),
  on(searchCharactersLoadSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    characters: payload.characters,
  })),
);

export function charactersReducer(state: CharacterState, action: Action): CharacterState {
  return reducer(state, action);
}
