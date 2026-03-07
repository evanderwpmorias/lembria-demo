import { z } from 'zod';

export const memoriesBase = z.object({
  _id: z.string().trim().optional(),
  summary: z.string().trim().optional(),
  title: z.string().trim().optional(),
  personIds: z.preprocess((val) => (typeof val === 'string' && val.trim() === '' ? undefined : val), z.string().trim().optional()).optional(),
  media: z.record(z.any()).optional(),
  createdByUid: z.preprocess((val) => (typeof val === 'string' && val.trim() === '' ? undefined : val), z.string().trim().optional()).optional(),
  capturedAt: z.string().trim().refine(dateStr => !isNaN(Date.parse(dateStr)), { message: 'Invalid date format' }).optional(),
  embeddings: z.string().trim().optional(),
});

export const memories = memoriesBase;

