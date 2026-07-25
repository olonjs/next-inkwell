import { z } from 'zod';
import { BaseCollectionItem, ImageSelectionSchema } from '@olonjs/core';

export const PostSchema = BaseCollectionItem.extend({
  title: z.string().describe('ui:text'),
  excerpt: z.string().describe('ui:textarea'),
  body: z.string().describe('ui:textarea'),
  image: ImageSelectionSchema.optional(),
  date: z.string().describe('ui:text'),
  author: z.string().describe('ui:text'),
  readingTime: z.string().describe('ui:text'),
  // Relation posts -> tags: each string is a key of the `tags` collection.
  // The relation lives ONLY on the post side (single source of truth);
  // the inverse (tags -> posts) is computed at render time by filtering.
  tags: z.array(z.string()).describe('ui:list'),
});

export const PostsCollectionSchema = z.record(z.string(), PostSchema);
