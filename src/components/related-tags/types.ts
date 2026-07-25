import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { RelatedTagsSchema } from './schema';

export type RelatedTagsData = z.infer<typeof RelatedTagsSchema>;
export type RelatedTagsSettings = z.infer<typeof BaseSectionSettingsSchema>;
