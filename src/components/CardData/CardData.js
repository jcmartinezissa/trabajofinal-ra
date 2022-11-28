import { Text, TouchableOpacity, View } from 'react-native-web';
import { styles } from '../../../appStyles';

const CardData = () => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.card}>
          <Text>20% de descuento en tu proximo Cursado</Text>
        </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity style={styles.card}>
        <Text>Unico 2x1 en cines</Text>
      </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.card}>
          <Text>Cervezas gratis en Patagonia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardData;
