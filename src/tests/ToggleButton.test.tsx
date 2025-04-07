import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ToggleButton } from '../components/ToggleButton';

describe('ToggleButton', () => {
    it('renders correctly when closed', () => {
        const onClickMock = vi.fn();
        render(<ToggleButton isOpen={false} onClick={onClickMock} position="bottom-right" isDarkMode={false} />);
        expect(screen.getByRole('button', { name: /Open DevPeek/i })).toBeInTheDocument();
    });

    it('renders correctly when open', () => {
        const onClickMock = vi.fn();
        render(<ToggleButton isOpen={true} onClick={onClickMock} position="bottom-right" isDarkMode={false} />);
        expect(screen.getByRole('button', { name: /Close DevPeek/i })).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
        const onClickMock = vi.fn();
        render(<ToggleButton isOpen={false} onClick={onClickMock} position="bottom-right" isDarkMode={false} />);

        const button = await screen.findByRole('button');
        await userEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('applies correct position classes', () => {
        const onClickMock = vi.fn();
        const { rerender } = render(
            <ToggleButton isOpen={false} onClick={onClickMock} position="top-left" isDarkMode={false} />
        );

        const button = screen.getByRole('button');
        console.log('CLASSNAMES:', button.className);
        expect(button.className).toMatch(/top-3/);
        expect(button.className).toMatch(/left-3/);

        rerender(<ToggleButton isOpen={false} onClick={onClickMock} position="bottom-right" isDarkMode={false} />);
        const button2 = screen.getByRole('button');
        expect(button2.className).toMatch(/bottom-3/);
        expect(button2.className).toMatch(/right-3/);
    });
});
