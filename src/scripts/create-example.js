#!/usr/bin/env node

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function createExample() {
	try {
		// Get title from command line arguments
		const title = process.argv[2]

		if (!title) {
			console.error('Please provide a title for the example.')
			console.error('Usage: node create-example.js "Your Example Title"')
			process.exit(1)
		}

		// Create slug from title
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '')

		// Get current date in required format
		const date = new Date()
		const formattedDate = date.toLocaleDateString('en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric'
		})

		// Read template file
		const templatePath = path.join(__dirname, '../../template.md')
		const template = await fs.readFile(templatePath, 'utf-8')

		// Replace template content
		const newContent = template
			.replace(/title: ['"]Template['"]/, `title: '${title}'`)
			.replace(/description: ['"]Template['"]/, `description: '${title} example'`)
			.replace(/pubDate: ['"].*['"]/, `pubDate: '${formattedDate}'`)
			.replace(/# Template\n\nlore ipsum dolor sit amet/, `# ${title}\n\nAdd your content here.`)

		// Create examples directory if it doesn't exist
		const examplesDir = path.join(__dirname, '../content/examples')
		await fs.mkdir(examplesDir, { recursive: true })

		// Create new file
		const newFilePath = path.join(examplesDir, `${slug}.md`)
		await fs.writeFile(newFilePath, newContent)

		console.log(`✨ Created new example at: ${newFilePath}`)
	} catch (error) {
		console.error('Error creating example:', error)
		process.exit(1)
	}
}

createExample()
