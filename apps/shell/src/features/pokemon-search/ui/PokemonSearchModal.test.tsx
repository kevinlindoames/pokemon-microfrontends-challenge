import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePokemonSearchStore } from '../model/pokemon-search.store';
import { PokemonSearchModal } from './PokemonSearchModal';

vi.mock('../../../entities/pokemon/api/use-pokemon-infinite-query', () => ({
  usePokemonInfiniteQuery: () => ({
    data: {
      pages: [
        {
          results: [
            {
              id: '25',
              name: 'pikachu',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
            },
          ],
        },
      ],
    },
    isLoading: false,
    isError: false,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: vi.fn(),
  }),
}));

vi.mock('../../../entities/pokemon/api/use-search-pokemon-query', () => ({
  useSearchPokemonQuery: () => ({
    data: null,
    isFetching: false,
  }),
}));

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => []);
  unobserve = vi.fn();
}

function renderSearchModal() {
  return render(
    <MemoryRouter>
      <PokemonSearchModal />
    </MemoryRouter>,
  );
}

describe('PokemonSearchModal accessibility', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    usePokemonSearchStore.setState({
      isOpen: true,
    });
  });

  it('renders as an accessible dialog when it is open', () => {
    renderSearchModal();

    const dialog = screen.getByRole('dialog', {
      name: /buscar pokémon/i,
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'pokemon-search-title');
    expect(dialog).toHaveAttribute(
      'aria-describedby',
      'pokemon-search-description',
    );

    expect(
      screen.getByRole('button', {
        name: /cerrar buscador de pokémon/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: /buscar pokémon por nombre exacto/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/la búsqueda usa coincidencia exacta/i),
    ).toBeInTheDocument();
  });

  it('focuses the search input when the modal opens', async () => {
    renderSearchModal();

    const input = screen.getByRole('textbox', {
      name: /buscar pokémon por nombre exacto/i,
    });

    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  });

  it('closes the modal when Escape is pressed', async () => {
    const user = userEvent.setup();

    renderSearchModal();

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', async () => {
    const user = userEvent.setup();

    renderSearchModal();

    await user.click(
      screen.getByRole('button', {
        name: /cerrar buscador de pokémon/i,
      }),
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});