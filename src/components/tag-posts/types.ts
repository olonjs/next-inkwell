import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { TagPostsSchema } from './schema';

export type TagPostsData = z.infer<typeof TagPostsSchema>;
export type TagPostsSettings = z.infer<typeof BaseSectionSettingsSchema>;
