import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

import AuthCard from '../components/AuthCard';
import AuthStatus from '../components/AuthStatus';

import Button from '@/components/ui/Button';

const CheckEmailPage = () => {
  return (
    <AuthCard>
      <AuthStatus
        icon={Mail}
        title="Check Your Email"
        description="We've sent a password reset link to your email address."
      >
        <Button type="button" variant="dark" size="lg" className="w-full">
          Resend Email
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

export default CheckEmailPage;
