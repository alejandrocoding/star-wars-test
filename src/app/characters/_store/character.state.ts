import { Movie, Character } from '@interfaces';

export interface CharacterState {
  loading: boolean;
  characters: Character[];
  currentCharacter: {
    character: Character;
    movies: Movie[];
  };
}
