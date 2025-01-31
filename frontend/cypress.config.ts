import { defineConfig } from 'cypress'

export default defineConfig({
	screenshotsFolder: 'cypress/screenshots',
	videosFolder: 'cypress/videos',
	videoCompression: 10,
	e2e: {
		excludeSpecPattern: ['**/1-getting-started/*.js', '**/2-advanced-examples/*.js'],
		baseUrl: 'http://localhost:4000',
		supportFile: false,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
})
