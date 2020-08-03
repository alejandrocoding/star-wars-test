import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';

import { CharacterState } from '../_store/character.state';
import { charactersState } from '../_store/character.selectors';
import { loadCharacterAndMovies } from '../_store/character.actions';

import { Movie, Character } from '@interfaces';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  character: Character;
  movies: Movie[];

  loading$ = this.store.select(charactersState).pipe(map((state) => state.loading));
  
  private character$ = this.store.select(charactersState).pipe(map((state) => state.currentCharacter));
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store<CharacterState>
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.store.dispatch({ type: loadCharacterAndMovies.type, payload: { id } });
    this.subscribeToCharacter();
  }

  private subscribeToCharacter(): void {
    this.character$
      .pipe(filter((result) => !!result?.character), takeUntil(this.destroy$))
      .subscribe((result) => {
        this.character = { ...result.character };
        this.movies = [...result.movies];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
