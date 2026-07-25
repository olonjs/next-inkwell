import React from 'react';
import { Separator } from '@/components/ui/separator';
import type { FooterData, FooterSettings } from './types';

export const Footer: React.FC<{ data: FooterData; settings: FooterSettings }> = ({ data }) => {
  const navItems = Array.isArray(data.menu) ? data.menu : [];

  return (
    <footer
      style={{
        '--local-bg': 'var(--background)',
        '--local-text': 'var(--foreground)',
        '--local-text-muted': 'var(--muted-foreground)',
        '--local-border': 'var(--border)',
        '--local-primary': 'var(--primary)',
      } as React.CSSProperties}
      className="relative z-0 border-t border-[var(--local-border)] bg-[var(--local-bg)] py-20"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="font-display text-2xl font-black tracking-tight text-[var(--local-text)]" data-jp-field="brandText">
              {data.brandText}
            </span>
            {data.tagline && (
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--local-text-muted)]" data-jp-field="tagline">
                {data.tagline}
              </p>
            )}
          </div>
          <nav aria-label="Footer">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[var(--local-text)]">Explore</h3>
            <ul className="mt-4 space-y-2">
              {navItems.map((item, idx) => (
                <li key={item.id || `menu-${idx}`} data-jp-item-id={item.id || `menu-${idx}`} data-jp-item-field="menu">
                  <a href={item.href} className="text-sm text-[var(--local-text-muted)] transition hover:text-[var(--local-primary)]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[var(--local-text)]">Contact</h3>
            {data.email && (
              <a
                href={'mailto:' + data.email}
                className="mt-4 inline-block text-sm text-[var(--local-text-muted)] transition hover:text-[var(--local-primary)]"
                data-jp-field="email"
              >
                {data.email}
              </a>
            )}
          </div>
        </div>
        <Separator className="my-10 bg-[var(--local-border)]" />
        <p className="text-xs text-[var(--local-text-muted)]" data-jp-field="copyright">
          {data.copyright}
        </p>
      </div>
    </footer>
  );
};
