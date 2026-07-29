import type { Tag } from '@/collections/tags';

type CollectionPointer = { $ref: string };

export function isResolvedTag(value: unknown): value is Tag {
  return (
    typeof value === 'object' &&
    value !== null &&
    !('$ref' in value) &&
    typeof (value as Tag).id === 'string'
  );
}

export function isCollectionPointer(value: unknown): value is CollectionPointer {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as CollectionPointer).$ref === 'string'
  );
}

/** Tag id from a resolved Tag, authored $ref, or legacy string key. */
export function resolveTagId(value: unknown): string | null {
  if (typeof value === 'string' && value.length > 0) return value;
  if (isResolvedTag(value) && value.id) return value.id;
  if (isCollectionPointer(value)) {
    const hash = value.$ref.split('#/')[1];
    return hash || null;
  }
  return null;
}

export function postHasTag(
  tags: unknown[] | undefined,
  tagId: string,
): boolean {
  if (!tagId) return false;
  return (tags ?? []).some((tag) => resolveTagId(tag) === tagId);
}
