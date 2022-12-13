import { useState, useEffect } from 'react';
import {
  Button, Card, Title, Paragraph, TextInput,
} from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './styles';
import { loginSchema } from '../../utils/validationFormLogin';
import { useAuthContext } from '../../context/AuthProvider';
import { Notifications } from '../../utils/notifications';
import { Separator } from '../../utils/separador';

const Login = ({ navigation }) => {
  const {
    control, handleSubmit, formState: { errors },
  } = useForm({ mode: 'all', resolver: yupResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const [messages, setMessages] = useState({});
  const { loginAuthWithEmailAndPassword } = useAuthContext();

  const onSubmit = async ({ email, password }) => {
    if (email && password) {
      const response = await loginAuthWithEmailAndPassword(email, password);
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
    if (messages.ok === true) {
      setTimeout(() => {
        navigation.navigate('Home');
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
          <Title style={styles.titleLogin}>¡Bienvenido!</Title>
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
                error={!!errors.email}
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
                placeholder='Contraseña'
                error={!!errors.password}
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
        <Separator />
        <Card.Actions>
          <Button onPress={open}>No tienes cuenta ➡Crear cuenta</Button>
          <Button onPress={handleSubmit(onSubmit)}>Continua</Button>
        </Card.Actions>
      </Card>
      {messages?.message && <Notifications title={messages.message} on={true} />}
    </>
  );
};

export default Login;
