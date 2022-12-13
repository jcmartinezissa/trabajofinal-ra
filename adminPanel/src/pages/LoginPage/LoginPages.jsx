import React, { useState } from 'react';
import './loginPages.css';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { db } from '../../services/firebase';
import logo from '../../assest/logo.png';
import { userLogin } from '../../app/user';
import { loginApi } from './consultaApi';

const LoginPages = () => {
  const mavigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    pass: '',
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    const user = await loginApi(data);
    if (user?.pass === data.pass) {
      dispatch(userLogin(user));
      mavigate('/admin');
    }
  };

  return (
    <div className="d-flex align-items-center loginBox">
      <div className="text-center offset-4 col-3">
        <div className="">
          <h1 className="h1 mb-3 fw-normal">RollingBeneficiosAdmin</h1>
          <img
            className="mb-3"
            src={logo}
            alt=""
            width="70"
            height="70"
            style={{ borderRadius: 70 }}
          />
          <h5 className="h4 mb-3 fw-normal">Please sign in</h5>

          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="floatingInput"
              data-testid="emailInput"
              onChange={handleChange}
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              name="pass"
              onChange={handleChange}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            data-testId='registerButton'
            onClick={() => login()}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
