// Layout: Features=A (BENTO) default variant, C (TIMELINE) alternative variant
import React from 'react';
import { resolveTagId } from '@/collections/posts/tag-refs';
import { Card, CardContent } from '@/components/ui/card';
import type { PostsListData, PostsListSettings } from './types';

const PADDING_TOP: Record<string, string> = {
  none: 'pt-0', sm: 'pt-8', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', '2xl': 'pt-40',
};
const PADDING_BOTTOM: Record<string, string> = {
  none: 'pb-0', sm: 'pb-8', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', '2xl': 'pb-40',
};

export const PostsList: React.FC<{ data: PostsListData; settings: PostsListSettings }> = ({ data, settings }) => {
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

  const posts = Object.values(data.items ?? {}).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const visible = data.limit ? posts.slice(0, data.limit) : posts;
  const variant = data.variant ?? 'bento';

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
        {data.label && (
          <div
            className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)] mb-4"
            data-jp-field="label"
          >
            <span className="w-5 h-px bg-[var(--local-primary)]" />
            {data.label}
          </div>
        )}
        <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
          {data.title}
        </h2>
        {data.description && (
          <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-[var(--local-text-muted)]" data-jp-field="description">
            {data.description}
          </p>
        )}

        {variant === 'timeline' ? (
          <div className="mt-12 border-l border-[var(--local-border)] pl-8">
            {visible.map((post, idx) => (
              <a
                key={post.id || `legacy-${idx}`}
                href={'/posts/' + (post.id || '')}
                className="group relative block pb-12 last:pb-0"
                data-jp-item-id={post.id || `legacy-${idx}`}
                data-jp-item-field="items"
              >
                <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border border-[var(--local-border)] bg-[var(--local-primary)]" />
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--local-text-muted)]">
                  {post.date} · {post.author} · {post.readingTime}
                </div>
                <h3 className="mt-2 font-display text-[1.4rem] font-bold leading-tight tracking-tight text-[var(--local-text)] transition group-hover:text-[var(--local-primary)]">
                  {post.title}
                </h3>
                <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-[var(--local-text-muted)]">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(post.tags ?? []).map((tag, tagIdx) => {
                    const tagId = resolveTagId(tag) ?? `tag-${tagIdx}`;
                    return (
                      <span key={tagId} className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--local-accent)]">
                        #{tagId}
                      </span>
                    );
                  })}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-6">
            {visible.map((post, idx) => (
              <a
                key={post.id || `legacy-${idx}`}
                href={'/posts/' + (post.id || '')}
                className={(idx === 0 ? 'md:col-span-4' : 'md:col-span-2') + ' group'}
                data-jp-item-id={post.id || `legacy-${idx}`}
                data-jp-item-field="items"
              >
                <Card className="h-full overflow-hidden rounded-[var(--local-radius-lg)] border-[var(--local-border)] bg-[var(--local-surface)] py-0 transition group-hover:border-[var(--local-accent)]">
                  {post.image?.url && (
                    <div className={idx === 0 ? 'h-64 overflow-hidden' : 'h-40 overflow-hidden'}>
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
                    <h3 className="mt-2 font-display text-[1.2rem] font-bold leading-tight tracking-tight text-[var(--local-text)]">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--local-text-muted)]">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(post.tags ?? []).map((tag, tagIdx) => {
                        const tagId = resolveTagId(tag) ?? `tag-${tagIdx}`;
                        return (
                          <span key={tagId} className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--local-accent)]">
                            #{tagId}
                          </span>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
