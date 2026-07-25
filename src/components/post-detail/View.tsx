import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { PostDetailData, PostDetailSettings } from './types';

const PADDING_TOP: Record<string, string> = {
  none: 'pt-0', sm: 'pt-8', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', '2xl': 'pt-40',
};
const PADDING_BOTTOM: Record<string, string> = {
  none: 'pb-0', sm: 'pb-8', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', '2xl': 'pb-40',
};

export const PostDetail: React.FC<{ data: PostDetailData; settings: PostDetailSettings }> = ({ data, settings }) => {
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

  const post = data.item;
  const paragraphs = (post.body || '').split('\n\n');

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
        <div className="mx-auto max-w-[760px]">
          {data.backLabel && (
            <a
              href="/posts"
              className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--local-text-muted)] transition hover:text-[var(--local-primary)]"
              data-jp-field="backLabel"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {data.backLabel}
            </a>
          )}
          <div className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--local-accent)]">
            <span data-jp-field="item.date">{post.date}</span>
            <span className="mx-2 text-[var(--local-text-muted)]">·</span>
            <span data-jp-field="item.author">{post.author}</span>
            <span className="mx-2 text-[var(--local-text-muted)]">·</span>
            <span data-jp-field="item.readingTime">{post.readingTime}</span>
          </div>
          <h1
            className="mt-4 font-display font-black text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-tight text-[var(--local-text)]"
            data-jp-field="item.title"
          >
            {post.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-[var(--local-text-muted)]" data-jp-field="item.excerpt">
            {post.excerpt}
          </p>
        </div>
        {post.image?.url && (
          <div className="mx-auto mt-12 max-w-[980px] overflow-hidden rounded-[var(--local-radius-lg)] border border-[var(--local-border)]">
            <AspectRatio ratio={21 / 9}>
              <img src={post.image.url} alt={post.image.alt || ''} className="h-full w-full object-cover" />
            </AspectRatio>
          </div>
        )}
        <div className="mx-auto mt-12 max-w-[680px]" data-jp-field="item.body">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className="mb-6 text-base leading-[1.85] text-[var(--local-text)]/90">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
