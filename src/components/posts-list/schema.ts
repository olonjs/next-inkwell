import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';
import { PostSchema } from '@/collections/posts';

export const PostsListSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().optional().describe('ui:textarea'),
  variant: z.enum(['bento', 'timeline']).optional().describe('ui:select'),
  limit: z.number().optional().describe('ui:number'),
  items: z.record(z.string(), PostSchema).describe('ui:collection-ref'),
});
