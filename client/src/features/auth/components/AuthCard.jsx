const AuthCard = ({ children, className = '' }) => {
  return (
    <section
      className={`w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 ${className}`}
      aria-label="Authentication"
    >
      {children}
    </section>
  );
};

export default AuthCard;
