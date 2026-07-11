import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

import AuthCard from '../components/AuthCard';
import AuthStatus from '../components/AuthStatus';

import Button from '@/components/ui/Button';

const VerifyEmailPage = () => {
  return (
    <AuthCard>
      <AuthStatus
        icon={Mail}
        title="Verify Your Email"
        description="Please verify your email address to activate your account."
      >
        <Button type="button" variant="dark" size="lg" className="w-full">
          Resend Verification Email
        </Button>

        <div className="flex justify-center">
          <Button
            as={Link}
            to="/login"
            variant="ghost"
            icon={ArrowLeft}
            iconPosition="left"
          >
            Back to Login
          </Button>
        </div>
      </AuthStatus>
    </AuthCard>
  );
};

export default VerifyEmailPage;


