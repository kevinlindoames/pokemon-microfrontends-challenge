import { PokemonPreviewCard } from '@pokemon-challenge/ui';
import type { PokemonSummary } from '@pokemon-challenge/shared';

type PokemonCardProps = {
  pokemon: PokemonSummary;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return <PokemonPreviewCard pokemon={pokemon} to={`/pokemon/${pokemon.id}`} />;
}