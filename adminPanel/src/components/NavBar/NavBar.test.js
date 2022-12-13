import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar.jsx';

describe('NavBar test', () => {
  test('esperamos que renderice el componente NavBar', () => {
    render(
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>,
    );

    const element = screen.getByText(
      'RollingBeneficiosAdmin',
    );

    expect(element).toBeInTheDocument();
  });
});
