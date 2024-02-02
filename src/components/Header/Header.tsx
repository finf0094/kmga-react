import * as React from 'react';
import headerLogo from '@assets/header-logo.png';
import './Header.css'
import {Profile} from "@components/Profile";

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className="header__inner">
        <img src={headerLogo} alt="KMGAutomation" className="header__logo" />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
