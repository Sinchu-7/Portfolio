import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the portfolio hero content', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Engineering Ideas Into Meaningful Digital Experiences\./i })).toBeInTheDocument();
    expect(screen.getByText(/I'm Sinchana Poojary/i)).toBeInTheDocument();
  });
});
