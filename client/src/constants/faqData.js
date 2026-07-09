export const faqData = [
  {
    id: 1,
    question: 'Is email verification required?',
    answer:
      'Yes. Users must verify their email address before accessing protected features, ensuring only verified accounts can sign in.',
  },
  {
    id: 2,
    question: 'How is authentication implemented?',
    answer:
      'Authentication is powered by JSON Web Tokens (JWT). Tokens are securely generated on the backend and validated for protected routes.',
  },
  {
    id: 3,
    question: 'Can users reset their password?',
    answer:
      'Yes. Users can request a password reset link via email and securely create a new password through the reset flow.',
  },
  {
    id: 4,
    question: 'Are protected routes supported?',
    answer:
      'Yes. Both frontend and backend enforce authentication to ensure only authorized users can access protected resources.',
  },
  {
    id: 5,
    question: 'Is the application responsive?',
    answer:
      'Absolutely. The interface is fully responsive and optimized for desktop, tablet, and mobile devices.',
  },
  {
    id: 6,
    question: 'Which technologies are used?',
    answer:
      'The project is built with React, Tailwind CSS, Node.js, Express.js, MongoDB, JWT, Nodemailer, and other modern development tools.',
  },
];
