export type PokemonTypeName =
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'rock';

export type PokemonSummary = {
  id: string;
  name: string;
  image?: string;
};

export type PokemonStat = {
  name: string;
  value: number;
};

export type PokemonAbility = {
  name: string;
  isHidden: boolean;
};

export type PokemonEvolution = {
  id: string;
  name: string;
  image: string;
};

export type PokemonDetail = {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: PokemonStat[];
  height: number;
  weight: number;
  baseExperience: number;
  abilities: PokemonAbility[];
  moves: string[];
  cry?: string;
  description?: string;
  evolutionChain: PokemonEvolution[];
};