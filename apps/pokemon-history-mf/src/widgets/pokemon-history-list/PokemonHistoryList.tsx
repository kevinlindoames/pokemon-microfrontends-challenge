import type { VisitedPokemon } from '@pokemon-challenge/shared';
import { VisitedPokemonItem } from '../../entities/pokemon-history/ui/VisitedPokemonItem';

type PokemonHistoryListProps = {
  history: VisitedPokemon[];
};

export function PokemonHistoryList({ history }: PokemonHistoryListProps) {
  return (
    <div className="space-y-4">
      {history.map((pokemon) => (
        <VisitedPokemonItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}