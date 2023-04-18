import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => (
  <div>
    <Outlet />
  </div>
);

export default Layout;
