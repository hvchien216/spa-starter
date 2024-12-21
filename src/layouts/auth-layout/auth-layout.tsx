import { Outlet } from 'react-router-dom';
import { Nav } from '~/components/systems';

const AuthLayout = () => {
  return (
    <div className='relative h-full overflow-hidden'>
      <Nav />
      <main className='flex min-h-[calc(100vh-64px)] flex-col'>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
