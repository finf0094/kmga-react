import { FC } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div style={{ height: '100vh', overflowX: 'hidden' }}>
      <Header />
      <main style={{ height: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
