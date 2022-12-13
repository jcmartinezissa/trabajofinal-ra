import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer.jsx';

describe('Footer test', () => {
  test('esperamos que renderice el componente footer', () => {
    render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>,
    );

    const element = screen.getByText(
      'RollingBeneficiosAdmin',
    );

    expect(element).toBeInTheDocument();
  });
});
