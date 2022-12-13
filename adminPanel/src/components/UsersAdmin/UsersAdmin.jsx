/* eslint-disable max-len */
import React from 'react';
import { Button } from 'react-bootstrap';
import { cambiarEsUsuario, updateUsuario } from './modalUser';

const UsersAdmin = ({ urlUser, setActualizar }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <table className="table table-striped mt-3 table-admin">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Rol</th>
                <th scope="col">Configuration</th>
              </tr>
            </thead>
            <tbody>
              {urlUser?.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td className="fw-light fs-6 text-center">
                    {usuario.correo}
                  </td>
                  <td className="fw-light fs-6 text-center">{usuario.rol}</td>
                  <td className="delete-btn">
                    {usuario.rol === 'staff' ? (
                      <></>
                    ) : (
                      <Button
                          variant="success"
                          data-testId = 'updateUsuario'
                        onClick={() => updateUsuario(usuario.Correo, usuario.id, setActualizar)
                        }>
                        Convertir staff
                      </Button>
                    )}
                    {usuario.activo ? (
                      <Button
                        variant="danger"
                        data-testId = 'cambiar!EstadoUserButton'
                        onClick={() => cambiarEsUsuario(usuario.email, usuario.id, usuario.activo, setActualizar)
                        }>
                        <i className="bi bi-person-slash"></i>
                      </Button>
                    ) : (
                      <Button
                          variant="success"
                        data-testId = 'cambiarEstadoUserButton'
                          onClick={() => cambiarEsUsuario(usuario.email, usuario.id, usuario.activo, setActualizar)
                        }>
                        <i className="bi bi-person-add"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsersAdmin;
