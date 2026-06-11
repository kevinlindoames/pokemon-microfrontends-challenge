import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { LastVisitedToast } from './LastVisitedToast';

const LAST_VISITED_KEY = 'pokemon_last_visited';
const TOAST_DISMISSED_KEY = 'pokemon_last_visited_toast_dismissed';

const pikachu = {
  id: 25,
  name: 'pikachu',
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  types: ['electric'],
  stats: [
    {
      name: 'speed',
      value: 90,
    },
  ],
  height: 4,
  weight: 60,
  baseExperience: 112,
  abilities: [
    {
      name: 'static',
      isHidden: false,
    },
  ],
  moves: ['thunder-shock'],
  cry: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg',
  description: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
  evolutionChain: [],
};

function renderLastVisitedToast() {
  return render(
    <MemoryRouter>
      <LastVisitedToast />
    </MemoryRouter>,
  );
}

describe('LastVisitedToast', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('does not render when there is no last visited pokemon', () => {
    renderLastVisitedToast();

    expect(screen.queryByText('Último visitado')).not.toBeInTheDocument();
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });

  it('renders the last visited pokemon when the toast was not dismissed', () => {
    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(pikachu));

    renderLastVisitedToast();

    expect(screen.getByText('Último visitado')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(
      screen.getByText('Puedes volver rápidamente a su ficha Pokédex.'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /ver detalle/i,
      }),
    ).toHaveAttribute('href', '/pokemon/25');

    expect(
      screen.getByRole('button', {
        name: /cerrar/i,
      }),
    ).toBeInTheDocument();
  });

  it('does not render when the toast was already dismissed', () => {
    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(pikachu));
    localStorage.setItem(TOAST_DISMISSED_KEY, JSON.stringify(true));

    renderLastVisitedToast();

    expect(screen.queryByText('Último visitado')).not.toBeInTheDocument();
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });

  it('dismisses the toast when the close button is clicked', async () => {
    const user = userEvent.setup();

    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(pikachu));

    renderLastVisitedToast();

    await user.click(
      screen.getByRole('button', {
        name: /cerrar/i,
      }),
    );

    expect(screen.queryByText('Último visitado')).not.toBeInTheDocument();
    expect(localStorage.getItem(TOAST_DISMISSED_KEY)).toBe('true');
  });

  it('dismisses the toast when the detail link is clicked', async () => {
    const user = userEvent.setup();

    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(pikachu));

    renderLastVisitedToast();

    await user.click(
      screen.getByRole('link', {
        name: /ver detalle/i,
      }),
    );

    expect(screen.queryByText('Último visitado')).not.toBeInTheDocument();
    expect(localStorage.getItem(TOAST_DISMISSED_KEY)).toBe('true');
  });
});