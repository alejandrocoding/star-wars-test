import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import {
  takeUntil,
  map,
  distinctUntilChanged,
  debounceTime,
} from 'rxjs/operators';

import { Movie } from '@interfaces';
import { MovieState } from '../_store/movie.state';
import { moviesState } from '../_store/movie.selectors';
import { loadFirstsMovies, searchMovies } from '../_store/movie.actions';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  form: FormGroup;
  movies: Movie[] = [];

  loading$ = this.store.select(moviesState).pipe(map((state) => state.loading));

  private movies$ = this.store
    .select(moviesState)
    .pipe(map((state) => state.movies));
  private destroy$ = new Subject();

  constructor(private fb: FormBuilder, private store: Store<MovieState>) {}

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch({ type: loadFirstsMovies.type });

    this.form.controls.search.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(450), takeUntil(this.destroy$))
      .subscribe((search) =>
        this.store.dispatch({ type: searchMovies.type, payload: { search } })
      );

    this.movies$
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies) => (this.movies = [...movies]));
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
