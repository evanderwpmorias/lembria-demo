import { z } from 'zod';

export const familiesBase = z.object({
  _id: z.string().trim().optional(),
  ownerUid: z.string().trim().optional(),
  name: z.string().trim().optional(),
});

export const families = familiesBase;

