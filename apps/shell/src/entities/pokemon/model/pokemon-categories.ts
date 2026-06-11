import type { PokemonTypeName } from '@pokemon-challenge/shared';

type PokemonCategory = {
  type: PokemonTypeName;
  label: string;
  description: string;
};

export const POKEMON_CATEGORIES: PokemonCategory[] = [
  {
    type: 'fire',
    label: 'Fire',
    description: 'Pokémon de ataque intenso y energía alta.',
  },
  {
    type: 'water',
    label: 'Water',
    description: 'Pokémon versátiles, resistentes y equilibrados.',
  },
  {
    type: 'grass',
    label: 'Grass',
    description: 'Pokémon naturales con habilidades tácticas.',
  },
  {
    type: 'electric',
    label: 'Electric',
    description: 'Pokémon rápidos con alto impacto ofensivo.',
  },
  {
    type: 'psychic',
    label: 'Psychic',
    description: 'Pokémon estratégicos de habilidades mentales.',
  },
  {
    type: 'rock',
    label: 'Rock',
    description: 'Pokémon sólidos, defensivos y resistentes.',
  },
];