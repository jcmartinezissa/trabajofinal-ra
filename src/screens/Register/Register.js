import {
  Card, Button, Title, Paragraph, TextInput, Text,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { View } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { styles } from './styles';
import { Notifications } from '../../utils/notifications';
import { db } from '../../services/firebase';

const Register = ({ navigation }) => {
  const {
    control, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const [message, setMessage] = useState('');

  const handleRegister = async ({ email, password, firstName }) => {
    console.log(email, password);
    const auth = getAuth();
    const data = {
      activado: true,
      correo: email,
      nombre: firstName,
      rol: 'usuario',
    };
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
        data.uid = user.uid;
        await addDoc(collection(db, 'usuarios'), data);
        navigation.navigate('Login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View>
      <Card type='8'>
        <Card.Content>
          <Title style={styles.titleRegister}>¡Bienvenido! Crea tu cuenta...</Title>
          <Paragraph style={styles.paragraphRegister}>(*)Campos obligatorios</Paragraph>
          <Text variant='labelLarge'>Nombre y Apellido*</Text>
          <Controller
            control={control}
            name='firstName'
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
    </View>

  );
};

export default Register;
