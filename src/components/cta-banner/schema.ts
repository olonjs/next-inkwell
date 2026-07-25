import { z } from 'zod';
import { BaseSectionData, CtaSchema } from '@olonjs/core';

export const CtaBannerSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().optional().describe('ui:textarea'),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema.optional(),
});
