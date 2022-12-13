import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import PagesAdmin from './PagesAdmin.jsx';

const beneficiosButton = 'BeneficiosButton';
const userButton = 'UserButton';

describe('PagesAdmin test', () => {
  test('esperamos que renderice el componente PagesAdmin', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PagesAdmin />
        </BrowserRouter>
        ,
      </Provider>,
    );

    const element = screen.getByText('User');

    expect(element).toBeInTheDocument();
  });
  test('funcionalidad de boton', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PagesAdmin />
        </BrowserRouter>
        ,
      </Provider>,
    );

    const elementBeneficiosButton = screen.getByTestId(beneficiosButton);
    const elementUserButton = screen.getByTestId(userButton);

    fireEvent.click(elementBeneficiosButton);
    fireEvent.click(elementUserButton);
  });
});
