const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110">
        <Icon size={28} />
      </div>

      <h3 className="mb-3 text-xl font-semibold text-slate-900">
        {feature.title}
      </h3>

      <p className="leading-7 text-slate-600">{feature.description}</p>
    </article>
  );
};

export default FeatureCard;
