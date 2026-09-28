import "dotenv/config";

process.env.NODE_ENV = "production";

const { sendPasswordResetEmail } =
  await import("../features/auth/services/email.service.js");

const testPasswordResetEmail = async () => {
  try {
    const result = await sendPasswordResetEmail({
      email: process.env.SMTP_USER,
      name: "Production Test User",
      resetToken: "test-reset-token",
    });

    console.log("Password reset email integration test successful!");
    console.log("Email ID:", result.id);
  } catch (error) {
    console.error("Password reset email integration test failed:", error);
    process.exit(1);
  }
};

testPasswordResetEmail();
