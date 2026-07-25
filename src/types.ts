import type { HeaderData, HeaderSettings } from '@/components/header';
import type { FooterData, FooterSettings } from '@/components/footer';
import type { HeroData, HeroSettings } from '@/components/hero';
import type { PageHeroData, PageHeroSettings } from '@/components/page-hero';
import type { PostsListData, PostsListSettings } from '@/components/posts-list';
import type { TagsListData, TagsListSettings } from '@/components/tags-list';
import type { PostDetailData, PostDetailSettings } from '@/components/post-detail';
import type { RelatedTagsData, RelatedTagsSettings } from '@/components/related-tags';
import type { TagDetailData, TagDetailSettings } from '@/components/tag-detail';
import type { TagPostsData, TagPostsSettings } from '@/components/tag-posts';
import type { ContentBlockData, ContentBlockSettings } from '@/components/content-block';
import type { StatsBandData, StatsBandSettings } from '@/components/stats-band';
import type { CtaBannerData, CtaBannerSettings } from '@/components/cta-banner';

export type SectionComponentPropsMap = {
  'header': { data: HeaderData; settings: HeaderSettings };
  'footer': { data: FooterData; settings: FooterSettings };
  'hero': { data: HeroData; settings: HeroSettings };
  'page-hero': { data: PageHeroData; settings: PageHeroSettings };
  'posts-list': { data: PostsListData; settings: PostsListSettings };
  'tags-list': { data: TagsListData; settings: TagsListSettings };
  'post-detail': { data: PostDetailData; settings: PostDetailSettings };
  'related-tags': { data: RelatedTagsData; settings: RelatedTagsSettings };
  'tag-detail': { data: TagDetailData; settings: TagDetailSettings };
  'tag-posts': { data: TagPostsData; settings: TagPostsSettings };
  'content-block': { data: ContentBlockData; settings: ContentBlockSettings };
  'stats-band': { data: StatsBandData; settings: StatsBandSettings };
  'cta-banner': { data: CtaBannerData; settings: CtaBannerSettings };
};

declare module '@olonjs/core' {
  export interface SectionDataRegistry {
    'header': HeaderData;
    'footer': FooterData;
    'hero': HeroData;
    'page-hero': PageHeroData;
    'posts-list': PostsListData;
    'tags-list': TagsListData;
    'post-detail': PostDetailData;
    'related-tags': RelatedTagsData;
    'tag-detail': TagDetailData;
    'tag-posts': TagPostsData;
    'content-block': ContentBlockData;
    'stats-band': StatsBandData;
    'cta-banner': CtaBannerData;
  }
  export interface SectionSettingsRegistry {
    'header': HeaderSettings;
    'footer': FooterSettings;
    'hero': HeroSettings;
    'page-hero': PageHeroSettings;
    'posts-list': PostsListSettings;
    'tags-list': TagsListSettings;
    'post-detail': PostDetailSettings;
    'related-tags': RelatedTagsSettings;
    'tag-detail': TagDetailSettings;
    'tag-posts': TagPostsSettings;
    'content-block': ContentBlockSettings;
    'stats-band': StatsBandSettings;
    'cta-banner': CtaBannerSettings;
  }
}

export * from '@olonjs/core';
