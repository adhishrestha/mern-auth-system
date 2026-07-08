import StatusChip from './StatusChip';
import { ShieldCheck, MailCheck, Lock } from 'lucide-react';

const LoginCard = () => {
  return (
    <div className="relative mx-auto max-w-sm rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-bold">Welcome Back</h2>

      <p className="mt-2 text-center text-sm text-gray-500">
        Sign in to continue
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border p-3 text-gray-400">Email Address</div>

        <div className="rounded-lg border p-3 text-gray-400">Password</div>

        <button className="w-full rounded-lg bg-black py-3 text-white">
          Sign In
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <StatusChip icon={<ShieldCheck size={16} />} label="JWT" />

        <StatusChip icon={<MailCheck size={16} />} label="Verified" />

        <StatusChip icon={<Lock size={16} />} label="Protected" />
      </div>
    </div>
  );
};

export default LoginCard;
