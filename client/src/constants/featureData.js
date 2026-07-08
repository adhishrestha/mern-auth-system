import {
  ShieldCheck,
  MailCheck,
  KeyRound,
  LockKeyhole,
  UserRound,
  Smartphone,
} from 'lucide-react';

export const featureData = [
  {
    id: 1,
    icon: ShieldCheck,
    title: 'JWT Authentication',
    description:
      'Secure authentication using JSON Web Tokens with protected API access.',
  },
  {
    id: 2,
    icon: MailCheck,
    title: 'Email Verification',
    description:
      'Verify new accounts through email to ensure valid and trusted users.',
  },
  {
    id: 3,
    icon: KeyRound,
    title: 'Password Reset',
    description:
      'Forgot password flow with secure reset links and token validation.',
  },
  {
    id: 4,
    icon: LockKeyhole,
    title: 'Protected Routes',
    description:
      'Restrict access to private pages and APIs based on authentication.',
  },
  {
    id: 5,
    icon: UserRound,
    title: 'User Profile',
    description:
      'Manage user information, account details, and authenticated sessions.',
  },
  {
    id: 6,
    icon: Smartphone,
    title: 'Responsive Design',
    description:
      'Fully responsive interface optimized for desktop, tablet, and mobile.',
  },
];
