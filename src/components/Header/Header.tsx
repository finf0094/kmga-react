import * as React from 'react';
import headerLogo from '../../assets/header-logo.png';
import profileIcon from '../../assets/profile-icon.svg';
import './Header.css'
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className="header__inner">
        <img src={headerLogo} alt="KMGAutomation" className="header__logo" />
        <Link to="/login">login</Link>

        <div className="profile">
          <div className="profile__info">
            <span className="profile__mail">finf0094@gmail.com</span>
            <span className="profile__role">Пользователь</span>
          </div>
          <img src={profileIcon} alt="User" className="profile__icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
