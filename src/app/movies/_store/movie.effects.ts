import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, forkJoin, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { MoviesService, CharactersService } from '@services';

import { loadFirstsMovies, loadFirstsMoviesLoadSuccess } from './movie.actions';
import { loadMovieAndCharacters, loadMovieAndCharactersSuccess } from './movie.actions';
import { searchMovies, searchMoviesLoadSuccess } from './movie.actions';

@Injectable()
export class MoviesEffects {
  loadFirstMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFirstsMovies),
      mergeMap(() =>
        this.moviesService.getAllMovies().pipe(
          map((movies) => ({
            type: loadFirstsMoviesLoadSuccess.type,
            payload: { movies },
          })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  loadMovieAndCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMovieAndCharacters),
      mergeMap((action) =>
        this.moviesService.getMovie(action.payload.id).pipe(
          mergeMap((movie) =>
            forkJoin([
              of(movie),
              this.charactersService.getCharacters(movie.characters),
            ]).pipe(
              map(([_, characters]) => ({
                type: loadMovieAndCharactersSuccess.type,
                payload: { movie, characters },
              }))
            )
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  searchMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchMovies),
      mergeMap((action) =>
        this.moviesService.searchMovie(action.payload.search).pipe(
          map((movies) => ({
            type: searchMoviesLoadSuccess.type,
            payload: { movies },
          })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private charactersService: CharactersService
  ) { }
}
