import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { authFlowData } from '@/constants/authFlowData';

const AuthFlowSection = () => {
  return (
    <section className="py-20 ">
      <Container>
        <SectionHeading
          badge="Authentication Workflow"
          title="A Complete Secure Authentication Journey"
          description="From account creation to protected access, every step is designed to follow modern authentication best practices."
        />

        <div className="mt-16">
          {/* Desktop */}

          <div className="hidden items-center justify-center lg:flex">
            {authFlowData.map((step, index) => {
              const Icon = step.icon;

              return (
                <React.Fragment key={step.id}>
                  <div className="w-56 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <Icon size={28} />
                    </div>

                    <h3 className="mt-5 text-center text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-center text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  {index !== authFlowData.length - 1 && (
                    <ArrowRight className="mx-5 text-slate-300" size={28} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile */}

          <div className="flex flex-col items-center gap-4 lg:hidden">
            {authFlowData.map((step, index) => {
              const Icon = step.icon;

              return (
                <React.Fragment key={step.id}>
                  <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <Icon size={28} />
                    </div>

                    <h3 className="mt-5 text-center text-lg font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-center text-sm text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  {index !== authFlowData.length - 1 && (
                    <ArrowDown className="text-slate-300" size={28} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AuthFlowSection;
