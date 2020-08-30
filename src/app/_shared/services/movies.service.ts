import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie, MovieApi } from '@interfaces';
import { extractID, extractIDs } from '@helpers';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private readonly URL = 'https://swapi.dev/api/films/';

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<{ results: MovieApi[] }>(this.URL).pipe(
      map((response) => response.results),
      map((movies) => this.transformMoviesApiToMovies(movies))
    );
  }

  getMovie(id: string): Observable<Movie> {
    return this.http
      .get<MovieApi>(`${this.URL}${id}`)
      .pipe(map((movie) => this.transformMovieApiToMovie(movie)));
  }

  getMovies(ids: string[]): Observable<Movie[]> {
    const moviesRequests = ids.map((id) => this.getMovie(id));
    return forkJoin(moviesRequests);
  }

  searchMovie(name: string): Observable<Movie[]> {
    return this.http.get<{ results: MovieApi[] }>(`${this.URL}?search=${name}`).pipe(
      map((response) => response.results),
      map((movies) => this.transformMoviesApiToMovies(movies))
    );
  }

  private transformMoviesApiToMovies(movies: MovieApi[]): Movie[] {
    return movies.map((movie) => this.transformMovieApiToMovie(movie));
  }

  private transformMovieApiToMovie(movie: MovieApi): Movie {
    return {
      ...movie,
      id: extractID(movie.url),
      characters: extractIDs(movie.characters),
    };
  }
}
