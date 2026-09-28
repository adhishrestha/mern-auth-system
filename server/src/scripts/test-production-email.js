import "dotenv/config";

process.env.NODE_ENV = "production";

const { sendVerificationEmail } =
  await import("../features/auth/services/email.service.js");

const testProductionEmail = async () => {
  try {
    const result = await sendVerificationEmail({
      email: process.env.SMTP_USER,
      name: "Production Test User",
      verificationToken: "test-verification-token",
    });

    console.log("Production email integration test successful!");
    console.log("Email ID:", result.id);
  } catch (error) {
    console.error("Production email integration test failed:", error);
    process.exit(1);
  }
};

testProductionEmail();
