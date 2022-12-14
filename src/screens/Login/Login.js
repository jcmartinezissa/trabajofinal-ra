import { useState, useEffect, useContext } from 'react';
import {
  Button, Card, Title, Paragraph, TextInput,
} from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { styles } from './styles';
import { loginSchema } from '../../utils/validationFormLogin';
import { useAuthContext } from '../../context/AuthProvider';
import userContext from '../../context/UserProvider';

const Login = ({ navigation }) => {
  const { setUserData } = useContext(userContext);
  const {
    control, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const [messages, setMessages] = useState({});

  const onSubmit = async ({ email, password }) => {
    console.log(email, password);
    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
          const { user } = userCredential;
          console.log(user);
          setUserData(user.uid);
          if (user) return navigation.navigate('Beneficios');
        // ...
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  const open = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    if (messages?.ok === true) {
      setTimeout(() => {
        navigation.navigate('Beneficios');
      }, 1000);
    }
  }, [messages]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Card type='8'>
        <Card.Content>
          <Title style={styles.titleLogin}>¬°Bienvenido!</Title>
          <Controller
            control={control}
            name='email'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                type='outlined'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='E-mail'
                error={errors.email}
              />
            )}
          />
          {(errors?.email && errors?.email?.message)
            && <Paragraph style={styles.paragraphError}>{errors?.email?.message}.</Paragraph>}
          <Controller
            control={control}
            name='password'
            defaultValue=''
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                type='outlined'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Contrase√Īa'
                error={errors.password}
                secureTextEntry={!showPassword}
                right={showPassword ? <TextInput.Icon icon='eye'
                  onPress={handleClickShowPassword}
                /> : <TextInput.Icon icon='eye-off-outline'
                  onPress={handleClickShowPassword}
                />}
              />
            )}
          />
          {(errors?.password && errors?.password?.message)
            && <Paragraph style={styles.paragraphError}>{errors?.password?.message}</Paragraph>}
        </Card.Content>
        <Card.Actions>
          <Button onPress={open}>Crear cuenta</Button>
          <Button onPress={handleSubmit(onSubmit)}>Continuar‚Äľ</Button>
        </Card.Actions>
        {/* {messages && <Notifications title={messages.message} />} */}
      </Card>
    </>
  );
};

export default Login;
