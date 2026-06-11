import '@testing-library/jest-dom/vitest';

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ClearHistoryButton } from './ClearHistoryButton';

describe('ClearHistoryButton', () => {
  it('should render clear history button', () => {
    render(<ClearHistoryButton onClear={() => {}} />);

    expect(
      screen.getByRole('button', { name: /limpiar historial/i }),
    ).toBeInTheDocument();
  });

  it('should call onClear when clicked', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(<ClearHistoryButton onClear={onClear} />);

    await user.click(screen.getByRole('button', { name: /limpiar historial/i }));

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<ClearHistoryButton disabled onClear={() => {}} />);

    expect(
      screen.getByRole('button', { name: /limpiar historial/i }),
    ).toBeDisabled();
  });
});