import { z } from 'zod';

export const storiesBase = z.object({
  _id: z.string().trim().optional(),
  title: z.string().trim().optional(),
  createdAt: z.string().trim().optional(),
  createdByUid: z.preprocess((val) => (typeof val === 'string' && val.trim() === '' ? undefined : val), z.string().trim().optional()).optional(),
  segments: z.preprocess((val) => (Array.isArray(val) && val.length === 0) ? undefined : val, z.array(z.record(z.any())).optional()),
  topics: z.preprocess((val) => (Array.isArray(val) && val.length === 0) ? undefined : val, z.array(z.string().trim()).optional()),
});

export const stories = storiesBase;

