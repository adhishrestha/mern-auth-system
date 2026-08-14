import { z } from 'zod';

const loginSchema = z.object({
  email: z.email('Please enter a valid email address.').trim().toLowerCase(),

  password: z.string().min(1, 'Password is required.'),
});

const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100, 'Full name must not exceed 100 characters.'),
});
export { loginSchema, updateProfileSchema };
