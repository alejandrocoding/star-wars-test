import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, forkJoin, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { MoviesService, CharactersService } from '@services';
import { loadCharacterAndMovies, loadCharacterAndMoviesSuccess } from './character.actions';

@Injectable()
export class CharactersEffects {
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

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private charactersService: CharactersService
  ) {}
}
