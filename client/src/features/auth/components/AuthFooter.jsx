import { Link } from 'react-router-dom';

const AuthFooter = ({ text, linkText, to }) => {
  return (
    <p className="mt-8 text-center text-sm text-slate-600">
      {text}
      <Link
        to={to}
        className="font-semibold text-indigo-600 hover:text-indigo-700"
      >
        {linkText}
      </Link>
    </p>
  );
};

export default AuthFooter;
