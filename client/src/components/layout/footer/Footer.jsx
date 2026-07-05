import React from 'react';
import Container from '../../ui/Container';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { ArrowRight } from 'lucide-react';
import FooterColumn from './FooterColumn';
import { footerLinks } from './footerLinks';

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#CAC9CF] text-[#3A3845]">
      <Container>
        {/* Top Footer */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
          {/* Left Section */}
          <div className="border-b border-[#CAC9CF] py-6 pb-10 lg:border-r lg:border-b-0 lg:pr-10">
            {/* Logo */}
            <Link
              to="/"
              aria-label="Homepage"
              className="text-3xl font-bold tracking-wider"
            >
              Logo
            </Link>

            {/* Description */}
            <p className="mt-4.5 max-w-xs text-sm leading-6 font-normal text-[#3A3845]">
              Secure authentication built with the MERN stack.
            </p>

            {/* CTA */}
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

          {/* Right Section */}
          <nav
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
        {/* Bottom Divider */}
        <div className="border-t border-[#CAC9CF]">
          {/* Bottom Fotter */}
          <section className="flex flex-col items-center justify-center gap-3 py-8 lg:flex-row">
            {/* Copyright */}
            <p className="flex flex-col items-center text-center text-base leading-5.5 font-normal tracking-normal text-[#3A3845] sm:flex-row sm:gap-1">
              <span>Copyright © 2026 MERN Auth System.</span>

              {/* Divider only above 480px */}
              <span className="hidden sm:inline">|</span>

              <span>All Rights Reserved</span>

              {/* Last divider only above 480px */}
              <span className="hidden sm:inline">|</span>
            </p>

            {/* Legal Links */}
            <nav
              aria-label="Legal navigation"
              className="flex flex-col items-center justify-center gap-2 text-center text-base font-normal text-[#3A3845] underline decoration-solid decoration-1 underline-offset-2 sm:flex-row sm:gap-3"
            >
              <Link
                to="#"
                className="transition-colors hover:text-black/50 focus:ring-2 focus:outline-none"
              >
                Terms and Conditions
              </Link>
              <span className="hidden sm:inline">|</span>
              <Link to="#" className="transition-colors hover:text-black/50">
                Privacy and Policy
              </Link>
            </nav>
          </section>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
