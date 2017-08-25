/* eslint-disable */

import React from 'react';
import './styles/Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div>
        logo
      </div>
      <nav className='nav'>
        <button className="tab">Guides</button>
        <button className="tab">Examples</button>
        <button className="tab">Get Token</button>
      </nav>
    </header>
  );
}

export default Header;
