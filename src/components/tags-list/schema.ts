import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';
import { TagSchema } from '@/collections/tags';

export const TagsListSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().optional().describe('ui:textarea'),
  items: z.record(z.string(), TagSchema).describe('ui:collection-ref'),
});
