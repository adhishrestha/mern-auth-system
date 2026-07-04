import React, { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import MobileSidebar from './MobileSidebar';
import useEscapeKey from '../../../hooks/useEscapeKey';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEscapeKey(() => {
    setOpenMenu(false);
    setShowUserMenu(false);
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-40 w-full bg-white shadow-sm transition-transform duration-300`}
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
