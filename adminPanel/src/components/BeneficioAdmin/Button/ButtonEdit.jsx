import React from 'react';
import { Button } from 'react-bootstrap';
import { edit } from '../modalBeneficio';

const ButtonEdit = ({ variable, id, setActualizar }) => {
  return (
    <Button
      variant="link"
      data-testId="editBeneficiosButton"
      onClick={() => edit(variable, id, setActualizar)}>
      <i className="bi bi-pencil"></i>
    </Button>
  );
};

export default ButtonEdit;
