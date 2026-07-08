const SectionHeading = ({ badge, title, description, className = '' }) => {
  return (
    <div className={`mx-auto mb-16 max-w-2xl text-center ${className}`}>
      {badge && (
        <span className="mb-3 inline-block text-sm font-semibold tracking-widest text-blue-600 uppercase">
          {badge}
        </span>
      )}

      <h2 className="mb-6 text-4xl font-bold text-slate-900">{title}</h2>

      {description && (
        <p className="text-lg leading-8 text-slate-600">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
