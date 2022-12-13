import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBRWN1TcrVw5YBcfAzy3sS79Z5JOalQ_Qk',
  authDomain: 'rollingcodeapp2022.firebaseapp.com',
  projectId: 'rollingcodeapp2022',
  storageBucket: 'rollingcodeapp2022.appspot.com',
  messagingSenderId: '377365448322',
  appId: '1:377365448322:web:53ffb57906bb290428169b',
};

const app = initializeApp(firebaseConfig);
export const { auth } = getAuth(app);
export const db = getFirestore(app);
