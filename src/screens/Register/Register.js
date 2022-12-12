import {
  Card, Button, Title, Paragraph, TextInput, Text,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { styles } from './styles';
import { registerSchema } from '../../utils/validationFormLogin';
import { useAuthContext } from '../../context/AuthProvider';
import { Notifications } from '../../utils/notifications';

const Register = ({ navigation }) => {
  const {
    control, handleSubmit, formState: { errors },
  } = useForm({ mode: 'all', resolver: yupResolver(registerSchema) });

  const [message, setMessage] = useState('');
  const { createAuthUserWithEmailAndPassword, signInWithGoogle } = useAuthContext();

  const handleRegister = async (data) => {
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

  /*  const handleGoogle = async () => {
     const response = await signInWithGoogle();
     navigation.navigate('Home');
     console.log(response);
   }; */

  return (
    <Card type='8'>
      <Card.Content>
        <Title style={styles.titleRegister}>¡Bienvenido! Crea tu cuenta...</Title>
        <Paragraph style={styles.paragraphRegister}>(*)Campos obligatorios</Paragraph>
        <Text variant='labelLarge'>Nombre y Apellido*</Text>
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
              error={!!errors.fullName}
            />
          )}
        />
        {(errors?.fullName && errors?.fullName?.message)
          && <Paragraph style={styles.paragraphError}>{errors?.fullName?.message}.</Paragraph>}
        <Text variant='labelLarge'>Email*</Text>
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
              error={!!errors.email}
            />
          )}
        />
        {(errors?.email && errors?.email?.message)
          && <Paragraph style={styles.paragraphError}>{errors?.email?.message}.</Paragraph>}
        <Text variant='labelLarge'>Contraseña*</Text>
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
              error={!!errors.password}
            />
          )}
        />
        {(errors?.password && errors?.password?.message)
          && <Paragraph style={styles.paragraphError}>{errors?.password?.message}.</Paragraph>}
        <Text variant='labelLarge'>Confirmar contraseña*</Text>
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
              error={!!errors.repeatPassword}
            />
          )}
        />
        {(errors?.repeatPassword && errors?.repeatPassword?.message)
          && <Paragraph style={styles.paragraphError}>
            {errors?.repeatPassword?.message}.</Paragraph>}
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleSubmit(handleRegister)}>Registrarme</Button>
      </Card.Actions>
      {message && <Notifications title={message} />}
    </Card>

  );
};

export default Register;
