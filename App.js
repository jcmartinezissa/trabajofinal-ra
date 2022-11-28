import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthProvider';
import { Beneficios } from './src/screens/Beneficios';
import { Home } from './src/screens/Home';
import { Login } from './src/screens/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Beneficios" component={Beneficios} />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
