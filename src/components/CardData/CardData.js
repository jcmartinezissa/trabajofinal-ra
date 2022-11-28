import {
  Image, Text, TouchableOpacity, View,
} from 'react-native';
import { styles } from '../../../appStyles';

const CardData = ({ descripcion, beneficio }) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.card}>
          <Text>{beneficio}</Text>
          <Text>{descripcion}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardData;
