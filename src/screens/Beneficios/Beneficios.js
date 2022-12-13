import {
  collection, doc, getDoc, getDocs, setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { CardData } from '../../components/CardData';
import { db } from '../../services/firebase';

const Beneficios = () => {
  const [dataBeneficios, setDataBeneficios] = useState([]);
  console.log(dataBeneficios);
  const getBeneficios = async () => {
    const { docs } = await getDocs(collection(db, 'beneficios'));
    const beneficiosMapped = docs.map(beneficio => {
      return {
        ...beneficio.data(),
        id: beneficio.id,
      };
    });
    setDataBeneficios(beneficiosMapped);
  };
  useEffect(() => {
    getBeneficios();
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
