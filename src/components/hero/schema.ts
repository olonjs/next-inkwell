import { z } from 'zod';
import { BaseSectionData, CtaSchema, ImageSelectionSchema } from '@olonjs/core';

export const HeroSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  titleHighlight: z.string().optional().describe('ui:text'),
  subtitle: z.string().describe('ui:textarea'),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema.optional(),
  image: ImageSelectionSchema.optional(),
});
