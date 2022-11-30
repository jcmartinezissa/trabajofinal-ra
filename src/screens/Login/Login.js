import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, TouchableHighlight,
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './styles';
import { loginSchema } from '../../utils/validationFormLogin';
import { useAuthContext } from '../../context/AuthProvider';

const Login = ({ navigation }) => {
  const {
    control, handleSubmit, formState: { errors },
  } = useForm({ mode: 'all', resolver: yupResolver(loginSchema) });

  const [messages, setMessages] = useState({});
  const { loginAuthWithEmailAndPassword } = useAuthContext();

  const onSubmit = async ({ email, password }) => {
    if (email && password) {
      const response = await loginAuthWithEmailAndPassword(email, password);
      console.log(response);
      if (response?.ok === true) {
        setMessages(response);
      } else {
        setMessages(response);
      }
    }
  };

  const open = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    if (messages?.ok === true) {
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <Text>¡Bienvenido!</Text>
      <View>
        <Controller
          control={control}
          name='email'
          defaultValue=''
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='E-mail'
            />
          )}
        />
        {(errors?.email && errors?.email?.message) && <Text>{errors?.email?.message}.</Text>}
        <Controller
          control={control}
          name='password'
          defaultValue=''
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Contraseña'
              autoComplete='off'
            />
          )}
        />
        {(errors?.password && errors?.password?.message)
          && <Text>{errors?.password?.message}</Text>}
        <TouchableHighlight style={styles.touchebleForgot} onPress={open}>
          <Text style={styles.forgot}>Crear cuenta</Text>
        </TouchableHighlight>
        {messages.menssage !== '' && <Text>{messages.message}</Text>}
        <Button color='red' title='Continuar' onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default Login;
