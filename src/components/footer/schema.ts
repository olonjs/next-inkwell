import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const FooterMenuItemSchema = BaseArrayItem.extend({
  label: z.string().describe('ui:text'),
  href: z.string().describe('ui:text'),
});

export const FooterSchema = BaseSectionData.extend({
  brandText: z.string().describe('ui:text'),
  tagline: z.string().optional().describe('ui:textarea'),
  email: z.string().optional().describe('ui:text'),
  copyright: z.string().describe('ui:text'),
  menu: z.array(FooterMenuItemSchema).optional().describe('ui:list'),
});
