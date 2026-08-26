import { z } from 'zod';

const loginSchema = z.object({
  email: z.email('Please enter a valid email address.').trim().toLowerCase(),

  password: z.string().min(1, 'Password is required.'),
});

const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, 'Full name is required.')
      .max(100, 'Full name cannot exceed 100 characters.'),

    email: z
      .email('Please provide a valid email address.')
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .max(100, 'Password cannot exceed 100 characters.')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .regex(/[0-9]/, 'Password must contain at least one number.'),

    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address.').trim().toLowerCase(),
});

const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100, 'Full name must not exceed 100 characters.'),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required.'),

    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long.')
      .regex(
        /[A-Z]/,
        'New password must contain at least one uppercase letter.',
      )
      .regex(
        /[a-z]/,
        'New password must contain at least one lowercase letter.',
      )
      .regex(/[0-9]/, 'New password must contain at least one number.'),

    confirmPassword: z.string().min(1, 'Please confirm your new password.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
};
