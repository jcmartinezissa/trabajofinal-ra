import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../services/firebase';

const MySwal = withReactContent(Swal);

export const updateUsuario = (email, id, setActualizar) => {
  MySwal.fire({
    title: 'Estas seguro?',
    text: `convertir Admin el usuario ${email}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF3270',
    cancelButtonColor: '#12a696',
    confirmButtonText: 'yeah, do it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const dataUpdate = doc(db, 'usuarios', id);
      try {
        await updateDoc(dataUpdate, {
          rol: 'staff',
        });
        setActualizar(true);
      } catch (error) {
        console.error(error);
      }
    }
  });
};

export const cambiarEsUsuario = (email, id, estado, setActualizar) => {
  MySwal.fire({
    title: 'Estas seguro?',
    text: `Eliminar el usuario ${email}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF3270',
    cancelButtonColor: '#12a696',
    confirmButtonText: 'yeah, do it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const dataUpdate = doc(db, 'usuarios', id);
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
