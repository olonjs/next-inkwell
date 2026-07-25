import { HeaderSchema } from '@/components/header';
import { FooterSchema } from '@/components/footer';
import { HeroSchema } from '@/components/hero';
import { PageHeroSchema } from '@/components/page-hero';
import { PostsListSchema } from '@/components/posts-list';
import { TagsListSchema } from '@/components/tags-list';
import { PostDetailSchema } from '@/components/post-detail';
import { RelatedTagsSchema } from '@/components/related-tags';
import { TagDetailSchema } from '@/components/tag-detail';
import { TagPostsSchema } from '@/components/tag-posts';
import { ContentBlockSchema } from '@/components/content-block';
import { StatsBandSchema } from '@/components/stats-band';
import { CtaBannerSchema } from '@/components/cta-banner';

export const SECTION_SCHEMAS = {
  'header': HeaderSchema,
  'footer': FooterSchema,
  'hero': HeroSchema,
  'page-hero': PageHeroSchema,
  'posts-list': PostsListSchema,
  'tags-list': TagsListSchema,
  'post-detail': PostDetailSchema,
  'related-tags': RelatedTagsSchema,
  'tag-detail': TagDetailSchema,
  'tag-posts': TagPostsSchema,
  'content-block': ContentBlockSchema,
  'stats-band': StatsBandSchema,
  'cta-banner': CtaBannerSchema,
} as const;

// Submission schemas per section type. Required runtime export — keep
// even if empty: omitting it makes the engine bootstrap fail at startup.
export const SECTION_SUBMISSION_SCHEMAS = {
  // no form capsules in this tenant
} as const;

export type SectionType = keyof typeof SECTION_SCHEMAS;

export {
  BaseSectionData,
  BaseArrayItem,
  BaseSectionSettingsSchema,
  CtaSchema,
  ImageSelectionSchema,
} from '@olonjs/core';
