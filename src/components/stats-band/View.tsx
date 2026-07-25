import React from 'react';
import { iconMap } from '@/lib/IconResolver';
import type { StatsBandData, StatsBandSettings } from './types';

const PADDING_TOP: Record<string, string> = {
  none: 'pt-0', sm: 'pt-8', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', '2xl': 'pt-40',
};
const PADDING_BOTTOM: Record<string, string> = {
  none: 'pb-0', sm: 'pb-8', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', '2xl': 'pb-40',
};

export const StatsBand: React.FC<{ data: StatsBandData; settings: StatsBandSettings }> = ({ data, settings }) => {
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
        '--local-accent-soft': 'var(--demo-accent-soft)',
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
        {data.title && (
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tight text-[var(--local-text)]" data-jp-field="title">
            {data.title}
          </h2>
        )}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.stats.map((stat, idx) => {
            const Icon = stat.icon ? iconMap[stat.icon] : undefined;
            return (
              <div
                key={stat.id || `legacy-${idx}`}
                className="rounded-[var(--local-radius-lg)] border border-[var(--local-border)] bg-[var(--local-surface)] p-6"
                data-jp-item-id={stat.id || `legacy-${idx}`}
                data-jp-item-field="stats"
              >
                {Icon && (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--local-accent-soft)]">
                    <Icon className="h-5 w-5 text-[var(--local-primary)]" />
                  </span>
                )}
                <div className="mt-4 font-display text-[2.2rem] font-black leading-none tracking-tight text-[var(--local-text)]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-[var(--local-text-muted)]">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
