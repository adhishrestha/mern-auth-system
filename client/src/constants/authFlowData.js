import { UserPlus, MailCheck, LogIn, ShieldCheck, LogOut } from 'lucide-react';

export const authFlowData = [
  {
    id: 1,
    title: 'Register',
    description: 'Create your account with secure credentials.',
    icon: UserPlus,
  },
  {
    id: 2,
    title: 'Verify Email',
    description: 'Activate your account through email verification.',
    icon: MailCheck,
  },
  {
    id: 3,
    title: 'Login',
    description: 'Authenticate securely using JWT-based login.',
    icon: LogIn,
  },
  {
    id: 4,
    title: 'Protected Routes',
    description: 'Access private pages only after authentication.',
    icon: ShieldCheck,
  },
  {
    id: 5,
    title: 'Logout',
    description: 'End your session securely with one click.',
    icon: LogOut,
  },
];
