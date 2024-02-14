import useAuth from "@src/hooks/useAuth";
import { useAppDispatch } from "@src/store";
import { logout } from "@src/store/slices";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (location.pathname === '/' && !isAuthenticated) navigate('/login');
    if (location.pathname === '/dashboard' && !isAuthenticated) navigate('/login');
    if (location.pathname === '/' && isAuthenticated) navigate('/dashboard');
    if (location.pathname === '/login' && isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);
  
  return (
    <div style={{ height: '100vh', overflowX: 'hidden' }}>
      {location.pathname !== '/login' && isAuthenticated && <button 
        className="logout"
        onClick={() => dispatch(logout())}
        style={{ 
          background: 'red', 
          color: '#fff', 
          fontWeight: '600', 
          fontSize: '16px', 
          padding: '10px 25px', 
          position: 'absolute', 
          top: '20px', 
          right: '20px',
          borderRadius: '10px',
        }}>Выйти</button>}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
