import { z } from 'zod';

export const sessionsBase = z.object({
  _id: z.string().trim().optional(),
  status: z.string().trim().optional(),
  createdByUid: z.preprocess((val) => (typeof val === 'string' && val.trim() === '' ? undefined : val), z.string().trim()),
  mode: z.string().trim().optional(),
  memoryContext: z.preprocess((val) => (Array.isArray(val) && val.length === 0) ? undefined : val, z.array(z.string().trim()).optional()),
});

export const sessions = sessionsBase;

