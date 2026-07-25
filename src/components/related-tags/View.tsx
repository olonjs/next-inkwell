import React from 'react';
import type { Tag } from '@/collections/tags';
import type { RelatedTagsData, RelatedTagsSettings } from './types';

const PADDING_TOP: Record<string, string> = {
  none: 'pt-0', sm: 'pt-8', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', '2xl': 'pt-40',
};
const PADDING_BOTTOM: Record<string, string> = {
  none: 'pb-0', sm: 'pb-8', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', '2xl': 'pb-40',
};

const ACCENT_VAR: Record<string, string> = {
  primary: 'var(--local-primary)',
  accent: 'var(--local-accent)',
  muted: 'var(--local-text-muted)',
};

export const RelatedTags: React.FC<{ data: RelatedTagsData; settings: RelatedTagsSettings }> = ({ data, settings }) => {
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

  // Relation resolution: post.tags is an array of tag collection keys.
  const tagMap = data.tags ?? {};
  const related = (data.item.tags ?? [])
    .map((tagId) => tagMap[tagId])
    .filter((tag): tag is Tag => Boolean(tag));

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
        '--local-radius-md': 'var(--theme-radius-md)',
      } as React.CSSProperties}
      className={`relative z-0 border-t border-[var(--local-border)] ${paddingTop} ${paddingBottom} bg-[var(--local-bg)]`}
    >
      <div className={containerClass}>
        <div className="mx-auto max-w-[760px]">
          {data.label && (
            <div
              className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)] mb-4"
              data-jp-field="label"
            >
              <span className="w-5 h-px bg-[var(--local-primary)]" />
              {data.label}
            </div>
          )}
          {data.title && (
            <h2 className="font-display text-[1.4rem] font-bold leading-tight tracking-tight text-[var(--local-text)]" data-jp-field="title">
              {data.title}
            </h2>
          )}
          {related.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {related.map((tag, idx) => (
                <a
                  key={tag.id || `legacy-${idx}`}
                  href={'/tags/' + (tag.id || '')}
                  className="group inline-flex items-center gap-2 rounded-[var(--local-radius-md)] border border-[var(--local-border)] bg-[var(--local-surface)] px-4 py-2 transition hover:border-[var(--local-accent)]"
                >
                  <span
                    className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: ACCENT_VAR[tag.accent ?? 'primary'] }}
                  >
                    #{tag.id}
                  </span>
                  <span className="text-sm font-medium text-[var(--local-text)] transition group-hover:text-[var(--local-primary)]">
                    {tag.name}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            data.emptyLabel && (
              <p className="mt-6 text-sm text-[var(--local-text-muted)]" data-jp-field="emptyLabel">
                {data.emptyLabel}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
};
