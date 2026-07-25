import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { TagsListData, TagsListSettings } from './types';

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

export const TagsList: React.FC<{ data: TagsListData; settings: TagsListSettings }> = ({ data, settings }) => {
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

  const tags = Object.values(data.items ?? {});

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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag, idx) => (
            <a
              key={tag.id || `legacy-${idx}`}
              href={'/tags/' + (tag.id || '')}
              className="group"
              data-jp-item-id={tag.id || `legacy-${idx}`}
              data-jp-item-field="items"
            >
              <Card className="h-full rounded-[var(--local-radius-lg)] border-[var(--local-border)] bg-[var(--local-surface)] transition group-hover:border-[var(--local-accent)]">
                <CardContent className="p-6">
                  <span
                    className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: ACCENT_VAR[tag.accent ?? 'primary'] }}
                  >
                    #{tag.id}
                  </span>
                  <h3 className="mt-3 font-display text-[1.2rem] font-bold leading-tight tracking-tight text-[var(--local-text)]">
                    {tag.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--local-text-muted)]">{tag.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
