import { STORAGE_KEYS } from '../constants/storage-keys';
import type { PokemonDetail } from '../types/pokemon.types';
import type { VisitedPokemon } from '../types/pokemon-history.types';
import { getStorageItem, removeStorageItem, setStorageItem } from './safe-storage';

export function getPokemonHistory(): VisitedPokemon[] {
  return getStorageItem<VisitedPokemon[]>(STORAGE_KEYS.pokemonHistory, []);
}

export function savePokemonVisit(pokemon: PokemonDetail): VisitedPokemon[] {
  const history = getPokemonHistory();
  const now = new Date().toISOString();

  const existingPokemon = history.find((item) => item.id === pokemon.id);

  const updatedHistory = existingPokemon
    ? history.map((item) =>
        item.id === pokemon.id
          ? {
              ...item,
              name: pokemon.name,
              image: pokemon.image,
              visits: item.visits + 1,
              lastVisitedAt: now,
            }
          : item,
      )
    : [
        {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          visits: 1,
          lastVisitedAt: now,
        },
        ...history,
      ];

  const sortedHistory = [...updatedHistory].sort(
    (a, b) =>
      new Date(b.lastVisitedAt).getTime() - new Date(a.lastVisitedAt).getTime(),
  );

  setStorageItem(STORAGE_KEYS.pokemonHistory, sortedHistory);

  return sortedHistory;
}

export function clearPokemonHistory(): void {
  removeStorageItem(STORAGE_KEYS.pokemonHistory);
}