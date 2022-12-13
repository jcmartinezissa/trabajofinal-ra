import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BeneficioAdmin from './BeneficioAdmin.jsx';

const newBeneficiosId = 'newBeneficiosButton';
const cambiarEstadoPromocionId = 'cambiarEstadoPromocionButton';
const cambiarNotEstadoPromocionId = 'cambiar!EstadoPromocionButton';
const soloStaffId = 'soloStaffButton';
const beneficios = [
  {
    id: 'asdasasd',
    imagen: 'asdasdasd',
    beneficio: 'asdasdasd@sdfsdfsdf.com',
    descripcion: 'usuario',
    titulo: 'sdsdsdsd',
    staff: false,
  },
];

describe('BeneficioAdmin test', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <BeneficioAdmin beneficios={beneficios} />
      </BrowserRouter>,
    );
  });
  test('Tome el boton Crear Beneficio BeneficioAdmin', () => {
    const newBeneficiosIdButton = screen.getByTestId(newBeneficiosId);
    fireEvent.click(newBeneficiosIdButton);
    const element = screen.getByText('Crear beneficio');
    expect(element).toBeInTheDocument();
  });
  test('Tome el boton habilitar Beneficio BeneficioAdmin', () => {
    const cambiarEstadoPromocionIdButton = screen.getByTestId(
      cambiarEstadoPromocionId,
    );
    fireEvent.click(cambiarEstadoPromocionIdButton);
    const element = screen.getByText('Estas seguro?');
    expect(element).toBeInTheDocument();
  });
  test('Tome el boton solo Staff Beneficio BeneficioAdmin', () => {
    const soloStaffIdButton = screen.getByTestId(soloStaffId);
    fireEvent.click(soloStaffIdButton);
    const elementStaff = screen.getByText('Solo Staff tendran el beneficio');
    expect(elementStaff).toBeInTheDocument();
  });
  test('Tome el boton desabilitar Beneficio BeneficioAdmin', () => {
    const beneficiosDos = [
      {
        id: 'asdasasd',
        imagen: 'asdasdasd',
        beneficio: 'asdasdasd@sdfsdfsdf.com',
        descripcion: 'usuario',
        titulo: 'sdsdsdsd',
        staff: true,
        activo: true,
      },
    ];
    render(
        <BrowserRouter>
          <BeneficioAdmin beneficios={beneficiosDos} />
        </BrowserRouter>,
    );
    const cambiarEstadoPromocionIdButton = screen.getByTestId(
      cambiarNotEstadoPromocionId,
    );
    fireEvent.click(cambiarEstadoPromocionIdButton);
    const element = screen.getByText('Estas seguro?');
    expect(element).toBeInTheDocument();
  });
});
