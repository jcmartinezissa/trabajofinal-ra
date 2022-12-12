import { doc, updateDoc } from '@firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import {
  Button, Text, View,
} from 'react-native';
import { styles } from '../../../appStyles';
import userContext from '../../context/UserProvider';
import { db } from '../../services/firebase';

const CardData = ({ beneficio }) => {
  const { userData } = useContext(userContext);
  const [isChange, setIsChange] = useState(false);
  const isChangeBeneficios = beneficio.usuarios.map(date => date.date);
  console.log(isChangeBeneficios);
  console.log(beneficio);
  useEffect(() => {
    const dataChange = beneficio?.usuarios?.find(element => element.userData === userData);
    console.log(dataChange);
    if (dataChange) {
      setIsChange(dataChange);
    }
  }, [isChange]);

  const getBeneficio = async (data) => {
    console.log(data);
    const date = new Date();
    const dataUpdate = doc(db, 'beneficios', beneficio.id);
    const { usuarios } = beneficio;
    const userChange = {
      userData,
      date: date.toDateString(),
    };
    usuarios.push(userChange);
    try {
      await updateDoc(dataUpdate, { usuarios });
      setIsChange(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
        <View style={styles.card}>
          <Text>{beneficio.beneficio}</Text>
          <Text>{beneficio.descripcion}</Text>
          {isChange ? <Button title={`Fue Canjeado el: ${isChangeBeneficios}`} /> : <Button title='Obtener!' onPress={() => getBeneficio(beneficio)} />}
        </View>
    </View>
  );
};

export default CardData;
