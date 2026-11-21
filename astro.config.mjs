// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	site: 'https://sumin1371.github.io',
	markdown: {
		// $x$ 는 문장 속 수식, 줄을 따로 쓴 $$ ... $$ 는 블록 수식
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
	integrations: [
		starlight({
			title: 'Sumin Jo',
			description: '공부한 내용을 정리해 두는 곳',
			locales: {
				root: { label: '한국어', lang: 'ko' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/sumin1371' }],
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource-variable/space-grotesk',
				'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css',
				'katex/dist/katex.min.css',
				'./src/styles/custom.css',
			],
			components: {
				Hero: './src/components/Hero.astro',
			},
			sidebar: [
				{
					label: '밑바닥부터 시작하는 딥러닝 1',
					items: [{ autogenerate: { directory: 'notes/dl1' } }],
				},
				{
					label: '밑바닥부터 시작하는 딥러닝 2',
					items: [{ autogenerate: { directory: 'notes/dl2' } }],
				},
			],
		}),
	],
});
