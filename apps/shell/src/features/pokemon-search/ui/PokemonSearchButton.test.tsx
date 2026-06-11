import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { usePokemonSearchStore } from '../model/pokemon-search.store';
import { PokemonSearchButton } from './PokemonSearchButton';

describe('PokemonSearchButton', () => {
  beforeEach(() => {
    usePokemonSearchStore.setState({
      isOpen: false,
    });
  });

  it('should render search button', () => {
    render(<PokemonSearchButton />);

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should open search modal state when clicked', async () => {
    const user = userEvent.setup();

    render(<PokemonSearchButton />);

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(usePokemonSearchStore.getState().isOpen).toBe(true);
  });
});