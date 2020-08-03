import { Movie, Character } from '@interfaces';

export interface CharacterState {
  loading: boolean;
  currentCharacter: {
    character: Character;
    movies: Movie[];
  };
}
