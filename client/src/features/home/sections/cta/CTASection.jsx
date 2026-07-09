import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

const CTASection = () => {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="rounded-3xl border border-gray-200 bg-gray-50 px-8 py-16 text-center shadow-sm md:px-16">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Ready to Explore the Project?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Experience a production-ready authentication system featuring JWT
            authentication, email verification, password reset, and protected
            routes.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={Link} to="/register" variant="dark" size="md">
              Get Started
            </Button>

            <Button
              as="a"
              href="https://github.com/adhishrestha/mern-auth-system"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlineDark"
              size="md"
            >
              View Github
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
