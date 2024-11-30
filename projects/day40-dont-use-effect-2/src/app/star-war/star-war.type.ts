export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
  films: string[];
}

export type PersonFilms = {
  person: Person | undefined,
  films: string[]
};

export type OptionalPersonFilmsTuple = [Person, ...string[]] | undefined
