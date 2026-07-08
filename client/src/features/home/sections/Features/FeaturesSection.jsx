import Container from '@/components/ui/Container';
import FeatureCard from './FeatureCard';
import { featureData } from '@/constants/featureData';
import SectionHeading from '@/components/ui/SectionHeading';

const FeaturesSection = () => {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        {/* Section Header */}
        <SectionHeading
          badge="Features"
          title="A Complete Secure Authentication Journey"
          description=" Production-ready authentication features built for modern web
            applications with security, scalability, and a polished user
            experience."
        />

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
