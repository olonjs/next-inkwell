import { PostsCollectionSchema } from '@/collections/posts';
import { TagsCollectionSchema } from '@/collections/tags';

export const CollectionRegistry = {
  posts: PostsCollectionSchema,
  tags: TagsCollectionSchema,
} as const;

export type CollectionType = keyof typeof CollectionRegistry;
