import { z } from 'zod';
import { TagSchema, TagsCollectionSchema } from './schema';

export type Tag = z.infer<typeof TagSchema>;
export type TagsCollection = z.infer<typeof TagsCollectionSchema>;
