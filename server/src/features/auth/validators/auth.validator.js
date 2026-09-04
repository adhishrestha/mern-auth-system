import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(100, "Password cannot exceed 100 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.");

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .max(100, "Full name cannot exceed 100 characters"),

    email: z
      .string()
      .trim()
      .email("Please provide a valid email address")
      .toLowerCase(),

    password: passwordSchema,
  })
  .strict();

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),

  password: z.string().min(1, "Password is required."),
});

export const googleAuthSchema = z.object({
  idToken: z.string().trim().min(1, "Google ID token is required."),
});

export const reauthSchema = z
  .object({
    method: z.enum(["password", "google"]),
    password: z.string().min(1, "Password is required.").optional(),
    idToken: z
      .string()
      .trim()
      .min(1, "Google ID token is required.")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.method === "password" && !data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password is required.",
      });
    }

    if (data.method === "google" && !data.idToken) {
      ctx.addIssue({
        code: "custom",
        path: ["idToken"],
        message: "Google ID token is required.",
      });
    }
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name must not exceed 100 characters."),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),

  newPassword: passwordSchema,
});

export const deleteAccountSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
});
