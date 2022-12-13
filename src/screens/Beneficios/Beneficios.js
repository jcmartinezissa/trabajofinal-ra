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
  const [userRol, setUserRol] = useState({});
  const { userData } = useContext(userContext);

  const getBeneficios = async () => {
    const q = query(collection(db, 'usuarios'), where('uid', '==', userData));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setUserRol(doc.data());
    });
    const { docs } = await getDocs(collection(db, 'beneficios'));
    const beneficiosMapped = docs.map(beneficio => {
      return {
        ...beneficio.data(),
        id: beneficio.id,
      };
    });
    if (userRol.rol === 'usuario') {
      const dataFilter = dataBeneficios.filter(beneficio => beneficio.staff === false);
      setDataBeneficios(dataFilter);
    } else {
      setDataBeneficios(beneficiosMapped);
    }
  };

  useEffect(() => {
    getBeneficios();
  }, [dataBeneficios]);
  return (
    <>
    {
      dataBeneficios.map(beneficio => (<CardData key={beneficio.id} beneficio={beneficio} />))
    }
    </>
  );
};

export default Beneficios;
