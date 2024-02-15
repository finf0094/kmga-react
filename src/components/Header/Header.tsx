import * as React from 'react';
import headerLogo from '@assets/header-logo.png';
import './Header.css'
import { Profile } from "@components/Profile";
import { useNavigate } from 'react-router-dom';
import useAuth from '@src/hooks/useAuth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <header className='header'>
      <div className="header__inner">
        <img src={headerLogo} alt="KMGAutomation" className="header__logo" onClick={() => { isAuthenticated && navigate('/dashboard') }} />
        { isAuthenticated && <Profile /> }
      </div>
    </header>
  );
};

export default Header;