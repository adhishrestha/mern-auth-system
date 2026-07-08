import React from 'react';
import Hero from './sections/Hero/Hero';
import FeaturesSection from './sections/Features/FeaturesSection';

const HomePage = () => {
  return (
    <div>
      <section id="hero">
        <Hero />
      </section>

      <section id="features">
        <FeaturesSection />
      </section>
    </div>
  );
};

export default HomePage;
