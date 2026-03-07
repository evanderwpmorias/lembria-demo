import { z } from 'zod';

export const personsBase = z.object({
  _id: z.string().trim().optional(),
  displayName: z.string().trim().optional(),
  birthYear: z.string().trim().optional(),
  relationHint: z.string().trim().optional(),
});

export const persons = personsBase;

