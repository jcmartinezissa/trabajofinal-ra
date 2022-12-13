/* eslint-disable max-len */
import React from 'react';
import { Button } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonEdit from './Button/ButtonEdit.jsx';
import {
  cambiarEstadoPromocion,
  newbeneficio, soloStaff,
} from './modalBeneficio';

const BeneficioAdmin = ({ beneficios, setActualizar }) => {
  return (
    <>
      <Button
        className="offset-10"
        variant="success"
        data-testId='newBeneficiosButton'
        onClick={() => newbeneficio(setActualizar)}>
        Nueva Promocion
      </Button>
      <div className="row">
        <div className="col">
          <table className="table table-striped mt-3 table-admin">
            <thead>
              <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Promocion</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Titulo</th>
                <th scope="col">Exclusivo</th>
              </tr>
            </thead>
            <tbody>
              {beneficios?.map((beneficio) => (
                <tr key={beneficio.id}>
                  <td>
                    <img src={beneficio.imagen} className="img-table"></img>
                    <ButtonEdit variable='imagen' id={beneficio.id} setActualizar={setActualizar} />
                  </td>
                  <td>
                    {beneficio.beneficio}
                    <ButtonEdit variable='beneficio' id={beneficio.id} setActualizar={setActualizar} />
                  </td>
                  <td className="fw-light fs-6 text-center">
                    {beneficio.descripcion}
                    <ButtonEdit variable='descripcion' id={beneficio.id} setActualizar={setActualizar} />
                  </td>
                  <td className="fw-light fs-6 text-center">
                    {beneficio.titulo}
                    <ButtonEdit variable='titulo' id={beneficio.id} setActualizar={setActualizar} />
                  </td>
                  <td>
                    <ToggleButton
                      className="mb-2"
                      id="toggle-check"
                      type="checkbox"
                      variant="outline-primary"
                      data-testId = 'soloStaffButton'
                      checked={beneficio.staff}
                      value="1"
                      onChange={() => soloStaff(beneficio.staff, beneficio.id, setActualizar)}>
                      Staff
                    </ToggleButton>
                  </td>
                  <td className="delete-btn">
                    {beneficio.activo ? (
                      <Button
                      data-testId = 'cambiar!EstadoPromocionButton'
                        variant="danger"
                        onClick={() => cambiarEstadoPromocion(beneficio.id, beneficio.activo, setActualizar)
                        }>
                        <i className="bi bi-bell-slash"></i>
                      </Button>
                    ) : (
                        <Button
                        data-testId = 'cambiarEstadoPromocionButton'
                        variant="success"
                        onClick={() => cambiarEstadoPromocion(beneficio.email, beneficio.id, beneficio.activo, setActualizar)
                        }>
                        <i className="bi bi-bell"></i>
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

export default BeneficioAdmin;
