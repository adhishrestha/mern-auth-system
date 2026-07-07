import React from 'react';
import Container from '@/components/ui/Container';
import Features from './components/Features/Features';
import FAQ from './components/FAQ/FAQ';
import Hero from './components/Hero/Hero';

const HomePage = () => {
  return (
    <div>
      <section id="hero">
        <Hero />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="faq">
        <FAQ />
      </section>
    </div>
  );
};

export default HomePage;
