import { useState } from 'react';
import { HelpCircle, Menu, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Button, Drawer, DrawerContent, DrawerTrigger } from '~/components/ui';
import ProfileMenu from './profile-menu';

import derLogo from '~/assets/der-logo.svg';
import { cn } from '~/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Substations', href: '/substations' },
  { label: 'Reports', href: '/reports' },
  // Add more items as needed
];

function Nav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            mobile ? 'block py-2 text-lg' : 'relative',
            !mobile &&
              "after:absolute after:-bottom-[1.4rem] after:left-0 after:h-[2px] after:w-full after:content-['']",
            location.pathname === item.href
              ? 'text-foreground after:bg-primary'
              : 'text-foreground/60 hover:after:bg-primary',
          )}
          onClick={() => {
            onItemClick();
            setIsOpen(false);
          }}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <>
      <header className='fixed top-0 z-50 w-full border-b bg-white backdrop-blur'>
        <div className='container-wrapper flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <div className='mr-4 flex items-center'>
              <div className='size-12'>
                <img src={derLogo} alt='DER Logo' />
              </div>
              <Link to='/' className='ml-2 hidden items-center space-x-2 sm:flex'>
                <span className='text-sm font-bold'>DER</span>
              </Link>
            </div>

            <nav className='hidden items-center space-x-6 text-sm font-medium md:flex'>
              <NavItems />
            </nav>
          </div>

          <div className='flex items-center space-x-2'>
            <Button variant='ghost' size='icon' className='h-8 w-8 rounded-full'>
              <Settings className='h-4 w-4' />
              <span className='sr-only'>Settings</span>
            </Button>
            <Button variant='ghost' size='icon' className='h-8 w-8 rounded-full'>
              <HelpCircle className='h-4 w-4' />
              <span className='sr-only'>Help</span>
            </Button>
            <div className='flex items-center space-x-3'>
              <ProfileMenu />
              <span className='hidden bg-[#F3F6F7] text-sm font-bold text-muted-foreground lg:inline-block'>
                SUPER ADMIN
              </span>
            </div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <nav className='px-4'>
                  <NavItems mobile onItemClick={() => setIsOpen(false)} />
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>
      <div className='h-16' />
    </>
  );
}

export default Nav;
