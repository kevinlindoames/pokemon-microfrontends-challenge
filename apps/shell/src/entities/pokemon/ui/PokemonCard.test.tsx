
import '@testing-library/jest-dom/vitest';

import React from 'react';
import type { PokemonSummary } from '@pokemon-challenge/shared';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { PokemonCard } from './PokemonCard';

const pokemon: PokemonSummary = {
  id: '25',
  name: 'pikachu',
  image: 'pikachu.png',
};

describe('PokemonCard', () => {
  it('should render pokemon information', () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={pokemon} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/#25/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toHaveAttribute(
      'src',
      'pikachu.png',
    );
  });

  it('should link to pokemon detail page', () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={pokemon} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/pokemon/25');
  });
});