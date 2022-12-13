import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UsersAdmin from '../../components/UsersAdmin/UsersAdmin.jsx';
import { db } from '../../services/firebase';
import './pageAdmin.css';
import BeneficioAdmin from '../../components/BeneficioAdmin/BeneficioAdmin.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Admin = () => {
  const navigate = useNavigate();
  const [configUser, setConfigUser] = useState('usuarios');
  const [actualizar, setActualizar] = useState(false);
  const { user } = useSelector((state) => state);
  const [fireData, setFireData] = useState([]);
  const updateDatos = async () => {
    try {
      const data = [];
      const querySnapshot = await getDocs(collection(db, configUser));
      querySnapshot.forEach((doc) => {
        const result = doc.data();
        result.id = doc.id;
        data.push(result);
      });
      setFireData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    updateDatos(configUser);
    setActualizar(false);
  }, [configUser, actualizar]);

  return (
    <>
      <NavBar />
      <div className="container admin-container shadow-lg my-5">
        <div className="row my-3 mt-2">
          <Button
            className="col-1"
            data-testId='UserButton'
            onClick={() => {
              setConfigUser('usuarios');
            }}>
            User
          </Button>
          <Button
            className="mx-1 col-1"
            data-testId='BeneficiosButton'
            onClick={() => {
              setConfigUser('beneficios');
            }}>
            Beneficios
          </Button>
        </div>
        {configUser === 'usuarios' ? (
          <UsersAdmin urlUser={fireData} setActualizar={setActualizar} />
        ) : (
          <></>
        )}
        {configUser === 'beneficios' ? (
          <BeneficioAdmin beneficios={fireData} setActualizar={setActualizar} />
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Admin;
