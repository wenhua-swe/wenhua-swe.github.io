import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.coerce.string()).default([]),
		// Drafts are kept in the repo but skipped by every page and the RSS feed
		draft: z.boolean().default(false),
	}),
});

// Reading notes. Files starting with `_` (e.g. `_template.md`) are ignored.
const books = defineCollection({
	loader: glob({ base: './src/content/books', pattern: '**/[^_]*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.coerce.string()).default([]),
		draft: z.boolean().default(false),
		book: z.object({
			title: z.string(),
			author: z.string(),
			// 1-5
			rating: z.number().min(1).max(5).optional(),
			finishedDate: z.coerce.date().optional(),
		}),
	}),
});

export const collections = { blog, books };
