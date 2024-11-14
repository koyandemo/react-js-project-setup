import { z } from 'zod';

export type LoginUserT = {
  email:string;
  password:string;
}

export const SignInSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter valid email address',
    })
    .nonempty({ message: 'Email is required' }),
  password: z.string().min(8, {
    message: 'Password must be at lease 8 characters',
  }),
});

export const UpdatePasswordSchema = z
  .object({
    current_password: z.string().min(1, {
      message: 'Please enter your current password',
    }),
    new_password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    new_password_confirmation: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: 'Passwords do not match',
    path: ['new_password_confirmation', 'new_password'],
  });

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});
