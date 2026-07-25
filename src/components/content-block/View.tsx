import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { ContentBlockData, ContentBlockSettings } from './types';

const PADDING_TOP: Record<string, string> = {
  none: 'pt-0', sm: 'pt-8', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', '2xl': 'pt-40',
};
const PADDING_BOTTOM: Record<string, string> = {
  none: 'pb-0', sm: 'pb-8', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', '2xl': 'pb-40',
};

export const ContentBlock: React.FC<{ data: ContentBlockData; settings: ContentBlockSettings }> = ({ data, settings }) => {
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

  return (
    <section
      style={{
        '--local-bg': t.bg,
        '--local-text': t.text,
        '--local-text-muted': t.muted,
        '--local-primary': 'var(--primary)',
        '--local-accent': 'var(--accent)',
        '--local-border': t.border,
        '--local-radius-lg': 'var(--theme-radius-lg)',
      } as React.CSSProperties}
      className={`relative z-0 ${paddingTop} ${paddingBottom} bg-[var(--local-bg)]`}
    >
      <div className={containerClass}>
        <div className={data.image?.url ? 'grid items-start gap-12 md:grid-cols-2' : ''}>
          <div>
            {data.label && (
              <div
                className="jp-section-label inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--local-accent)] mb-4"
                data-jp-field="label"
              >
                <span className="w-5 h-px bg-[var(--local-primary)]" />
                {data.label}
              </div>
            )}
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
              {data.title}
            </h2>
            <div className="mt-8 space-y-5">
              {data.paragraphs.map((paragraph, idx) => (
                <p
                  key={paragraph.id || `legacy-${idx}`}
                  className="max-w-[62ch] text-base leading-[1.85] text-[var(--local-text-muted)]"
                  data-jp-item-id={paragraph.id || `legacy-${idx}`}
                  data-jp-item-field="paragraphs"
                >
                  {paragraph.text}
                </p>
              ))}
            </div>
          </div>
          {data.image?.url && (
            <div className="overflow-hidden rounded-[var(--local-radius-lg)] border border-[var(--local-border)]">
              <AspectRatio ratio={4 / 5}>
                <img src={data.image.url} alt={data.image.alt || ''} className="h-full w-full object-cover" />
              </AspectRatio>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
