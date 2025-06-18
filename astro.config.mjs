// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	site: 'https://hyperskill.github.io/ai-tutors-example-library/',
	integrations: [mdx(), sitemap()],
})
