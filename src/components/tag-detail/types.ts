import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { TagDetailSchema } from './schema';

export type TagDetailData = z.infer<typeof TagDetailSchema>;
export type TagDetailSettings = z.infer<typeof BaseSectionSettingsSchema>;
