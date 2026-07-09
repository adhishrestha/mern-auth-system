import { ChevronDownIcon } from 'lucide-react';
const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-lg">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus:rounded-2xl"
      >
        <h3
          className={`text-lg font-semibold transition-colors ${
            isOpen ? 'text-indigo-600' : 'text-slate-900'
          }`}
        >
          {question}
        </h3>

        <ChevronDownIcon
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-indigo-600' : ''
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 leading-relaxed text-slate-600">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
