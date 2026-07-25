import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { TagPostsData, TagPostsSettings } from './types';

const PADDING_TOP: Record<string, string> = {
  none: 'pt-0', sm: 'pt-8', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', '2xl': 'pt-40',
};
const PADDING_BOTTOM: Record<string, string> = {
  none: 'pb-0', sm: 'pb-8', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', '2xl': 'pb-40',
};

export const TagPosts: React.FC<{ data: TagPostsData; settings: TagPostsSettings }> = ({ data, settings }) => {
  const paddingTop = PADDING_TOP[settings?.paddingTop ?? 'md'];
  const paddingBottom = PADDING_BOTTOM[settings?.paddingBottom ?? 'md'];
  const containerClass = settings?.container === 'fluid' ? 'w-full px-8' : 'max-w-[1200px] mx-auto px-8';

  const sectionTheme = settings?.theme ?? 'dark';
  const SECTION_THEME_VARS: Record<string, { bg: string; text: string; muted: string; surface: string; border: string }> = {
    dark: {
      // Mode-aware default: follows the site-wide toggle via the semantic
      // bridge ([data-theme="light"] override in globals.css).
      bg: 'var(--background)',
      text: 'var(--foreground)',
      muted: 'var(--muted-foreground)',
      surface: 'var(--card)',
      border: 'var(--border)',
    },
    light: {
      bg: 'var(--theme-modes-light-colors-background)',
      text: 'var(--theme-modes-light-colors-foreground)',
      muted: 'var(--theme-modes-light-colors-muted-foreground)',
      surface: 'var(--theme-modes-light-colors-card)',
      border: 'var(--theme-modes-light-colors-border)',
    },
    accent: {
      bg: 'var(--accent)',
      text: 'var(--accent-foreground)',
      muted: 'var(--accent-foreground)',
      surface: 'var(--accent)',
      border: 'var(--border)',
    },
  };
  const t = SECTION_THEME_VARS[sectionTheme] ?? SECTION_THEME_VARS.dark;

  // Inverse relation tag -> posts, computed from the single source of truth
  // (post.tags) by filtering the full posts collection.
  const tagId = data.item.id || '';
  const posts = Object.values(data.posts ?? {})
    .filter((post) => (post.tags ?? []).includes(tagId))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <section
      style={{
        '--local-bg': t.bg,
        '--local-text': t.text,
        '--local-text-muted': t.muted,
        '--local-primary': 'var(--primary)',
        '--local-accent': 'var(--accent)',
        '--local-border': t.border,
        '--local-surface': t.surface,
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className={`relative z-0 ${paddingTop} ${paddingBottom} bg-[var(--local-bg)]`}
    >
      <div className={containerClass}>
        {data.title && (
          <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>
        )}
        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <a key={post.id || `legacy-${idx}`} href={'/posts/' + (post.id || '')} className="group">
                <Card className="h-full overflow-hidden rounded-[var(--local-radius-lg)] border-[var(--local-border)] bg-[var(--local-surface)] py-0 transition group-hover:border-[var(--local-accent)]">
                  {post.image?.url && (
                    <div className="h-36 overflow-hidden">
                      <img
                        src={post.image.url}
                        alt={post.image.alt || ''}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--local-text-muted)]">
                      {post.date} · {post.readingTime}
                    </div>
                    <h3 className="mt-2 font-display text-[1.1rem] font-bold leading-tight tracking-tight text-[var(--local-text)]">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--local-text-muted)]">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        ) : (
          data.emptyLabel && (
            <p className="mt-10 text-sm text-[var(--local-text-muted)]" data-jp-field="emptyLabel">
              {data.emptyLabel}
            </p>
          )
        )}
      </div>
    </section>
  );
};
