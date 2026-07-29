import { z } from 'zod';
import { BaseCollectionItem, ImageSelectionSchema } from '@olonjs/core';
import { TagSchema } from '@/collections/tags/schema';

/** Authored collection pointer; bake/runtime expand to the target Tag. */
const CollectionPointerSchema = z.object({
  $ref: z.string(),
});

export const PostSchema = BaseCollectionItem.extend({
  title: z.string().describe('ui:text'),
  excerpt: z.string().describe('ui:textarea'),
  body: z.string().describe('ui:textarea'),
  image: ImageSelectionSchema.optional(),
  date: z.string().describe('ui:text'),
  author: z.string().describe('ui:text'),
  readingTime: z.string().describe('ui:text'),
  // Relation posts -> tags via $ref pointers (SOT on the post side).
  // Authored: { $ref: "../tags/tags.json#/<id>" }; after resolve: Tag objects.
  // Inverse (tags -> posts) is computed at render time by filtering.
  tags: z.array(z.union([TagSchema, CollectionPointerSchema])).describe('ui:list'),
});

export const PostsCollectionSchema = z.record(z.string(), PostSchema);
