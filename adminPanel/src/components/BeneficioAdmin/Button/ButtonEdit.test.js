import { fireEvent, render, screen } from '@testing-library/react';
import ButtonEdit from './ButtonEdit.jsx';

const editBeneficiosId = 'editBeneficiosButton';
describe('BeneficioAdmin test', () => {
  beforeEach(() => {
    render(<ButtonEdit />);
  });
  test('Tome el boton Editar Beneficio BeneficioAdmin', () => {
    const editBeneficiosIdButton = screen.getByTestId(editBeneficiosId);
    fireEvent.click(editBeneficiosIdButton);
    const editBeneficiosInputId = screen.getByTestId('editBeneficiosInput');
    expect(editBeneficiosInputId).toBeInTheDocument();
  });
});
