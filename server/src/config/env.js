import { z } from "zod";

const envSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, "PORT must be a valid number")
    .transform(Number)
    .refine((port) => port > 0 && port <= 65535, {
      message: "PORT must be between 1 and 65535",
    }),

  NODE_ENV: z.enum(["development", "test", "production"]),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  CLIENT_URL: z.url("CLIENT_URL must be a valid URL"),

  SMTP_HOST: z.string().min(1, "SMTP_HOST is required"),

  SMTP_PORT: z
    .string()
    .regex(/^\d+$/, "SMTP_PORT must be a valid number")
    .transform(Number)
    .refine((port) => port > 0 && port <= 65535, {
      message: "SMTP_PORT must be between 1 and 65535",
    }),

  SMTP_USER: z.string().min(1, "SMTP_USER is required"),

  SMTP_PASS: z.string().min(1, "SMTP_PASS is required"),

  EMAIL_FROM: z.string().min(1, "EMAIL_FROM is required"),

  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),

  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),

  JWT_REAUTH_SECRET: z
    .string()
    .min(32, "JWT_REAUTH_SECRET must be at least 32 characters"),

  JWT_ACCESS_EXPIRES_IN: z.string().min(1, "JWT_ACCESS_EXPIRES_IN is required"),

  JWT_REFRESH_EXPIRES_IN: z
    .string()
    .min(1, "JWT_REFRESH_EXPIRES_IN is required"),

  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
});

const validateEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("Environment validation failed:");

    result.error.issues.forEach((issue) => {
      console.error(`- ${issue.path.join(".")}: ${issue.message}`);
    });

    process.exit(1);
  }

  return result.data;
};

export default validateEnv;
