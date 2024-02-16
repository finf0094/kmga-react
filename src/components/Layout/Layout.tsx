import useAuth from "@src/hooks/useAuth";
import { useAppDispatch } from "@src/store";
import { logout } from "@src/store/slices";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

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
      <Header />
      {location.pathname !== '/login' && isAuthenticated && (
        <div className="logout__container">
          <button className="logout" onClick={() => dispatch(logout())}>Log out</button>
        </div>
      )}
      <main>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
