import { useState } from 'react';

import FAQItem from './FAQItem';
import { faqData } from '@/constants/faqData';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

const FAQSection = () => {
  const [activeId, setActiveId] = useState(1);

  const handleToggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about the authentication system."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {faqData.map((faq) => (
            <FAQItem
              key={faq.id}
              {...faq}
              isOpen={activeId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
