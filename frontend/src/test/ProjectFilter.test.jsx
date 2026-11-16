import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('Project Filtering and Details Modal', () => {
  it('filters project list by selected category tab', () => {
    render(<App />);

    const cvTab = screen.getByRole('tab', { name: 'Computer Vision' });
    fireEvent.click(cvTab);

    expect(screen.getByText('WOMEN SAFETY CCTV SURVEILLANCE SYSTEM')).toBeInTheDocument();
    expect(screen.queryByText('PLANT DISEASE DETECTION')).not.toBeInTheDocument();
  });

  it('opens and closes project modal on deep dive click', () => {
    render(<App />);

    const deepDiveButtons = screen.getAllByRole('button', { name: /View details for/i });
    expect(deepDiveButtons.length).toBeGreaterThan(0);

    fireEvent.click(deepDiveButtons[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Challenge & Problem')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close project modal/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
