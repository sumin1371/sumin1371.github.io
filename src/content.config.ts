import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	// Starlight 기본 문구 덮어쓰기 (src/content/i18n/ko.json): 테마 선택을 영어로
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			// 홈 hero 위의 작은 머리글 (src/components/Hero.astro)
			extend: z.object({ eyebrow: z.string().optional() }),
		}),
	}),
};
