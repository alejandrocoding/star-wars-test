import { createReducer, on, Action } from '@ngrx/store';

import { MovieState } from './movie.state';
import { loadFirstsMovies, loadFirstsMoviesLoadSuccess } from './movie.actions';
import { loadMovieAndCharacters, loadMovieAndCharactersSuccess } from './movie.actions';

export const initialState: MovieState = {
  loading: false,
  movies: [],
  currentMovie: null,
};

const reducer = createReducer(
  initialState,
  on(loadFirstsMovies, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadFirstsMoviesLoadSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    movies: payload.movies,
  })),
  on(loadMovieAndCharacters, (state) => ({
    ...state,
    loading: true,
    currentMovie: null,
  })),
  on(loadMovieAndCharactersSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    currentMovie: {
      movie: payload.movie,
      characters: payload.characters,
    },
  }))
);

export function moviesReducer(state: MovieState, action: Action): MovieState {
  return reducer(state, action);
}
