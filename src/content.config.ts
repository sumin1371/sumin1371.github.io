import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			// 홈 hero 위의 작은 머리글 (src/components/Hero.astro)
			extend: z.object({ eyebrow: z.string().optional() }),
		}),
	}),
};
