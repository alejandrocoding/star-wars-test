import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import {
  map,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import { Character } from '@interfaces';

import { charactersState } from '../_store/character.selectors';
import { CharacterState } from '../_store/character.state';
import {
  loadFirstsCharacters,
  searchCharacters,
} from '../_store/character.actions';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  form: FormGroup;
  characters: Character[] = [];

  loading$ = this.store
    .select(charactersState)
    .pipe(map((state) => state.loading));
  private characters$ = this.store
    .select(charactersState)
    .pipe(map((state) => state.characters));

  private destroy$ = new Subject();

  constructor(private fb: FormBuilder, private store: Store<CharacterState>) {}

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch({ type: loadFirstsCharacters.type });

    this.form.controls.search.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(450), takeUntil(this.destroy$))
      .subscribe((search) =>
        this.store.dispatch({
          type: searchCharacters.type,
          payload: { search },
        })
      );

    this.characters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((characters) => (this.characters = [...characters]));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.form = this.fb.group({
      search: '',
    });
  }
}
