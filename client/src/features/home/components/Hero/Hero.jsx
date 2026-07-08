import React from 'react';
import HeroContent from './HeroContent';
import Container from '@/components/ui/Container';
import HeroPreview from './HeroPreview';

const Hero = () => {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <HeroContent />
          <HeroPreview />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
