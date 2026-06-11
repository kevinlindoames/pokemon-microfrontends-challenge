import { usePokemonSearchStore } from '../model/pokemon-search.store';

export function PokemonSearchButton() {
  const openSearch = usePokemonSearchStore((state) => state.openSearch);

  return (
    <button
      className="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-black text-purple-700 shadow-sm transition hover:bg-purple-100 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:bg-cyan-300/20"
      type="button"
      onClick={openSearch}
    >
      🔎 Search
    </button>
  );
}