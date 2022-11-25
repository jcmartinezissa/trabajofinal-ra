import { useState, createContext, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState();

  const createAuthUserWithEmailAndPassword = async (email, password) => {
    console.log(email, password);
    console.log(auth);
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (cred) => {
          await sendEmailVerification(cred.user);
        });
      return ({
        ok: true,
        message: 'Usuario registrado con exito. Valide su email para activar la cuenta.',
      });
    } catch (error) {
      // validar si el usuario ya se registro
      return ({
        ok: false,
        message: 'Error al intentar registrar.',
        error,
      });
    }
  };

  const loginAuthWithEmailAndPassword = async (email, password) => {
    try {
      console.log(email, password);
      let isEmailVerified = false;
      let user = {};
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (cred) => {
          console.log(cred);
          isEmailVerified = await cred?.user?.emailVerified;
          user = cred?.user;
        });
      if (!isEmailVerified) {
        return ({
          ok: false,
          message: 'No se pudo ingresar. Debe activar su cuenta.',
        });
      } else {
        setUser(user);
        return ({
          ok: true,
          message: 'Ingreso exitoso.',
        });
      }
    } catch (error) {
      return ({
        ok: false,
        message: 'Error al ingresar',
        error,
      });
    }
  };

  const signOutAuth = async () => {
    try {
      await signOut(auth);
      setUser(null);
      return ({
        ok: true,
        message: 'Sesion finalizada.',
      });
    } catch (error) {
      console.error(error);
      return ({
        ok: false,
        message: 'Error al cerrar sesion.',
        error,
      });
    }
  };

  const value = {
    createAuthUserWithEmailAndPassword,
    loginAuthWithEmailAndPassword,
    signOutAuth,
    User,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
