import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { PageHero } from '@/components/page-hero';
import { PostsList } from '@/components/posts-list';
import { TagsList } from '@/components/tags-list';
import { PostDetail } from '@/components/post-detail';
import { RelatedTags } from '@/components/related-tags';
import { TagDetail } from '@/components/tag-detail';
import { TagPosts } from '@/components/tag-posts';
import { ContentBlock } from '@/components/content-block';
import { StatsBand } from '@/components/stats-band';
import { CtaBanner } from '@/components/cta-banner';

import type { SectionType } from '@olonjs/core';
import type { SectionComponentPropsMap } from '@/types';

export const ComponentRegistry: {
  [K in SectionType]: React.FC<SectionComponentPropsMap[K]>;
} = {
  'header': Header,
  'footer': Footer,
  'hero': Hero,
  'page-hero': PageHero,
  'posts-list': PostsList,
  'tags-list': TagsList,
  'post-detail': PostDetail,
  'related-tags': RelatedTags,
  'tag-detail': TagDetail,
  'tag-posts': TagPosts,
  'content-block': ContentBlock,
  'stats-band': StatsBand,
  'cta-banner': CtaBanner,
};
