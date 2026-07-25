import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';
import { PostSchema } from '@/collections/posts';
import { TagSchema } from '@/collections/tags';

// Dual binding: `item` is the route-selected post (collection:current),
// `tags` is the FULL foreign collection. The View resolves the relation
// post.tags (array of tag keys) against the tags map.
export const RelatedTagsSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().optional().describe('ui:text'),
  emptyLabel: z.string().optional().describe('ui:text'),
  item: PostSchema.describe('ui:collection-ref'),
  tags: z.record(z.string(), TagSchema).describe('ui:collection-ref'),
});
