import { z } from 'zod';

export const usersBase = z.object({
  _id: z.string().trim().optional(),
  displayName: z.string().trim().optional(),
  email: z.string().trim().optional(),
});

export const users = usersBase;

