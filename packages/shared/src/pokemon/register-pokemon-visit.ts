import type { PokemonDetail } from '../types/pokemon.types';
import { setLastVisitedPokemon } from '../storage/last-visited.storage';
import { savePokemonVisit } from '../storage/pokemon-history.storage';

export function registerPokemonVisit(pokemon: PokemonDetail): void {
  savePokemonVisit(pokemon);
  setLastVisitedPokemon(pokemon);
}