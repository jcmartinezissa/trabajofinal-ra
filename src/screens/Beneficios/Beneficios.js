/* eslint-disable no-shadow */
import {
  collection, doc, getDoc, getDocs, query, setDoc, where,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { CardData } from '../../components/CardData';
import userContext from '../../context/UserProvider';
import { db } from '../../services/firebase';

const Beneficios = () => {
  const [dataBeneficios, setDataBeneficios] = useState([]);
  console.log(dataBeneficios);
  const [userRol, setUserRol] = useState({});
  console.log(userRol.rol);
  const { userData } = useContext(userContext);
  console.log(userData);
  const getDataLogin = async () => {
    const q = query(collection(db, 'usuarios'), where('uid', '==', userData));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setUserRol(doc.data());
    });
  };
  const getBeneficios = async () => {
    const { docs } = await getDocs(collection(db, 'beneficios'));
    const beneficiosMapped = docs.map(beneficio => {
      return {
        ...beneficio.data(),
        id: beneficio.id,
      };
    });
    if (userRol.rol === 'usuario') {
      setDataBeneficios(beneficiosMapped);
    } else {
      setDataBeneficios(beneficiosMapped?.filter(beneficio => beneficio.staff === false));
    }
  };
  useEffect(() => {
    getDataLogin();
    if (userRol) getBeneficios();
  }, []);
  return (
    <>
    {
      dataBeneficios.map(beneficio => (<CardData key={beneficio.id} beneficio={beneficio} />))
    }
    </>
  );
};

export default Beneficios;
