import { z } from 'zod';

export const messagesBase = z.object({
  _id: z.string().trim().optional(),
  role: z.string().trim().optional(),
  text: z.string().trim().optional(),
  timestamp: z.string().trim().refine(dateStr => !isNaN(Date.parse(dateStr)), { message: 'Invalid date format' }).optional(),
  memoryIds: z.preprocess((val) => (Array.isArray(val) && val.length === 0) ? undefined : val, z.array(z.preprocess((val) => (typeof val === 'string' && val.trim() === '' ? undefined : val), z.string().trim().optional())).optional()),
});

export const messages = messagesBase;

