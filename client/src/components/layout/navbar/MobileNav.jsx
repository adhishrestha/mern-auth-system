import React from 'react';
import IconButton from '@/components/ui/IconButton';
import { Menu, CircleUserRound, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';

const MobileNav = ({ setOpenMenu }) => {
  const isAuthenticated = false;

  return (
    <div className="flex items-center justify-between py-4 lg:hidden">
      {/* Logo */}
      <Link
        to="/"
        aria-label="Homepage"
        className="text-3xl font-bold tracking-wider"
      >
        Logo
      </Link>

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
          <div className="hidden">
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

      <IconButton ariaLabel="Open menu" onClick={() => setOpenMenu(true)}>
        <Menu className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default MobileNav;
