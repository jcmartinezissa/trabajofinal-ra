import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthProvider';
import { UserProvider } from './src/context/UserProvider';
import { Beneficios } from './src/screens/Beneficios';
import { Login } from './src/screens/Login';
import { Register } from './src/screens/Register';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Beneficios' component={Beneficios} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
