import { z } from 'zod';
import { BaseCollectionItem } from '@olonjs/core';

export const TagSchema = BaseCollectionItem.extend({
  name: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  accent: z.enum(['primary', 'accent', 'muted']).optional().describe('ui:select'),
});

export const TagsCollectionSchema = z.record(z.string(), TagSchema);
