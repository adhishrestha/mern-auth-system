import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import IconButton from '@/components/ui/IconButton';
import { X } from 'lucide-react';
import { navLinks } from './navLinks';
import Button from '@/components/ui/Button';
import { scrollToSection } from '@/utils/scrollToSection';
import { getNavButtonClass } from '@/utils/navClass';
import Logo from '@/components/common/Logo';

const MobileSidebar = ({ openMenu, setOpenMenu, activeSection }) => {
  const handleClick = (id) => {
    setOpenMenu(false);

    setTimeout(() => {
      scrollToSection(id);
    }, 100);
  };
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${openMenu ? 'bg-black/40 opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'}`}
      onClick={() => setOpenMenu(false)}
    >
      {/* panel */}
      <aside
        className={`flex h-full w-[70%] flex-col bg-white p-5 shadow-xl transition-transform duration-300 sm:w-[50%] md:w-[320px] ${openMenu ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar Header */}
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          {/* Logo */}
          <Logo />

          <IconButton ariaLabel="Close menu" onClick={() => setOpenMenu(false)}>
            <X className="h-6 w-6" />
          </IconButton>
        </div>

        {/* Mobile Links */}
        <ul className="flex-1 space-y-2 p-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => handleClick(link.target)}

                className={getNavButtonClass(activeSection === link.target)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t pt-5">
          <Link to="/login">
            <Button variant="dark" size="md" fullWidth className="">
              Login / Sign Up
            </Button>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default MobileSidebar;
