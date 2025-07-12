import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jordyn Heil name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Jordyn Heil/i);
  expect(nameElement).toBeInTheDocument();
});
