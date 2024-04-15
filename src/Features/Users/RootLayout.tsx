import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const RootLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default RootLayout;
