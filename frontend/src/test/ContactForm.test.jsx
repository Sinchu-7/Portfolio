import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('Contact Form Validation', () => {
  it('displays required validation errors on empty submission', async () => {
    render(<App />);

    const submitBtn = screen.getByRole('button', { name: /Submit Message/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Subject is required.')).toBeInTheDocument();
    expect(screen.getByText('Message is required.')).toBeInTheDocument();
  });

  it('validates email format when invalid email is typed', async () => {
    render(<App />);

    const emailInput = screen.getByPlaceholderText('you@example.com');
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });

    const submitBtn = screen.getByRole('button', { name: /Submit Message/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });
});
