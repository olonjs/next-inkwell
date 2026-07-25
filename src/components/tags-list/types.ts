import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { TagsListSchema } from './schema';

export type TagsListData = z.infer<typeof TagsListSchema>;
export type TagsListSettings = z.infer<typeof BaseSectionSettingsSchema>;
