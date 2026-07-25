import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { TagDetailData, TagDetailSettings } from './types';

const PADDING_TOP: Record<string, string> = {
  none: 'pt-0', sm: 'pt-8', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', '2xl': 'pt-40',
};
const PADDING_BOTTOM: Record<string, string> = {
  none: 'pb-0', sm: 'pb-8', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', '2xl': 'pb-40',
};

export const TagDetail: React.FC<{ data: TagDetailData; settings: TagDetailSettings }> = ({ data, settings }) => {
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

  const tag = data.item;

  return (
    <section
      style={{
        '--local-bg': t.bg,
        '--local-text': t.text,
        '--local-text-muted': t.muted,
        '--local-primary': 'var(--primary)',
        '--local-accent': 'var(--accent)',
        '--local-border': t.border,
      } as React.CSSProperties}
      className={`relative z-0 border-b border-[var(--local-border)] ${paddingTop} ${paddingBottom} bg-[var(--local-bg)]`}
    >
      <div className={containerClass}>
        {data.backLabel && (
          <a
            href="/tags"
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--local-text-muted)] transition hover:text-[var(--local-primary)]"
            data-jp-field="backLabel"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {data.backLabel}
          </a>
        )}
        <div className="mt-6 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[var(--local-accent)]">
          #{tag.id}
        </div>
        <h1
          className="mt-3 font-display font-black text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02] tracking-tight text-[var(--local-text)]"
          data-jp-field="item.name"
        >
          {tag.name}
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-[var(--local-text-muted)]" data-jp-field="item.description">
          {tag.description}
        </p>
      </div>
    </section>
  );
};
