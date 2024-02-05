import * as React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div style={{ height: '100vh', overflowX: 'hidden' }}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
