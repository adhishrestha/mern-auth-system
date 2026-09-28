import { z } from "zod";

const envSchema = z
  .object({
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

    SMTP_HOST: z.string().optional(),

    SMTP_PORT: z
      .string()
      .regex(/^\d+$/, "SMTP_PORT must be a valid number")
      .transform(Number)
      .refine((port) => port > 0 && port <= 65535, {
        message: "SMTP_PORT must be between 1 and 65535",
      })
      .optional(),

    SMTP_USER: z.string().optional(),

    SMTP_PASS: z.string().optional(),

    EMAIL_FROM: z.string().optional(),

    JWT_ACCESS_SECRET: z
      .string()
      .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),

    JWT_REFRESH_SECRET: z
      .string()
      .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),

    JWT_REAUTH_SECRET: z
      .string()
      .min(32, "JWT_REAUTH_SECRET must be at least 32 characters"),

    JWT_ACCESS_EXPIRES_IN: z
      .string()
      .min(1, "JWT_ACCESS_EXPIRES_IN is required"),

    JWT_REFRESH_EXPIRES_IN: z
      .string()
      .min(1, "JWT_REFRESH_EXPIRES_IN is required"),

    GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),

    RESEND_API_KEY: z.string().optional(),

    RESEND_FROM: z.string().optional(),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV === "production") {
      if (!env.RESEND_API_KEY) {
        ctx.addIssue({
          code: "custom",
          path: ["RESEND_API_KEY"],
          message: "RESEND_API_KEY is required in production",
        });
      }

      if (!env.RESEND_FROM) {
        ctx.addIssue({
          code: "custom",
          path: ["RESEND_FROM"],
          message: "RESEND_FROM is required in production",
        });
      }
    } else {
      if (!env.SMTP_HOST) {
        ctx.addIssue({
          code: "custom",
          path: ["SMTP_HOST"],
          message: "SMTP_HOST is required outside production",
        });
      }

      if (env.SMTP_PORT === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["SMTP_PORT"],
          message: "SMTP_PORT is required outside production",
        });
      }

      if (!env.SMTP_USER) {
        ctx.addIssue({
          code: "custom",
          path: ["SMTP_USER"],
          message: "SMTP_USER is required outside production",
        });
      }

      if (!env.SMTP_PASS) {
        ctx.addIssue({
          code: "custom",
          path: ["SMTP_PASS"],
          message: "SMTP_PASS is required outside production",
        });
      }

      if (!env.EMAIL_FROM) {
        ctx.addIssue({
          code: "custom",
          path: ["EMAIL_FROM"],
          message: "EMAIL_FROM is required outside production",
        });
      }
    }
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
