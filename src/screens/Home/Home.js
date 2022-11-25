import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../appStyles';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Proyecto en progreso!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
