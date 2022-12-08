import { useState, createContext, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification, signInWithEmailAndPassword, signOut,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, provider } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const createAuthUserWithEmailAndPassword = async (email, password, phone, fullName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (cred) => {
          console.log(cred.user);
          await sendEmailVerification(cred?.user);
          await setDoc(doc(db, 'usuarios', cred.user.uid), {
            fullName,
            email,
            phoneNumber: phone,
            rol: 'usuario',
          });
        });
      return ({
        ok: true,
        message: 'Usuario registrado con exito. Valide su email para activar la cuenta.',
      });
    } catch (error) {
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
      console.log(auth);
      let isEmailVerified = false;
      let userData = {};
      await signInWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          console.log(user);
          isEmailVerified = await user?.emailVerified;
          const userID = await user.uid;
          const userRef = doc(db, 'usuarios', userID);
          const userDoc = await getDoc(userRef);
          userData = {
            uid: user.uid,
            email: userDoc.data().email,
            fullName: userDoc.data().fullName,
            phoneNumber: userDoc.data().phoneNumber,
            role: userDoc.data().role,
          };
        });
      if (!isEmailVerified) {
        return ({
          ok: false,
          message: 'No se pudo ingresar. Debe activar su cuenta.',
        });
      } else {
        setCurrentUser(userData);
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

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  const signOutAuth = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
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
    signInWithGoogle,
    signOutAuth,
    currentUser,
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
