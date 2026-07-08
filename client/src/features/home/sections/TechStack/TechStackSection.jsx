import SectionHeading from '@/components/ui/SectionHeading';
import { techStackData } from '@/constants/techStackData';
import TechCard from './TechCard';

const TechStackSection = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-5">
        <SectionHeading
          badge="Tech Stack"
          title="Built With"
          description="Built with modern web technologies to deliver a secure, scalable, and production-ready authentication system."
        />

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {techStackData.map((tech) => (
            <TechCard key={tech.id} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
