import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, forkJoin, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { MoviesService, CharactersService } from '@services';
import { loadFirstsCharacters, loadFirstsCharactersLoadSuccess } from './character.actions';
import { loadCharacterAndMovies, loadCharacterAndMoviesSuccess } from './character.actions';
import { searchCharacters, searchCharactersLoadSuccess } from './character.actions';

@Injectable()
export class CharactersEffects {
  loadFirstCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFirstsCharacters),
      mergeMap(() =>
        this.charactersService.getAllCharacters().pipe(
          map((characters) => ({
            type: loadFirstsCharactersLoadSuccess.type,
            payload: { characters },
          })),
          catchError(() => EMPTY)
        )
      )
    );
  });

  loadCharacterAndMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCharacterAndMovies),
      mergeMap((action) =>
        this.charactersService.getCharacter(action.payload.id).pipe(
          mergeMap((character) =>
            forkJoin([
              of(character),
              this.moviesService.getMovies(character.films),
            ]).pipe(
              map(([_, movies]) => ({
                type: loadCharacterAndMoviesSuccess.type,
                payload: { character, movies },
              }))
            )
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  searchCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchCharacters),
      mergeMap((action) =>
        this.charactersService.searchCharacter(action.payload.search).pipe(
          map((characters) => ({
            type: searchCharactersLoadSuccess.type,
            payload: { characters },
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
