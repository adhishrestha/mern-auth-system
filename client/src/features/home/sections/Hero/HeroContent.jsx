import Button from '@/components/ui/Button';
import React from 'react';
import TechStack from './TechStack';
import SectionBadge from '@/components/common/SectionBadge';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroContent = () => {
  return (
    <div>
      <SectionBadge icon={<ShieldCheck size={16} />}>
        Production Ready Authentication
      </SectionBadge>
      <h1 className="mt-6 text-5xl leading-tight font-bold">
        Production-Ready
        <br />
        MERN Authentication
      </h1>
      <p className="mt-6 text-lg text-gray-600">
        Build a production-ready authentication system featuring JWT, Email
        Verification, Password Reset, Protected Routes and Responsive Interface.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex gap-4">
          <Button as={Link} variant="dark" size="md" to="/register">
            Get Started
          </Button>
          <Button
            as="a"
            variant="outlineDark"
            size="md"
            href="https://github.com/adhishrestha"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Github
          </Button>
        </div>
        <TechStack />
      </div>
    </div>
  );
};

export default HeroContent;
