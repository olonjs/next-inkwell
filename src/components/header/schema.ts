import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const HeaderMenuItemSchema = BaseArrayItem.extend({
  label: z.string().describe('ui:text'),
  href: z.string().describe('ui:text'),
  isCta: z.boolean().optional().describe('ui:checkbox'),
});

export const HeaderSchema = BaseSectionData.extend({
  logoText: z.string().describe('ui:text'),
  logoHighlight: z.string().optional().describe('ui:text'),
  announcement: z.string().optional().describe('ui:text'),
  // Resolved editing surface: site.json authors data.menu as a $ref to
  // menu.json; the engine resolves it before the Inspector sees it.
  menu: z.array(HeaderMenuItemSchema).optional().describe('ui:list'),
});
