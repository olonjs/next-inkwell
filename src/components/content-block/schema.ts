import { z } from 'zod';
import { BaseSectionData, BaseArrayItem, ImageSelectionSchema } from '@olonjs/core';

const ParagraphSchema = BaseArrayItem.extend({
  text: z.string().describe('ui:textarea'),
});

export const ContentBlockSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  paragraphs: z.array(ParagraphSchema).describe('ui:list'),
  image: ImageSelectionSchema.optional(),
});
