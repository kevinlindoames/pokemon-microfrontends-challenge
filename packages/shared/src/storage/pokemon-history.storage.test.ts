import { beforeEach, describe, expect, it } from 'vitest';
import type { PokemonDetail } from '../types/pokemon.types';
import {
  clearPokemonHistory,
  getPokemonHistory,
  savePokemonVisit,
} from './pokemon-history.storage';

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

describe('pokemon-history.storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return an empty history by default', () => {
    expect(getPokemonHistory()).toEqual([]);
  });

  it('should save a new pokemon visit', () => {
    savePokemonVisit(createPokemon());

    expect(getPokemonHistory()).toEqual([
      expect.objectContaining({
        id: 25,
        name: 'pikachu',
        image: 'pikachu.png',
        visits: 1,
      }),
    ]);
  });

  it('should increment visits when pokemon already exists', () => {
    savePokemonVisit(createPokemon());
    savePokemonVisit(createPokemon());

    const history = getPokemonHistory();

    expect(history).toHaveLength(1);
    expect(history[0]).toEqual(
      expect.objectContaining({
        id: 25,
        visits: 2,
      }),
    );
  });

  it('should sort history by last visited date descending', () => {
    savePokemonVisit(createPokemon({ id: 1, name: 'bulbasaur' }));
    savePokemonVisit(createPokemon({ id: 4, name: 'charmander' }));

    const history = getPokemonHistory();

    expect(history[0].id).toBe(4);
    expect(history[1].id).toBe(1);
  });

  it('should clear pokemon history', () => {
    savePokemonVisit(createPokemon());

    clearPokemonHistory();

    expect(getPokemonHistory()).toEqual([]);
  });
});