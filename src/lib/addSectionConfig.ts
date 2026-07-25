import type { AddSectionConfig } from '@olonjs/core';

// Detail capsules (post-detail, related-tags, tag-detail, tag-posts) are
// intentionally NOT addable: they depend on the `collection:current` binding,
// which only exists on pages declaring a `collection` route (COP §8).
const addableSectionTypes = [
  'hero',
  'page-hero',
  'posts-list',
  'tags-list',
  'content-block',
  'stats-band',
  'cta-banner',
] as const;

const sectionTypeLabels: Record<string, string> = {
  'hero': 'Editorial Hero',
  'page-hero': 'Page Hero',
  'posts-list': 'Posts List',
  'tags-list': 'Tags List',
  'content-block': 'Content Block',
  'stats-band': 'Stats Band',
  'cta-banner': 'CTA Banner',
};

function getDefaultSectionData(type: string): Record<string, unknown> {
  switch (type) {
    case 'hero':
      return {
        title: 'A headline worth reading',
        subtitle: 'Say the one thing this page exists to say.',
        primaryCta: { id: 'cta-primary', label: 'Read the journal', href: '/posts', variant: 'primary' },
      };
    case 'page-hero':
      return { title: 'New page title' };
    case 'posts-list':
      return { title: 'Latest posts', items: {} };
    case 'tags-list':
      return { title: 'Browse by topic', items: {} };
    case 'content-block':
      return { title: 'A section worth writing', paragraphs: [] };
    case 'stats-band':
      return { stats: [] };
    case 'cta-banner':
      return {
        title: 'Start reading',
        primaryCta: { id: 'cta-primary', label: 'Browse the posts', href: '/posts', variant: 'primary' },
      };
    default:
      return {};
  }
}

export const addSectionConfig: AddSectionConfig = {
  addableSectionTypes: [...addableSectionTypes],
  sectionTypeLabels,
  getDefaultSectionData,
};
