import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';

import { MovieState } from '../_store/movie.state';
import { moviesState } from '../_store/movie.selectors';
import { loadMovieAndCharacters } from '../_store/movie.actions';

import { Movie, Character } from '@interfaces';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie: Movie;
  characters: Character[];

  loading$ = this.store.select(moviesState).pipe(map((state) => state.loading));

  private movie$ = this.store.select(moviesState).pipe(map((state) => state.currentMovie));
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store<MovieState>
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.store.dispatch({ type: loadMovieAndCharacters.type, payload: { id } });
    this.subscribeToMovie();
  }

  private subscribeToMovie(): void {
    this.movie$
      .pipe(filter((result) => !!result?.movie), takeUntil(this.destroy$))
      .subscribe(({ movie, characters }) => {
        this.movie = { ...movie };
        this.characters = [...characters];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
