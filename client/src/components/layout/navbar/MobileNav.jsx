import React from 'react';
import IconButton from '@/components/ui/IconButton';
import { Menu, CircleUserRound, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/features/auth/context/AuthContext';

const MobileNav = ({ setOpenMenu, showUserMenu, setShowUserMenu }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    setShowUserMenu(false);

    navigate('/', { replace: true });

    await logout();
  };

  return (
    <div className="flex items-center justify-between py-4 lg:hidden">
      {/* Logo */}
      <Logo />

      <div className="flex items-center gap-4">
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
                  <span className="text-sm font-medium">
                    {user?.fullName?.split(' ')[0]}
                  </span>
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
                    to="/dashboard"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/settings"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Account Settings
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
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
    </div>
  );
};

export default MobileNav;
