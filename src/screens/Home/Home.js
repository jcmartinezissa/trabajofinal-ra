import { View, Text, TouchableOpacity } from 'react-native-web';
import { styles } from '../../../appStyles';
import { sections } from '../../helper/sections';

const Home = () => {
  return (
    <View style={styles.container}>
      {sections.map(section => (
      <TouchableOpacity style={styles.button} key={section.title}>
        <Text style={{ fontSize: 20 }}> {section.title} </Text>
      </TouchableOpacity>
      ))}
   </View>
  );
};

export default Home;
