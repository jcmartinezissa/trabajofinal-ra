import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Beneficios } from './src/screens/Beneficios';
import { Home } from './src/screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Beneficios" component={Beneficios} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
