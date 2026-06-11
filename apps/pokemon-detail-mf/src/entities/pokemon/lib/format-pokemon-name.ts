export function formatPokemonName(value: string): string {
  return value.replace(/-/g, ' ');
}