import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Logo = () => {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2"
      aria-label="Go to home page"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3A3845] text-white shadow-md">
        <ShieldCheck className="h-6 w-6" />
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-tight text-slate-900">
          MERN Auth
        </span>

        <span className="text-xs text-slate-500">Secure Authentication</span>
      </div>
    </Link>
  );
};

export default Logo;
