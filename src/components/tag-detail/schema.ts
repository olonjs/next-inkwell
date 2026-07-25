import { z } from 'zod';
import { BaseSectionData } from '@olonjs/core';
import { TagSchema } from '@/collections/tags';

export const TagDetailSchema = BaseSectionData.extend({
  backLabel: z.string().optional().describe('ui:text'),
  item: TagSchema.describe('ui:collection-ref'),
});
