import { createFeatureSelector } from '@ngrx/store';
import { MovieState } from './movie.state';

export const moviesState = createFeatureSelector<MovieState>('movies');
