import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'> | CollectionEntry<'books'>;

const byNewest = (a: Post, b: Post) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

// Drafts show up on localhost for previewing, never in the built site
const isVisible = ({ data }: { data: { draft: boolean } }) => !data.draft || import.meta.env.DEV;

export async function getBlogPosts() {
  return (await getCollection('blog', isVisible)).sort(byNewest);
}

export async function getBookPosts() {
  return (await getCollection('books', isVisible)).sort(byNewest);
}

export function postUrl(post: Post) {
  return `/${post.collection}/${post.id}/`;
}

// Tags like "multipart/formdata" or "gpg key" need a URL-safe form
export function tagSlug(tag: string) {
  return tag.trim().toLowerCase().replace(/[\s/]+/g, '-');
}

export function tagUrl(tag: string) {
  return `/tags/${tagSlug(tag)}/`;
}

// Chinese reads at roughly 400 characters a minute
export function readingMinutes(body = '') {
  const text = body.replace(/```[\s\S]*?```/g, '').replace(/\s+/g, '');
  return Math.max(1, Math.round(text.length / 400));
}

export function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function stars(rating?: number) {
  return rating ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : '';
}

export async function getTagIndex() {
  const posts = [...(await getBlogPosts()), ...(await getBookPosts())].sort(byNewest);
  const index = new Map<string, { name: string; posts: Post[] }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const entry = index.get(tagSlug(tag)) ?? { name: tag, posts: [] };
      entry.posts.push(post);
      index.set(tagSlug(tag), entry);
    }
  }
  return index;
}
