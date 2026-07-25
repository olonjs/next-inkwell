import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const StatSchema = BaseArrayItem.extend({
  icon: z.string().optional().describe('ui:icon-picker'),
  value: z.string().describe('ui:text'),
  label: z.string().describe('ui:text'),
});

export const StatsBandSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().optional().describe('ui:text'),
  stats: z.array(StatSchema).describe('ui:list'),
});
