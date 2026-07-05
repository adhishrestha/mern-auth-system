import React, { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import MobileSidebar from './MobileSidebar';
import useEscapeKey from '../../../hooks/useEscapeKey';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import useScrollDirection from '@/hooks/useScrollDirection';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useBodyScrollLock(openMenu);

  useEscapeKey(() => {
    setOpenMenu(false);
    setShowUserMenu(false);
  });

  const showNavbar = useScrollDirection();
  useEffect(() => {
    if (!showNavbar) {
      setShowUserMenu(false);
    }
  }, [showNavbar]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-40 w-full bg-white shadow-sm transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <Container>
          <nav aria-label="Main navigation">
            <DesktopNav
              openMenu={openMenu}
              showUserMenu={showUserMenu}
              setShowUserMenu={setShowUserMenu}
            />
            <MobileNav setOpenMenu={setOpenMenu} />
          </nav>
        </Container>
      </header>
      <MobileSidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  );
};

export default Navbar;
