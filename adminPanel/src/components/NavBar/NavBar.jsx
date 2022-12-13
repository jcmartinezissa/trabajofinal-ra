import React from 'react';
import logo from '../../assest/logo.png';
import './navBar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark box">
      <div className="container-fluid d-flex justify-content-center">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-text-top mx-4"
          />
          RollingBeneficiosAdmin
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
