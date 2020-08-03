export interface Movie {
  id: string;
  title: string;
  opening_crawl: string;
  characters: string[];
  director: string;
  producer: string;
  release_date: Date;
}

export type MovieApi = Movie & { url: string };
