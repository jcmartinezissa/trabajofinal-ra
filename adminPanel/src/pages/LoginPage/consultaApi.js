import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../../services/firebase';

export const loginApi = async (data) => {
  const q = query(collection(db, 'admin'), where('correo', '==', data.email));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 1) {
      let user;
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        user = userData;
      });
      if (user?.pass === data.pass) {
        return user;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La informacion es incorrecta o no tenes acceso',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La informacion es incorrcta o no tenes acceso',
      });
    }
  } catch (error) {
    console.error(error);
  }
};
