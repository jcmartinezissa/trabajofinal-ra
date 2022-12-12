import {
  Button, Text, TouchableOpacity, View,
} from 'react-native';
import { styles } from '../../../appStyles';

const CardData = ({ descripcion, beneficio, staff }) => {
  const getBeneficio = (data) => {
    console.log(data);
  };
  return (
    <View style={styles.container}>
        <View style={styles.card}>
          <Text>{beneficio}</Text>
          <Text>{descripcion}</Text>
          <Button title='Obtener!' onPress={() => getBeneficio(beneficio)} />
        </View>
    </View>
  );
};

export default CardData;
