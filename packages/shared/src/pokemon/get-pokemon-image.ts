type PokeApiSprites = {
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

export function getPokemonImage(sprites: PokeApiSprites): string {
  return (
    sprites.other?.dream_world?.front_default ||
    sprites.other?.['official-artwork']?.front_default ||
    sprites.front_default ||
    ''
  );
}