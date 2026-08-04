import { z } from "zod";
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

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters"),
  })
  .strict();

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),

  password: z.string().min(1, "Password is required."),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
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

  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters long.")
    .regex(/[A-Z]/, "New password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "New password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "New password must contain at least one number."),
});

export const deleteAccountSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
});
