import React, { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import MobileSidebar from './MobileSidebar';
import useEscapeKey from '../../../hooks/useEscapeKey';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import useActiveSection from '@/hooks/useActiveSection';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useBodyScrollLock(openMenu);

  useEscapeKey(() => {
    setOpenMenu(false);
    setShowUserMenu(false);
  });

  const activeSection = useActiveSection(['hero', 'features', 'faq']);
  return (
    <>
      <header
        className={`duration-300'} fixed top-0 left-0 z-40 w-full bg-white shadow-sm transition-transform`}
      >
        <Container>
          <nav aria-label="Main navigation">
            <DesktopNav
              showUserMenu={showUserMenu}
              setShowUserMenu={setShowUserMenu}
              activeSection={activeSection}
            />
            <MobileNav setOpenMenu={setOpenMenu} />
          </nav>
        </Container>
      </header>
      <MobileSidebar
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
