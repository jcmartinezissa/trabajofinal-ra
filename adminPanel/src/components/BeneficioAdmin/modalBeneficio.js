import {
  addDoc, collection, doc, updateDoc,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { db } from '../../services/firebase';

const MySwal = withReactContent(Swal);
export const newbeneficio = (setActualizar) => {
  MySwal.fire({
    title: 'Crear beneficio',
    html: `<input type="text" id='beneficio'  class="swal2-input" placeholder="Beneficio">
              <input type="text" id='img'  class="swal2-input" placeholder="imgen">
              <input type="text"  id='descripcion'  class="swal2-input" placeholder="Descripcion">
              <input type="text" id='titulo'  class="swal2-input" placeholder="Titulo">
              `,
    focusConfirm: false,
    confirmButtonText: 'Created',
    preConfirm: () => {
      const beneficio = Swal.getPopup().querySelector('#beneficio').value;
      const imagen = Swal.getPopup().querySelector('#img').value;
      const descripcion = Swal.getPopup().querySelector('#descripcion').value;
      const titulo = Swal.getPopup().querySelector('#titulo').value;
      if (!beneficio || !imagen || !descripcion || !titulo) {
        Swal.showValidationMessage('Completar los datos');
      }
      const dato = {
        beneficio,
        imagen,
        descripcion,
        titulo,
        activo: true,
        staff: true,
      };
      return dato;
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await addDoc(collection(db, 'beneficios'), result.value);
        setActualizar(true);
      } catch (error) {
        console.error(error);
      }

      MySwal.fire('Creado', 'User Admin', 'success');
      setActualizar(true);
    }
  });
};

export const edit = (variable, id, setActualizar) => {
  MySwal.fire({
    title: `Cambiar ${variable}`,
    html: `<input type="text" data-testId = 'editBeneficiosInput' id=${variable}  class="swal2-input" placeholder=${variable}>`,
    focusConfirm: false,
    confirmButtonText: 'Created',
    preConfirm: () => {
      const genre = Swal.getPopup().querySelector(`#${variable}`).value;
      if (!genre) {
        Swal.showValidationMessage('Completar los datos');
      }
      const dato = {
        [variable]: document.getElementById(variable).value,
      };
      return dato;
    },
  }).then(async (result) => {
    if (result.value) {
      const dataUpdate = doc(db, 'beneficios', id);
      try {
        await updateDoc(dataUpdate, result.value);
        setActualizar(true);
      } catch (error) {
        console.error(error);
      }
    }
  });
};

export const cambiarEstadoPromocion = (id, estado, setActualizar) => {
  MySwal.fire({
    title: 'Estas seguro?',
    text: 'Cambiar el estado',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF3270',
    cancelButtonColor: '#12a696',
    confirmButtonText: 'yeah, do it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const dataUpdate = doc(db, 'beneficios', id);
      try {
        await updateDoc(dataUpdate, {
          activo: !estado,
        });
        setActualizar(true);
      } catch (error) {
        console.error(error);
      }
    }
  });
};

export const soloStaff = (staff, id, setActualizar) => {
  const actualizar = staff
    ? 'Todos los usuarios tendran el beneficio'
    : 'Solo Staff tendran el beneficio';
  MySwal.fire({
    title: 'Estas seguro?',
    text: actualizar,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF3270',
    cancelButtonColor: '#12a696',
    confirmButtonText: 'yeah, do it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const dataUpdate = doc(db, 'beneficios', id);
      try {
        await updateDoc(dataUpdate, {
          staff: !staff,
        });
        setActualizar(true);
      } catch (error) {
        console.error(error);
      }
    }
  });
};
