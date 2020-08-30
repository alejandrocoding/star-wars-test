import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Character, CharacterApi } from '@interfaces';
import { extractID, extractIDs } from '@helpers';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private readonly URL = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getCharacter(id: string): Observable<Character> {
    return this.http
      .get<CharacterApi>(`${this.URL}${id}`)
      .pipe(
        map((character) => this.transformCharacterApiToCharacter(character))
      );
  }

  getCharacters(ids: string[]): Observable<Character[]> {
    const characterRequests = ids.map((id) => this.getCharacter(id));
    return forkJoin(characterRequests);
  }

  getAllCharacters(): Observable<Character[]> {
    return this.http.get<{ results: CharacterApi[] }>(this.URL).pipe(
      map((response) => response.results),
      map((movies) => this.transformCharactersApiToCharacters(movies))
    );
  }

  searchCharacter(name: string): Observable<Character[]> {
    return this.http.get<{ results: CharacterApi[] }>(`${this.URL}?search=${name}`).pipe(
      map((response) => response.results),
      map((movies) => this.transformCharactersApiToCharacters(movies))
    );
  }

  private transformCharactersApiToCharacters(characters: CharacterApi[]): Character[] {
    return characters.map((character) => this.transformCharacterApiToCharacter(character));
  }

  private transformCharacterApiToCharacter(character: CharacterApi): Character {
    return {
      ...character,
      id: extractID(character.url),
      films: extractIDs(character.films),
    };
  }
}
