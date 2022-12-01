import { View, Image, Text } from 'react-native';
import { styles } from '../../../appStyles';
// import { AuthProvider } from '../../context/AuthProvider';

const Avatar = () => {
  return (
    <View style={styles.ContainerAvatar}>
    <Text style={styles.ContainerAvatar.Username} >Juan Carlos</Text>
   <Image style={styles.ContainerAvatar.Avatar}
        source={require('./programer.png')}/>
    </View>
  );
};

export default Avatar;
