import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const examples = defineCollection({
	// Load Markdown and MDX files in the `src/content/examples/` directory.
	loader: glob({ base: './src/content/examples', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

export const collections = { examples };
