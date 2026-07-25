import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { PostsListSchema } from './schema';

export type PostsListData = z.infer<typeof PostsListSchema>;
export type PostsListSettings = z.infer<typeof BaseSectionSettingsSchema>;
