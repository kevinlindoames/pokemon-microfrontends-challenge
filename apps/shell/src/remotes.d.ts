declare module 'pokemonDetailMf/PokemonDetail' {
  import type { ComponentType } from 'react';

  type PokemonDetailProps = {
    pokemonId: string;
  };

  const PokemonDetail: ComponentType<PokemonDetailProps>;

  export default PokemonDetail;
}

declare module 'pokemonHistoryMf/PokemonHistory' {
  import type { ComponentType } from 'react';

  const PokemonHistory: ComponentType;

  export default PokemonHistory;
}