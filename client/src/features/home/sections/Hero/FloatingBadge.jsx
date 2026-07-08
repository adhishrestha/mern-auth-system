import clsx from 'clsx';

const FloatingBadge = ({ icon, label, className }) => {
  return (
    <div
      className={clsx(
        'absolute flex items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-lg',
        className,
      )}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default FloatingBadge;