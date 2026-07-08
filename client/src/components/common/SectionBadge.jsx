const SectionBadge = ({ icon, children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 ${className} `}
    >
      {icon}
      {children}
    </span>
  );
};

export default SectionBadge;
