import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';
import { PostSchema } from '@/collections/posts';

export const PostDetailSchema = BaseSectionData.extend({
  backLabel: z.string().optional().describe('ui:text'),
  item: PostSchema.describe('ui:collection-ref'),
});
