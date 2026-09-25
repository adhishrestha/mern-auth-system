import "dotenv/config";
import { sendEmail } from "../features/auth/services/email.service.js";

const testEmail = async () => {
  try {
    const info = await sendEmail({
      to: process.env.SMTP_USER,
      subject: "MERN Authentication System - Test Email",
      html: `
        <h2>Email Service Test</h2>
        <p>If you received this email, your Nodemailer configuration is working correctly.</p>
      `,
    });

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Failed to send email");
    console.error(error);
  }
};

testEmail();
