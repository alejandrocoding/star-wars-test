export interface Character {
  id: string;
  name: string;
  films: string[];
  gender: string;
  hair_color: string;
  eye_color: string;
  height: string;
  birth_year: string;
}

export type CharacterApi = Character & { url: string };
