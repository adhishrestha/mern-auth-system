const StatusChip = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium">
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default StatusChip;
