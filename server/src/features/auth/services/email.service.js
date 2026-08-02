import nodemailer from "nodemailer";

const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const sendEmail = async ({ to, subject, html }) => {
  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  return info;
};

const sendVerificationEmail = async ({ email, name, verificationToken }) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  const html = `
    <h2>Welcome, ${name}!</h2>
    <p>Thank you for registering.</p>
    <p>Please verify your email by clicking the link below:</p>

    <a href="${verificationUrl}">
      Verify Email
    </a>

    <p>This link will expire in 24 hours.</p>

    <p>If you didn't create this account, you can safely ignore this email.</p>
  `;

  return sendEmail({
    to: email,
    subject: "Verify your email address",
    html,
  });
};

const sendPasswordResetEmail = async ({ email, name, resetToken }) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  const html = `
    <h2>Hello, ${name}!</h2>

    <p>We received a request to reset your password.</p>

    <p>Click the link below to create a new password:</p>

    <a href="${resetUrl}">
      Reset Password
    </a>

    <p>This link will expire in 1 hour.</p>

    <p>If you didn't request a password reset, you can safely ignore this email.</p>
  `;

  return sendEmail({
    to: email,
    subject: "Reset your password",
    html,
  });
};

export { sendEmail, sendVerificationEmail, sendPasswordResetEmail };
