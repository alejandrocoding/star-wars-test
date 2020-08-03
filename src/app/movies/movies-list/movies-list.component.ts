import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Movie } from '@interfaces';
import { MovieState } from '../_store/movie.state';
import { moviesState } from '../_store/movie.selectors';
import { loadFirstsMovies } from '../_store/movie.actions';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];

  loading$ = this.store.select(moviesState).pipe(map((state) => state.loading));

  private movies$ = this.store.select(moviesState).pipe(map((state) => state.movies));
  private destroy$ = new Subject();

  constructor(private store: Store<MovieState>) {}

  ngOnInit(): void {
    this.store.dispatch({ type: loadFirstsMovies.type });
    this.movies$
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies) => (this.movies = [...movies]));
  }
}
