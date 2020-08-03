import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '@core/material.module';

import { MoviesEffects } from './_store/movie.effects';
import { moviesReducer } from './_store/movie.reducer';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    StoreModule.forFeature('movies', moviesReducer),
    EffectsModule.forFeature([MoviesEffects]),
  ],
  declarations: [MoviesListComponent, MovieDetailsComponent]
})
export class MoviesModule { }
