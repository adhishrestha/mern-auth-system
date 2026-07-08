import React from 'react';
import Hero from './sections/Hero/Hero';
import FeaturesSection from './sections/Features/FeaturesSection';
import AuthFlowSection from './sections/AuthFlow/AuthFlowSection';
import TechStackSection from './sections/TechStack/TechStackSection';

const HomePage = () => {
  return (
    <div>
      <section id="hero">
        <Hero />
      </section>

      <section id="features">
        <FeaturesSection />
      </section>

      <section>
        <AuthFlowSection />
      </section>

      <section>
        <TechStackSection />
      </section>
    </div>
  );
};

export default HomePage;
