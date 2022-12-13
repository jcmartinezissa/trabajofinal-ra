import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersAdmin from './UsersAdmin.jsx';

const updateUsuarioId = 'updateUsuario';
const cambiarEstadoUserId = 'cambiarEstadoUserButton';
const cambiarNotEstadoUserId = 'cambiar!EstadoUserButton';

const urlUser = [
  {
    id: 'asdasasd',
    nombre: 'asdasdasd',
    correo: 'asdasdasd@sdfsdfsdf.com',
    rol: 'usuario',
    activo: false,
  },
];

describe('UsersAdmin test', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UsersAdmin urlUser={urlUser} />
      </BrowserRouter>,
    );
  });
  test('esperamos que renderice el componente UsersAdmin', () => {
    const updateUsuarioButton = screen.getByTestId(updateUsuarioId);
    fireEvent.click(updateUsuarioButton);
    const elementButton = screen.getByText('yeah, do it!');
    fireEvent.click(elementButton);
  });
  test('Tome el boton habilitar Beneficio BeneficioAdmin', () => {
    const cambiarEstadoPromocionIdButton = screen.getByTestId(cambiarEstadoUserId);
    fireEvent.click(cambiarEstadoPromocionIdButton);
    const element = screen.getByText('Estas seguro?');
    expect(element).toBeInTheDocument();
  });
  test('Tome el boton desabilitar Beneficio BeneficioAdmin', () => {
    const urlUserDos = [
      {
        id: 'asdasasd',
        nombre: 'asdasdasd',
        correo: 'asdasdasd@sdfsdfsdf.com',
        rol: 'usuario',
        activo: true,
      },
    ];
    render(
        <BrowserRouter>
          <UsersAdmin urlUser={urlUserDos} />
        </BrowserRouter>,
    );
    const cambiarEstadoPromocionIdButton = screen.getByTestId(
      cambiarNotEstadoUserId,
    );
    fireEvent.click(cambiarEstadoPromocionIdButton);
    const element = screen.getByText('Estas seguro?');
    expect(element).toBeInTheDocument();
  });
});
describe('UsersAdmin Staff test', () => {
  test('No renderice el boton de pasar a Staff', () => {
    const urlUserDos = [
      {
        id: 'asdasasd',
        nombre: 'asdasdasd',
        correo: 'asdasdasd@sdfsdfsdf.com',
        rol: 'staff',
        activo: true,
      },
    ];
    render(
      <BrowserRouter>
        <UsersAdmin urlUser={urlUserDos} />
      </BrowserRouter>,
    );
    const updateUsuario = screen.queryByTestId(updateUsuarioId);
    expect(updateUsuario).toBeNull();
  });
});
