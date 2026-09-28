import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendTestEmail = async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: [process.env.SMTP_USER],
      subject: "Resend production email test",
      html: `
        <h2>Resend test successful 🎉</h2>
        <p>This email was sent using the Resend API.</p>
        <p>Your production email service configuration is working.</p>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      process.exit(1);
    }

    console.log("Resend email sent successfully!");
    console.log("Email ID:", data.id);
  } catch (error) {
    console.error("Resend test failed:", error);
    process.exit(1);
  }
};

sendTestEmail();
