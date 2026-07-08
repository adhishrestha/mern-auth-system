const TechCard = ({ title, description, icon: Icon, color }) => {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg">
      <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
        <Icon
          size={36}
          style={{ color }}
          className="text-indigo-600 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default TechCard;