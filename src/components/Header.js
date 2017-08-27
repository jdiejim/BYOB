/* eslint-disable */

import React from 'react';
import logo from '../assets/logo.svg';
import './styles/Header.scss';

const Header = ({ handleShowForm }) => {
  const bgLogo = { backgroundImage: `url(${logo})` };
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon" style={bgLogo}></div>
        <h1 className="logo-title">Industry Valuation Data API</h1>
      </div>
      <nav className="nav">
        <button className="tab token-btn" onClick={handleShowForm}>Get Token</button>
      </nav>
    </header>
  );
}

export default Header;
