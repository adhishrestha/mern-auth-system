import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Mail, XCircle } from 'lucide-react';

import AuthCard from '../components/AuthCard';
import AuthStatus from '../components/AuthStatus';

import Button from '@/components/ui/Button';
import api from '@/lib/axios';
import { getApiErrorMessage } from '@/lib/apiError';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const verificationStarted = useRef(false);

  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid or missing verification link.');
        return;
      }

      try {
        const response = await api.get('/auth/verify-email', {
          params: {
            token,
          },
        });

        setStatus('success');
        setMessage(
          response.data.message || 'Your email has been verified successfully.',
        );
      } catch (error) {
        setStatus('error');
        setMessage(getApiErrorMessage(error));
      }
    };

    verifyEmail();
  }, [token]);

  if (status === 'verifying') {
    return (
      <AuthCard>
        <AuthStatus
          icon={Mail}
          title="Verifying Your Email"
          description="Please wait while we verify your email address."
        />
      </AuthCard>
    );
  }

  if (status === 'success') {
    return (
      <AuthCard>
        <AuthStatus
          icon={CheckCircle}
          title="Email Verified"
          description={message}
        >
          <div className="flex justify-center">
            <Button as={Link} to="/login" variant="dark" size="lg">
              Continue to Login
            </Button>
          </div>
        </AuthStatus>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthStatus
        icon={XCircle}
        title="Verification Failed"
        description={message}
      >
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
