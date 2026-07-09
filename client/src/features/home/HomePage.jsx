import React from 'react';
import Hero from './sections/Hero/Hero';
import FeaturesSection from './sections/Features/FeaturesSection';
import AuthFlowSection from './sections/AuthFlow/AuthFlowSection';
import TechStackSection from './sections/TechStack/TechStackSection';
import FAQSection from './sections/FAQ/FAQSection';

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

      <section id="faq">
        <FAQSection />
      </section>
    </div>
  );
};

export default HomePage;
