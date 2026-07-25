import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';
import { PostSchema } from '@/collections/posts';
import { TagSchema } from '@/collections/tags';

// Dual binding: `item` is the route-selected tag (collection:current),
// `posts` is the FULL posts collection. The inverse relation tag -> posts is
// never stored in data: it is computed here by filtering posts whose
// `tags` array contains the current tag key.
export const TagPostsSchema = BaseSectionData.extend({
  title: z.string().optional().describe('ui:text'),
  emptyLabel: z.string().optional().describe('ui:text'),
  item: TagSchema.describe('ui:collection-ref'),
  posts: z.record(z.string(), PostSchema).describe('ui:collection-ref'),
});
