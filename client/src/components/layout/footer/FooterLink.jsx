import { scrollToSection } from '@/utils/scrollToSection';
import React from 'react';
import { Link } from 'react-router-dom';

const footerLinkClass =
  'text-sm text-[#3A3845] transition-colors duration-200 hover:text-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm';

const FooterLink = ({ link }) => {
  switch (link.type) {
    case 'route':
      return (
        <Link to={link.target} className={footerLinkClass}>
          {link.label}
        </Link>
      );

    case 'scroll':
      return (
        <button
          type="button"
          onClick={() => scrollToSection(link.target)}
          className={footerLinkClass}
        >
          {link.label}
        </button>
      );

    case 'external':
      return (
        <a
          href={link.target}
          target="_blank"
          rel="noopener noreferrer"
          className={footerLinkClass}
        >
          {link.label}
        </a>
      );

    case 'text':
      return <span className={footerLinkClass}>{link.label}</span>;

    default:
      return null;
  }
};

export default FooterLink;
