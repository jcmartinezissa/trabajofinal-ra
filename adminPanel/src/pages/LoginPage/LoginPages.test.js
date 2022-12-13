import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import LoginPages from './LoginPages.jsx';

const testIdInput = 'emailInput';
const testIdButton = 'registerButton';

describe('Loging test', () => {
  test('esperamos que renderice el componente Loging', () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <LoginPages />
        </BrowserRouter>
      </Provider>,
    );

    const element = screen.getByText('RollingBeneficiosAdmin');

    expect(element).toBeInTheDocument();
  });
  test('esperamos escriba datos Loging', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPages />
        </BrowserRouter>
      </Provider>,
    );

    const elementInput = screen.queryByTestId(testIdInput);
    fireEvent.keyDown(elementInput, { target: { value: 'c' } });
    const elementInputDos = screen.queryByTestId(testIdInput);
    expect(elementInputDos).toBeInTheDocument('c');
  });
  test('esperamos que entre a registro Loging', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPages />
        </BrowserRouter>
      </Provider>,
    );

    const elementButton = screen.queryByTestId(testIdButton);
    fireEvent.click(elementButton);
  });
});
