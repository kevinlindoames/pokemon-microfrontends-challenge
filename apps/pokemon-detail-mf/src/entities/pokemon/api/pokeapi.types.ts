export type PokeApiNamedResource = {
  name: string;
  url: string;
};

export type PokeApiPokemonStat = {
  base_stat: number;
  effort: number;
  stat: PokeApiNamedResource;
};

export type PokeApiPokemonType = {
  slot: number;
  type: PokeApiNamedResource;
};

export type PokeApiPokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: PokeApiNamedResource;
};

export type PokeApiPokemonMove = {
  move: PokeApiNamedResource;
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

export type PokeApiPokemonCries = {
  latest?: string | null;
  legacy?: string | null;
};

export type PokeApiPokemonDetailResponse = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokeApiPokemonSprites;
  stats: PokeApiPokemonStat[];
  types: PokeApiPokemonType[];
  abilities: PokeApiPokemonAbility[];
  moves: PokeApiPokemonMove[];
  cries?: PokeApiPokemonCries;
  species: PokeApiNamedResource;
};

export type PokeApiFlavorTextEntry = {
  flavor_text: string;
  language: PokeApiNamedResource;
};

export type PokeApiPokemonSpeciesResponse = {
  id: number;
  name: string;
  flavor_text_entries: PokeApiFlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
};

export type PokeApiEvolutionChainLink = {
  species: PokeApiNamedResource;
  evolves_to: PokeApiEvolutionChainLink[];
};

export type PokeApiEvolutionChainResponse = {
  id: number;
  chain: PokeApiEvolutionChainLink;
};