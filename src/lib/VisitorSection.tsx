import type { FC } from 'react';
import type { Section, SectionType } from '@/types';
import { ComponentRegistry } from '@/lib/ComponentRegistry';

export type VisitorSectionExtras = {
  authorId?: string | null;
  page?: number;
  pathname?: string;
};

/** Render a resolved page section via the tenant ComponentRegistry (RSC path). */
export function VisitorSection({
  section,
}: {
  section: Section;
  extras?: VisitorSectionExtras;
}) {
  const type = section.type as SectionType;
  const Comp = ComponentRegistry[type];
  if (!Comp) {
    return (
      <section className="px-6 py-8 text-muted-foreground">
        Unknown section type: {String(section.type)}
      </section>
    );
  }

  const View = Comp as FC<{ data: unknown; settings?: unknown }>;
  return <View data={section.data} settings={section.settings} />;
}
