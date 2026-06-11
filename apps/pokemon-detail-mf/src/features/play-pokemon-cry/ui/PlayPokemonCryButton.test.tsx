
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PlayPokemonCryButton } from './PlayPokemonCryButton';

const playMock = vi.fn();

class AudioMock {
  src: string;

  constructor(src: string) {
    this.src = src;
  }

  play() {
    return playMock();
  }
}

describe('PlayPokemonCryButton', () => {
  beforeEach(() => {
    playMock.mockClear();
    vi.stubGlobal('Audio', AudioMock);
  });

  it('should render play cry button', () => {
    render(<PlayPokemonCryButton cry="pikachu.mp3" />);

    expect(screen.getByRole('button', { name: /play cry/i })).toBeInTheDocument();
  });

  it('should play audio when cry exists', async () => {
    const user = userEvent.setup();

    render(<PlayPokemonCryButton cry="pikachu.mp3" />);

    await user.click(screen.getByRole('button', { name: /play cry/i }));

    expect(playMock).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when cry does not exist', () => {
    render(<PlayPokemonCryButton />);

    expect(screen.getByRole('button', { name: /play cry/i })).toBeDisabled();
  });
});