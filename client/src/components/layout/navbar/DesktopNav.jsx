import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from './navLinks';
import { ChevronDown, CircleUserRound } from 'lucide-react';
import IconButton from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';
import { scrollToSection } from '@/utils/scrollToSection';
import { getNavButtonClass } from '@/utils/navClass';

const DesktopNav = ({ showUserMenu, setShowUserMenu, activeSection }) => {
  const isAuthenticated = false;

  return (
    <div className="hidden items-center justify-between py-4 lg:flex">
      {/* Logo */}
      <Link
        to="/"
        aria-label="Homepage"
        className="text-3xl font-bold tracking-wider"
      >
        Logo
      </Link>

      {/* Nav */}
      <ul className="flex gap-10">
        {navLinks.map((link) => (
          <li key={link.label}>
            <button
              type="button"
              onClick={() => scrollToSection(link.target)}
              className={getNavButtonClass(activeSection === link.target)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Dropdown
            open={showUserMenu}
            setOpen={setShowUserMenu}
            className="w-44 p-2"
            trigger={
              <IconButton
                ariaLabel="User Menu"
                ariaExpand={showUserMenu}
                className="flex items-center gap-1"
              >
                <CircleUserRound className="h-5 w-5" />
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showUserMenu ? 'rotate-180' : ''
                  }`}
                />
              </IconButton>
            }
          >
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  to="/profile"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>

              <li>
                <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100">
                  Logout
                </button>
              </li>
            </ul>
          </Dropdown>
        ) : (
          <div className="hidden gap-5 lg:flex">
            <Link to="/login">
              <Button variant="outlineDark" size="md" className="px-10">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="dark" size="md" className="px-10">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
