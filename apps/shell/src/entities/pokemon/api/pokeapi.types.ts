export type PokeApiNamedResource = {
  name: string;
  url: string;
};

export type PokeApiTypePokemonItem = {
  pokemon: PokeApiNamedResource;
  slot: number;
};

export type PokeApiTypeResponse = {
  id: number;
  name: string;
  pokemon: PokeApiTypePokemonItem[];
};

export type PokeApiPokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiNamedResource[];
};

export type PokeApiPokemonSprites = {
  front_default?: string | null;
  other?: {
    dream_world?: {
      front_default?: string | null;
    };
    'official-artwork'?: {
      front_default?: string | null;
    };
  };
};

export type PokeApiPokemonDetailResponse = {
  id: number;
  name: string;
  sprites: PokeApiPokemonSprites;
};