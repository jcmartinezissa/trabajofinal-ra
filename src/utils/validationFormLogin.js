import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Debe ingresar un mail.')
    .email('Debe ingresar un mail valido.'),
  password: Yup.string()
    .required('Debe ingresar una contraseña.')
    .min(7, 'Debe ingresar una contraseña mas larga.'),
  // repeatPassword: Yup.string()
  //   .required('Debe confirmar su contraseña.')
  //   .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden.'),
});
