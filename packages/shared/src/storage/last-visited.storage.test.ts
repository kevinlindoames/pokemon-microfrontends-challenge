import { beforeEach, describe, expect, it } from 'vitest';
import type { PokemonDetail } from '../types/pokemon.types';
import {
  dismissLastVisitedToast,
  getLastVisitedPokemon,
  setLastVisitedPokemon,
  shouldShowLastVisitedToast,
} from './last-visited.storage';

function createPokemon(overrides: Partial<PokemonDetail> = {}): PokemonDetail {
  return {
    id: 25,
    name: 'pikachu',
    image: 'pikachu.png',
    types: ['electric'],
    stats: [],
    height: 4,
    weight: 60,
    baseExperience: 112,
    abilities: [],
    moves: [],
    evolutionChain: [],
    ...overrides,
  };
}

describe('last-visited.storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return null when there is no last visited pokemon', () => {
    expect(getLastVisitedPokemon()).toBeNull();
  });

  it('should save last visited pokemon', () => {
    setLastVisitedPokemon(createPokemon());

    expect(getLastVisitedPokemon()).toEqual(
      expect.objectContaining({
        id: 25,
        name: 'pikachu',
      }),
    );
  });

  it('should show toast when last visited pokemon exists and was not dismissed', () => {
    setLastVisitedPokemon(createPokemon());

    expect(shouldShowLastVisitedToast()).toBe(true);
  });

  it('should not show toast after dismissing it', () => {
    setLastVisitedPokemon(createPokemon());
    dismissLastVisitedToast();

    expect(shouldShowLastVisitedToast()).toBe(false);
  });

  it('should show toast again when another pokemon is visited', () => {
    setLastVisitedPokemon(createPokemon({ id: 25, name: 'pikachu' }));
    dismissLastVisitedToast();

    setLastVisitedPokemon(createPokemon({ id: 133, name: 'eevee' }));

    expect(shouldShowLastVisitedToast()).toBe(true);
    expect(getLastVisitedPokemon()?.name).toBe('eevee');
  });
});