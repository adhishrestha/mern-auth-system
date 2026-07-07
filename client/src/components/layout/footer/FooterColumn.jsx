import React from 'react';
import FooterLink from './FooterLink';

const FooterColumn = ({ title, links }) => {
  return (
    <section>
      <h2 className="mb-6 text-base font-semibold text-[#3A3845] uppercase">
        {title}
      </h2>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FooterColumn;
