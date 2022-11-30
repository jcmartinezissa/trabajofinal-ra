import {
  View, TextInput, Text, Button, ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { styles } from './styles';
import { registerSchema } from '../../utils/validationFormLogin';
import { useAuthContext } from '../../context/AuthProvider';

const Register = ({ navigation }) => {
  const {
    control, handleSubmit, formState: { errors },
  } = useForm({ mode: 'all', resolver: yupResolver(registerSchema) });

  const [message, setMessage] = useState({});
  const { createAuthUserWithEmailAndPassword } = useAuthContext();

  const onSubmit = async (data) => {
    console.log(data);
    if (data) {
      const {
        email, password, phone, fullName,
      } = data;
      const response = await createAuthUserWithEmailAndPassword(email, password, phone, fullName);
      console.log(response);
      if (response?.ok === true) {
        setMessage(response);
        navigation.navigate('Login');
      } else {
        setMessage(response);
      }
    } else {
      setMessage('Complete los campos requeridos');
    }
  };
  console.log(message);
  return (
    <ScrollView >
      <View style={styles.container}>
        <Text>¡Bienvenido!</Text>
        <Text>Crea tu cuenta</Text>
        <Text>(*)Campos obligatorios</Text>
        <View>
          <Text>Nombre y Apellido*</Text>
          <Controller
            control={control}
            name='fullName'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {(errors?.fullName && errors?.fullName?.message)
            && <Text>{errors?.fullName?.message}.</Text>}
          <Text>E-mail*</Text>
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
              />
            )}
          />
          {(errors?.email && errors?.email?.message)
            && <Text>{errors?.email?.message}.</Text>}
          <Text>Telefono*</Text>
          <Controller
            control={control}
            name='phone'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {(errors?.phone && errors?.phone?.message)
            && <Text>{errors?.phone?.message}.</Text>}
          <Text>Contraseña*</Text>
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
              />
            )}
          />
          {(errors?.password && errors?.password?.message)
            && <Text>{errors?.password?.message}.</Text>}
          <Text>Confirmar contraseña*</Text>
          <Controller
            control={control}
            name='repeatPassword'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {(errors?.repeatPassword && errors?.repeatPassword?.message)
            && <Text>{errors?.repeatPassword?.message}.</Text>}
          <Button color='red' title='Crear cuenta' onPress={handleSubmit(onSubmit)} />
        </View>
        <Text>O podés utilizar</Text>
        <Button color='red' title='Google' />
      </View>
    </ScrollView>
  );
};

export default Register;
