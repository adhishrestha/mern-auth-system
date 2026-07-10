import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Container from '../../ui/Container';
import Button from '../../ui/Button';

import FooterColumn from './FooterColumn';
import { footerLinks } from './footerLinks';
import Logo from '@/components/common/Logo';

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#CAC9CF] text-[#3A3845]">
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
          {/* Left */}
          <div className="border-b border-[#CAC9CF] py-6 pb-10 lg:border-r lg:border-b-0 lg:pr-10">
            {/* Logo */}
            <Logo />

            <p className="mt-4.5 max-w-xs text-sm leading-6">
              Secure authentication built with the MERN stack.
            </p>

            <Link to="/register">
              <Button
                variant="dark"
                size="md"
                icon={ArrowRight}
                className="mt-8"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Right */}

          <nav
            aria-label="Footer navigation"
            className="grid gap-4 p-5 lg:pl-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            }}
          >
            {footerLinks.map((section) => (
              <FooterColumn
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </nav>
        </section>

        {/* Bottom */}

        <div className="border-t border-[#CAC9CF]">
          <section className="flex flex-col items-center justify-center gap-3 py-8 lg:flex-row">
            <p className="flex flex-col items-center text-center text-base sm:flex-row sm:gap-1">
              <span>Copyright © 2026 MERN Auth System.</span>

              <span className="hidden sm:inline">|</span>

              <span>All Rights Reserved</span>

              <span className="hidden sm:inline">|</span>
            </p>

            <nav
              aria-label="Legal navigation"
              className="flex flex-col items-center gap-2 text-base underline underline-offset-2 sm:flex-row sm:gap-3"
            >
              <Link
                to="/terms"
                className="transition-colors hover:text-black/50"
              >
                Terms and Conditions
              </Link>

              <span className="hidden sm:inline">|</span>

              <Link
                to="/privacy"
                className="transition-colors hover:text-black/50"
              >
                Privacy Policy
              </Link>
            </nav>
          </section>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
